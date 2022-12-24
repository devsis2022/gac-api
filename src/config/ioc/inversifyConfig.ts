import { Container } from 'inversify'
import { controllerModule } from './controller.module'
import { databaseModule } from './database.module'
import { repositoryModule } from './repository.module'
import { serviceModule } from './service.module'

const container = new Container()

container.load(controllerModule)
container.load(serviceModule)
container.load(repositoryModule)
container.load(databaseModule)

export { container }
