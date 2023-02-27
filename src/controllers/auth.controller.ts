import { injectable, inject } from 'inversify'
import { Response } from 'express'
import { Prisma, PrismaClient, User } from '@prisma/client'
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
import { RequestRecoveryDTO } from 'src/dto/auth/request-recovery'
import { ValidateRecoveryDTO } from 'src/dto/auth/validate-recovery'
import { ChangePasswordDTO } from 'src/dto/auth/change-password'
import { prismaClientToken } from '@config/prisma-client'
import {
  UserRecoveryRepository,
  UserRecoveryToken
} from 'src/repositories/interfaces/user-recovery.recovery'
import { hasPassedHours } from 'src/util/date.util'

@injectable()
export class AuthController {
  constructor(
    @inject(prismaClientToken) private prisma: PrismaClient,
    @inject(UserToken) private userRepository: UserRepository,
    @inject(UserRecoveryToken) private userRecoveryRepository: UserRecoveryRepository,
    @inject(EmailToken) private emailService: EmailService
  ) {}

  async signin(input: SigninDTO): Promise<ControllerResponse> {
    input.username = input.username ?? input.email.split('@')[0]
    input.cpf = input.cpf.replace(/\D/g, '')
    const { email, username } = input

    const user = await this.userRepository.findByEmailOrUsername(email, username)

    if (user) {
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

  async requestRecovery(input: RequestRecoveryDTO): Promise<ControllerResponse> {
    const user = await this.userRepository.findByEmail(input.email)

    if (!user) {
      return { statusCode: 422, json: { message: UserMessage.USER_NOT_FOUND } }
    }

    const recoveryCode = Math.floor(100000 + Math.random() * 900000)

    const recovery = await this.userRecoveryRepository.findByUserId(user.id)

    if (!recovery) {
      await this.userRecoveryRepository.create({ userId: user.id, recoveryCode })
    } else {
      await this.userRecoveryRepository.update(user.id, { recoveryCode, createdAt: new Date() })
    }

    const email: Email = {
      recipients: [user.email],
      template: EmailTemplate.RECOVERY_EMAIL,
      params: {
        user_name: user.name,
        recovery_code: recoveryCode.toString()
      }
    }

    await this.emailService.sendEmail(email)

    return { statusCode: 200, json: undefined }
  }

  async validateCode(input: ValidateRecoveryDTO): Promise<ControllerResponse> {
    const { email, recoveryCode } = input

    const recovery = await this.userRecoveryRepository.findByUserEmailAndCode(email, recoveryCode)

    if (!recovery || hasPassedHours(recovery.createdAt, 2)) {
      return { statusCode: 200, json: { valid: false } }
    }

    return { statusCode: 200, json: { valid: true } }
  }

  async changePassword(input: ChangePasswordDTO): Promise<ControllerResponse> {
    const { email, recoveryCode, password } = input

    const recovery = await this.userRecoveryRepository.findByUserEmailAndCode(email, recoveryCode)

    if (!recovery || hasPassedHours(recovery.createdAt, 2)) {
      return { statusCode: 501, json: { msg: AuthMessage.UNABLE_TO_RECOVERY_PASSWORD } }
    }

    await this.prisma.$transaction(async (trx: Prisma.TransactionClient) => {
      await this.userRepository.updatePassword(recovery.userId, password, { trx })
      await this.userRecoveryRepository.deleteByUserId(recovery.userId, { trx })
    })

    return { statusCode: 200, json: undefined }
  }
}
