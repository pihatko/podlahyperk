export interface Service {
  slug: string
  title: string
  shortDesc: string
  description: string
  icon: string
  features: string[]
}

export interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  timestamp: string
  thumbnail_url?: string
}

export interface ContactFormData {
  name: string
  phone: string
  email: string
  message: string
  service?: string
}

export interface Realization {
  id: string
  title: string
  location: string
  type: string
  imageUrl: string
}
