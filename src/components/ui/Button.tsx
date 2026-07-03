import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: ButtonVariant
  size?: ButtonSize
  showArrow?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowRight size={16} aria-hidden="true" className={styles.arrow} />}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
