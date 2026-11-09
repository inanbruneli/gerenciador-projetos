import type { ProjectFormValues } from '../schemas/projectSchema'
import type { Project } from '../types/project'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

export async function createProject(values: ProjectFormValues): Promise<Project> {
  const body = new FormData()
  body.append('name', values.name.trim())
  body.append('client', values.client.trim())
  body.append('startDate', values.startDate)
  body.append('endDate', values.endDate)
  if (values.coverImage) body.append('coverImage', values.coverImage)

  const response = await fetch(`${API_URL}/projects`, { method: 'POST', body })
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message ?? 'Tente novamente em alguns instantes')
  }

  return response.json()
}
