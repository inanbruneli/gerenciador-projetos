import { useEffect, useRef } from 'react'
import Button from '../Button'
import TrashIcon from '../icons/TrashIcon'

type DeleteProjectDialogProps = {
  projectName: string
  isOpen: boolean
  isPending: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteProjectDialog({ projectName, isOpen, isPending, onConfirm, onCancel }: DeleteProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen) dialog?.showModal()
    else dialog?.close()
  }, [isOpen])

  return <dialog
    ref={dialogRef}
    aria-labelledby="delete-project-title"
    onCancel={onCancel}
    onClick={event => event.target === dialogRef.current && onCancel()}
    className="m-auto w-[582px] max-w-[calc(100vw-32px)] overflow-visible rounded-lg bg-white px-8 pt-12 pb-8 text-center backdrop:bg-black/80 backdrop:backdrop-blur-[2px]"
  >
    <span className="absolute top-0 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <TrashIcon size={18} />
    </span>

    <h2 id="delete-project-title" className="text-xl leading-7 font-bold text-title">Remover projeto</h2>

    <hr className="mt-[27px] border-muted" />

    <p className="mt-[35px] text-sm text-text">Essa ação removerá definitivamente o projeto:</p>
    <p className="mt-[15px] truncate text-2xl leading-8 text-ink">{projectName}</p>

    <div className="mt-8 flex gap-8">
      <Button variant="outline" onClick={onCancel} className="w-[226px]">
        Cancelar
      </Button>

      <Button onClick={onConfirm} disabled={isPending} className="flex-1">
        {isPending ? 'Removendo...' : 'Confirmar'}
      </Button>
    </div>
  </dialog>
}
