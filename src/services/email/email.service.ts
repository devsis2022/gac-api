import mailer, { ClientResponse, MailDataRequired } from '@sendgrid/mail'

import { MailMessages } from '@core/messages/mail.messages'
import { injectable } from 'inversify'
import { Email } from 'src/dto/email/email'

@injectable()
export class EmailService {
  constructor() {
    if (!process.env.SENDGRID_API_KEY) throw new Error(MailMessages.NO_API_KEY)

    mailer.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendEmail(request: Email): Promise<[ClientResponse, {}]> {
    const { recipients, template, params } = request
    const mail: MailDataRequired = {
      from: process.env.EMAIL_FROM as string,
      to: recipients,
      templateId: template,
      dynamicTemplateData: params
    }

    return await mailer.send(mail)
  }
}
