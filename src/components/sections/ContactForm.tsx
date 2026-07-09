'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { contactSchema, type ContactSchema } from '@/lib/validations'
import { services } from '@/lib/services'
import styles from './ContactForm.module.css'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactSchema) => {
    // Honeypot check — pokud je pole vyplněné, jde o bota
    const honeypot = (document.getElementById('website') as HTMLInputElement)?.value
    if (honeypot) {
      // Tiše ignorovat — bot si myslí že formulář prošel
      setStatus('success')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successMsg} role="alert">
        <CheckCircle size={40} aria-hidden="true" />
        <h3>Zpráva odeslána!</h3>
        <p>Děkujeme za vaši poptávku. Ozveme se vám co nejdříve.</p>
        <Button onClick={() => setStatus('idle')} variant="outline">
          Odeslat další zprávu
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Jméno a příjmení <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Jan Novák"
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className={styles.error} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Telefon <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            placeholder="+420 777 000 000"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" className={styles.error} role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="jan@example.cz"
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className={styles.error} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="service" className={styles.label}>
          Jaká služba vás zajímá?
        </label>
        <select id="service" className={styles.select} {...register('service')}>
          <option value="">– Vyberte službu –</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Jiné / nevím</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Vaše zpráva <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder="Popište prosím co potřebujete – typ prostoru, přibližná plocha, preference materiálu..."
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className={styles.error} role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot — skryté před uživatelem, boti ho vyplní */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', tabIndex: -1 }}>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {status === 'error' && (
        <div className={styles.errorBanner} role="alert">
          <AlertCircle size={20} aria-hidden="true" />
          <span>Odeslání se nezdařilo. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        showArrow
        disabled={status === 'loading'}
        className={styles.submitBtn}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className={styles.spinner} aria-hidden="true" />
            Odesílám...
          </>
        ) : (
          'Odeslat poptávku'
        )}
      </Button>

      <p className={styles.note}>
        * Povinná pole. Vaše údaje použijeme pouze pro odpověď na vaši poptávku.
      </p>
    </form>
  )
}
