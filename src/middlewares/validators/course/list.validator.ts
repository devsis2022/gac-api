import Joi from 'joi'
import { InputListCoursesDTO } from 'src/dto/course/list.dto'

export const ListCoursesSchema = Joi.object<InputListCoursesDTO>({
  userId: Joi.number(),
  search: Joi.string(),
  count: Joi.number(),
  page: Joi.number(),
  institutionId: Joi.string()
})
