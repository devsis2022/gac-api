import joi from 'joi'
import { ValidateRecoveryDTO } from 'src/dto/auth/validate-recovery'

export const validateRecoverySchema = joi.object<ValidateRecoveryDTO>({
  email: joi.string().email().required(),
  code: joi.string().regex(/^\d+$/).min(6).max(6).required()
})
