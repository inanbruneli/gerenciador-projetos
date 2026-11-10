import { ButtonLink } from '../components/Button'
import EmptyState from '../components/EmptyState'

export default function NotFound() {
  return <EmptyState
    visual={<p className="text-6xl font-semibold text-primary">404</p>}
    title="Página não encontrada"
    description="O endereço que você acessou não existe ou foi removido."
    action={<ButtonLink to="/" className="w-[230px]">Voltar ao início</ButtonLink>}
  />
}
