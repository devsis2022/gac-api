import { Response } from 'express'
import { User } from '@prisma/client'
import { injectable, inject } from 'inversify'
import { createToken } from 'src/util/token.util'
import { IRequest } from 'src/core/interfaces/request'
import { AuthMessage } from 'src/core/messages/auth.messages'
import { UserRepository } from 'src/repositories/user.repository'
import { BussinessMessage } from 'src/core/messages/bussiness.message'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'
import { sendMail } from 'src/services/email.service'
import { ControllerResponse } from '@core/interfaces/controller'
import { SigninDTO } from 'src/dto/auth/signin.dto'
import { LoginDTO } from 'src/dto/auth/login.dto'

@injectable()
export class AuthController {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async signin(input: SigninDTO): Promise<ControllerResponse> {
    input.username = input.username ?? input.email.split('@')[0]

    const { email, username } = input

    const users = await this.userRepository.findByEmailOrUsername(email, username)
    if (users) {
      return { statusCode: 422, json: { message: BussinessMessage.USER_ALREADY_REGISTERED } }
    }

    try {
      await this.userRepository.createUser(input as User)

      return { statusCode: 200, json: undefined }
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
