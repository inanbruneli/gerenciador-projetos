import Skeleton from './Skeleton'
import ProjectGridLayout from '../projects/ProjectGridLayout'

type ProjectGridSkeletonProps = {
  count?: number
  className?: string
}

export default function ProjectGridSkeleton({ count = 10, className = '' }: ProjectGridSkeletonProps) {
  return <ProjectGridLayout aria-busy="true" aria-label="Carregando projetos" className={className}>
    {Array.from({ length: count }, (_, index) => <li key={index} className="overflow-hidden rounded-2xl border border-line bg-white">
      <Skeleton className="h-[232px] rounded-none" />

      <div className="px-6 pt-[22px] pb-[22px]">
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="mt-[7px] h-6 w-2/5" />
        <hr className="mt-[13px] border-divider" />
        <Skeleton className="mt-4 h-6 w-4/5" />
        <Skeleton className="mt-4 h-6 w-4/5" />
      </div>
    </li>)}
  </ProjectGridLayout>
}
