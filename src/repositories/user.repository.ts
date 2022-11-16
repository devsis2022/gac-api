import { PrismaClient } from '@prisma/client'
import { User } from 'src/entities/User'
import { injectable } from 'inversify'
import { encryptMd5 } from 'src/util/encrypt.util'
import { LoginDTO } from 'src/dto/login.dto'

@injectable()
export class UserRepository {
  private prisma = new PrismaClient()

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  async findByEmailAndPassword(dto: LoginDTO): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        AND: {
          email: dto.email,
          password: encryptMd5(dto.password)
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
