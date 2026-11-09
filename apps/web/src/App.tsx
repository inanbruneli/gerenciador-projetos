import { Route, Routes } from 'react-router'
import ProjectsList from './pages/ProjectsList'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectsList />} />
    </Routes>
  )
}
