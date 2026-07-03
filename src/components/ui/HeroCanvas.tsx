'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroCanvas.module.css'

const VERT = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;
uniform sampler2D uTexture;
uniform float uReveal;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Mouse parallax
  vec2 mouse = uMouse - 0.5;
  uv += mouse * 0.014;
  uv = clamp(uv, 0.0, 1.0);

  // Wave reveal from bottom upward
  float wave = sin(uv.x * 8.0 + uTime * 2.2) * 0.025;
  float edge = uv.y + wave;
  float reveal = smoothstep(uReveal - 0.12, uReveal + 0.06, edge);

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = vec4(color.rgb, color.a * reveal);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

export function HeroCanvas({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Full screen quad
    const buf = (data: Float32Array) => {
      const b = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, b)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      return b
    }
    const posBuf = buf(new Float32Array([-1,-1, 1,-1, -1,1, 1,1]))
    const uvBuf  = buf(new Float32Array([ 0, 0, 1, 0,  0,1, 1,1]))

    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uvLoc = gl.getAttribLocation(prog, 'uv')
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
    gl.enableVertexAttribArray(uvLoc)
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0)

    const uReveal  = gl.getUniformLocation(prog, 'uReveal')
    const uTime    = gl.getUniformLocation(prog, 'uTime')
    const uMouse   = gl.getUniformLocation(prog, 'uMouse')
    const uTexture = gl.getUniformLocation(prog, 'uTexture')

    // Create texture
    const tex = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([20, 20, 20, 255]))

    // Load image via fetch → blob → ImageBitmap to avoid CORS issues
    let textureLoaded = false
    fetch(src)
      .then(r => r.blob())
      .then(blob => createImageBitmap(blob, { resizeQuality: 'high' }))
      .then(bitmap => {
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        bitmap.close()
        textureLoaded = true
      })
      .catch(() => {
        // Fallback: plain Image element
        const img = new Image()
        img.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, tex)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          textureLoaded = true
        }
        img.src = src
      })

    // Resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Mouse
    let mx = 0.5, my = 0.5
    let tmx = 0.5, tmy = 0.5
    const onMouse = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth
      tmy = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Render loop
    let startTs: number | null = null
    const REVEAL_MS = 2000
    let raf: number

    const render = (ts: number) => {
      if (!startTs) startTs = ts
      const elapsed = ts - startTs
      const t = ts * 0.001

      // ease-out cubic reveal 0 → 1
      const raw = Math.min(elapsed / REVEAL_MS, 1)
      const reveal = 1 - Math.pow(1 - raw, 3)

      // Lerp mouse
      mx += (tmx - mx) * 0.05
      my += (tmy - my) * 0.05

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, tex)

      gl.uniform1i(uTexture, 0)
      gl.uniform1f(uReveal, reveal)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, mx, my)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [src])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
