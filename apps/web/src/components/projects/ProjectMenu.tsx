import { useRef, useState } from 'react'
import { useDismiss } from '../../hooks/useDismiss'
import DotsIcon from '../icons/DotsIcon'
import EditIcon from '../icons/EditIcon'
import TrashIcon from '../icons/TrashIcon'
import TransitionLink from '../TransitionLink'

type ProjectMenuProps = {
  projectId: string
  onRemove: () => void
}

const itemClassName = 'flex h-[53px] w-full items-center gap-[15px] px-[21px] text-base text-primary hover:bg-page hover:opacity-100'

export default function ProjectMenu({ projectId, onRemove }: ProjectMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useDismiss(containerRef, isOpen, () => setIsOpen(false))

  const remove = () => {
    setIsOpen(false)
    onRemove()
  }

  return <div ref={containerRef} className="relative">
    <button
      type="button"
      aria-label="Opções do projeto"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => setIsOpen(open => !open)}
      className="flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
    >
      <DotsIcon />
    </button>

    {isOpen &&
      <div role="menu" className="absolute top-full right-0 z-20 mt-2 w-60 rounded bg-white shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
        <span className="absolute -top-1.5 right-[11px] size-3 rotate-45 bg-white" />

        <TransitionLink to={`/project/${projectId}/edit`} role="menuitem" className={itemClassName}>
          <span className="flex w-[22px] justify-center"><EditIcon /></span>
          Editar
        </TransitionLink>

        <div className="mx-[21px] h-px bg-page" />

        <button type="button" role="menuitem" onClick={remove} className={itemClassName}>
          <span className="flex w-[22px] justify-center"><TrashIcon size={20} /></span>
          Remover
        </button>
      </div>
    }
  </div>
}
