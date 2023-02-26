import { User } from '@prisma/client'

export interface SigninDTO extends Omit<User, 'id' | 'username' | 'createdAt' | 'updatedAt'> {
  username?: string
}
