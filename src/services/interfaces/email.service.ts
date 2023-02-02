import { ClientResponse } from '@sendgrid/mail'
import { Email } from 'src/dto/email/email'

export const EmailToken = Symbol.for('EmailService')

export interface EmailService {
  sendEmail(email: Email): Promise<[ClientResponse, {}]>
}
