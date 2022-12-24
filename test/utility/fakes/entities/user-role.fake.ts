import { UserRole } from '@prisma/client'

export const fakeUserRole: UserRole = {
  id: 1,
  institutionId: 2,
  roleId: 3,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
}
