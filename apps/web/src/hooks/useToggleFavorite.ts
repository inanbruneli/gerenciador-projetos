import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { setFavorite } from '../services/projectService'
import type { Project } from '../types/project'

const QUERY_KEY = ['projects']

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  const updateCache = (id: string, isFavorite: boolean) =>
    queryClient.setQueryData<Project[]>(QUERY_KEY, projects =>
      projects?.map(project => project.id === id ? { ...project, isFavorite } : project))

  return useMutation({
    mutationFn: ({ id, isFavorite }: { id: string, isFavorite: boolean }) => setFavorite(id, isFavorite),
    onMutate: async ({ id, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY })
      updateCache(id, isFavorite)
    },
    onError: (error, { id, isFavorite }) => {
      updateCache(id, !isFavorite)
      toast.error('Não foi possível atualizar o favorito', { description: error.message })
    },
  })
}
