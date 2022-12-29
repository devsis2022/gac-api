import { Roles } from '@core/interfaces/roles'
import { Role } from '@prisma/client'

export const RoleToken = Symbol.for('RoleRepository')

export interface RoleRepository {
  getByName(roleName: `${Roles}`): Promise<Role | null>
}
