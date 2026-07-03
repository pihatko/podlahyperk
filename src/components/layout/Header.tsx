'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import styles from './Header.module.css'
import { CONTACT } from '@/lib/constants'

const navLinks = [
  { href: '/sluzby', label: 'Služby' },
  { href: '/realizace', label: 'Realizace' },
  { href: '/udrzba', label: 'Péče o podlahy' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        <Link href="/" className={styles.logo} aria-label="Podlahy Perk – domů">
          <Image
            src="/logo.svg"
            alt="Podlahy Perk"
            width={180}
            height={54}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Hlavní navigace">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${pathname.startsWith(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className={styles.phoneLink}>
          <Phone size={15} aria-hidden="true" />
          <span>{CONTACT.phone1}</span>
        </a>

        <button
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!isOpen}>
        <nav aria-label="Mobilní navigace">
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.mobileNavLink} ${pathname.startsWith(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className={styles.mobilePhone}>
          <Phone size={18} aria-hidden="true" />
          {CONTACT.phone1}
        </a>
      </div>
    </header>
  )
}
