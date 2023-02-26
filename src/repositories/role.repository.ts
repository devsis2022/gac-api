import { injectable } from 'inversify'
import { PrismaClient, Role } from '@prisma/client'
import { Roles } from 'src/core/interfaces/roles'
import { RoleRepository } from './interfaces/role.respository'

@injectable()
export class PrismaRoleRepository implements RoleRepository {
  private prisma = new PrismaClient()

  async getByName(roleName: `${Roles}`): Promise<Role | null> {
    return this.prisma.role.findFirst({ where: { name: roleName } })
  }
}
