'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  once?: boolean
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const from = {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    }

    gsap.set(el, from)

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1, y: 0, x: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
        })
      },
    })

    return () => trigger.kill()
  }, [delay, direction, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
