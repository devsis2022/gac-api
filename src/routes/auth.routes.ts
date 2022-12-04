import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { AuthController } from '@controllers/auth.controller'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { signinSchema } from '@middlewares/validators/signin.validator'

const authRoutes = Router()

const authenticationController = container.get(AuthController)

// authentication
authRoutes.post(
  '/signin',
  bodyValidator(signinSchema),
  authenticationController.signin.bind(authenticationController)
)
authRoutes.post('/login', authenticationController.login.bind(authenticationController))
authRoutes.post('/recovery', authenticationController.recovery.bind(authenticationController))

export { authRoutes }
