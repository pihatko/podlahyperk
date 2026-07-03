import { NextResponse } from 'next/server'
import { refreshInstagramToken } from '@/lib/instagram'

// Voláno Vercel Cron Jobem každý 1. den v měsíci v 9:00
// Nový token je potřeba uložit ručně do env proměnných nebo
// integrovat s Vercel Edge Config / KV Storage pro automatické uložení

export async function GET(request: Request) {
  // Ochrana cron endpointu
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const newToken = await refreshInstagramToken()

  if (newToken) {
    console.log('Instagram token refreshed successfully')
    // TODO: uložit newToken do Vercel KV nebo jiného persistentního úložiště
    return NextResponse.json({ success: true, token: newToken.slice(0, 10) + '...' })
  }

  return NextResponse.json({ error: 'Token refresh failed' }, { status: 500 })
}
