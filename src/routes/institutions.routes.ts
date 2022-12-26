import { bodyValidator } from '@middlewares/body-validator.middleware'
import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { InstitutionController } from '@controllers/institution.controller'
import { requestInstitutionSchema } from '@middlewares/validators/institution/requesInstitution.validator'
import { authMiddleware } from '@middlewares/auth.middleware'
import { Roles } from 'src/core/interfaces/roles'
import { httpHandler } from 'src/util/http-handler.util'

const routes = Router()

const institutionController = container.get(InstitutionController)

// /institution
routes.post(
  '/',
  authMiddleware([]),
  bodyValidator(requestInstitutionSchema),
  httpHandler(institutionController.requestRegister.bind(institutionController))
)
routes.put(
  '/:institutionId/activate',
  authMiddleware([Roles.ADMIN]),
  httpHandler(institutionController.approveRegister.bind(institutionController))
)

routes.put(
  '/:institutionId',
  authMiddleware([Roles.ADMIN, Roles.MANAGER]),
  httpHandler(institutionController.update.bind(institutionController))
)

export { routes }
