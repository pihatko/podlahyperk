import { Ticker } from '@/components/ui/Ticker'
import { PARTNERS } from '@/lib/constants'
import styles from './PartnersStrip.module.css'

export function PartnersStrip() {
  const partnerNames = PARTNERS.map((p) => p.name)

  return (
    <section className={styles.section}>
      <div className={styles.label}>
        <span>Pracujeme s prověřenými značkami</span>
      </div>
      <Ticker items={partnerNames} speed={35} />
    </section>
  )
}
