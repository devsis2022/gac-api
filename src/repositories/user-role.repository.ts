import { injectable } from 'inversify'
import { UserRole, PrismaClient, Role, Prisma } from '@prisma/client'
import { UserRoleRepository } from './interfaces/user-role.repository'
import { Roles } from '@core/interfaces/roles'

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

  async isStillCoordinator(input: { userId: number; institutionId: number }): Promise<boolean> {
    const userRoles = await this.prisma.course.findMany({
      where: { AND: [{ coordinatorId: input.userId }, { institutionId: input.institutionId }] }
    })
    return !!userRoles.length
  }

  async delete(
    input: { userId: number; institutionId: number; role: Roles },
    options?: { trx: Prisma.TransactionClient } | undefined
  ): Promise<void> {
    const prisma = options?.trx ?? this.prisma
    const user = await prisma.user.findUnique({
      where: { id: input.userId },
      include: {
        userRole: {
          where: {
            AND: [
              {
                institutionId: input.institutionId
              },
              {
                role: {
                  name: { equals: input.role }
                }
              }
            ]
          }
        }
      }
    })
    if (!user) return
    if (!user.userRole.length) return
    await prisma.userRole.delete({ where: { id: user.userRole[0].id } })
  }
}
