import Image from 'next/image'
import { Phone } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { CONTACT } from '@/lib/constants'
import styles from './CTABanner.module.css'

export function CTABanner() {
  return (
    <section className={styles.section}>
      {/* Background photo */}
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/cta-bg.webp"
          alt=""
          fill
          quality={85}
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className="container">
        <AnimatedSection className={styles.inner}>
          <div className={styles.text}>
            <h2 className={styles.heading}>
              Potřebujete poradit s výběrem podlahy?
            </h2>
            <p className={styles.desc}>
              Zavolejte nebo napište. Přijedeme na zaměření a navrhneme
              nejvhodnější řešení přesně pro váš prostor. Kalkulace zdarma.
            </p>
          </div>
          <div className={styles.actions}>
            <a
              href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`}
              className={styles.phoneBtn}
            >
              <Phone size={20} aria-hidden="true" />
              {CONTACT.phone1}
            </a>
            <Button href="/kontakt" variant="primary" size="lg" showArrow>
              Nezávazná poptávka
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
