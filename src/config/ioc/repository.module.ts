import { ContainerModule, interfaces } from 'inversify'
import { PrismaInstitutionRepository } from 'src/repositories/institution.repository'
import { InstitutionToken } from 'src/repositories/interfaces/institution.repository'
import { RoleToken } from 'src/repositories/interfaces/role.respository'
import { UserRoleToken } from 'src/repositories/interfaces/user-role.repository'
import { UserToken } from 'src/repositories/interfaces/user.repository'
import { PrismaRoleRepository } from 'src/repositories/role.repository'
import { PrismaUserRoleRepository } from 'src/repositories/user-role.repository'
import { PrismaUserRepository } from 'src/repositories/user.repository'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserToken).to(PrismaUserRepository)
  bind(InstitutionToken).to(PrismaInstitutionRepository)
  bind(UserRoleToken).to(PrismaUserRoleRepository)
  bind(RoleToken).to(PrismaRoleRepository)
})
