import { useRef, useState, type FocusEvent, type ReactNode } from 'react'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'react-day-picker/locale/pt-BR'
import TextInput from './TextInput'
import { useDismiss } from '../../hooks/useDismiss'
import { formatDate, maskDate, parseDisplayDate, parseIsoDate, toIsoDate } from '../../utils/date'

const calendarClassNames = {
  root: 'relative text-sm text-ink',
  month_caption: 'flex h-10 items-center pl-2',
  caption_label: 'text-base font-semibold capitalize text-title',
  nav: 'absolute top-0 right-0 flex h-10 items-center gap-1',
  button_previous: 'flex size-8 items-center justify-center rounded-full text-primary hover:bg-page',
  button_next: 'flex size-8 items-center justify-center rounded-full text-primary hover:bg-page',
  chevron: 'size-5 fill-current',
  weekday: 'size-10 text-xs font-normal uppercase text-text',
  day: 'size-10 p-0 text-center',
  day_button: 'mx-auto flex size-9 items-center justify-center rounded-full hover:bg-page',
  today: 'font-semibold text-primary',
  selected: 'font-semibold [&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary',
  disabled: 'text-text/40 [&>button]:hover:bg-transparent',
  hidden: 'invisible',
}

type DatePickerProps = {
  id: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  icon: ReactNode
  minDate?: string
  hasError?: boolean
}

export default function DatePicker({ id, value, onChange, onBlur, icon, minDate, hasError = false }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusCalendar, setFocusCalendar] = useState(false)
  const [month, setMonth] = useState<Date>()
  const [draft, setDraft] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = parseIsoDate(value)
  const min = minDate ? parseIsoDate(minDate) : undefined
  const text = draft ?? (selected ? formatDate(selected) : '')

  const open = (withCalendarFocus: boolean) => {
    if (isOpen) return
    setMonth(selected ?? min ?? new Date())
    setFocusCalendar(withCalendarFocus)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    onBlur()
  }

  useDismiss(containerRef, isOpen, close)

  const handleType = (input: string) => {
    const masked = maskDate(input)
    const date = parseDisplayDate(masked)
    setDraft(masked)
    onChange(date ? toIsoDate(date) : '')
    if (date) setMonth(date)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (containerRef.current?.contains(event.relatedTarget)) return
    if (parseDisplayDate(text)) setDraft(null)
    if (isOpen) close()
    else onBlur()
  }

  const handleSelect = (date?: Date) => {
    if (!date) return
    setDraft(null)
    onChange(toIsoDate(date))
    close()
  }

  return <div ref={containerRef} className="relative">
    <TextInput
      id={id}
      inputMode="numeric"
      autoComplete="off"
      placeholder="dd/mm/aaaa"
      maxLength={10}
      value={text}
      onClick={() => open(false)}
      onChange={event => handleType(event.target.value)}
      onBlur={handleBlur}
      hasError={hasError}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className="pr-12 placeholder:text-transparent focus:placeholder:text-text/50"
    />

    <button
      type="button"
      aria-label="Abrir calendário"
      onClick={() => isOpen ? close() : open(true)}
      className={`absolute top-1/2 right-[9px] -translate-y-1/2 ${hasError ? 'text-error' : 'text-text'}`}
    >
      {icon}
    </button>

    {isOpen &&
      <div role="dialog" className="absolute top-full left-0 z-20 mt-2 rounded-lg border border-line bg-white p-3 shadow-lg">
        <DayPicker
          mode="single"
          locale={ptBR}
          classNames={calendarClassNames}
          selected={selected}
          month={month}
          onMonthChange={setMonth}
          disabled={min ? { before: min } : undefined}
          autoFocus={focusCalendar}
          onSelect={handleSelect}
        />
      </div>
    }
  </div>
}
