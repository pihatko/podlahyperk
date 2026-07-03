'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealType = 'words' | 'chars' | 'lines' | 'fade' | 'slide-up' | 'slide-left'

interface UseTextRevealOptions {
  type?: RevealType
  delay?: number
  stagger?: number
  duration?: number
  start?: string
}

export function useTextReveal(
  selector: string,
  options: UseTextRevealOptions = {}
) {
  const {
    type = 'words',
    delay = 0,
    stagger = 0.04,
    duration = 0.8,
    start = 'top 85%',
  } = options

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const elements = document.querySelectorAll<HTMLElement>(selector)
    if (!elements.length) return

    const cleanups: (() => void)[] = []

    elements.forEach((el) => {
      if (type === 'fade') {
        gsap.set(el, { opacity: 0, y: 30 })
        const trigger = ScrollTrigger.create({
          trigger: el,
          start,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power3.out',
            })
          },
          once: true,
        })
        cleanups.push(() => trigger.kill())
        return
      }

      if (type === 'slide-up' || type === 'slide-left') {
        const fromX = type === 'slide-left' ? 60 : 0
        const fromY = type === 'slide-up' ? 50 : 0
        gsap.set(el, { opacity: 0, x: fromX, y: fromY })
        const trigger = ScrollTrigger.create({
          trigger: el,
          start,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              delay,
              ease: 'power3.out',
            })
          },
          once: true,
        })
        cleanups.push(() => trigger.kill())
        return
      }

      // Word / char split
      const text = el.textContent ?? ''
      const splitBy = type === 'chars' ? '' : ' '
      const parts = type === 'chars' ? text.split('') : text.split(' ')

      el.innerHTML = parts
        .map((part) => {
          const sp = part === '' ? '&nbsp;' : part
          return `<span class="reveal-part" style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="reveal-inner" style="display:inline-block;transform:translateY(110%);opacity:0;">${sp}</span></span>`
        })
        .join(type === 'chars' ? '' : ' ')

      const inners = el.querySelectorAll<HTMLElement>('.reveal-inner')

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () => {
          gsap.to(inners, {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: 'power4.out',
          })
        },
        once: true,
      })

      cleanups.push(() => {
        trigger.kill()
        el.textContent = text
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [selector, type, delay, stagger, duration, start])
}
