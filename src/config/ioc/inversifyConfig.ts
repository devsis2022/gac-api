import { Container } from 'inversify'
import { controllerModule } from './controllerModule'

const container = new Container()

container.load(controllerModule)

export { container }
