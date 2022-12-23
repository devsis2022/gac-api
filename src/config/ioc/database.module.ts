import { prismaClient, prismaClientToken } from '@config/prisma-client'
import { ContainerModule, interfaces } from 'inversify'

export const databaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(prismaClientToken).toConstantValue(prismaClient)
})
