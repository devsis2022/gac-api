import { injectable } from 'inversify'
import { Institution, Prisma, PrismaClient } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'

@injectable()
export class InstitutionRepository {
  private prisma = new PrismaClient()

  async create(
    input: InputCreateInstitutionDTO,
    options?: { trx?: PrismaClient }
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
}
