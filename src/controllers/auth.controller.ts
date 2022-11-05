import { Request, Response } from "express";

class Controller {

    async login(req: Request, res: Response) {
        res.json({ token: 'OASIFJOAISJFAOJF SOFHJoxvosjapjkdosjaODJsaop' })
    }

}

const AuthController = new Controller();

export { AuthController }