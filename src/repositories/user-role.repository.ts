import { injectable } from 'inversify'
import { UserRole, PrismaClient, Role, Prisma } from '@prisma/client'
import { UserRoleRepository } from './interfaces/user-role.repository'

@injectable()
export class PrismaUserRoleRepository implements UserRoleRepository {
  private prisma = new PrismaClient()

  async create(
    input: { userId: number; roleId: number; institutionId: number },
    options?: { trx: Prisma.TransactionClient }
  ): Promise<UserRole> {
    const prisma = options?.trx ?? this.prisma
    return prisma.userRole.create({
      data: {
        roleId: input.roleId,
        userId: input.userId,
        ...(input.institutionId && { institutionId: input.institutionId })
      }
    })
  }

  async getByUserId(userId: number): Promise<Array<UserRole & { role: Role }>> {
    return this.prisma.userRole.findMany({ where: { userId }, include: { role: true } })
  }
}
