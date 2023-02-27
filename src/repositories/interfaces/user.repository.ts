import { Institution, Prisma, Role, User, UserRole } from '@prisma/client'
import { LoginDTO } from 'src/dto/auth/login.dto'
import { OutputListUsersDTO } from 'src/dto/user/list.dto'

export const UserToken = Symbol.for('UserRepository')

export interface UserRepository {
  findByEmailOrUsername(email: string, username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByUserToLogin(dto: LoginDTO): Promise<User | null>
  createUser(user: User): Promise<User>
  findById(userId: number): Promise<UserWithRelations>
  updatePassword(
    userId: number,
    password: string,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<any>
  findMany(input: { search: string }): Promise<OutputListUsersDTO>
}

export type UserWithRelations =
  | (User & {
      userRole: Array<UserRole & { institution: Institution | null; role: Role }> | null
    })
  | null
