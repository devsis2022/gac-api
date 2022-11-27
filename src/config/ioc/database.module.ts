import { prismaClient, prismaClientToken } from '@config/prismaClient'
import { ContainerModule, interfaces } from 'inversify'

export const databaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(prismaClientToken).toConstantValue(prismaClient)
})
