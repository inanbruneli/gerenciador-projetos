import logo from '../assets/logo.svg'
import SearchIcon from './icons/SearchIcon'

type HeaderProps = {
  showSearch?: boolean
}

export default function Header({ showSearch = false }: HeaderProps) {
  return <header className="relative z-10 flex h-20 items-center justify-center bg-header shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
    <img src={logo} alt="Gerenciador de Projetos" width={193} height={72} />

    {showSearch &&
      <button
        type="button"
        aria-label="Buscar projetos"
        className="absolute right-[61px] text-white"
      >
        <SearchIcon />
      </button>
    }
  </header>
}
