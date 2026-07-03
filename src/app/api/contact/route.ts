import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { CONTACT, SITE_NAME } from '@/lib/constants'
import { services } from '@/lib/services'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Neplatná data formuláře', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { name, phone, email, message, service } = parsed.data

    const serviceLabel = service
      ? services.find((s) => s.slug === service)?.title ?? service
      : 'Neuvedeno'

    // Inicializovat Resend až při volání (ne při importu modulu)
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('RESEND_API_KEY not set — email not sent')
      return NextResponse.json({ success: true, warning: 'Email not configured' })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: `${SITE_NAME} <noreply@podlahyperk.cz>`,
      to: [process.env.CONTACT_EMAIL ?? CONTACT.email],
      subject: `Nová poptávka od ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c2416; border-bottom: 2px solid #c8a96e; padding-bottom: 12px;">
            Nová poptávka – ${SITE_NAME}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b5f4e; font-size: 14px; width: 140px;">Jméno:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #1a1510;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b5f4e; font-size: 14px;">Telefon:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #1a1510;">
                <a href="tel:${phone.replace(/\s/g, '')}" style="color: #2c2416;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b5f4e; font-size: 14px;">Email:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #1a1510;">
                <a href="mailto:${email}" style="color: #2c2416;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b5f4e; font-size: 14px;">Služba:</td>
              <td style="padding: 10px 0; color: #1a1510;">${serviceLabel}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 20px; background: #faf9f7; border-left: 3px solid #c8a96e;">
            <p style="color: #6b5f4e; font-size: 14px; margin: 0 0 8px;">Zpráva:</p>
            <p style="color: #1a1510; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #a0917e;">
            Odesláno přes kontaktní formulář na podlahyperk.cz
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Chyba při odesílání emailu' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Interní chyba serveru' }, { status: 500 })
  }
}
