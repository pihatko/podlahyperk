import { InstagramPost } from '@/types'

const INSTAGRAM_API_BASE = 'https://graph.instagram.com'

export async function getInstagramFeed(limit = 12): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!accessToken || !userId) {
    console.warn('Instagram credentials not configured. Returning empty feed.')
    return []
  }

  try {
    const fields = 'id,media_url,permalink,caption,media_type,timestamp,thumbnail_url'
    const url = `${INSTAGRAM_API_BASE}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache 1 hodina
    })

    if (!res.ok) {
      throw new Error(`Instagram API error: ${res.status}`)
    }

    const data = await res.json()
    return data.data as InstagramPost[]
  } catch (error) {
    console.error('Failed to fetch Instagram feed:', error)
    return []
  }
}

/**
 * Refresh long-lived token (platnost 60 dní)
 * Volat přes Vercel Cron Job každých 30 dní
 */
export async function refreshInstagramToken(): Promise<string | null> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accessToken) return null

  try {
    const url = `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
    const res = await fetch(url)
    const data = await res.json()
    return data.access_token ?? null
  } catch {
    return null
  }
}
