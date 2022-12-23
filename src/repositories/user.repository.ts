import { PrismaClient, User } from '@prisma/client'
import { injectable } from 'inversify'
import { encryptMd5 } from 'src/util/encrypt.util'
import { LoginDTO } from 'src/dto/login.dto'

@injectable()
export class UserRepository {
  private prisma = new PrismaClient()

  async findByEmailOrUsername(email: string, username: string): Promise<User[] | null> {
    return await this.prisma.user.findMany({
      where: {
        email,
        username
      }
    })
  }

  async findByUserAndPassword(dto: LoginDTO): Promise<User | null> {
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
