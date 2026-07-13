'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'
import { STATS } from '@/lib/constants'
import styles from './StatsSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Na mobilu neanimujeme x (způsobuje overflow), jen fade
      const isMobile = window.innerWidth < 900
      gsap.fromTo(textRef.current,
        { opacity: 0, x: isMobile ? 0 : -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 85%', once: true },
        }
      )

      if (statsRef.current) {
        const boxes = statsRef.current.querySelectorAll<HTMLElement>('[data-stat]')

        gsap.fromTo(boxes,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
          }
        )

        boxes.forEach((box) => {
          const valueEl = box.querySelector<HTMLElement>('[data-value]')
          if (!valueEl) return
          const raw     = valueEl.getAttribute('data-value') ?? ''
          const numeric = parseInt(raw.replace(/\D/g, ''))
          const suffix  = raw.replace(/\d/g, '')
          if (isNaN(numeric)) return

          const proxy = { val: 0 }
          ScrollTrigger.create({
            trigger: box,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.to(proxy, {
                val: numeric,
                duration: 1.6,
                delay: 0.15,
                ease: 'power2.out',
                onUpdate() { valueEl.textContent = Math.round(proxy.val) + suffix },
                onComplete() {
                  const over = proxy
                  gsap.fromTo(over,
                    { val: numeric + Math.ceil(numeric * 0.06) },
                    {
                      val: numeric,
                      duration: 0.35,
                      ease: 'power2.inOut',
                      onUpdate() { valueEl.textContent = Math.round(over.val) + suffix },
                    }
                  )
                },
              })
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      {/*
        Watermark logo — absolutně na celou sekci, pod vším.
        Dlaždice mají backdrop-filter blur — rozmazávají jen oblast pod sebou.
      */}
      <div className={styles.watermark} aria-hidden="true">
        <Image
          src="/logo-watermark.svg"
          alt=""
          fill
          className={styles.watermarkImg}
        />
      </div>

      <div className="container">
        <div className={styles.inner}>

          {/* Text column */}
          <div ref={textRef} className={styles.text} style={{ opacity: 0 }}>
            <p className={styles.eyebrow}>Podlahy Perk</p>
            <h2 className={styles.heading}>
              Na podlahy jsme specialisté již 15 let
            </h2>
            <p className={styles.desc}>
              Martin Perk je certifikovaný podlahář a člen Cechu podlahářů České republiky.
              Certifikát Forbo Marmoleum a Artoleum zaručuje odbornou pokládku přírodního linolea
              dle předpisů výrobce.
            </p>
            <Button href="/o-nas" variant="outline" showArrow>Více o nás</Button>
          </div>

          {/* Stats grid — backdrop-filter blur rozmaže logo pouze pod dlaždicemi */}
          <div ref={statsRef} className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat} data-stat style={{ opacity: 0 }}>
                <span className={styles.statValue} data-value={stat.value}>
                  0{stat.value.replace(/\d/g, '')}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
