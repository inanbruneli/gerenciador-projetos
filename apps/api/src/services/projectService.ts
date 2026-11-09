import { prisma } from '../lib/prisma.js'
import type { CreateProjectInput } from '../schemas/projectSchema.js'

export const createProject = (data: CreateProjectInput, cover?: Express.Multer.File) =>
  prisma.project.create({
    data: {
      ...data,
      coverImage: cover ? new Uint8Array(cover.buffer) : null,
      coverImageType: cover?.mimetype ?? null,
    },
    omit: { coverImage: true },
  })
