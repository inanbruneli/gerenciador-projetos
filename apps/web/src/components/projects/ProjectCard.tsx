import type { Project } from '../../types/project'
import { formatLongDate } from '../../utils/date'
import StarIcon from '../icons/StarIcon'
import DotsIcon from '../icons/DotsIcon'
import ImagePlaceholderIcon from '../icons/ImagePlaceholderIcon'
import CalendarStartIcon from '../icons/CalendarStartIcon'
import CalendarEndIcon from '../icons/CalendarEndIcon'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return <article className="overflow-hidden rounded-2xl">
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
          className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] ${project.isFavorite ? 'text-favorite' : 'text-white'}`}
        >
          <StarIcon filled={project.isFavorite} />
        </button>

        <button
          type="button"
          aria-label="Opções do projeto"
          className="flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
        >
          <DotsIcon />
        </button>
      </div>
    </div>

    <div className="rounded-b-2xl border border-t-0 border-line bg-white px-6 pt-[22px] pb-[22px]">
      <h2 className="truncate text-xl leading-7 font-bold text-title">{project.name}</h2>

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
  </article>
}
