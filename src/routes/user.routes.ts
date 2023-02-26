import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { httpHandler } from 'src/util/http-handler.util'
import { UserController } from '@controllers/user.controller'

const userRoutes = Router()

const userController = container.get(UserController)

userRoutes.get('/whoami', httpHandler(userController.showMe.bind(userController)))

export { userRoutes }
