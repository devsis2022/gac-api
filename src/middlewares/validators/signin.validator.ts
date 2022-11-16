import joi, { CustomHelpers, CustomValidator } from 'joi'
import { cpf } from 'cpf-cnpj-validator'
import { SigninDTO } from 'src/dto/signin.dto'

const cpfValidator: CustomValidator = (value: string, helpers: CustomHelpers) => {
  if (cpf.isValid(value)) {
    return value
  }

  return helpers.error('cpf.invalid')
}

export const signinSchema = joi.object<SigninDTO>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  cpf: joi.string().custom(cpfValidator).required()
})
