import { useState } from 'react'
import { useLocation } from 'react-router'
import logo from '../assets/logo.svg'
import SearchIcon from './icons/SearchIcon'
import SearchBar from './search/SearchBar'

type HeaderProps = {
  showSearch?: boolean
}

export default function Header({ showSearch = false }: HeaderProps) {
  const { pathname } = useLocation()
  const isResultsPage = pathname === '/search'
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [previousPathname, setPreviousPathname] = useState(pathname)

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname)
    if (!isResultsPage) setIsSearchOpen(false)
  }

  const isSearching = isResultsPage || isSearchOpen

  return <header className={`relative z-10 flex h-20 items-center justify-center ${isSearching ? 'bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)]' : 'bg-header shadow-[0_3px_6px_rgba(0,0,0,0.5)]'}`}>
    {isSearching ?
      <SearchBar isResultsPage={isResultsPage} onClose={() => setIsSearchOpen(false)} />
    :
      <>
        <img src={logo} alt="Gerenciador de Projetos" width={193} height={72} />

        {showSearch &&
          <button
            type="button"
            aria-label="Buscar projetos"
            onClick={() => setIsSearchOpen(true)}
            className="absolute right-4 text-white sm:right-[61px]"
          >
            <SearchIcon />
          </button>
        }
      </>
    }
  </header>
}
