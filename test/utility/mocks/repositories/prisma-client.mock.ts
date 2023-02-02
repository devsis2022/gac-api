import { PrismaClient } from '@prisma/client'

export const mockPrismaClient: jest.Mocked<Partial<PrismaClient>> = {
  $transaction: jest.fn()
}
