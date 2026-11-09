import { useState } from 'react'
import EmptyProjects from '../components/EmptyProjects'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectsToolbar from '../components/projects/ProjectsToolbar'
import type { SortOption } from '../components/projects/SortSelect'
import { useProjects } from '../hooks/useProjects'

export default function ProjectsList() {
  const { data: projects = [], isPending } = useProjects()
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [sort, setSort] = useState<SortOption>('name')

  if (isPending) return null

  if (!projects.length) {
    return <main className="flex min-h-full px-[42px] py-[60px]">
      <section className="flex flex-1 items-center justify-center bg-white pb-1">
        <EmptyProjects />
      </section>
    </main>
  }

  return <main className="px-10 pt-[60px] pb-[60px]">
    <ProjectsToolbar
      total={projects.length}
      onlyFavorites={onlyFavorites}
      onOnlyFavoritesChange={setOnlyFavorites}
      sort={sort}
      onSortChange={setSort}
    />

    <ul className="mt-[22px] grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
      {projects.map(project => <li key={project.id}>
        <ProjectCard project={project} />
      </li>)}
    </ul>
  </main>
}
