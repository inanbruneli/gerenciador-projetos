import { useQuery } from '@tanstack/react-query'
import { listProjects } from '../services/projectService'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: listProjects,
  })
}
