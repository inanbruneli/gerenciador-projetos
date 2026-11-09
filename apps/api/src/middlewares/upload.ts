import multer from 'multer'

const ALLOWED_TYPES = ['image/jpeg', 'image/png']
const MAX_SIZE = 5 * 1024 * 1024

export class InvalidFileTypeError extends Error {
  constructor() {
    super('A capa deve ser uma imagem .jpg ou .png')
  }
}

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, callback) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) return callback(null, true)
    callback(new InvalidFileTypeError())
  },
})
