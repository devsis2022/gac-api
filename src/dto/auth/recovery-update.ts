import { Recovery } from '@prisma/client'

export type InputUpdateRecoveryDTO = Omit<Recovery, 'userId'>
