import { useState } from 'react'
import type { Project } from '../../types/project'
import { useToggleFavorite } from '../../hooks/useToggleFavorite'
import { useDeleteProject } from '../../hooks/useDeleteProject'
import { formatLongDate } from '../../utils/date'
import StarIcon from '../icons/StarIcon'
import ImagePlaceholderIcon from '../icons/ImagePlaceholderIcon'
import CalendarStartIcon from '../icons/CalendarStartIcon'
import CalendarEndIcon from '../icons/CalendarEndIcon'
import ProjectMenu from './ProjectMenu'
import Highlight from '../search/Highlight'
import DeleteProjectDialog from './DeleteProjectDialog'

type ProjectCardProps = {
  project: Project
  highlight?: string
}

export default function ProjectCard({ project, highlight }: ProjectCardProps) {
  const toggleFavorite = useToggleFavorite()
  const deleteProject = useDeleteProject()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return <article className="overflow-hidden rounded-2xl transition-transform duration-200 motion-safe:hover:-translate-y-1">
    <div className="relative flex h-[232px] items-center justify-center bg-primary">
      {project.coverImageUrl ?
        <img src={project.coverImageUrl} alt="" className="size-full object-cover" />
      :
        <ImagePlaceholderIcon />
      }

      <div className="absolute right-4 bottom-[18px] flex items-center gap-[22px]">
        <button
          type="button"
          aria-label={project.isFavorite ? 'Desfavoritar projeto' : 'Favoritar projeto'}
          aria-pressed={project.isFavorite}
          onClick={() => toggleFavorite.mutate({ id: project.id, isFavorite: !project.isFavorite })}
          className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] ${project.isFavorite ? 'text-favorite' : 'text-white'}`}
        >
          <StarIcon filled={project.isFavorite} />
        </button>

        <ProjectMenu projectId={project.id} onRemove={() => setIsDeleteOpen(true)} />
      </div>
    </div>

    <div className="rounded-b-2xl border border-t-0 border-line bg-white px-6 pt-[22px] pb-[22px]">
      <h2 className="truncate text-xl leading-7 font-bold text-title">
        <Highlight text={project.name} query={highlight} />
      </h2>

      <p className="mt-[7px] truncate text-base text-text">
        <span className="mr-2 font-bold">Cliente:</span>
        {project.client}
      </p>

      <hr className="mt-[13px] border-divider" />

      <dl className="mt-4 flex flex-col gap-4 text-base text-text">
        <div className="flex items-center gap-[17px]">
          <dt className="sr-only">Data de início</dt>
          <CalendarStartIcon />
          <dd>{formatLongDate(project.startDate)}</dd>
        </div>

        <div className="flex items-center gap-[17px]">
          <dt className="sr-only">Data final</dt>
          <CalendarEndIcon />
          <dd>{formatLongDate(project.endDate)}</dd>
        </div>
      </dl>
    </div>

    <DeleteProjectDialog
      projectName={project.name}
      isOpen={isDeleteOpen}
      isPending={deleteProject.isPending}
      onConfirm={() => deleteProject.mutate(project, { onSettled: () => setIsDeleteOpen(false) })}
      onCancel={() => setIsDeleteOpen(false)}
    />
  </article>
}
