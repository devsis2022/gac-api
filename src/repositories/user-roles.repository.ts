import { injectable } from 'inversify'
import { UserRole, PrismaClient, Role } from '@prisma/client'

@injectable()
export class UserRolesRepository {
  private prisma = new PrismaClient()

  async getByUserId(userId: number): Promise<Array<UserRole & { role: Role }>> {
    return this.prisma.userRole.findMany({ where: { userId }, include: { role: true } })
  }
}
