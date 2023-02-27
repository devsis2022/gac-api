import Joi from 'joi'
import { InputDeleteCourseDTO } from 'src/dto/course/delete.dto'

export const DeleteCourseSchema = Joi.object<InputDeleteCourseDTO>({
  userId: Joi.number(),
  courseId: Joi.number().required(),
  institutionId: Joi.number().required()
})
