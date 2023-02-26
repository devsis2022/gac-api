import joi from 'joi'
import { ChangePasswordDTO } from 'src/dto/auth/change-password'

export const changePasswordSchema = joi.object<ChangePasswordDTO>({
  email: joi.string().email().required(),
  code: joi.string().regex(/^\d+$/).min(6).max(6).required(),
  password: joi.string().min(6).required()
})
