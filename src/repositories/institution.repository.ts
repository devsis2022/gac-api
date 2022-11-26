import { injectable } from 'inversify'
import { Institution, PrismaClient } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/createInstitutionDto'

@injectable()
export class InstitutionRepository {
  private prisma = new PrismaClient()

  async create(input: InputCreateInstitutionDTO): Promise<Institution> {
    return this.prisma.institution.create({ data: input })
  }
}
