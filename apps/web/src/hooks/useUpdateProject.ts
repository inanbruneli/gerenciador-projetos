import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '../services/projectService'
import type { ProjectFormValues } from '../schemas/projectSchema'
import type { Project } from '../types/project'

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: ProjectFormValues) => updateProject(id, values),
    onSuccess: updated => queryClient.setQueryData<Project[]>(['projects'], projects =>
      projects?.map(project => project.id === updated.id ? updated : project)),
  })
}
