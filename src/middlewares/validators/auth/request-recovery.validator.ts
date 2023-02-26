import joi from 'joi'
import { RequestRecoveryDTO } from 'src/dto/auth/request-recovery'

export const requestRecoverySchema = joi.object<RequestRecoveryDTO>({
  email: joi.string().email().required()
})
