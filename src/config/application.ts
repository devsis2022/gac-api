import Express, { json } from 'express'
import cors from 'cors'
import swagger from 'swagger-ui-express'
import * as swaggerConfig from '../../swagger.json'
import { authRoutes } from '@routes/auth.routes'
import { routes as institutionRoutes } from '@routes/institutions.routes'
import { userRoutes } from '@routes/user.routes'

export class Application {
  private express: Express.Application

  constructor() {
    this.express = Express()
    this.express.use(json())
    this.express.use(cors())
    this.express.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig))
    this.initRoutes()
  }

  private initRoutes(): void {
    this.express.use('/auth', authRoutes)
    this.express.use('/institution', institutionRoutes)
    this.express.use('/user', userRoutes)
  }

  init(): void {
    const PORT = process.env.PORT ?? 3000
    this.express.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  }
}
