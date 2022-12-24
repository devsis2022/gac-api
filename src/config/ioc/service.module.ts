import { ContainerModule, interfaces } from 'inversify'
import { EmailService } from 'src/services/email/email.service'

export const serviceModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(EmailService).toSelf()
})
