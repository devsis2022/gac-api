import { Router } from 'express'
import { container } from '@config/ioc/inversifyConfig'
import { httpHandler } from 'src/util/http-handler.util'
import { authMiddleware } from '@middlewares/auth.middleware'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { Roles } from '@core/interfaces/roles'
import { AnnouncementController } from '@controllers/announcement.controller'
import { createAnnouncementSchema } from '@middlewares/validators/announcement/create.validator'

const announcementRoutes = Router()

const announcementController = container.get(AnnouncementController)

announcementRoutes.post(
  '/:institutionId/announcement',
  authMiddleware([Roles.MANAGER]),
  bodyValidator(createAnnouncementSchema),
  httpHandler(announcementController.create.bind(announcementController))
)

export { announcementRoutes }
