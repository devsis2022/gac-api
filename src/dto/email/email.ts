import { EmailTemplate } from '@core/enums/email-template'

export interface Email {
  recipients: string | string[]
  template: EmailTemplate
  params: {
    [key: string]: string
  }
}
