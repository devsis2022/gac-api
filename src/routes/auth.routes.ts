import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { AuthController } from '@controllers/auth.controller'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { signinSchema } from '@middlewares/validators/auth/signin.validator'
import { loginSchema } from '@middlewares/validators/auth/login.validator'
import { httpHandler } from 'src/util/http-handler.util'

const authRoutes = Router()

const authenticationController = container.get(AuthController)

// /auth
authRoutes.post(
  '/signin',
  bodyValidator(signinSchema),
  httpHandler(authenticationController.signin.bind(authenticationController))
)
authRoutes.post(
  '/login',
  bodyValidator(loginSchema),
  httpHandler(authenticationController.login.bind(authenticationController))
)
authRoutes.post('/recovery', authenticationController.recovery.bind(authenticationController))

export { authRoutes }
