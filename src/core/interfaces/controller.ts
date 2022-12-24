export interface ControllerResponse<T = unknown, D = { message: string }> {
  statusCode: number
  json: T | D
}

export type Controller = (input: any) => Promise<ControllerResponse>
