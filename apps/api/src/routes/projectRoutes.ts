import { Router } from 'express'
import * as projectController from '../controllers/projectController.js'
import { validate } from '../middlewares/validate.js'
import { favoriteSchema, projectSchema } from '../schemas/projectSchema.js'

export const projectRoutes = Router()

projectRoutes.get('/', projectController.list)
projectRoutes.post('/', validate(projectSchema), projectController.create)
projectRoutes.put('/:id', validate(projectSchema), projectController.update)
projectRoutes.patch('/:id/favorite', validate(favoriteSchema), projectController.favorite)
projectRoutes.delete('/:id', projectController.remove)
