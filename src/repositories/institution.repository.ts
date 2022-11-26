import { injectable } from 'inversify'
import { Institution, PrismaClient } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'

@injectable()
export class InstitutionRepository {
  private prisma = new PrismaClient()

  async create(input: InputCreateInstitutionDTO): Promise<Institution> {
    return this.prisma.institution.create({ data: input })
  }

  async findOne(id: number): Promise<Institution | null> {
    return this.prisma.institution.findUnique({ where: { id } })
  }

  async activate(id: number): Promise<Institution> {
    return this.prisma.institution.update({ where: { id }, data: { status: 'active' } })
  }
}
