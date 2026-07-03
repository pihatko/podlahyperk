'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imgWrapRef  = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const line1Ref    = useRef<HTMLSpanElement>(null)
  const line2Ref    = useRef<HTMLSpanElement>(null)
  const descRef     = useRef<HTMLParagraphElement>(null)
  const ctasRef     = useRef<HTMLDivElement>(null)
  const badgesRef   = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Split line into animated words
    const splitWords = (el: HTMLElement | null) => {
      if (!el) return []
      const words = (el.textContent ?? '').split(/\s+/).filter(Boolean)
      el.innerHTML = words
        .map(w =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.05em">` +
          `<span style="display:inline-block">${w}</span></span>`
        )
        .join(' ')
      return Array.from(el.querySelectorAll<HTMLElement>('span > span'))
    }

    const words1 = splitWords(line1Ref.current)
    const words2 = splitWords(line2Ref.current)

    if (reduced) {
      // Skip animation, just show everything
      gsap.set([eyebrowRef.current, descRef.current, ctasRef.current, badgesRef.current], { opacity: 1, y: 0 })
      gsap.set([...words1, ...words2], { y: '0%', opacity: 1 })
      return
    }

    // ── 1. Photo reveal: clip-path sharp horizontal wipe from bottom ──
    // Starts fully hidden (inset from bottom = 100%), reveals to 0%
    gsap.set(imgWrapRef.current, { clipPath: 'inset(0 0 100% 0)' })
    gsap.to(imgWrapRef.current, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.4,
      delay: 0.1,
      ease: 'power4.inOut',
    })

    // ── 2. Parallax: image moves slower than scroll ──
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // ── 3. Text timeline ──
    const tl = gsap.timeline({ delay: 0.55 })

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
    )
    .fromTo(words1,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.85, stagger: 0.07, ease: 'power4.out' },
      '-=0.2'
    )
    .fromTo(words2,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.85, stagger: 0.07, ease: 'power4.out' },
      '-=0.55'
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(ctasRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(badgesRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    )
    .fromTo(lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1.0, ease: 'power3.inOut' },
      '-=0.8'
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Úvod">

      {/* Photo with clip-path reveal + parallax */}
      <div ref={imgWrapRef} className={styles.bg} aria-hidden="true">
        <div ref={imgRef} className={styles.bgInner}>
          <Image
            src="/hero.webp"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.bgImage}
          />
          <div className={styles.bgOverlay} />
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <p ref={eyebrowRef} className={styles.eyebrow} style={{ opacity: 0 }}>
          Ústí nad Labem & okolí — 15 let praxe
        </p>

        <h1 className={styles.heading}>
          <span ref={line1Ref} className={styles.headingLine1}>Podlahy,</span>

          <span ref={line2Ref} className={styles.headingLine2}>které vydrží.</span>
        </h1>

        <p ref={descRef} className={styles.desc} style={{ opacity: 0 }}>
          Certifikovaná pokládka vinyl, PVC, dřeva, parket,
          laminátů, koberců a přírodního linolea Marmoleum.
        </p>

        <div ref={ctasRef} className={styles.ctas} style={{ opacity: 0 }}>
          <Button href="/kontakt" size="lg" showArrow>Nezávazná poptávka</Button>
          <Button href="/sluzby" variant="outline" size="lg">Naše služby</Button>
        </div>

        <div ref={badgesRef} className={styles.badges} style={{ opacity: 0 }}>
          <span className={styles.badge}>Certifikát Forbo Marmoleum</span>
          <span className={styles.badgeDot} aria-hidden="true" />
          <span className={styles.badge}>Člen Cechu podlahářů ČR</span>
          <span className={styles.badgeDot} aria-hidden="true" />
          <span className={styles.badge}>Kalkulace zdarma</span>
        </div>
      </div>

      <div ref={lineRef} className={styles.scrollLine} aria-hidden="true"
        style={{ transformOrigin: 'top', transform: 'scaleY(0)' }} />
    </section>
  )
}
