import { PrismaClient } from '@prisma/client'

export const prismaClientToken = Symbol.for('prismaClient')
export const prismaClient = new PrismaClient()
