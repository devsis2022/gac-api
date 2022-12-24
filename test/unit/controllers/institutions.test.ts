import { container } from '../../utility/ioc'
import { InstitutionToken } from 'src/repositories/interfaces/institution.repository'
import { RoleToken } from 'src/repositories/interfaces/role.respository'
import { UserRoleToken } from 'src/repositories/interfaces/user-role.repository'
import { mockInstitutionRepository } from 'test/utility/mocks/repositories/institution-repository.mock'
import { mockRoleRepository } from 'test/utility/mocks/repositories/role-repository.mock'
import { mockUserRoleRepository } from 'test/utility/mocks/repositories/user-role-repository.mock'
import { InstitutionController } from '@controllers/institution.controller'

describe('Institution Controller', () => {
  beforeAll(() => {
    container.bind(InstitutionController).toSelf()
    container.bind(InstitutionToken).toConstantValue(mockInstitutionRepository)
    container.bind(UserRoleToken).toConstantValue(mockUserRoleRepository)
    container.bind(RoleToken).toConstantValue(mockRoleRepository)
  })
  describe('Update institution', () => {})
})
