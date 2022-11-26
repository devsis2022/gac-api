import { Container } from 'inversify'
import { controllerModule } from './controller.module'
import { repositoryModule } from './repository.module'

const container = new Container()

container.load(controllerModule)
container.load(repositoryModule)

export { container }
