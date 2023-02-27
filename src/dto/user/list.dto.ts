import { User } from '@prisma/client'

export interface InputListUsersDTO {
  userId: number
  search: string
}

export type OutputListUsersDTO = Array<Pick<User, 'id' | 'email' | 'name' | 'username'>>
