import { Institution, Prisma } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'

export const InstitutionToken = Symbol.for('InstitutionRepository')

export interface InstitutionRepository {
  create(
    input: InputCreateInstitutionDTO,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Institution>
  findOne(id: number): Promise<Institution | null>
  activate(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution>
  update(id: number, data: Partial<Institution>): Promise<Institution>
}
