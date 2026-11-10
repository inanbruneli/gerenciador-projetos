import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import request from 'supertest'

const project = {
  findMany: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  create: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  update: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  delete: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
}

jest.unstable_mockModule('../src/lib/prisma.js', () => ({ prisma: { project } }))

const { app } = await import('../src/app.js')

const PNG_DATA_URL = 'data:image/png;base64,iVBORw0KGgo='

const validBody = {
  name: 'Projeto Teste',
  client: 'Clicksign',
  startDate: '2026-01-10',
  endDate: '2026-02-10',
}

const dbProject = {
  id: '9f1c2e4a-1111-4222-8333-444455556666',
  ...validBody,
  startDate: new Date('2026-01-10'),
  endDate: new Date('2026-02-10'),
  coverImage: null,
  coverImageType: null,
  isFavorite: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const notFound = Object.assign(new Error('Not found'), { code: 'P2025' })

beforeEach(() => {
  jest.clearAllMocks()
})

describe('GET /projects', () => {
  it('returns the cover as a data URL instead of raw bytes', async () => {
    project.findMany.mockResolvedValue([{
      ...dbProject,
      coverImage: new Uint8Array(Buffer.from('iVBORw0KGgo=', 'base64')),
      coverImageType: 'image/png',
    }])

    const response = await request(app).get('/projects')

    expect(response.status).toBe(200)
    expect(response.body[0].coverImageUrl).toBe(PNG_DATA_URL)
    expect(response.body[0]).not.toHaveProperty('coverImage')
  })
})

describe('POST /projects', () => {
  it('creates a project and stores the cover as bytes', async () => {
    project.create.mockResolvedValue(dbProject)

    const response = await request(app).post('/projects').send({ ...validBody, coverImage: PNG_DATA_URL })

    expect(response.status).toBe(201)
    const { data } = project.create.mock.calls[0][0] as { data: Record<string, unknown> }
    expect(data.coverImageType).toBe('image/png')
    expect(data.coverImage).toBeInstanceOf(Uint8Array)
  })

  it.each([
    ['name with a single word', { name: 'Projeto' }, 'O nome deve ter ao menos duas palavras'],
    ['missing client', { client: '' }, 'O cliente é obrigatório'],
    ['end date before start date', { endDate: '2026-01-01' }, 'A data final deve ser igual ou posterior à data de início'],
    ['cover that is not png or jpg', { coverImage: 'data:image/gif;base64,R0lGOD' }, 'A capa deve ser uma imagem .jpg ou .png'],
  ])('rejects %s', async (_case, override, message) => {
    const response = await request(app).post('/projects').send({ ...validBody, ...override })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe(message)
    expect(project.create).not.toHaveBeenCalled()
  })
})

describe('PUT /projects/:id', () => {
  it('returns 404 when the project does not exist', async () => {
    project.update.mockRejectedValue(notFound)

    const response = await request(app).put(`/projects/${dbProject.id}`).send(validBody)

    expect(response.status).toBe(404)
  })
})

describe('PATCH /projects/:id/favorite', () => {
  it('updates the favorite flag', async () => {
    project.update.mockResolvedValue({ ...dbProject, isFavorite: true })

    const response = await request(app).patch(`/projects/${dbProject.id}/favorite`).send({ isFavorite: true })

    expect(response.status).toBe(200)
    expect(response.body.isFavorite).toBe(true)
  })

  it('rejects a body without isFavorite', async () => {
    const response = await request(app).patch(`/projects/${dbProject.id}/favorite`).send({})

    expect(response.status).toBe(400)
  })
})

describe('DELETE /projects/:id', () => {
  it('removes the project', async () => {
    project.delete.mockResolvedValue(dbProject)

    const response = await request(app).delete(`/projects/${dbProject.id}`)

    expect(response.status).toBe(204)
  })

  it('returns 404 when the project does not exist', async () => {
    project.delete.mockRejectedValue(notFound)

    const response = await request(app).delete(`/projects/${dbProject.id}`)

    expect(response.status).toBe(404)
  })
})
