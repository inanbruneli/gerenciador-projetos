import { api } from './api'
import type { ProjectFormValues } from '../schemas/projectSchema'
import type { Project } from '../types/project'

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function toPayload({ name, client, startDate, endDate, coverImage }: ProjectFormValues) {
  return {
    name: name.trim(),
    client: client.trim(),
    startDate,
    endDate,
    coverImage: coverImage instanceof File ? await readAsDataUrl(coverImage) : coverImage,
  }
}

export const listProjects = () => api.get<Project[]>('/projects')

export const createProject = async (values: ProjectFormValues) =>
  api.post<Project>('/projects', await toPayload(values))

export const updateProject = async (id: string, values: ProjectFormValues) =>
  api.put<Project>(`/projects/${id}`, await toPayload(values))

export const setFavorite = (id: string, isFavorite: boolean) =>
  api.patch<Project>(`/projects/${id}/favorite`, { isFavorite })

export const deleteProject = (id: string) => api.delete(`/projects/${id}`)
