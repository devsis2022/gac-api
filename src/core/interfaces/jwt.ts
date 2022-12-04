import jwt from 'jsonwebtoken'

export type JwtPayload = jwt.JwtPayload & { id: number }
