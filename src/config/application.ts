import { authRoutes } from '@routes/auth.routes'
import Express, { json } from 'express'

export class Application {
  private express: Express.Application

  constructor() {
    this.express = Express()
    this.express.use(json())
    this.initRoutes()
  }

  private initRoutes(): void {
    this.express.use('/auth', authRoutes)
  }

  init(): void {
    const PORT = process.env.PORT ?? 3000
    this.express.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  }
}
