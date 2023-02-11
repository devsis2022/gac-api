import { Institution, InstitutionStatus, Prisma } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'

export const InstitutionToken = Symbol.for('InstitutionRepository')

export interface ListOptions {
  page: number
  count: number
  status: InstitutionStatus
}

export interface InstitutionRepository {
  create(
    input: Omit<InputCreateInstitutionDTO, 'userId'>,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Institution>
  findOne(id: number): Promise<Institution | null>
  activate(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution>
  repprove(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution>
  update(id: number, data: Partial<Institution>): Promise<Institution>
  delete(id: number): Promise<Institution>
  list(input: ListOptions): Promise<Institution[]>
}
