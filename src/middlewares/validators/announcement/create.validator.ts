import Joi from 'joi'
import { InputActivity, InputCreateAnnouncementDTO } from 'src/dto/announcement/create.dto'

const activity = Joi.object<InputActivity>({
  maxMinutes: Joi.number().required(),
  name: Joi.string().required()
})

export const createAnnouncementSchema = Joi.object<InputCreateAnnouncementDTO>({
  name: Joi.string().required(),
  institutionId: Joi.number().required(),
  userId: Joi.number(),
  activities: Joi.array().items(activity).min(1).required()
})
