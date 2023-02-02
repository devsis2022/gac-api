import { ContainerModule, interfaces } from 'inversify'
import { EmailService } from 'src/services/email/email.service'
import { EmailToken } from 'src/services/interfaces/email.service'

export const serviceModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(EmailToken).to(EmailService)
})
