import { useNavigate } from 'react-router'

export type NavigationDirection = 'forward' | 'back'

export function setNavigationDirection(direction: NavigationDirection) {
  document.documentElement.dataset.navigation = direction
}

export function useTransitionNavigate() {
  const navigate = useNavigate()

  return (to: string, direction: NavigationDirection = 'forward') => {
    setNavigationDirection(direction)
    navigate(to, { viewTransition: true })
  }
}
