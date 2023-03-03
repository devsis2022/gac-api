import { Announcement } from '@prisma/client'

export interface InputListAnnouncementsDTO {
  page?: string
  count?: string
  userId: number
  institutionId: string
  status?: string
}

export interface OutputListAnnouncementsDTO {
  page: number
  count: number
  data: Announcement[]
}
