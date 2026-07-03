import { notFound } from 'next/navigation'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { CTABanner } from '@/components/sections/CTABanner'
import { getServiceBySlug, services } from '@/lib/services'
import { SITE_NAME } from '@/lib/constants'
import type { Metadata } from 'next'
import styles from './page.module.css'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}

  return {
    title: service.title,
    description: service.description,
  }
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <AnimatedSection>
            <Button href="/sluzby" variant="ghost" className={styles.back}>
              <ArrowLeft size={16} aria-hidden="true" />
              Zpět na služby
            </Button>
            <p className={styles.eyebrow}>{SITE_NAME}</p>
            <h1 className={styles.heading}>{service.title}</h1>
            <p className={styles.desc}>{service.description}</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <AnimatedSection className={styles.featuresCol}>
              <h2 className={styles.featuresTitle}>Co zahrnuje tato služba</h2>
              <ul className={styles.featuresList}>
                {service.features.map((feature, i) => (
                  <AnimatedSection key={i} delay={i * 0.06} className={styles.featureItem}>
                    <CheckCircle size={20} className={styles.featureIcon} aria-hidden="true" />
                    <span>{feature}</span>
                  </AnimatedSection>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className={styles.contactCol} delay={0.2}>
              <div className={styles.contactCard}>
                <h3 className={styles.contactTitle}>Máte zájem o tuto službu?</h3>
                <p className={styles.contactDesc}>
                  Kontaktujte nás pro nezávaznou konzultaci a cenovou kalkulaci.
                  Přijedeme na zaměření a poradíme s výběrem nejvhodnějšího řešení.
                </p>
                <Button href="/kontakt" size="lg" showArrow className={styles.contactBtn}>
                  Nezávazná poptávka
                </Button>
                <Button href={`tel:+420777651296`} variant="outline" size="lg">
                  +420 777 651 296
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
