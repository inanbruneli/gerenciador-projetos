import { prisma } from '../lib/prisma.js'
import type { Project } from '../generated/prisma/client.js'
import type { FavoriteInput, ProjectInput } from '../schemas/projectSchema.js'

const fromDataUrl = (dataUrl?: string | null) => {
  if (!dataUrl) return { coverImage: null, coverImageType: null }

  const [header, base64] = dataUrl.split(',')
  return {
    coverImage: new Uint8Array(Buffer.from(base64, 'base64')),
    coverImageType: header.replace('data:', '').replace(';base64', ''),
  }
}

const toDataUrl = (coverImage: Uint8Array | null, coverImageType: string | null) =>
  coverImage && coverImageType
    ? `data:${coverImageType};base64,${Buffer.from(coverImage).toString('base64')}`
    : null

const toResponse = ({ coverImage, coverImageType, ...project }: Project) => ({
  ...project,
  coverImageUrl: toDataUrl(coverImage, coverImageType),
})

export const listProjects = async () => {
  const projects = await prisma.project.findMany({ orderBy: { name: 'asc' } })
  return projects.map(toResponse)
}

export const createProject = async ({ coverImage, ...data }: ProjectInput) => {
  const project = await prisma.project.create({
    data: { ...data, ...fromDataUrl(coverImage) },
  })
  return toResponse(project)
}

export const updateProject = async (id: string, { coverImage, ...data }: ProjectInput) => {
  const project = await prisma.project.update({
    where: { id },
    data: { ...data, ...fromDataUrl(coverImage) },
  })
  return toResponse(project)
}

export const setFavorite = async (id: string, { isFavorite }: FavoriteInput) => {
  const project = await prisma.project.update({ where: { id }, data: { isFavorite } })
  return toResponse(project)
}

export const deleteProject = async (id: string) => {
  await prisma.project.delete({ where: { id } })
}
