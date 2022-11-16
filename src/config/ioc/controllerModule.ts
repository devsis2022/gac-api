import { AuthController } from '@controllers/auth.controller'
import { ContainerModule, interfaces } from 'inversify'
import { UserRepository } from 'src/repositories/user.repository'

export const controllerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuthController).toSelf()
  bind(UserRepository).toSelf()
})
