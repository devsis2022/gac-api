import { createHash } from 'crypto'

export const encryptMd5 = (value: string): string => {
  return createHash('md5').update(value).digest('hex')
}
