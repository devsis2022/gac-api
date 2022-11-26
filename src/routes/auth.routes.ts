import { bodyValidator } from '@middlewares/body.validator'
import { Router } from 'express'
import { signinSchema } from '@middlewares/validators/signin.validator'
import { AuthController } from '@controllers/auth.controller'
import { container } from '@config/ioc/inversifyConfig'
import { InstitutionController } from '@controllers/institution.controller'
import { requestInstitutionSchema } from '@middlewares/validators/institution/requesInstitution.validator'

const authRoutes = Router()

const authenticationController = container.get(AuthController)
const institutionController = container.get(InstitutionController)

// authentication
authRoutes.post(
  '/signin',
  bodyValidator(signinSchema),
  authenticationController.signin.bind(authenticationController)
)
authRoutes.post('/login', authenticationController.login.bind(authenticationController))
authRoutes.post('/recovery', authenticationController.recovery.bind(authenticationController))

// institutions
authRoutes.post(
  '/institution',
  bodyValidator(requestInstitutionSchema),
  institutionController.requestRegister.bind(institutionController)
)
authRoutes.put(
  '/institution/:institutionId/activate',
  institutionController.approveRegister.bind(institutionController)
)

export { authRoutes }
