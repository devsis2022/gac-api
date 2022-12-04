import { Request } from 'express'

export type IRequest<body = {}, params = { [key: string]: string }> = Request<params, {}, body>
