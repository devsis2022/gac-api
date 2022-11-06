import { Request, Response } from 'express'

class Controller {
  async login(req: Request, res: Response): Promise<void> {
    res.json({ token: 'OASIFJOAISJFAOJF SOFHJoxvosjapjkdosjaODJsaop' })
  }
}

const AuthController = new Controller()

export { AuthController }
