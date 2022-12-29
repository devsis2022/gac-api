import { injectable } from 'inversify'
import { Institution, Prisma, PrismaClient } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'
import { InstitutionRepository } from './interfaces/institution.repository'

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

  async findOne(id: number): Promise<Institution | null> {
    return this.prisma.institution.findUnique({ where: { id } })
  }

  async activate(id: number, options?: { trx?: Prisma.TransactionClient }): Promise<Institution> {
    const prisma = options?.trx ?? this.prisma
    return prisma.institution.update({ where: { id }, data: { status: 'active' } })
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
}
