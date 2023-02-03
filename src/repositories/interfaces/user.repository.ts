import { User } from '@prisma/client'
import { LoginDTO } from 'src/dto/auth/login.dto'

export const UserToken = Symbol.for('UserRepository')

export interface UserRepository {
  findByEmailOrUsername(email: string, username: string): Promise<User | null>
  findByUserToLogin(dto: LoginDTO): Promise<User | null>
  createUser(user: User): Promise<User>
}
