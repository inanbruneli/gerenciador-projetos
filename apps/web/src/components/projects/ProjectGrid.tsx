import type { Project } from '../../types/project'
import ProjectCard from './ProjectCard'
import ProjectGridLayout from './ProjectGridLayout'

type ProjectGridProps = {
  projects: Project[]
  highlight?: string
  className?: string
}

export default function ProjectGrid({ projects, highlight, className = '' }: ProjectGridProps) {
  return <ProjectGridLayout className={className}>
    {projects.map(project => <li key={project.id}>
      <ProjectCard project={project} highlight={highlight} />
    </li>)}
  </ProjectGridLayout>
}
