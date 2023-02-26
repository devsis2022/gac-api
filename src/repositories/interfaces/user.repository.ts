import { Course, Institution, Role, User, UserRole } from '@prisma/client'
import { LoginDTO } from 'src/dto/auth/login.dto'

export const UserToken = Symbol.for('UserRepository')

export interface UserRepository {
  findByEmailOrUsername(email: string, username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByUserToLogin(dto: LoginDTO): Promise<User | null>
  createUser(user: User): Promise<User>
  findById(userId: number): Promise<UserWithRelations>
}

export type UserWithRelations =
  | (User & {
      userRole: Array<UserRole & { institution: Institution | null; role: Role }> | null
    })
  | null
