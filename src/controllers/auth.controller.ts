import { Response } from 'express'
import { User } from '@prisma/client'
import { LoginDTO } from 'src/dto/login.dto'
import { injectable, inject } from 'inversify'
import { SigninDTO } from 'src/dto/signin.dto'
import { createToken } from 'src/util/token.util'
import { IRequest } from 'src/core/interfaces/request'
import { AuthMessage } from 'src/core/messages/auth.messages'
import { UserRepository } from 'src/repositories/user.repository'
import { BussinessMessage } from 'src/core/messages/bussiness.message'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'
import { EmailService } from 'src/services/email/email.service'
import { Email } from 'src/dto/email/email'
import { EmailTemplate } from '@core/enums/email-template'

@injectable()
export class AuthController {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(EmailService) private emailService: EmailService
  ) {}

  async signin(req: IRequest<SigninDTO>, res: Response): Promise<any> {
    const body = req.body
    body.username = body.username ?? body.email.split('@')[0]

    const { email, username } = body

    const users = await this.userRepository.findByEmailOrUsername(email, username)

    if (users) {
      return res.status(422).json({ message: BussinessMessage.USER_ALREADY_REGISTERED })
    }

    try {
      await this.userRepository.createUser(body as User)

      return res.status(200).send()
    } catch (err) {
      return res.status(500).json({ message: PersistenceMessages.FAILED_TO_CREATE_ENTITY })
    }
  }

  async login(req: IRequest<LoginDTO>, res: Response): Promise<any> {
    const body = req.body

    const user = await this.userRepository.findByUserAndPassword(body)

    if (!user) {
      return res.status(401).json({ message: AuthMessage.INVALID_LOGIN })
    }

    return res.json({ token: createToken({ id: user.id }) })
  }

  async recovery(req: IRequest, res: Response): Promise<any> {
    const email: Email = {
      recipients: ['felipe.mschultz@hotmail.com'],
      template: EmailTemplate.RECOVERY_EMAIL,
      params: {
        recovery_url: 'https://google.com'
      }
    }

    this.emailService
      .sendEmail(email)
      .then((data) => {
        console.log(data)
        res.status(200).json({ message: 'Enviado' })
      })
      .catch((err) => {
        console.log(err.response.body)
        res.status(500).json({ message: 'Não enviado' })
      })
  }
}
