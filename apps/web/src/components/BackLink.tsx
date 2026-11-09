import { Link } from 'react-router'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import TransitionLink from './TransitionLink'

type BackLinkProps = {
  animated?: boolean
}

const className = 'flex w-fit items-center gap-[10px] text-base text-primary'

export default function BackLink({ animated = false }: BackLinkProps) {
  const content = <>
    <ArrowLeftIcon />
    Voltar
  </>

  return animated ?
    <TransitionLink to="/" direction="back" className={className}>{content}</TransitionLink>
  :
    <Link to="/" className={className}>{content}</Link>
}
