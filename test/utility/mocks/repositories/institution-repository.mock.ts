import { Institution } from '@prisma/client'
import { InputCreateInstitutionDTO } from 'src/dto/institution/create.dto'
import { InstitutionRepository } from 'src/repositories/interfaces/institution.repository'
import { fakeInstitution } from 'test/utility/fakes/entities/institution.fake'

export const mockInstitutionRepository: jest.Mocked<InstitutionRepository> = {
  create: jest.fn().mockImplementation((input: InputCreateInstitutionDTO) => ({
    ...fakeInstitution,
    name: input.name,
    nickname: input.nickname,
    description: input.description,
    status: 'pending'
  })),
  activate: jest.fn().mockImplementation((id: number) => ({ ...fakeInstitution, id })),
  findOne: jest.fn().mockImplementation((id: number) => ({ ...fakeInstitution, id })),
  update: jest.fn().mockImplementation((id: number, data: Partial<Institution>) => ({
    ...fakeInstitution,
    data,
    id
  }))
}
