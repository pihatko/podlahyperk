import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, CONTACT } from '@/lib/constants'

// Nunito Sans — vždy načtený fallback (nejbližší náhrada za Avenir Next)
// Adobe Fonts se načte dynamicky pouze po souhlasu s cookies
const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Pokládka podlah Ústí nad Labem`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'pokládka podlah', 'podlahy Ústí nad Labem', 'vinylové podlahy',
    'parkety', 'laminátové podlahy', 'koberce', 'linoleum', 'marmoleum',
    'podlahář Chabařovice', 'Podlahy Perk',
  ],
  authors: [{ name: 'Martin Perk', url: SITE_URL }],
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Pokládka podlah Ústí nad Labem`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: CONTACT.phone1,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Husovo náměstí 24',
    addressLocality: 'Chabařovice',
    postalCode: '403 17',
    addressCountry: 'CZ',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  }],
  sameAs: [CONTACT.facebook, CONTACT.instagram],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={nunitoSans.variable}>
      <head>
        {/* Adobe Fonts se NENAČÍTÁ zde — načítá se dynamicky přes CookieBanner */}
        {/* pouze po udělení souhlasu uživatelem */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <CookieBanner />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
