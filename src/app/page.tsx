import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StatsSection } from '@/components/sections/StatsSection'
import { PartnersStrip } from '@/components/sections/PartnersStrip'
import { InstagramFeed } from '@/components/sections/InstagramFeed'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${SITE_NAME} – Pokládka podlah Ústí nad Labem`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsSection />
      <PartnersStrip />
      <InstagramFeed />
      <CTABanner />
    </>
  )
}
