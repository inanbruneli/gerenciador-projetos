import { Link, type LinkProps } from 'react-router'
import { setNavigationDirection, type NavigationDirection } from '../hooks/useTransitionNavigate'

type TransitionLinkProps = LinkProps & {
  direction?: NavigationDirection
}

export default function TransitionLink({ direction = 'forward', onClick, ...props }: TransitionLinkProps) {
  return <Link
    {...props}
    viewTransition
    onClick={event => {
      setNavigationDirection(direction)
      onClick?.(event)
    }}
  />
}
