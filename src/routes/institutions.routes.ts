import { bodyValidator } from '@middlewares/body-validator.middleware'
import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { InstitutionController } from '@controllers/institution.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { Roles } from 'src/core/interfaces/roles'
import { httpHandler } from 'src/util/http-handler.util'
import { requestInstitutionSchema } from '@middlewares/validators/institution/request-institution.validator'
import { updateInstitutionSchema } from '@middlewares/validators/institution/update-institution.validator'

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
  '/:institutionId/repprove',
  authMiddleware([Roles.ADMIN]),
  httpHandler(institutionController.reproveRegister.bind(institutionController))
)

routes.put(
  '/:institutionId',
  authMiddleware([Roles.ADMIN, Roles.MANAGER]),
  bodyValidator(updateInstitutionSchema),
  httpHandler(institutionController.update.bind(institutionController))
)

routes.delete(
  '/:institutionId',
  authMiddleware([Roles.ADMIN, Roles.MANAGER]),
  httpHandler(institutionController.delete.bind(institutionController))
)

routes.get(
  '/',
  authMiddleware([Roles.ADMIN]),
  httpHandler(institutionController.list.bind(institutionController))
)

export { routes }
