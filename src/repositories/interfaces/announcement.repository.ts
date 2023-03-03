import { Announcement, AnnouncementStatus, Prisma } from '@prisma/client'

export const AnnouncementToken = Symbol.for('AnnouncementRepository')

export interface AnnouncementRepository {
  listByCourse(input: {
    institutionId: number
    courseId: number
    status?: AnnouncementStatus
  }): Promise<Announcement[]>
  create(
    input: { name: string; institutionId: number },
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Announcement>
  list(input: {
    page: number
    count: number
    institutionId: number
    status?: AnnouncementStatus
  }): Promise<Announcement[]>
}
