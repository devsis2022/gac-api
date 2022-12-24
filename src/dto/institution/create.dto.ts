import { Institution } from '@prisma/client'

export type InputCreateInstitutionDTO = Omit<Institution, 'id' | 'status'> & { userId: number }

export interface OutputCreateInstitutionDTO {
  id: number
}
