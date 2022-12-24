import { injectable, inject } from 'inversify'
import { Response } from 'express'
import { User } from '@prisma/client'
import { IRequest } from 'src/core/interfaces/request'
import { UserRepository, UserToken } from 'src/repositories/interfaces/user.repository'
import { SigninDTO } from 'src/dto/auth/signin.dto'
import { ControllerResponse } from '@core/interfaces/controller'
import { UserMessage } from '@core/messages/user.message'
import { PersistenceMessages } from '@core/messages/persistence.messages'
import { LoginDTO } from 'src/dto/auth/login.dto'
import { AuthMessage } from '@core/messages/auth.messages'
import { createToken } from 'src/util/token.util'
import { sendMail } from 'src/services/email.service'

@injectable()
export class AuthController {
  constructor(@inject(UserToken) private userRepository: UserRepository) {}

  async signin(input: SigninDTO): Promise<ControllerResponse> {
    input.username = input.username ?? input.email.split('@')[0]

    const { email, username } = input

    const users = await this.userRepository.findByEmailOrUsername(email, username)
    if (users) {
      return { statusCode: 422, json: { message: UserMessage.USER_ALREADY_REGISTERED } }
    }

    try {
      await this.userRepository.createUser(input as User)

      return { statusCode: 201, json: undefined }
    } catch (err) {
      return { statusCode: 500, json: { message: PersistenceMessages.FAILED_TO_CREATE_ENTITY } }
    }
  }

  async login(input: LoginDTO): Promise<ControllerResponse> {
    const user = await this.userRepository.findByUserAndPassword(input)

    if (!user) {
      return { statusCode: 401, json: { message: AuthMessage.INVALID_LOGIN } }
    }
    return { statusCode: 200, json: { token: createToken({ id: user.id }) } }
  }

  async recovery(req: IRequest, res: Response): Promise<any> {
    sendMail()
      .then((value) => {
        console.log(value)
        res.json({ message: 'email enviado' })
      })
      .catch((err) => {
        res.json({ message: err })
      })
  }
}
