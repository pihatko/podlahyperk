'use client'

import { Youtube } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { CONTACT } from '@/lib/constants'
import styles from './YouTubeFeed.module.css'

const PLAYLIST_ID = 'PLhXmvUS-5CLRmg6GCvI8fTIuOj4HD1y5D'

export function YouTubeFeed() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>

          {/* Text vlevo */}
          <AnimatedSection className={styles.textCol}>
            <p className={styles.eyebrow}>
              <Youtube size={14} aria-hidden="true" />
              @podlahyperk
            </p>
            <h2 className={styles.heading}>Naše práce na YouTube</h2>
            <p className={styles.subheading}>
              Sledujte videa z našich realizací, tipy na péči o podlahy
              a novinky z dílny Podlahy Perk. Playlist se průběžně aktualizuje.
            </p>
            <Button
              href={CONTACT.youtube}
              variant="outline"
              external
              showArrow
              className={styles.btn}
            >
              Sledovat na YouTube
            </Button>
          </AnimatedSection>

          {/* Video vpravo */}
          <AnimatedSection delay={0.15} className={styles.videoCol}>
            <div className={styles.playerWrap}>
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0&modestbranding=1`}
                title="Podlahy Perk – YouTube playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.player}
              />
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
