import { Request } from 'express'

export interface IRequest<body = {}, params = {}> extends Request<params, {}, body> {}
