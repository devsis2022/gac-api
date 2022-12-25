import 'reflect-metadata'
import { container } from '@config/ioc/inversifyConfig'
import { controllerModule } from '@config/ioc/controller.module'
import { databaseModule } from '@config/ioc/database.module'

container.unbindAll()
container.load(controllerModule)
container.load(databaseModule)

export { container }
