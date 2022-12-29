import { RoleRepository } from 'src/repositories/interfaces/role.respository'
import { fakeRole } from 'test/utility/fakes/entities/role.fake'

export const mockRoleRepository: jest.Mocked<RoleRepository> = {
  getByName: jest.fn().mockReturnValue(fakeRole)
}
