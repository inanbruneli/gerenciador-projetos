import { Outlet, useMatches } from 'react-router'
import Header from './Header'
import Toaster from './Toaster'

export type RouteHandle = {
  showSearch?: boolean
}

export default function AppLayout() {
  const matches = useMatches()
  const showSearch = matches.some(match => (match.handle as RouteHandle | undefined)?.showSearch)

  return <div className="flex h-dvh flex-col">
    <Header showSearch={showSearch} />

    <div className="relative min-h-0 flex-1 overflow-y-auto">
      <Outlet />
    </div>

    <Toaster />
  </div>
}
