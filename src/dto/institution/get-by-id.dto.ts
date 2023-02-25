import { User } from '@prisma/client'

export interface InputGetInstitutionByIdDto {
  institutionId: number
  userId: number
}

export interface OutputGetInstitutionByIdDto {
  id: number
  name: string
  nickname: string | null
  description: string | null
  managerId: number
  manager: User
}
