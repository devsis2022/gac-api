import { Prisma, Recovery } from '@prisma/client'
import { InputCreateRecoveryDTO } from 'src/dto/auth/recovery-create'
import { InputUpdateRecoveryDTO } from 'src/dto/auth/recovery-update'

export const UserRecoveryToken = Symbol.for('UserRecoveryRepository')

export interface UserRecoveryRepository {
  deleteByUserId(userId: number, options?: { trx?: Prisma.TransactionClient }): Promise<Recovery>
  findByUserId(userId: number): Promise<Recovery | null>
  findByUserEmailAndCode(email: string, code: number): Promise<Recovery | null>
  create(input: InputCreateRecoveryDTO): Promise<Recovery>
  update(userId: number, input: InputUpdateRecoveryDTO): Promise<Recovery>
}
