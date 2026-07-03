import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>Stránka nenalezena</h1>
        <p className={styles.desc}>
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        <div className={styles.actions}>
          <Button href="/" size="lg" showArrow>
            Zpět na úvodní stránku
          </Button>
          <Button href="/kontakt" variant="outline" size="lg">
            Kontaktovat nás
          </Button>
        </div>
      </div>
    </div>
  )
}
