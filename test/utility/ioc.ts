import 'reflect-metadata'
import { container } from '@config/ioc/inversifyConfig'
import { controllerModule } from '@config/ioc/controller.module'
import { prismaClientToken } from '@config/prisma-client'
import { mockPrismaClient } from './mocks/repositories/prisma-client.mock'

container.unbindAll()
container.bind(prismaClientToken).toConstantValue(mockPrismaClient)
container.load(controllerModule)
export { container }
