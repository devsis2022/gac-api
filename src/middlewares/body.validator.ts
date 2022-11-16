import { NextFunction, Request, Response } from 'express'
import Joi, { ObjectSchema } from 'joi'

export const bodyValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { error } = schema.validate(req.body, { abortEarly: false, messages })

    if (error) {
      return res.status(400).json({ error: buildErrorMessages(error) })
    }

    next()
  }
}

const buildErrorMessages = (
  error: Joi.ValidationError
): Array<{
  field: string | undefined
  key: string
}> => {
  return error.details.map((value) => {
    const { context, message } = value

    return {
      field: context?.label,
      key: message
    }
  })
}

const messages = {
  'any.required': 'field.required',
  'string.email': 'invalid.email',
  'string.min': 'min.value',
  'cpf.invalid': 'invalid.cpf',
  'object.unknown': 'field.not.allowed'
}
