import { useEffect, useEffectEvent, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useDismiss } from '../../hooks/useDismiss'
import { useSearchHistory } from '../../hooks/useSearchHistory'
import { MIN_SEARCH_LENGTH } from '../../utils/search'
import SearchIcon from '../icons/SearchIcon'
import HistoryIcon from '../icons/HistoryIcon'
import CloseIcon from '../icons/CloseIcon'

const DEBOUNCE_MS = 400

type SearchBarProps = {
  isResultsPage: boolean
  onClose: () => void
}

export default function SearchBar({ isResultsPage, onClose }: SearchBarProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(isResultsPage ? currentQuery : '')
  const [isFocused, setIsFocused] = useState(false)
  const { history, add, remove } = useSearchHistory()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const showHistory = isFocused && history.length > 0 && query.trim().length < MIN_SEARCH_LENGTH

  const search = (term: string) => {
    const value = term.trim()
    if (value.length < MIN_SEARCH_LENGTH) return

    add(value)
    navigate(`/search?q=${encodeURIComponent(value)}`, { replace: isResultsPage })
  }

  const searchAfterTyping = useEffectEvent((term: string) => search(term))

  useEffect(() => {
    const value = query.trim()
    if (value.length < MIN_SEARCH_LENGTH || value === currentQuery) return

    const timer = setTimeout(() => searchAfterTyping(value), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query, currentQuery])

  useDismiss(containerRef, !isResultsPage, onClose)

  const selectFromHistory = (term: string) => {
    setQuery(term)
    search(term)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') search(query)
    if (event.key === 'Escape') inputRef.current?.blur()
  }

  return <div
    ref={containerRef}
    className={`absolute inset-x-0 top-0 border-2 bg-white ${isFocused ? 'border-primary' : 'border-transparent'} ${showHistory ? 'rounded-b-lg shadow-[0_4px_8px_rgba(0,0,0,0.15)]' : ''}`}
  >
    <div className="flex h-[76px] items-center gap-[22px] pl-[27px] pr-6 text-primary">
      <SearchIcon />

      <input
        ref={inputRef}
        type="search"
        autoFocus={!isResultsPage}
        value={query}
        onChange={event => setQuery(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Digite o nome do projeto..."
        aria-label="Buscar projetos"
        className="h-full flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-muted focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
      />
    </div>

    {showHistory &&
      <ul
        aria-label="Buscas recentes"
        onMouseDown={event => event.preventDefault()}
      >
        {history.map(term => <li key={term} className="flex h-[52px] items-center border-t border-page pr-6 text-base text-text">
          <button
            type="button"
            onClick={() => selectFromHistory(term)}
            className="flex h-full flex-1 items-center gap-[18px] pl-[22px] text-left hover:opacity-100"
          >
            <HistoryIcon />
            {term}
          </button>

          <button type="button" aria-label={`Remover "${term}" do histórico`} onClick={() => remove(term)}>
            <CloseIcon />
          </button>
        </li>)}
      </ul>
    }
  </div>
}
