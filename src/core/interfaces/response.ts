import { Response } from 'express'
import { IError } from './error'

export type IResponse<T = any> = Response<T | { message: IError }>
