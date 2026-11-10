import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  action: ReactNode
  visual?: ReactNode
}

export default function EmptyState({ title, description, action, visual }: EmptyStateProps) {
  return <main className="flex min-h-full px-4 py-8 sm:px-[42px] sm:py-[60px]">
    <section className="flex flex-1 flex-col items-center justify-center bg-white px-4 pb-1 text-center">
      {visual}

      <h1 className={`text-2xl font-semibold text-title ${visual ? 'mt-4' : ''}`}>{title}</h1>

      <p className="mt-[22px] text-base text-text">{description}</p>

      <div className="mt-[33px]">{action}</div>
    </section>
  </main>
}
