import type { RequestHandler } from 'express'
import * as projectService from '../services/projectService.js'

export const create: RequestHandler = async (req, res) => {
  const project = await projectService.createProject(req.body, req.file)
  res.status(201).json(project)
}
