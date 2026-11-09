import type { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ValidationError) {
    res.status(400).json({ message: error.errors[0], errors: error.errors })
    return
  }

  if (error.type === 'entity.too.large') {
    res.status(413).json({ message: 'A capa deve ter no máximo 5MB' })
    return
  }

  console.error(error)
  res.status(500).json({ message: 'Erro interno do servidor' })
}
