import { bodyValidator } from '@middlewares/body.validator'
import { Router } from 'express'
import { signinSchema } from '@middlewares/validators/signin.validator'
import { AuthController } from '@controllers/auth.controller'
import { container } from '@config/ioc/inversifyConfig'

const authRoutes = Router()

const controller = container.get(AuthController)

authRoutes.post('/signin', bodyValidator(signinSchema), controller.signin.bind(controller))
authRoutes.post('/login', controller.login.bind(controller))
authRoutes.post('/recovery', controller.recovery.bind(controller))

export { authRoutes }
