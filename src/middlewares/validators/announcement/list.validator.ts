import Joi from 'joi'
import { InputListAnnouncementsDTO } from 'src/dto/announcement/list.dto'

export const listAnnouncementsSchema = Joi.object<InputListAnnouncementsDTO>({
  userId: Joi.number(),
  institutionId: Joi.number().required(),
  status: Joi.valid('ACTIVE', 'DISABLE'),
  count: Joi.number(),
  page: Joi.number()
})
