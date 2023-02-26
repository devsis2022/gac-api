import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { httpHandler } from 'src/util/http-handler.util'
import { CourseController } from '@controllers/course.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { Roles } from '@core/interfaces/roles'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { createCourseSchema } from '@middlewares/validators/course/create.validator'
import { ListCoursesSchema } from '@middlewares/validators/course/list.validator'

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

export { courseRoutes }
