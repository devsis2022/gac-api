import { Response } from 'express'
import { IError } from 'src/core/interfaces/error'

export interface ParamsApproveInstitutionDto {
  institutionId: number
}

export interface OutputApproveInstitutionDto {
  id: string
}
