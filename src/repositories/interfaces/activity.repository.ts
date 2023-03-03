import { Activity, Prisma } from '@prisma/client'
import { InputActivity } from 'src/dto/announcement/create.dto'

export const ActivityToken = Symbol.for('ActivityRepository')

export interface ActivityRepository {
  createMany(
    input: { data: InputActivity[]; announcementId: number },
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<{ count: number }>
}
