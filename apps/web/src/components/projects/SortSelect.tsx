import { useEffect, useRef, useState } from 'react'
import ChevronDownIcon from '../icons/ChevronDownIcon'

export type SortOption = 'name' | 'startDate' | 'endDate'

const OPTIONS: { value: SortOption, label: string }[] = [
  { value: 'name', label: 'Ordem alfabética' },
  { value: 'startDate', label: 'Iniciados mais recentes' },
  { value: 'endDate', label: 'Prazo mais próximo' },
]

type SortSelectProps = {
  value: SortOption
  onChange: (value: SortOption) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = OPTIONS.find(option => option.value === value)

  useEffect(() => {
    if (!isOpen) return

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  const select = (option: SortOption) => {
    onChange(option)
    setIsOpen(false)
  }

  return <div ref={containerRef} className="relative w-[296px]">
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => setIsOpen(open => !open)}
      className="flex h-10 w-full items-center justify-between rounded border border-text bg-white px-4 text-base text-ink hover:opacity-100"
    >
      {selected?.label}
      <span className={`text-text transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDownIcon />
      </span>
    </button>

    {isOpen &&
      <ul role="menu" className="absolute top-full right-0 left-0 z-20 overflow-hidden rounded-b bg-white shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
        {OPTIONS.map(option => <li key={option.value} role="none" className="border-b border-divider last:border-b-0">
          <button
            type="button"
            role="menuitemradio"
            aria-checked={option.value === value}
            onClick={() => select(option.value)}
            className="h-[54px] w-full px-4 text-left text-base text-ink hover:bg-page hover:opacity-100"
          >
            {option.label}
          </button>
        </li>)}
      </ul>
    }
  </div>
}
