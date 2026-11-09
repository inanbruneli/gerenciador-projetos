import type { ComponentProps } from 'react'

type TextInputProps = ComponentProps<'input'> & {
  hasError?: boolean
}

export default function TextInput({ hasError = false, className = '', ...props }: TextInputProps) {
  const stateClassName = hasError ? 'border-error text-error' : 'border-text text-ink focus:border-primary'

  return <input
    type="text"
    {...props}
    aria-invalid={hasError}
    className={`h-10 w-full rounded-lg border bg-white px-4 text-base outline-none transition-colors ${stateClassName} ${className}`}
  />
}
