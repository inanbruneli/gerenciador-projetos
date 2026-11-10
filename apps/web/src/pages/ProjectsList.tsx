import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import NewProjectButton from '../components/projects/NewProjectButton'
import ProjectGrid from '../components/projects/ProjectGrid'
import ProjectsToolbar from '../components/projects/ProjectsToolbar'
import ProjectGridSkeleton from '../components/skeleton/ProjectGridSkeleton'
import type { SortOption } from '../components/projects/SortSelect'
import { useProjects } from '../hooks/useProjects'
import type { Project } from '../types/project'

const byName = (a: Project, b: Project) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })

const comparators: Record<SortOption, (a: Project, b: Project) => number> = {
  name: byName,
  startDate: (a, b) => b.startDate.localeCompare(a.startDate) || byName(a, b),
  endDate: (a, b) => a.endDate.localeCompare(b.endDate) || byName(a, b),
}

export default function ProjectsList() {
  const { data: projects = [], isPending } = useProjects()
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [sort, setSort] = useState<SortOption>('name')

  const visibleProjects = projects
    .filter(project => !onlyFavorites || project.isFavorite)
    .toSorted(comparators[sort])

  if (!isPending && !projects.length) {
    return <EmptyState
      title="Nenhum projeto"
      description="Clique no botão abaixo para criar o primeiro e gerenciá-lo."
      action={<NewProjectButton size="lg" />}
    />
  }

  return <main className="px-4 pt-8 pb-[60px] sm:px-10 sm:pt-[60px]">
    <ProjectsToolbar
      total={isPending ? undefined : projects.length}
      onlyFavorites={onlyFavorites}
      onOnlyFavoritesChange={setOnlyFavorites}
      sort={sort}
      onSortChange={setSort}
    />

    {isPending ?
      <ProjectGridSkeleton className="mt-[22px]" />
    : visibleProjects.length ?
      <ProjectGrid projects={visibleProjects} className="mt-[22px]" />
    :
      <p className="mt-16 text-center text-base text-text">Nenhum projeto favorito ainda.</p>
    }
  </main>
}
