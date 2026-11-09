import { Router } from 'express'
import * as projectController from '../controllers/projectController.js'
import { upload } from '../middlewares/upload.js'
import { validate } from '../middlewares/validate.js'
import { createProjectSchema } from '../schemas/projectSchema.js'

export const projectRoutes = Router()

projectRoutes.post('/', upload.single('coverImage'), validate(createProjectSchema), projectController.create)
