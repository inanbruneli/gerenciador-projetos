import { Router } from 'express'
import * as projectController from '../controllers/projectController.js'
import { validate } from '../middlewares/validate.js'
import { createProjectSchema, favoriteSchema } from '../schemas/projectSchema.js'

export const projectRoutes = Router()

projectRoutes.get('/', projectController.list)
projectRoutes.post('/', validate(createProjectSchema), projectController.create)
projectRoutes.patch('/:id/favorite', validate(favoriteSchema), projectController.favorite)
