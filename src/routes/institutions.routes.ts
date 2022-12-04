import { bodyValidator } from '@middlewares/body-validator.middleware'
import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { InstitutionController } from '@controllers/institution.controller'
import { requestInstitutionSchema } from '@middlewares/validators/institution/requesInstitution.validator'
import { authMiddleware } from '@middlewares/auth.middleware'
import { Roles } from 'src/core/interfaces/roles'

const routes = Router()

const institutionController = container.get(InstitutionController)

// institutions
routes.post(
  '/',
  authMiddleware([]),
  bodyValidator(requestInstitutionSchema),
  institutionController.requestRegister.bind(institutionController)
)
routes.put(
  '/:institutionId/activate',
  authMiddleware([Roles.ADMIN]),
  institutionController.approveRegister.bind(institutionController)
)

export { routes }
