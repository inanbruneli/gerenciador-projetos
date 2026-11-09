import { Toaster as SonnerToaster } from 'sonner'
import CheckCircleIcon from './icons/CheckCircleIcon'
import AlertCircleIcon from './icons/AlertCircleIcon'

export default function Toaster() {
  return <SonnerToaster
    position="top-right"
    offset={{ top: 96, right: 24 }}
    duration={4000}
    icons={{ success: <CheckCircleIcon />, error: <AlertCircleIcon /> }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast: 'flex w-[360px] items-start gap-3 rounded-lg border-l-4 bg-white px-4 py-3 font-sans shadow-[0_4px_16px_rgba(28,25,48,0.16)]',
        icon: 'mt-px shrink-0',
        title: 'text-base text-ink',
        description: 'mt-0.5 text-sm text-text',
        success: 'border-primary [&_[data-icon]]:text-primary',
        error: 'border-error [&_[data-icon]]:text-error',
      },
    }}
  />
}
