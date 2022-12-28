import { container } from '../../utility/ioc'
import { mockInstitutionRepository } from 'test/utility/mocks/repositories/institution-repository.mock'
import { mockRoleRepository } from 'test/utility/mocks/repositories/role-repository.mock'
import { mockUserRoleRepository } from 'test/utility/mocks/repositories/user-role-repository.mock'
import { InstitutionController } from '@controllers/institution.controller'
import {
  InstitutionRepository,
  InstitutionToken
} from 'src/repositories/interfaces/institution.repository'
import { UserRoleRepository, UserRoleToken } from 'src/repositories/interfaces/user-role.repository'
import { RoleRepository, RoleToken } from 'src/repositories/interfaces/role.respository'
import { Roles } from '@core/interfaces/roles'
import { fakeRole } from '@test/utility/fakes/entities/role.fake'
import { fakeUserRole } from '@test/utility/fakes/entities/user-role.fake'
import { ControllerResponse } from '@core/interfaces/controller'
import { AuthMessage } from '@core/messages/auth.messages'
import { fakeInstitution } from '@test/utility/fakes/entities/institution.fake'
import { InstitutionMessage } from '@core/messages/institution.messages'
import { RoleMessage } from '@core/messages/role.messages'

describe('Institution Controller', () => {
  beforeAll(() => {
    container.bind(InstitutionToken).toConstantValue(mockInstitutionRepository)
    container.bind(UserRoleToken).toConstantValue(mockUserRoleRepository)
    container.bind(RoleToken).toConstantValue(mockRoleRepository)
  })

  describe('Approve institution', () => {
    test('Should update institution status to active and create a user role to the owner when he doesn´t have a manager role', async () => {
      jest
        .spyOn(container.get<InstitutionRepository>(InstitutionToken), 'findOne')
        .mockResolvedValueOnce({
          ...fakeInstitution,
          id: 1,
          status: 'pending'
        })
      const input = { institutionId: 1 }
      const controller = container.get(InstitutionController)
      const result = await controller.approveRegister(input)
      expect(result.statusCode).toBe(200)
      expect(result.json).toStrictEqual({ id: 1 })
    })

    test('Should return statusCode 400 with message: "INSTITUTION_ALREADY_ACTIVED"', async () => {
      const input = { institutionId: 1 }
      const controller = container.get(InstitutionController)
      const result = await controller.approveRegister(input)
      expect(result.statusCode).toBe(400)
      expect(result.json).toStrictEqual({ message: InstitutionMessage.ALREADY_ACTIVE })
    })
  })

  describe('Update institution', () => {
    test('Should return statusCode 204 and update method must be called with description and name data params', async () => {
      const input = {
        institutionId: 1,
        userId: 1,
        description: 'Description',
        name: 'Institution'
      }
      jest
        .spyOn(container.get<UserRoleRepository>(UserRoleToken), 'getByUserId')
        .mockResolvedValueOnce([
          {
            ...fakeUserRole,
            institutionId: 1,
            role: { ...fakeRole, name: Roles.MANAGER }
          }
        ])
      const updateSpy = jest.spyOn(container.get<InstitutionRepository>(InstitutionToken), 'update')
      const controller = container.get(InstitutionController)
      const result = await controller.update(input)
      expect(result.statusCode).toBe(204)
      expect(updateSpy).toBeCalledWith(input.institutionId, {
        description: 'Description',
        name: 'Institution'
      })
    })

    test('Should return statusCode 403 with message: "USER_ARE_NOT_AUTHORIZED"', async () => {
      const input = {
        institutionId: 1,
        userId: 1,
        description: 'Description',
        name: 'Institution'
      }
      jest
        .spyOn(container.get<UserRoleRepository>(UserRoleToken), 'getByUserId')
        .mockResolvedValueOnce([
          {
            ...fakeUserRole,
            institutionId: 2,
            role: { ...fakeRole, name: Roles.MANAGER }
          }
        ])
      const controller = container.get(InstitutionController)
      const result = await controller.update(input)
      expect(result).toStrictEqual<ControllerResponse>({
        statusCode: 403,
        json: { message: AuthMessage.USER_IS_NOT_AUTHORIZED }
      })
    })
  })
})
