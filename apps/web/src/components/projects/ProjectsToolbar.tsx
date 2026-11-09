import Switch from '../Switch'
import TransitionLink from '../TransitionLink'
import PlusCircleIcon from '../icons/PlusCircleIcon'
import SortSelect, { type SortOption } from './SortSelect'

type ProjectsToolbarProps = {
  total?: number
  onlyFavorites: boolean
  onOnlyFavoritesChange: (value: boolean) => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
}

export default function ProjectsToolbar({ total, onlyFavorites, onOnlyFavoritesChange, sort, onSortChange }: ProjectsToolbarProps) {
  return <div className="flex flex-wrap items-center justify-between gap-6">
    <h1 className="flex items-baseline gap-2 text-2xl font-semibold text-title">
      Projetos
      {total !== undefined &&
        <span className="text-base font-normal text-primary">({total})</span>
      }
    </h1>

    <div className="flex flex-wrap items-center gap-8">
      <Switch label="Apenas Favoritos" checked={onlyFavorites} onChange={onOnlyFavoritesChange} />

      <SortSelect value={sort} onChange={onSortChange} />

      <TransitionLink
        to="/project/new"
        className="flex h-10 w-[184px] items-center justify-center gap-3 rounded-full bg-primary text-base text-white"
      >
        <span className="opacity-90">
          <PlusCircleIcon />
        </span>
        Novo projeto
      </TransitionLink>
    </div>
  </div>
}
