import type { ComponentProps } from 'react'
import { Link, type LinkProps } from 'react-router'
import TransitionLink from './TransitionLink'

type ButtonStyle = {
  variant?: 'primary' | 'outline'
  size?: 'md' | 'lg'
}

const variants = {
  primary: 'bg-primary text-white disabled:bg-primary-disabled',
  outline: 'border border-primary bg-white text-primary',
}

const sizes = {
  md: 'h-10 text-base',
  lg: 'h-[52px] text-xl',
}

const styles = ({ variant = 'primary', size = 'lg' }: ButtonStyle, className = '') =>
  `flex items-center justify-center rounded-full ${variants[variant]} ${sizes[size]} ${className}`

type ButtonProps = ComponentProps<'button'> & ButtonStyle

export default function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} {...props} className={styles({ variant, size }, className)} />
}

type ButtonLinkProps = LinkProps & ButtonStyle & {
  animated?: boolean
}

export function ButtonLink({ variant, size, className, animated = false, ...props }: ButtonLinkProps) {
  const LinkComponent = animated ? TransitionLink : Link

  return <LinkComponent {...props} className={styles({ variant, size }, className)} />
}
