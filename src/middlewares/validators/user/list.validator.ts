import Joi from 'joi'
import { InputListUsersDTO } from 'src/dto/user/list.dto'

export const ListUserSchema = Joi.object<InputListUsersDTO>({
  search: Joi.string().required(),
  userId: Joi.number()
})
