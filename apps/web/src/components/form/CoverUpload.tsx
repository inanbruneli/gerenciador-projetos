import { useEffect, useMemo, useRef } from 'react'
import Button from '../Button'
import TrashIcon from '../icons/TrashIcon'
import UploadIcon from '../icons/UploadIcon'

type CoverUploadProps = {
  id: string
  value: File | string | null
  onChange: (file: File | null) => void
}

export default function CoverUpload({ id, value, onChange }: CoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const previewUrl = useMemo(() => value instanceof File ? URL.createObjectURL(value) : value, [value])

  useEffect(() => () => {
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const removeCover = () => {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return <>
    <input
      ref={inputRef}
      id={id}
      type="file"
      accept="image/jpeg,image/png"
      className="hidden"
      onChange={event => onChange(event.target.files?.[0] ?? null)}
    />

    {previewUrl ?
      <div className="relative">
        <img src={previewUrl} alt="Capa do projeto" className="aspect-video w-full rounded object-cover" />

        <button
          type="button"
          aria-label="Remover capa"
          onClick={removeCover}
          className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-full bg-white text-primary"
        >
          <TrashIcon />
        </button>
      </div>
    :
      <div className="flex flex-col items-center border border-dashed border-text px-4 pt-[23px] pb-[23px] text-center text-text">
        <UploadIcon />

        <p className="mt-[14px] text-base">Escolha uma imagem .jpg ou .png no seu dispositivo</p>

        <Button variant="outline" size="md" onClick={() => inputRef.current?.click()} className="mt-6 w-36">
          Selecionar
        </Button>
      </div>
    }
  </>
}
