import Joi from 'joi'
import { InputListInstitutionsDto } from 'src/dto/institution/list.dto'

export const ListInstitutionSchema = Joi.object<InputListInstitutionsDto>({
  count: Joi.number(),
  page: Joi.number().positive(),
  status: Joi.valid('active', 'pending', 'repproved'),
  userId: Joi.number()
})
