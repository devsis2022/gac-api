import joi from 'joi'
import { ChangePasswordDTO } from 'src/dto/auth/change-password'

export const changePasswordSchema = joi.object<ChangePasswordDTO>({
  email: joi.string().email().required(),
  recoveryCode: joi.number().required(),
  password: joi.string().min(6).required()
})
