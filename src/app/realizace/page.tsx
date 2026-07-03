import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { InstagramFeed } from '@/components/sections/InstagramFeed'
import type { Metadata } from 'next'
import pageStyles from '@/styles/pageHeader.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Realizace',
  description:
    'Galerie realizací Podlahy Perk – ukázky pokládky vinylových podlah, parket, laminátů, koberců a linolea v Ústí nad Labem a okolí.',
}

export default function RealizacePage() {
  return (
    <>
      <div className={pageStyles.pageHeader}>
        <div className="container">
          <AnimatedSection>
            <p className={pageStyles.eyebrow}>Naše práce</p>
            <h1 className={pageStyles.heading}>Realizace</h1>
            <p className={pageStyles.desc}>
              Prohlédněte si ukázky naší práce. Aktuální fotky realizací
              sdílíme na Instagramu – sledujte nás a nenechte si ujít
              žádnou novinku.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <InstagramFeed />

      <CTABanner />
    </>
  )
}
