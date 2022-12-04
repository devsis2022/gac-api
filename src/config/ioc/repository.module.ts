import { ContainerModule, interfaces } from 'inversify'
import { UserRepository } from 'src/repositories/user.repository'
import { InstitutionRepository } from 'src/repositories/institution.repository'
import { UserRoleRepository } from 'src/repositories/user-role.repository'
import { RoleRepository } from 'src/repositories/role.repository'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserRepository).toSelf()
  bind(InstitutionRepository).toSelf()
  bind(UserRoleRepository).toSelf()
  bind(RoleRepository).toSelf()
})
