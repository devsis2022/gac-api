import { Institution } from '@prisma/client'

export const fakeInstitution: Institution = {
  id: 1,
  name: 'fake-institution',
  description: '',
  managerId: 5,
  nickname: 'faker',
  status: 'active',
  createdAt: new Date('2022-12-24T13:00:00Z'),
  updatedAt: new Date('2022-12-24T13:00:00Z')
}
