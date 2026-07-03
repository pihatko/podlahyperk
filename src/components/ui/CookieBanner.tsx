'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './CookieBanner.module.css'

type ConsentState = 'accepted' | 'declined' | null

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent') as ConsentState
    if (!stored) {
      setVisible(true)
    } else {
      applyConsent(stored)
    }
  }, [])

  const applyConsent = (value: ConsentState) => {
    if (value === 'accepted') loadAdobeFonts()
  }

  const loadAdobeFonts = () => {
    if (document.querySelector('link[data-adobe-fonts]')) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://use.typekit.net/cqz1mmq.css'
    link.setAttribute('data-adobe-fonts', 'true')
    document.head.appendChild(link)
  }

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    applyConsent('accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Souhlas s cookies" aria-live="polite">
      <div className={styles.inner}>
        <div className={styles.text}>

          {/* Ikonka + nadpis */}
          <p className={styles.title}>
            <span className={styles.cookieIcon} aria-hidden="true">🍪</span>
            {' '}Cookies
          </p>

          {/* Krátký text */}
          <p className={styles.desc}>
            Tento web používá soubory cookies. Některé jsou nezbytné
            pro správné fungování, jiné (jako písmo Adobe Fonts) vyžadují
            váš souhlas.
          </p>

          {/* Link na podmínky */}
          <Link href="/cookies" className={styles.policyLink}>
            Zásady ochrany osobních údajů →
          </Link>
        </div>

        <div className={styles.actions}>
          <button onClick={handleAccept} className={styles.btnAccept}>
            Přijmout vše
          </button>
          <button onClick={handleDecline} className={styles.btnDecline}>
            Pouze nezbytné
          </button>
        </div>
      </div>
    </div>
  )
}
