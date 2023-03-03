import { Activity, Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { InputActivity } from 'src/dto/announcement/create.dto'
import { ActivityRepository } from './interfaces/activity.repository'

@injectable()
export class PrismaActivityRepository implements ActivityRepository {
  private prisma = new PrismaClient()

  async createMany(
    input: { data: InputActivity[]; announcementId: number },
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<{ count: number }> {
    const prisma = options?.trx ?? this.prisma
    const activities = input.data.map((activity) => ({
      ...activity,
      announcementId: input.announcementId
    }))
    return prisma.activity.createMany({ data: activities })
  }
}
