import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { PartnersStrip } from '@/components/sections/PartnersStrip'
import { CheckCircle, Award, Users } from 'lucide-react'
import type { Metadata } from 'next'
import pageStyles from '@/styles/pageHeader.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'O nás',
  description:
    'Podlahy Perk – Martin Perk. Certifikovaný podlahář, člen Cechu podlahářů ČR. Certifikát Forbo Marmoleum a Artoleum. 15 let zkušeností v Ústí nad Labem.',
}

const certifications = [
  'Certifikovaný podlahář Forbo Marmoleum',
  'Certifikovaný podlahář Artoleum',
  'Člen Cechu podlahářů České republiky',
  'Odborné posouzení podlah s písemným vyjádřením',
]

const values = [
  {
    icon: <Award size={28} />,
    title: 'Certifikovaná kvalita',
    desc: 'Jsme certifikovaní partneři Forbo Marmoleum a Artoleum. Každá pokládka probíhá přesně dle technologických předpisů výrobce.',
  },
  {
    icon: <CheckCircle size={28} />,
    title: 'Komplexní servis',
    desc: 'Zajistíme vše od zaměření a výběru materiálu, přes pokládku, až po finální úpravy a lišty. Dodání na klíč bez starostí.',
  },
  {
    icon: <Users size={28} />,
    title: 'Osobní přístup',
    desc: 'Jako rodinná firma si zakládáme na přímém kontaktu se zákazníkem. S Martinem Perkem mluvíte přímo od prvního hovoru.',
  },
]

export default function ONasPage() {
  return (
    <>
      <div className={pageStyles.pageHeader}>
        <div className="container">
          <AnimatedSection>
            <p className={pageStyles.eyebrow}>O nás</p>
            <h1 className={pageStyles.heading}>Podlahy Perk</h1>
            <p className={pageStyles.desc}>
              Rodinná podlahářská firma s 15 lety praxe v Ústí nad Labem a okolí.
              Zakladatel a majitel Martin Perk je certifikovaný podlahář a dlouholetý člen
              Cechu podlahářů České republiky.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <AnimatedSection className={styles.storyText}>
              <h2 className={styles.sectionTitle}>Náš příběh</h2>
              <p>
                Podlahy Perk vznikly z vášně pro řemeslo a touhy po poctivě odvedené práci.
                Martin Perk začínal jako samostatný podlahář a během let vybudoval firmu
                s dobrým jménem po celém Ústecku.
              </p>
              <p>
                Specializujeme se na celé spektrum podlahových krytin – od moderních vinylových
                podlah LVT, přes dřevěné parkety a laminát, až po přírodní marmoleum a linoleum.
                Jako certifikovaní partneři Forbo jsme oprávněni vydávat odborná vyjádření
                k použitým materiálům a montážím.
              </p>
              <p>
                Každý projekt začíná pečlivým zaměřením a odbornou konzultací. Měříme vlhkost
                podkladu, teplotu a navrhujeme nejvhodnější řešení pro konkrétní podmínky.
                Kvalita podkladu je základ – proto ji nikdy nepřeskakujeme.
              </p>

              <ul className={styles.certList}>
                {certifications.map((cert) => (
                  <li key={cert} className={styles.certItem}>
                    <CheckCircle size={18} aria-hidden="true" />
                    {cert}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className={styles.storyCard}>
              <div className={styles.profileCard}>
                <div className={styles.profileAvatar} aria-hidden="true">MP</div>
                <div>
                  <h3 className={styles.profileName}>Martin Perk</h3>
                  <p className={styles.profileRole}>Majitel & certifikovaný podlahář</p>
                </div>
                <div className={styles.profileStats}>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatValue}>15+</span>
                    <span className={styles.profileStatLabel}>let praxe</span>
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatValue}>500+</span>
                    <span className={styles.profileStatLabel}>realizací</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <AnimatedSection className={styles.valuesHeader}>
            <h2 className={styles.sectionTitle}>Proč si zákazníci vybírají nás</h2>
          </AnimatedSection>
          <div className={styles.valuesGrid}>
            {values.map((val, i) => (
              <AnimatedSection key={val.title} delay={i * 0.1} className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">{val.icon}</div>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueDesc}>{val.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <PartnersStrip />
      <CTABanner />
    </>
  )
}
