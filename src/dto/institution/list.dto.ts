import { Institution, InstitutionStatus } from '@prisma/client'

export interface InputListInstitutionsDto {
  page?: number
  count?: number
  status?: InstitutionStatus
  userId: number
}

export interface OutputListInstitutionsDto {
  page: number
  count: number
  data: Institution[]
}
