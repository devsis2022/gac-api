import mailer, { ClientResponse, MailDataRequired } from '@sendgrid/mail'

import { MailMessages } from '@core/messages/mail.messages'

if (!process.env.SENDGRID_API_KEY) throw new Error(MailMessages.NO_API_KEY)

mailer.setApiKey(process.env.SENDGRID_API_KEY)

export const sendMail = async (): Promise<[ClientResponse, {}]> => {
  const mail: MailDataRequired = {
    from: 'henrique.biasibetti@luby.software',
    to: 'felipe.mschultz@hotmail.com',
    subject: 'Teste',
    text: 'conteudo'
  }

  return await mailer.send(mail)
}
