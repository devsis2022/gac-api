import { Course } from '@prisma/client'

export interface InputListCoursesDTO {
  userId: number
  institutionId: string
  page?: string
  count?: string
  search?: string
}

export interface OutputListCoursesDTO {
  page: number
  count: number
  data: Course[]
}
