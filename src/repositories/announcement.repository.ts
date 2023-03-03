import { Announcement, AnnouncementStatus, Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { AnnouncementRepository } from './interfaces/announcement.repository'

@injectable()
export class PrismaAnnouncementRepository implements AnnouncementRepository {
  private prisma = new PrismaClient()

  async listByCourse(input: {
    institutionId: number
    courseId: number
    status?: AnnouncementStatus
  }): Promise<Announcement[]> {
    const whereOptions: Prisma.AnnouncementWhereInput[] = [
      { institutionId: input.institutionId },
      { class: { some: { courseId: input.courseId } } }
    ]
    if (input.status) whereOptions.push({ status: input.status })

    return this.prisma.announcement.findMany({
      where: {
        AND: whereOptions
      }
    })
  }

  async create(
    input: { name: string; institutionId: number },
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Announcement> {
    const prisma = options?.trx ?? this.prisma
    return prisma.announcement.create({
      data: { name: input.name, status: 'ACTIVE', institutionId: input.institutionId }
    })
  }
}
