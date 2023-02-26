import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { httpHandler } from 'src/util/http-handler.util'
import { UserController } from '@controllers/user.controller'
import { authMiddleware } from '@middlewares/auth.middleware'

const userRoutes = Router()

const userController = container.get(UserController)

userRoutes.get(
  '/whoami',
  authMiddleware([]),
  httpHandler(userController.showMe.bind(userController))
)

export { userRoutes }
