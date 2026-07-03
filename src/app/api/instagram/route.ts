import { NextResponse } from 'next/server'
import { getInstagramFeed } from '@/lib/instagram'

export const revalidate = 3600 // cache 1 hodina

export async function GET() {
  try {
    const posts = await getInstagramFeed(9)
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] })
  }
}
