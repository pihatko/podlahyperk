import Image from 'next/image'
import { Layers, TreePine, SquareStack, Grid3x3, Leaf, Wrench } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { services } from '@/lib/services'
import type { Metadata } from 'next'
import pageStyles from '@/styles/pageHeader.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Služby',
  description:
    'Kompletní přehled podlahářských služeb – vinyl, PVC, dřevěné podlahy, parkety, lamináty, koberce, linoleum a renovace. Pokládka v Ústí nad Labem a okolí.',
}

const iconMap: Record<string, React.ReactNode> = {
  layers: <Layers size={32} />,
  'tree-pine': <TreePine size={32} />,
  'square-stack': <SquareStack size={32} />,
  grip: <Grid3x3 size={32} />,
  leaf: <Leaf size={32} />,
  tool: <Wrench size={32} />,
}

export default function SluzbyPage() {
  return (
    <>
      <div className={`${pageStyles.pageHeader} ${pageStyles.withPhoto}`}>
        <div className={pageStyles.bg} aria-hidden="true">
          <Image src="/services-bg.webp" alt="" fill priority quality={88} sizes="100vw" className={pageStyles.bgImage} />
          <div className={pageStyles.bgOverlay} />
        </div>
        <div className={`container ${pageStyles.content}`}>
          <AnimatedSection>
            <p className={pageStyles.eyebrow}>Co umíme</p>
            <h1 className={pageStyles.heading}>Naše služby</h1>
            <p className={pageStyles.desc}>
              Zajišťujeme kompletní podlahářské práce od odborné konzultace
              a zaměření, přes dodávku materiálu, až po profesionální pokládku
              a finální úpravy včetně lišt a přechodových profilů.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} delay={i * 0.07}>
                <div className={styles.card}>
                  <div className={styles.cardIcon} aria-hidden="true">
                    {iconMap[service.icon]}
                  </div>
                  <h2 className={styles.cardTitle}>{service.title}</h2>
                  <p className={styles.cardDesc}>{service.description}</p>
                  <ul className={styles.features}>
                    {service.features.slice(0, 4).map((f) => (
                      <li key={f} className={styles.feature}>
                        <span aria-hidden="true">✓</span> {f}
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className={styles.moreFeatures}>
                        +{service.features.length - 4} dalších
                      </li>
                    )}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
