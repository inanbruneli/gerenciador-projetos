import type { RequestHandler } from 'express'
import type { AnyObjectSchema } from 'yup'

export const validate = (schema: AnyObjectSchema): RequestHandler => async (req, _res, next) => {
  req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true })
  next()
}
