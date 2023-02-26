import { Recovery } from '@prisma/client'

export type InputCreateRecoveryDTO = Omit<Recovery, 'createdAt'>
