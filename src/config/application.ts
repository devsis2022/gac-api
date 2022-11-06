import Express from 'express'
import { authRoutes } from '../routes/auth.routes'

export class Application {
  private express: Express.Application

  constructor() {
    this.express = Express()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.express.use('/auth', authRoutes)
  }

  init(): void {
    this.express.listen(process.env.PORT, () => {
      console.log('Server started')
    })
  }
}
