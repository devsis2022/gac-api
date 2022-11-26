import { Institution } from '@prisma/client'
import { IError } from 'src/core/interfaces/error'

export type InputCreateInstitutionDTO = Omit<Institution, 'id' | 'status'>

export interface OutputCreateInstitutionDTO {
  id: string
}
