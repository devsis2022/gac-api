import 'reflect-metadata'
import 'source-map-support/register'
import { controllerModule } from '@config/ioc/controller.module'
import { databaseModule } from '@config/ioc/database.module'
import { container } from '@config/ioc/inversifyConfig'

container.load(controllerModule)
container.load(databaseModule)

export { container }
