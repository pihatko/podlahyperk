'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollRevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  start?: string
  once?: boolean
}

// Reveal a single ref element
export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseScrollRevealOptions = {}
) {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.9,
    delay = 0,
    ease = 'power3.out',
    start = 'top 88%',
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(el, { y, x, opacity })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(el, { y: 0, x: 0, opacity: 1, duration, delay, ease })
      },
      onLeaveBack: once
        ? undefined
        : () => gsap.set(el, { y, x, opacity }),
    })

    return () => trigger.kill()
  }, [])
}

// Reveal multiple children with stagger
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement>,
  childSelector: string,
  options: UseScrollRevealOptions = {}
) {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 85%',
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const children = container.querySelectorAll<HTMLElement>(childSelector)
    if (!children.length) return

    gsap.set(children, { y, x, opacity })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease,
        })
      },
    })

    return () => trigger.kill()
  }, [])
}
