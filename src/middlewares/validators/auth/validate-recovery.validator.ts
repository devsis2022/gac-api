import joi from 'joi'
import { ValidateRecoveryDTO } from 'src/dto/auth/validate-recovery'

export const validateRecoverySchema = joi.object<ValidateRecoveryDTO>({
  email: joi.string().email().required(),
  recoveryCode: joi.number().required()
})
