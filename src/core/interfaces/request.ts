import { Request } from 'express'

export interface IRequest<body = any> extends Request<{}, {}, body> {}
