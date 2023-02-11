import joi from 'joi'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'

export const requestInstitutionSchema = joi.object<InputCreateInstitutionDTO>({
  name: joi.string().required().max(255),
  nickname: joi.string().max(100),
  description: joi.string(),
  userId: joi.number()
})
