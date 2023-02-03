import { PrismaClient, User } from '@prisma/client'
import { injectable } from 'inversify'
import { LoginDTO } from 'src/dto/auth/login.dto'
import { encryptMd5 } from 'src/util/encrypt.util'
import { UserRepository, UserWithRoles } from './interfaces/user.repository'

@injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient()

  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
        username
      }
    })
  }

  async findByUserToLogin(dto: LoginDTO): Promise<UserWithRoles | null> {
    return await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                email: dto.user
              },
              {
                username: dto.user
              }
            ]
          },
          {
            password: encryptMd5(dto.password)
          }
        ]
      },
      include: {
        userRole: {
          select: {
            role: { select: { name: true } }
          }
        }
      }
    })
  }

  async createUser(user: User): Promise<User> {
    user.password = encryptMd5(user.password)

    return await this.prisma.user.create({
      data: user
    })
  }
}
