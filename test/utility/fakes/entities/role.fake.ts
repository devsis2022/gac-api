import { Role } from '@prisma/client'

export const fakeRole: Role = {
  id: 1,
  name: 'FAKE',
  createdAt: new Date(),
  updatedAt: new Date()
}
