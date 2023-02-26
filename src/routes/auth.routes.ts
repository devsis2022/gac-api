import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { AuthController } from '@controllers/auth.controller'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { signinSchema } from '@middlewares/validators/auth/signin.validator'
import { loginSchema } from '@middlewares/validators/auth/login.validator'
import { httpHandler } from 'src/util/http-handler.util'
import { requestRecoverySchema } from '@middlewares/validators/auth/request-recovery.validator'
import { validateRecoverySchema } from '@middlewares/validators/auth/validate-recovery.validator'
import { changePasswordSchema } from '@middlewares/validators/auth/change-password.validator'

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
authRoutes.post(
  '/recovery/request',
  bodyValidator(requestRecoverySchema),
  httpHandler(authenticationController.requestRecovery.bind(authenticationController))
)
authRoutes.post(
  '/recovery/validate',
  bodyValidator(validateRecoverySchema),
  httpHandler(authenticationController.validateCode.bind(authenticationController))
)
authRoutes.post(
  '/recovery/change',
  bodyValidator(changePasswordSchema),
  httpHandler(authenticationController.changePassword.bind(authenticationController))
)

export { authRoutes }
