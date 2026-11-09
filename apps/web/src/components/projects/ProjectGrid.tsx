import type { Project } from '../../types/project'
import ProjectCard from './ProjectCard'

type ProjectGridProps = {
  projects: Project[]
  highlight?: string
  className?: string
}

export default function ProjectGrid({ projects, highlight, className = '' }: ProjectGridProps) {
  return <ul className={`grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 ${className}`}>
    {projects.map(project => <li key={project.id}>
      <ProjectCard project={project} highlight={highlight} />
    </li>)}
  </ul>
}
