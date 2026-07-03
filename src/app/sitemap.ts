import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { services } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/sluzby`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/realizace`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/o-nas`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/udrzba`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/sluzby/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...staticPages, ...servicePages]
}
