import { ButtonLink } from '../Button'
import PlusCircleIcon from '../icons/PlusCircleIcon'

type NewProjectButtonProps = {
  size?: 'md' | 'lg'
}

const sizeClassName = {
  md: 'w-[184px] gap-3',
  lg: 'w-[230px] gap-5',
}

export default function NewProjectButton({ size = 'md' }: NewProjectButtonProps) {
  return <ButtonLink to="/project/new" animated size={size} className={sizeClassName[size]}>
    <span className="opacity-90">
      <PlusCircleIcon />
    </span>
    Novo projeto
  </ButtonLink>
}
