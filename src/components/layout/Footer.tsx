import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import styles from './Footer.module.css'
import { CONTACT, SITE_NAME } from '@/lib/constants'

const navLinks = [
  { href: '/sluzby', label: 'Naše služby' },
  { href: '/realizace', label: 'Realizace' },
  { href: '/udrzba', label: 'Péče o podlahy' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

const serviceLinks = [
  { href: '/sluzby/vinyl-pvc', label: 'Vinyl a PVC podlahy' },
  { href: '/sluzby/drevo-parkety', label: 'Dřevěné podlahy a parkety' },
  { href: '/sluzby/laminate', label: 'Laminátové podlahy' },
  { href: '/sluzby/koberce', label: 'Koberce' },
  { href: '/sluzby/linoleum', label: 'Linoleum a Marmoleum' },
  { href: '/sluzby/renovace-opravy', label: 'Renovace a opravy' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Podlahy Perk – domů">
            <Image src="/logo.svg" alt="Podlahy Perk" width={160} height={48} />
          </Link>
          <p className={styles.tagline}>
            Certifikovaný podlahář s 15 lety praxe.<br />
            Člen Cechu podlahářů České republiky.
          </p>
          <div className={styles.socials}>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
              className={styles.socialLink} aria-label="Instagram Podlahy Perk">
              <Instagram size={18} />
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer"
              className={styles.socialLink} aria-label="Facebook Podlahy Perk">
              <Facebook size={18} />
            </a>
          </div>

          <div className={styles.partner}>
            <p className={styles.partnerLabel}>Spolupracujeme</p>
            <a
              href="https://videoperk.cz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.partnerLink}
              aria-label="VideoPerk – video produkce"
            >
              <Image
                src="/videoperk-logo.png"
                alt="videoperk.cz"
                width={140}
                height={32}
                className={styles.partnerLogo}
              />
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Navigace</h3>
          <ul className={styles.linkList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Služby</h3>
          <ul className={styles.linkList}>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <span className={styles.linkPlain}>{link.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Kontakt</h3>
          <ul className={styles.contactList}>
            <li>
              <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className={styles.contactLink}>
                <Phone size={15} aria-hidden="true" />{CONTACT.phone1}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`} className={styles.contactLink}>
                <Phone size={15} aria-hidden="true" />{CONTACT.phone2}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className={styles.contactLink}>
                <Mail size={15} aria-hidden="true" />{CONTACT.email}
              </a>
            </li>
            <li className={styles.contactItem}>
              <MapPin size={15} aria-hidden="true" />
              <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                {CONTACT.addressFull}
              </a>
            </li>
            <li className={styles.contactItem}>
              <Clock size={15} aria-hidden="true" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>© {year} {SITE_NAME} – Martin Perk</p>
            <p className={styles.legal}>IČ: {CONTACT.ico} · DIČ: {CONTACT.dic}</p>
            <p className={styles.credit}>web by <a href="https://pihrtdesign.com" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>pihrtdesign.com</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
