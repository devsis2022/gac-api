import { Response } from 'express'
import { SigninDTO } from 'src/dto/signin.dto'
import { IRequest } from 'src/core/interfaces/request'
import { UserRepository } from 'src/repositories/user.repository'
import { injectable, inject } from 'inversify'
import { BussinessMessage } from 'src/core/messages/bussiness.message'
import { LoginDTO } from 'src/dto/login.dto'
import { AuthMessage } from 'src/core/messages/auth.messages'
import { createToken } from 'src/util/encrypt.util'
import { User } from '@prisma/client'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'

@injectable()
export class AuthController {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

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

    const user = await this.userRepository.findByEmailAndPassword(body)

    if (!user) {
      return res.status(401).json({ message: AuthMessage.INVALID_LOGIN })
    }

    return res.json({ token: createToken({ id: user.id }) })
  }

  async recovery(req: IRequest, res: Response): Promise<void> {
    res.json({ token: 'OASIFJOAISJFAOJF SOFHJoxvosjapjkdosjaODJsaop' })
  }
}
