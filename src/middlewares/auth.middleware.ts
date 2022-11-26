import { container } from '@config/ioc/inversifyConfig'
import { NextFunction, Request, Response } from 'express'
import { Roles } from 'src/core/interfaces/roles'
import { AuthMessage } from 'src/core/messages/auth.messages'
import { UserRolesRepository } from 'src/repositories/user-roles.repository'
import * as tokenUtils from 'src/util/token.util'

export const authMiddleware = (allowedRoles: Array<`${Roles}`>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      return res.status(401).json({ message: AuthMessage.UNAUTHORIZED })

    const token = req.headers.authorization.split(' ')[1]
    const payload = tokenUtils.verifyJwt(token)

    if (payload === null) return res.status(401).json({ message: AuthMessage.UNAUTHORIZED })

    const roleRepository = container.get(UserRolesRepository)

    if (allowedRoles.length !== 0) {
      const userRoles = await roleRepository.getByUserId(payload.id)
      const userRolesArray = userRoles.map((userRole) => userRole.role.name)
      let isAllowed = false
      for (const role of allowedRoles) {
        if (userRolesArray.includes(role)) isAllowed = true
      }

      if (!isAllowed) return res.status(401).json({ message: AuthMessage.UNAUTHORIZED })
    }
    req.userId = String(payload.id)
    next()
  }
}
