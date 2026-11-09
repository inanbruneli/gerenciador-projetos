import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteProject } from '../services/projectService'
import type { Project } from '../types/project'

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (project: Project) => deleteProject(project.id),
    onSuccess: (_, project) => {
      queryClient.setQueryData<Project[]>(['projects'], projects => projects?.filter(item => item.id !== project.id))
      toast.success('Projeto removido', { description: project.name })
    },
    onError: error => toast.error('Não foi possível remover o projeto', { description: error.message }),
  })
}
