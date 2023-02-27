import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { httpHandler } from 'src/util/http-handler.util'
import { CourseController } from '@controllers/course.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { Roles } from '@core/interfaces/roles'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { createCourseSchema } from '@middlewares/validators/course/create.validator'
import { ListCoursesSchema } from '@middlewares/validators/course/list.validator'
import { UpdateCourseSchema } from '@middlewares/validators/course/update.validator'
import { DeleteCourseSchema } from '@middlewares/validators/course/delete.validator'

const courseRoutes = Router()

const courseController = container.get(CourseController)

courseRoutes.post(
  '/:institutionId/courses',
  authMiddleware([Roles.MANAGER]),
  bodyValidator(createCourseSchema),
  httpHandler(courseController.create.bind(courseController))
)

courseRoutes.get(
  '/:institutionId/courses',
  authMiddleware([Roles.ADMIN, Roles.MANAGER]),
  bodyValidator(ListCoursesSchema),
  httpHandler(courseController.list.bind(courseController))
)

courseRoutes.put(
  '/:institutionId/courses/:courseId',
  authMiddleware([Roles.MANAGER]),
  bodyValidator(UpdateCourseSchema),
  httpHandler(courseController.update.bind(courseController))
)

courseRoutes.delete(
  '/:institutionId/courses/:courseId',
  authMiddleware([Roles.MANAGER]),
  bodyValidator(DeleteCourseSchema),
  httpHandler(courseController.delete.bind(courseController))
)

export { courseRoutes }
