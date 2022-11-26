import { ContainerModule, interfaces } from 'inversify'
import { UserRepository } from 'src/repositories/user.repository'
import { InstitutionRepository } from 'src/repositories/institution.repository'
import { UserRolesRepository } from 'src/repositories/user-roles.repository'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserRepository).toSelf()
  bind(InstitutionRepository).toSelf()
  bind(UserRolesRepository).toSelf()
})
