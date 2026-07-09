'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { PARTNERS } from '@/lib/constants'
import styles from './PartnersStrip.module.css'

export function PartnersStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const currentLogo = useRef<string | null>(null)
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>()

  // Infinite ticker
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const clone = track.cloneNode(true) as HTMLDivElement
    track.parentElement?.appendChild(clone)
    const totalWidth = track.offsetWidth

    const tl = gsap.timeline({ repeat: -1 })
    tl.to([track, clone], {
      x: -totalWidth,
      duration: totalWidth / 40,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth),
      },
    })

    const wrapper = track.parentElement
    const pause = () => tl.pause()
    const play = () => tl.play()
    wrapper?.addEventListener('mouseenter', pause)
    wrapper?.addEventListener('mouseleave', play)

    return () => {
      tl.kill()
      clone.remove()
      wrapper?.removeEventListener('mouseenter', pause)
      wrapper?.removeEventListener('mouseleave', play)
    }
  }, [])

  // Mouse follow
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          x: e.clientX + 20,
          y: e.clientY - 70,
          duration: 0.12,
          ease: 'power2.out',
        })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const handleMouseEnter = useCallback((logo: string, e: React.MouseEvent) => {
    // Zrušit případné hide timeout
    if (hideTimeout.current) clearTimeout(hideTimeout.current)

    // Změnit obrázek okamžitě — bez čekání na state
    if (imgRef.current && currentLogo.current !== logo) {
      imgRef.current.src = logo
      currentLogo.current = logo
    }

    if (logoRef.current) {
      gsap.killTweensOf(logoRef.current)
      gsap.set(logoRef.current, { x: e.clientX + 20, y: e.clientY - 70 })
      gsap.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: 'power3.out' })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (logoRef.current) {
      gsap.killTweensOf(logoRef.current)
      gsap.to(logoRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          currentLogo.current = null
        },
      })
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.label}>
        <span>Pracujeme s prověřenými značkami</span>
      </div>

      <div className={styles.tickerWrapper}>
        <div ref={trackRef} className={styles.track}>
          {PARTNERS.map((partner) => (
            <span key={partner.name} className={styles.item}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerLink}
                onMouseEnter={(e) => handleMouseEnter(partner.logo, e)}
                onMouseLeave={handleMouseLeave}
                aria-label={partner.name}
              >
                <span className={styles.itemText}>{partner.name}</span>
              </a>
              <span className={styles.sep} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      {/* Plovoucí logo — vždy v DOM, src se mění přímo */}
      <div
        ref={logoRef}
        className={styles.floatingLogo}
        style={{ opacity: 0, transform: 'scale(0.88)' }}
        aria-hidden="true"
      >
        <img
          ref={imgRef}
          src="#"
          alt=""
          className={styles.floatingImg}
        />
      </div>
    </section>
  )
}
