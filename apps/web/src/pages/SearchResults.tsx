import { useSearchParams } from 'react-router'
import PageHeading from '../components/PageHeading'
import ProjectGrid from '../components/projects/ProjectGrid'
import ProjectGridSkeleton from '../components/skeleton/ProjectGridSkeleton'
import { useProjects } from '../hooks/useProjects'
import { matchesSearch, MIN_SEARCH_LENGTH } from '../utils/search'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()
  const { data: projects = [], isPending } = useProjects()

  const results = projects.filter(project => matchesSearch(project.name, query))

  return <main className="px-4 pt-8 pb-[60px] sm:px-10 sm:pt-[69px]">
    <PageHeading title="Resultado da busca" />

    {isPending ?
      <ProjectGridSkeleton count={5} className="mt-5" />
    : query.length < MIN_SEARCH_LENGTH ?
      <p className="mt-16 text-center text-base text-text">Digite ao menos {MIN_SEARCH_LENGTH} caracteres para buscar.</p>
    : results.length ?
      <ProjectGrid projects={results} highlight={query} className="mt-5" />
    :
      <p className="mt-16 text-center text-base text-text">Nenhum projeto encontrado para “{query}”.</p>
    }
  </main>
}
