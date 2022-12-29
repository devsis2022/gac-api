import { User } from '@prisma/client'
import { LoginDTO } from 'src/dto/auth/login.dto'
import { UserRepository } from 'src/repositories/interfaces/user.repository'
import { fakeUser } from 'test/utility/fakes/entities/user.fake'

export const mockUserRepository: jest.Mocked<UserRepository> = {
  createUser: jest
    .fn()
    .mockImplementation(async (user: User): Promise<User> => ({ ...fakeUser, ...user })),
  findByEmailOrUsername: jest.fn().mockImplementation(
    async (email: string, username: string): Promise<User | null> => ({
      ...fakeUser,
      email,
      username
    })
  ),
  findByUserAndPassword: jest
    .fn()
    .mockImplementation(async (dto: LoginDTO): Promise<User | null> => ({ ...fakeUser, ...dto }))
}
