import Joi from 'joi'
import { InputUpdateCourseDTO } from 'src/dto/course/update.dto'

export const UpdateCourseSchema = Joi.object<InputUpdateCourseDTO>({
  courseId: Joi.number().required(),
  institutionId: Joi.number().required(),
  name: Joi.string(),
  description: Joi.string(),
  coordinatorId: Joi.number(),
  userId: Joi.number()
})
