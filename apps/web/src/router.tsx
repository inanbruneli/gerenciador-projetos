import { createBrowserRouter } from 'react-router'
import AppLayout, { type RouteHandle } from './components/AppLayout'
import ProjectsList from './pages/ProjectsList'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <ProjectsList />, handle: { showSearch: true } satisfies RouteHandle },
      { path: '*', element: <NotFound /> },
    ],
  },
])
