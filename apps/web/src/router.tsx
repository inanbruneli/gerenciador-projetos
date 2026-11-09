import { createBrowserRouter } from 'react-router'
import AppLayout, { type RouteHandle } from './components/AppLayout'
import ProjectsList from './pages/ProjectsList'
import ProjectCreate from './pages/ProjectCreate'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <ProjectsList />, handle: { showSearch: true } satisfies RouteHandle },
      { path: '/project/new', element: <ProjectCreate /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
