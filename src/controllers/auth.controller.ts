import { Response } from 'express'
import { SigninDTO } from 'src/dto/signin.dto'
import { IRequest } from 'src/core/interfaces/request'
import { UserRepository } from 'src/repositories/user.repository'
import { injectable, inject } from 'inversify'
import { Messages } from 'src/core/error.mesages'

@injectable()
export class AuthController {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async signin(req: IRequest<SigninDTO>, res: Response): Promise<any> {
    const body = req.body

    const user = await this.userRepository.findByEmail(body.email)

    if (user) {
      return res.status(422).json({ message: Messages.USER_ALREADY_REGISTERED })
    }

    await this.userRepository.createUser(body)

    return res.status(200).send()
  }

  async login(req: IRequest, res: Response): Promise<void> {
    res.json({ token: 'OASIFJOAISJFAOJF SOFHJoxvosjapjkdosjaODJsaop' })
  }

  async recovery(req: IRequest, res: Response): Promise<void> {
    res.json({ token: 'OASIFJOAISJFAOJF SOFHJoxvosjapjkdosjaODJsaop' })
  }
}
