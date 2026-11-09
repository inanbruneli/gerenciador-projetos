import type { ProjectFormValues } from '../schemas/projectSchema'
import type { Project } from '../types/project'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init)
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message ?? 'Tente novamente em alguns instantes')
  }
  return response.json()
}

export function listProjects() {
  return request<Project[]>('/projects')
}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export async function createProject(values: ProjectFormValues) {
  const body = {
    name: values.name.trim(),
    client: values.client.trim(),
    startDate: values.startDate,
    endDate: values.endDate,
    coverImage: values.coverImage ? await readAsDataUrl(values.coverImage) : null,
  }

  return request<Project>('/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
