import joi from 'joi'
import { InputCreateInstitutionDTO } from 'src/dto/institution/createInstitutionDto'

export const requestInstitutionSchema = joi.object<InputCreateInstitutionDTO>({
  name: joi.string().required().max(255),
  description: joi.string(),
  managerId: joi.number()
})
