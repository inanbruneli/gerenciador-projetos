import type { RequestHandler } from 'express'
import * as projectService from '../services/projectService.js'

export const list: RequestHandler = async (_req, res) => {
  const projects = await projectService.listProjects()
  res.json(projects)
}

export const create: RequestHandler = async (req, res) => {
  const project = await projectService.createProject(req.body)
  res.status(201).json(project)
}

export const favorite: RequestHandler<{ id: string }> = async (req, res) => {
  const project = await projectService.setFavorite(req.params.id, req.body)
  res.json(project)
}
