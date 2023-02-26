import { Prisma, PrismaClient, Recovery } from '@prisma/client'
import { injectable } from 'inversify'
import { InputCreateRecoveryDTO } from 'src/dto/auth/recovery-create'
import { InputUpdateRecoveryDTO } from 'src/dto/auth/recovery-update'
import { UserRecoveryRepository } from './interfaces/user-recovery.recovery'

@injectable()
export class PrismaUserRecoveryRepository implements UserRecoveryRepository {
  private prisma = new PrismaClient()

  async deleteByUserId(
    userId: number,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Recovery> {
    const prisma = options?.trx ?? this.prisma
    return prisma.recovery.delete({
      where: { userId }
    })
  }

  async findByUserId(userId: number): Promise<Recovery | null> {
    return this.prisma.recovery.findUnique({
      where: { userId }
    })
  }

  async findByUserEmailAndCode(email: string, recoveryCode: number): Promise<Recovery | null> {
    return this.prisma.recovery.findFirst({
      where: {
        AND: {
          recoveryCode,
          user: {
            email
          }
        }
      }
    })
  }

  async create(recovery: InputCreateRecoveryDTO): Promise<Recovery> {
    return this.prisma.recovery.create({ data: recovery })
  }

  async update(userId: number, input: InputUpdateRecoveryDTO): Promise<Recovery> {
    return this.prisma.recovery.update({
      data: input,
      where: { userId }
    })
  }
}
