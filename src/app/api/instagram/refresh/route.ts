import { NextResponse } from 'next/server'

// Automatický refresh Instagram tokenu
// Voláno Vercel Cron Jobem každých 30 dní (viz vercel.json)
// Token se ukládá do INSTAGRAM_ACCESS_TOKEN env proměnné přes Vercel API

export async function GET(request: Request) {
  // Ochrana endpointu — volat jen s platným CRON_SECRET
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!currentToken) {
    return NextResponse.json({ error: 'No token configured' }, { status: 500 })
  }

  try {
    // 1. Získat nový token od Instagramu
    const refreshRes = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    )
    const refreshData = await refreshRes.json()

    if (!refreshData.access_token) {
      console.error('Instagram refresh failed:', refreshData)
      return NextResponse.json({ error: 'Token refresh failed', details: refreshData }, { status: 500 })
    }

    const newToken = refreshData.access_token

    // 2. Uložit nový token do Vercel Environment Variables přes Vercel API
    const vercelToken = process.env.VERCEL_ACCESS_TOKEN
    const vercelProjectId = process.env.VERCEL_PROJECT_ID
    const vercelTeamId = process.env.VERCEL_TEAM_ID // prázdné pro hobby účty

    if (!vercelToken || !vercelProjectId) {
      // Fallback: vypsat token do logu — admin ho musí uložit ručně
      console.warn('VERCEL_ACCESS_TOKEN or VERCEL_PROJECT_ID not set.')
      console.log('New Instagram token (save manually):', newToken)
      return NextResponse.json({
        success: true,
        warning: 'Token refreshed but could not auto-save. Check logs for new token.',
        token_preview: newToken.slice(0, 20) + '...',
        expires_in: refreshData.expires_in,
      })
    }

    // Vercel API endpoint
    const teamQuery = vercelTeamId ? `?teamId=${vercelTeamId}` : ''
    const vercelRes = await fetch(
      `https://api.vercel.com/v9/projects/${vercelProjectId}/env${teamQuery}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const envList = await vercelRes.json()

    // Najít existující env proměnnou
    const existingEnv = envList.envs?.find(
      (e: { key: string }) => e.key === 'INSTAGRAM_ACCESS_TOKEN'
    )

    if (existingEnv) {
      // Aktualizovat existující
      await fetch(
        `https://api.vercel.com/v9/projects/${vercelProjectId}/env/${existingEnv.id}${teamQuery}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: newToken,
            target: ['production', 'preview'],
          }),
        }
      )
    } else {
      // Vytvořit novou
      await fetch(
        `https://api.vercel.com/v9/projects/${vercelProjectId}/env${teamQuery}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: 'INSTAGRAM_ACCESS_TOKEN',
            value: newToken,
            target: ['production', 'preview'],
            type: 'encrypted',
          }),
        }
      )
    }

    // Trigger redeploy aby se nový token načetl
    await fetch(
      `https://api.vercel.com/v13/deployments${teamQuery}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'podlahyperk',
          gitSource: {
            type: 'github',
            repoId: process.env.VERCEL_GIT_REPO_ID,
            ref: 'main',
          },
        }),
      }
    )

    console.log('Instagram token refreshed and saved successfully')
    return NextResponse.json({
      success: true,
      message: 'Token refreshed and saved',
      expires_in: refreshData.expires_in,
    })

  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
