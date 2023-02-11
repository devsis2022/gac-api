import { injectable, inject } from 'inversify'
import { Response } from 'express'
import { User } from '@prisma/client'
import { IRequest } from 'src/core/interfaces/request'
import { SigninDTO } from 'src/dto/auth/signin.dto'
import { ControllerResponse } from '@core/interfaces/controller'
import { UserMessage } from '@core/messages/user.message'
import { PersistenceMessages } from '@core/messages/persistence.messages'
import { LoginDTO } from 'src/dto/auth/login.dto'
import { AuthMessage } from '@core/messages/auth.messages'
import { createToken } from 'src/util/token.util'
import { UserRepository, UserToken } from 'src/repositories/interfaces/user.repository'
import { EmailToken, EmailService } from 'src/services/interfaces/email.service'
import { Email } from 'src/dto/email/email'
import { EmailTemplate } from '@core/enums/email-template'

@injectable()
export class AuthController {
  constructor(
    @inject(UserToken) private userRepository: UserRepository,
    @inject(EmailToken) private emailService: EmailService
  ) {}

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
      console.log(err)
      return { statusCode: 500, json: { message: PersistenceMessages.FAILED_TO_CREATE_ENTITY } }
    }
  }

  async login(input: LoginDTO): Promise<ControllerResponse> {
    const user = await this.userRepository.findByUserToLogin(input)
    if (!user) {
      return { statusCode: 401, json: { message: AuthMessage.INVALID_LOGIN } }
    }
    return { statusCode: 200, json: { token: createToken({ id: user.id }) } }
  }

  async recovery(req: IRequest, res: Response): Promise<any> {
    const email: Email = {
      recipients: ['felipe.mschultz@hotmail.com'],
      template: EmailTemplate.RECOVERY_EMAIL,
      params: {
        recovery_url: 'https://google.com'
      }
    }

    await this.emailService.sendEmail(email).then((data) => {
      res.status(200).json({ message: 'Enviado', data })
    })
  }
}
