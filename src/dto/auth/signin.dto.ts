import { User } from '@prisma/client'

export interface SigninDTO extends Omit<User, 'username' | 'id'> {
  username?: string
}
