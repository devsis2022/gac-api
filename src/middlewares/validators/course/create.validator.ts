import joi from 'joi'
import { InputCreateCourseDTO } from 'src/dto/course/create.dto'

export const createCourseSchema = joi.object<InputCreateCourseDTO>({
  name: joi.string().required(),
  coordinatorId: joi.number().required(),
  description: joi.string(),
  institutionId: joi.number().required(),
  userId: joi.number()
})
