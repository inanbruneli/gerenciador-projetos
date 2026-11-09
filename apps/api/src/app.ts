import express from 'express'
import cors from 'cors'
import { projectRoutes } from './routes/projectRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/projects', projectRoutes)

app.use(errorHandler)
