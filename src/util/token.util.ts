import jwt from 'jsonwebtoken'
import { JwtPayload } from 'src/core/interfaces/jwt'
import { AuthMessage } from 'src/core/messages/auth.messages'

export const createToken = (body: string | object | Buffer): string => {
  if (!process.env.GAC_AUTH_SECRET) throw new Error(AuthMessage.NO_SECRET_DEFINED)

  return jwt.sign(body, process.env.GAC_AUTH_SECRET, { expiresIn: '30m' })
}

export const verifyJwt = (token: string): JwtPayload | null => {
  try {
    if (!process.env.GAC_AUTH_SECRET) throw new Error(AuthMessage.NO_SECRET_DEFINED)
    const tokenDecoded = jwt.verify(token, process.env.GAC_AUTH_SECRET)
    if (typeof tokenDecoded === 'string' || tokenDecoded === null) return null
    return tokenDecoded as JwtPayload
  } catch (err) {
    console.log('verifyJwt error ==> ', err)
    return null
  }
}
