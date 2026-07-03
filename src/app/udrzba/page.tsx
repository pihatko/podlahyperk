import Link from 'next/link'
import { FileDown, ChevronRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CTABanner } from '@/components/sections/CTABanner'
import type { Metadata } from 'next'
import pageStyles from '@/styles/pageHeader.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Péče o podlahy',
  description:
    'Návody na údržbu a péči o podlahy – dřevo, vinyl, PVC, lamináty, koberce, linoleum. Ke stažení zdarma od Podlahy Perk.',
}

const categories = [
  {
    title: 'Dřevěné a korkové podlahy',
    docs: [
      { name: 'Lakované podlahy', file: 'drevo-korek-lakovane.pdf' },
      { name: 'Olejované a voskované', file: 'drevo-korek-olej-a-vosk.pdf' },
      { name: 'Dřevo ve venkovním prostředí', file: 'drevo-ve-venkovnim-prostredi.pdf' },
    ],
  },
  {
    title: 'PVC, vinyl a marmoleum',
    docs: [
      { name: 'Bez výrobní úpravy povrchu', file: 'elasticke-podlahoviny-bez-vyrobni-upravy-povrchu.pdf' },
      { name: 'S výrobní PUR úpravou povrchu', file: 'elasticke-podlahoviny-s-vyrobni-pur-upravou-povrchu.pdf' },
      { name: 'V bytovém zatížení', file: 'elasticke-podlahoviny-v-bytovem-zatizeni.pdf' },
      { name: 'Protiskluzné bezpečnostní podlahoviny', file: 'protiskluzne-bezpecnostni-podlahoviny.pdf' },
      { name: 'Postupy pro ošetření linolea', file: 'linoleum-osetrovaci-postupy.pdf' },
      { name: 'Podlahoviny ošetřené Dr. Schutz PU-nátěrem', file: 'podlahoviny-osetrene-drschutz-pu-naterem.pdf' },
      { name: 'Denní čištění s PU/PUR úpravou', file: 'denni-cisteni-vyrobni-pu-pur-povrchy.pdf' },
      { name: 'Údržba a čištění vinylových podlah', file: 'vinyl-udrzba-a-cisteni.pdf' },
    ],
  },
  {
    title: 'Elektrostatické podlahy',
    docs: [
      { name: 'Elektrostaticky vodivé a antistatické podlahy', file: 'elektrostaticky-vodive-a-antistaticke-podlahy.pdf' },
    ],
  },
  {
    title: 'Koberce',
    docs: [
      { name: 'Vpichované – Nadelvlies', file: 'koberce-vpichovane-nadelvlies.pdf' },
      { name: 'Z přírodních vláken', file: 'koberce-z-prirodnich-vlaken.pdf' },
      { name: 'Ze střižní vlny', file: 'koberce-ze-strizni-vlny.pdf' },
      { name: 'Ze syntetických vláken', file: 'koberce-ze-syntetickych-vlaken.pdf' },
      { name: 'Suché čištění koberců', file: 'suche-cisteni-kobercu.pdf' },
    ],
  },
  {
    title: 'Laminátové podlahy',
    docs: [
      { name: 'Ošetřování a čištění', file: 'laminatove-podlahy-osetrovani-a-cisteni.pdf' },
      { name: 'Péče o laminátové podlahy', file: 'pece-o-laminatove-podlahy.pdf' },
    ],
  },
  {
    title: 'Čistící prostředky a chemie',
    docs: [
      { name: 'Přehled čistících prostředků', file: 'cistici-prostredky.pdf' },
    ],
  },
]

export default function UdrzbaPage() {
  return (
    <>
      <div className={pageStyles.pageHeader}>
        <div className="container">
          <AnimatedSection>
            <p className={pageStyles.eyebrow}>Správná péče</p>
            <h1 className={pageStyles.heading}>Péče o podlahy</h1>
            <p className={pageStyles.desc}>
              Správná údržba prodlouží životnost vaší podlahy na desítky let.
              Stáhněte si zdarma návody od předních výrobců nebo nás kontaktujte
              pro osobní poradenství.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.title} delay={i * 0.07} className={styles.card}>
                <h2 className={styles.cardTitle}>{cat.title}</h2>
                <ul className={styles.docList}>
                  {cat.docs.map((doc) => (
                    <li key={doc.file}>
                      <a
                        href={`/assets/${doc.file}`}
                        download
                        className={styles.docLink}
                        aria-label={`Stáhnout PDF: ${doc.name}`}
                      >
                        <FileDown size={16} aria-hidden="true" />
                        <span>{doc.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className={styles.note}>
            <p>
              Nenašli jste odpověď na svou otázku?{' '}
              <Link href="/kontakt" className={styles.noteLink}>
                Napište nebo zavolejte <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
