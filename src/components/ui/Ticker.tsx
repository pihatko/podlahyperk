'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Ticker.module.css'

interface TickerProps {
  items: string[]
  speed?: number
  separator?: string
}

export function Ticker({ items, speed = 40, separator = '·' }: TickerProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Duplicate items for seamless loop
    const clone = track.cloneNode(true) as HTMLDivElement
    track.parentElement?.appendChild(clone)

    const totalWidth = track.offsetWidth

    gsap.set([track, clone], { x: 0 })

    const tl = gsap.timeline({ repeat: -1 })
    tl.to([track, clone], {
      x: -totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth),
      },
    })

    // Pause on hover
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
  }, [speed])

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div ref={trackRef} className={styles.track}>
        {items.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.itemText}>{item}</span>
            <span className={styles.sep}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
