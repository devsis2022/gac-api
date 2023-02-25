import { injectable } from 'inversify'
import { Institution, Prisma, PrismaClient } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'
import {
  InstitutionRepository,
  InstitutionWithRelations,
  ListOptions
} from './interfaces/institution.repository'

@injectable()
export class PrismaInstitutionRepository implements InstitutionRepository {
  private prisma = new PrismaClient()

  async create(
    input: InputCreateInstitutionDTO,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Institution> {
    const prisma = options?.trx ?? this.prisma
    return prisma.institution.create({ data: input })
  }

  async findOne(id: number): Promise<InstitutionWithRelations | null> {
    return this.prisma.institution.findUnique({ where: { id }, include: { manager: true } })
  }

  async activate(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution> {
    const prisma = options?.trx ?? this.prisma
    return prisma.institution.update({ where: { id }, data: { status: 'active' } })
  }

  async repprove(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution> {
    const prisma = options?.trx ?? this.prisma
    return prisma.institution.update({ where: { id }, data: { status: 'repproved' } })
  }

  async update(id: number, data: Partial<Institution>): Promise<Institution> {
    return this.prisma.institution.update({ where: { id }, data })
  }

  async delete(id: number): Promise<Institution> {
    return this.prisma.institution.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    })
  }

  async list(input: ListOptions): Promise<Institution[]> {
    return this.prisma.institution.findMany({
      skip: (input.page - 1) * input.count,
      take: input.count,
      where: { status: input.status },
      orderBy: { updatedAt: 'desc' }
    })
  }
}
