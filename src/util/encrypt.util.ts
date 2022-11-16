import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'
import { AuthMessage } from 'src/core/messages/auth.messages'

export const encryptMd5 = (value: string): string => {
  return createHash('md5').update(value).digest('hex')
}

export const createToken = (body: string | object | Buffer): string => {
  if (!process.env.GAC_AUTH_SECRET) throw new Error(AuthMessage.NO_SECRET_DEFINED)

  return jwt.sign(body, process.env.GAC_AUTH_SECRET, { expiresIn: '30m' })
}
