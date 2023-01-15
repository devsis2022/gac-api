import { injectable } from 'inversify'
import { UserRole, PrismaClient, Role, Prisma, UserRoleStatus } from '@prisma/client'
import { UserRoleRepository } from './interfaces/user-role.repository'

@injectable()
export class PrismaUserRoleRepository implements UserRoleRepository {
  private prisma = new PrismaClient()

  async create(
    input: { userId: number; roleId: number },
    options?: { trx: Prisma.TransactionClient }
  ): Promise<UserRole> {
    const prisma = options?.trx ?? this.prisma
    return prisma.userRole.create({
      data: {
        roleId: input.roleId,
        userId: input.userId
      }
    })
  }

  async getByUserId(
    userId: number,
    status?: UserRoleStatus[]
  ): Promise<Array<UserRole & { role: Role }>> {
    return this.prisma.userRole.findMany({
      where: { userId, ...(status && { status: { in: status } }) },
      include: { role: true }
    })
  }
}
