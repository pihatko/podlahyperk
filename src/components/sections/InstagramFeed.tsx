import Image from 'next/image'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { getInstagramFeed } from '@/lib/instagram'
import { CONTACT } from '@/lib/constants'
import styles from './InstagramFeed.module.css'

export async function InstagramFeed() {
  const posts = await getInstagramFeed(9)

  if (posts.length === 0) {
    return null // nezobraziž sekci pokud není token nakonfigurován
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <AnimatedSection className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>
              <Instagram size={14} aria-hidden="true" />
              @podlahyperk
            </p>
            <h2 className={styles.heading}>Naše realizace na Instagramu</h2>
          </div>
          <Button
            href={CONTACT.instagram}
            variant="outline"
            external
            showArrow
          >
            Sledovat na Instagramu
          </Button>
        </AnimatedSection>

        <div className={styles.grid}>
          {posts.map((post, i) => {
            const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
            if (!imageUrl) return null

            return (
              <AnimatedSection key={post.id} delay={i * 0.05}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.item}
                  aria-label={post.caption ? `Zobrazit příspěvek: ${post.caption.slice(0, 60)}` : 'Zobrazit příspěvek na Instagramu'}
                >
                  <div className={styles.imageWrap}>
                    <Image
                      src={imageUrl}
                      alt={post.caption?.slice(0, 100) ?? 'Realizace Podlahy Perk'}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className={styles.image}
                    />
                    <div className={styles.overlay} aria-hidden="true">
                      <Instagram size={24} />
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
