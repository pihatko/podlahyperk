'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Layers, TreePine, SquareStack, Grid3x3, Leaf, Wrench } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/lib/services'
import styles from './ServicesGrid.module.css'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ReactNode> = {
  layers: <Layers size={28} />,
  'tree-pine': <TreePine size={28} />,
  'square-stack': <SquareStack size={28} />,
  grip: <Grid3x3 size={28} />,
  leaf: <Leaf size={28} />,
  tool: <Wrench size={28} />,
}

export function ServicesGrid() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Eyebrow slide in
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 88%', once: true },
        }
      )

      // Heading words
      const h = headingRef.current
      if (h) {
        const original = h.innerHTML
        const words = h.textContent?.split(' ') ?? []
        h.innerHTML = words
          .map((w) => `<span style="display:inline-block;overflow:hidden;vertical-align:top;"><span style="display:inline-block;">${w}</span></span>`)
          .join(' ')

        gsap.fromTo(
          h.querySelectorAll('span > span'),
          { y: '105%', opacity: 0 },
          {
            y: '0%', opacity: 1, duration: 0.8, stagger: 0.07, ease: 'power4.out',
            scrollTrigger: { trigger: h, start: 'top 88%', once: true },
          }
        )
      }

      // Cards: clip-path reveal (tile laying effect)
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('[data-card]')
        gsap.fromTo(cards,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 0.7,
            stagger: { amount: 0.8, from: 'start' },
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className={`section ${styles.section}`} id="sluzby">
      <div className="container">
        <div ref={headerRef} className={styles.header}>
          <p ref={eyebrowRef} className={styles.eyebrow} style={{ opacity: 0 }}>Co umíme</p>
          <h2 ref={headingRef} className={styles.heading}>
            Komplexní péče o vaše podlahy
          </h2>
          <p className={styles.subheading}>
            Od odborného posouzení a zaměření, přes výběr materiálu,
            až po profesionální pokládku a finální úpravy.
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {services.map((service) => (
            <Link
              key={service.slug}
              href="/sluzby"
              className={styles.card}
              data-card
              data-cursor
            >
              <div className={styles.cardIcon} aria-hidden="true">
                {iconMap[service.icon]}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.shortDesc}</p>
              </div>
              <div className={styles.cardArrow} aria-hidden="true">
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
