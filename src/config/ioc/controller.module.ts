import { ContainerModule, interfaces } from 'inversify'
import { AuthController } from '@controllers/auth.controller'
import { InstitutionController } from '@controllers/institution.controller'
import { UserController } from '@controllers/user.controller'

export const controllerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuthController).toSelf()
  bind(InstitutionController).toSelf()
  bind(UserController).toSelf()
})
