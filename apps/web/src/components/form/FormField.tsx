import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: ReactNode
}

export default function FormField({ label, htmlFor, required = false, error, children }: FormFieldProps) {
  return <div>
    <label htmlFor={htmlFor} className="flex items-baseline gap-[10px]">
      <span className={`text-lg leading-6 ${error ? 'text-error-strong' : 'text-primary'}`}>{label}</span>
      {required &&
        <span className={`text-sm leading-6 ${error ? 'text-error' : 'text-text'}`}>(Obrigatório)</span>
      }
    </label>

    <div className="mt-[5px]">{children}</div>

    {error && <p className="mt-[5px] text-sm leading-5 text-error">{error}</p>}
  </div>
}
