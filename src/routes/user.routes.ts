import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { httpHandler } from 'src/util/http-handler.util'
import { UserController } from '@controllers/user.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { ListUserSchema } from '@middlewares/validators/user/list.validator'
import { Roles } from '@core/interfaces/roles'

const userRoutes = Router()

const userController = container.get(UserController)

userRoutes.get(
  '/whoami',
  authMiddleware([]),
  httpHandler(userController.showMe.bind(userController))
)

userRoutes.get(
  '/',
  authMiddleware([Roles.ADMIN, Roles.MANAGER]),
  bodyValidator(ListUserSchema),
  httpHandler(userController.list.bind(userController))
)

export { userRoutes }
