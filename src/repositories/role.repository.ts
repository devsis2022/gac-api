import { injectable } from 'inversify'
import { UserRole, PrismaClient, Role, Prisma } from '@prisma/client'
import { Roles } from 'src/core/interfaces/roles'

@injectable()
export class RoleRepository {
  private prisma = new PrismaClient()

  async getByName(roleName: `${Roles}`): Promise<Role | null> {
    return this.prisma.role.findFirst({ where: { name: roleName } })
  }
}
