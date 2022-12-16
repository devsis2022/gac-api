import joi from 'joi'
import { LoginDTO } from 'src/dto/login.dto'

export const loginSchema = joi.object<LoginDTO>({
  user: joi.string().required(),
  password: joi.string().required()
})
