import joi from 'joi'
import { InputUpdateInstitution } from 'src/dto/institution/update.dto'

export const updateInstitutionSchema = joi.object<InputUpdateInstitution>({
  name: joi.string().max(255),
  nickname: joi.string().max(100),
  description: joi.string()
})
