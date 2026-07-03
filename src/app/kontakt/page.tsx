import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ContactForm } from '@/components/sections/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import type { Metadata } from 'next'
import pageStyles from '@/styles/pageHeader.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktujte Podlahy Perk – Martin Perk. Podlahové studio v Chabařovicích u Ústí nad Labem. Tel: +420 777 651 296. Kalkulace a zaměření zdarma.',
}

export default function KontaktPage() {
  return (
    <>
      {/* Page header s fotkou showroomu */}
      <div className={`${pageStyles.pageHeader} ${pageStyles.withPhoto}`}>
        <div className={pageStyles.bg} aria-hidden="true">
          <Image
            src="/contact-bg.webp"
            alt=""
            fill
            priority
            quality={88}
            sizes="100vw"
            className={pageStyles.bgImage}
          />
          <div className={pageStyles.bgOverlay} />
        </div>

        <div className={`container ${pageStyles.content}`}>
          <AnimatedSection>
            <p className={pageStyles.eyebrow}>Kontakt</p>
            <h1 className={pageStyles.heading}>Spojte se s námi</h1>
            <p className={pageStyles.desc}>
              Zavolejte, napište nebo navštivte naše podlahové studio.
              Kalkulace a zaměření jsou vždy zdarma.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <AnimatedSection>
              <h2 className={styles.formTitle}>Napište nám</h2>
              <ContactForm />
            </AnimatedSection>

            <AnimatedSection delay={0.2} className={styles.info}>
              <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Podlahové studio</h2>
                <ul className={styles.infoList}>
                  <li className={styles.infoItem}>
                    <MapPin size={20} className={styles.infoIcon} aria-hidden="true" />
                    <div>
                      <strong>Showroom</strong>
                      <p>{CONTACT.addressFull}</p>
                    </div>
                  </li>
                  <li className={styles.infoItem}>
                    <Clock size={20} className={styles.infoIcon} aria-hidden="true" />
                    <div>
                      <strong>Otevírací doba</strong>
                      <p>{CONTACT.hours}</p>
                    </div>
                  </li>
                  <li className={styles.infoItem}>
                    <Phone size={20} className={styles.infoIcon} aria-hidden="true" />
                    <div>
                      <strong>Telefon</strong>
                      <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className={styles.infoLink}>
                        {CONTACT.phone1}
                      </a>
                      <a href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`} className={styles.infoLink}>
                        {CONTACT.phone2}
                      </a>
                    </div>
                  </li>
                  <li className={styles.infoItem}>
                    <Mail size={20} className={styles.infoIcon} aria-hidden="true" />
                    <div>
                      <strong>Email</strong>
                      <a href={`mailto:${CONTACT.email}`} className={styles.infoLink}>
                        {CONTACT.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <div className={styles.billing}>
                  <p className={styles.billingTitle}>Fakturační údaje</p>
                  <p>Martin Perk</p>
                  <p>{CONTACT.billingAddress}</p>
                  <p>IČ: {CONTACT.ico} · DIČ: {CONTACT.dic}</p>
                </div>
              </div>

              <div className={styles.mapWrap}>
                <iframe
                  src="https://maps.google.com/maps?q=Husovo+náměstí+24+Chabařovice&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0, borderRadius: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa – Podlahy Perk, Chabařovice"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
