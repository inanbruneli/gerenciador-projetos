import { useState } from 'react'
import EmptyProjects from '../components/EmptyProjects'
import ProjectCard from '../components/projects/ProjectCard'
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
    return <main className="flex min-h-full px-[42px] py-[60px]">
      <section className="flex flex-1 items-center justify-center bg-white pb-1">
        <EmptyProjects />
      </section>
    </main>
  }

  return <main className="px-10 pt-[60px] pb-[60px]">
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
      <ul className="mt-[22px] grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
        {visibleProjects.map(project => <li key={project.id}>
          <ProjectCard project={project} />
        </li>)}
      </ul>
    :
      <p className="mt-16 text-center text-base text-text">Nenhum projeto favorito ainda.</p>
    }
  </main>
}
