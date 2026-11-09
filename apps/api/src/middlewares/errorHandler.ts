import type { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'
import { ValidationError } from 'yup'
import { InvalidFileTypeError } from './upload.js'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ValidationError) {
    res.status(400).json({ message: 'Dados inválidos', errors: error.errors })
    return
  }

  if (error instanceof InvalidFileTypeError) {
    res.status(400).json({ message: error.message })
    return
  }

  if (error instanceof MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE' ? 'A capa deve ter no máximo 5MB' : error.message
    res.status(400).json({ message })
    return
  }

  console.error(error)
  res.status(500).json({ message: 'Erro interno do servidor' })
}
