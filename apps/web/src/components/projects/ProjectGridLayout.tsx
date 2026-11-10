import type { ComponentProps } from 'react'

export default function ProjectGridLayout({ className = '', ...props }: ComponentProps<'ul'>) {
  return <ul {...props} className={`grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 ${className}`} />
}
