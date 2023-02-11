import { Controller } from '@core/interfaces/controller'
import { Handler, Request, Response } from 'express'

export function httpHandler(controller: Controller): Handler {
  return async (req: Request, res: Response): Promise<void> => {
    const input = {
      ...req.body,
      ...req.params,
      ...req.query,
      ...(req.userId && { userId: req.userId })
    }
    const result = await controller(input)
    res.status(result.statusCode).json(result.json)
  }
}
