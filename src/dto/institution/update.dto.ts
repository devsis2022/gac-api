import { AuthPayload } from '@core/interfaces/authenticated'
import { Institution } from '@prisma/client'

export type InputUpdateInstitution = AuthPayload &
  Partial<Pick<Institution, 'name' | 'nickname' | 'description'>> &
  Pick<Institution, 'id'>

export type OutputUpdateInstitution = undefined
