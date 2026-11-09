import PlusCircleIcon from './icons/PlusCircleIcon'
import TransitionLink from './TransitionLink'

export default function EmptyProjects() {
  return <div className="flex flex-col items-center text-center">
    <h1 className="text-2xl font-semibold text-title">Nenhum projeto</h1>

    <p className="mt-[22px] text-base text-text">
      Clique no botão abaixo para criar o primeiro e gerenciá-lo.
    </p>

    <TransitionLink
      to="/project/new"
      className="mt-[33px] flex h-[52px] w-[230px] items-center justify-center gap-5 rounded-full bg-primary text-xl text-white"
    >
      <span className="opacity-90">
        <PlusCircleIcon />
      </span>
      Novo projeto
    </TransitionLink>
  </div>
}
