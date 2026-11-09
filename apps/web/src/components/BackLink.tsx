import ArrowLeftIcon from './icons/ArrowLeftIcon'
import TransitionLink from './TransitionLink'

export default function BackLink() {
  return <TransitionLink to="/" direction="back" className="flex w-fit items-center gap-[10px] text-base text-primary">
    <ArrowLeftIcon />
    Voltar
  </TransitionLink>
}
