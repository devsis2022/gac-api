import { Role, UserRole } from '@prisma/client'
import { UserRoleRepository } from 'src/repositories/interfaces/user-role.repository'
import { fakeRole } from 'test/utility/fakes/entities/role.fake'
import { fakeUserRole } from 'test/utility/fakes/entities/user-role.fake'

export const mockUserRoleRepository: jest.Mocked<UserRoleRepository> = {
  create: jest.fn().mockImplementation(
    async (input: {
      userId: number
      roleId: number
      institutionId: number
    }): Promise<UserRole> => ({
      id: 1,
      institutionId: input.institutionId,
      roleId: input.roleId,
      userId: input.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  ),
  getByUserId: jest
    .fn()
    .mockImplementation(
      async (userId: number): Promise<Array<UserRole & { role: Role }>> => [
        { ...fakeUserRole, userId, role: fakeRole }
      ]
    )
}
