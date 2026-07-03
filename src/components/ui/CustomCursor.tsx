'use client'

import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf: number
    let hovered = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      rx = lerp(rx, mx, 0.10)
      ry = lerp(ry, my, 0.10)

      // Dot follows instantly
      dot.style.transform  = `translate(${mx - 3.5}px, ${my - 3.5}px)`
      // Ring lags behind
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const show = () => {
      dot.style.opacity  = '1'
      ring.style.opacity = '1'
    }
    const hide = () => {
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      show()
    }

    const onHoverIn = () => {
      hovered = true
      ring.style.width        = '52px'
      ring.style.height       = '52px'
      ring.style.borderColor  = 'var(--color-accent)'
      dot.style.opacity       = '0'
    }

    const onHoverOut = () => {
      hovered = false
      ring.style.width        = '36px'
      ring.style.height       = '36px'
      ring.style.borderColor  = 'rgba(14,168,166,0.65)'
      dot.style.opacity       = '1'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', hide)

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  )
}
