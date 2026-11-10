import Button from './Button'
import EmptyState from './EmptyState'

type LoadErrorProps = {
  onRetry: () => void
  isRetrying: boolean
}

export default function LoadError({ onRetry, isRetrying }: LoadErrorProps) {
  return <EmptyState
    title="Não foi possível carregar os projetos"
    description="Verifique sua conexão e tente novamente."
    action={<Button onClick={() => onRetry()} disabled={isRetrying} className="w-[230px]">
      {isRetrying ? 'Carregando...' : 'Tentar novamente'}
    </Button>}
  />
}
