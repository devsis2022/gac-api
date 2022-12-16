import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { AuthController } from '@controllers/auth.controller'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { signinSchema } from '@middlewares/validators/auth/signin.validator'
import { loginSchema } from '@middlewares/validators/auth/login.validator'

const authRoutes = Router()

const authenticationController = container.get(AuthController)

// authentication
authRoutes.post(
  '/signin',
  bodyValidator(signinSchema),
  authenticationController.signin.bind(authenticationController)
)
authRoutes.post(
  '/login',
  bodyValidator(loginSchema),
  authenticationController.login.bind(authenticationController)
)
authRoutes.post('/recovery', authenticationController.recovery.bind(authenticationController))

export { authRoutes }
