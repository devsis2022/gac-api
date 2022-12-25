import { container } from '../../utility/ioc'
import { mockInstitutionRepository } from 'test/utility/mocks/repositories/institution-repository.mock'
import { mockRoleRepository } from 'test/utility/mocks/repositories/role-repository.mock'
import { mockUserRoleRepository } from 'test/utility/mocks/repositories/user-role-repository.mock'
import { InstitutionController } from '@controllers/institution.controller'
import { InstitutionToken } from 'src/repositories/interfaces/institution.repository'
import { UserRoleRepository, UserRoleToken } from 'src/repositories/interfaces/user-role.repository'
import { RoleToken } from 'src/repositories/interfaces/role.respository'
import { Roles } from '@core/interfaces/roles'
import { fakeRole } from '@test/utility/fakes/entities/role.fake'
import { fakeUserRole } from '@test/utility/fakes/entities/user-role.fake'

describe('Institution Controller', () => {
  beforeAll(() => {
    container.bind(InstitutionToken).toConstantValue(mockInstitutionRepository)
    container.bind(UserRoleToken).toConstantValue(mockUserRoleRepository)
    container.bind(RoleToken).toConstantValue(mockRoleRepository)
  })
  describe('Update institution', () => {
    test('Should return statusCode 204', async () => {
      jest
        .spyOn(container.get<UserRoleRepository>(UserRoleToken), 'getByUserId')
        .mockResolvedValueOnce([
          {
            ...fakeUserRole,
            institutionId: 1,
            role: { ...fakeRole, name: Roles.MANAGER }
          }
        ])
      const controller = container.get(InstitutionController)
      const result = await controller.update({
        id: 1,
        userId: 1,
        description: 'Description',
        name: 'Institution'
      })
      expect(result.statusCode).toBe(204)
    })
  })
})
