import { Institution, InstitutionStatus, Prisma, User } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'

export const InstitutionToken = Symbol.for('InstitutionRepository')

export interface InstitutionRepository {
  create(
    input: Omit<InputCreateInstitutionDTO, 'userId'>,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Institution>
  findOne(id: number, options?: { relations?: boolean }): Promise<InstitutionWithRelations | null>
  activate(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution>
  repprove(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution>
  update(id: number, data: Partial<Institution>): Promise<Institution>
  delete(id: number): Promise<Institution>
  list(input: ListOptions): Promise<Institution[]>
  findManyByManagerId(managerId: number): Promise<Institution[]>
}

export interface ListOptions {
  page: number
  count: number
  status: InstitutionStatus
}

export type InstitutionWithRelations = Institution & {
  manager: User
}
