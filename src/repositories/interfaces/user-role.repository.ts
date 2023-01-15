import { Prisma, Role, UserRole, UserRoleStatus } from '@prisma/client'

export const UserRoleToken = Symbol.for('UserRoleRepository')

export interface UserRoleRepository {
  create(
    input: { userId: number; roleId: number; institutionId: number },
    options?: { trx: Prisma.TransactionClient }
  ): Promise<UserRole>
  getByUserId(userId: number, status?: UserRoleStatus[]): Promise<Array<UserRole & { role: Role }>>
}
