import { Roles } from '@core/interfaces/roles'
import { User } from '@prisma/client'

export interface InputShowMeDTO {
  userId: number
}

export interface FormatedRoles {
  name: Roles
  institutionId?: number
  institutionName?: string
  institutionNickname?: string | null
  registrationId?: number
  courseId?: number
  courseName?: string
}

export interface OutputShowMeDTO {
  user: Omit<User, 'password'>
  roles: FormatedRoles[]
}
