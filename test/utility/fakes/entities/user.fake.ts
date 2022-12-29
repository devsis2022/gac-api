import { User } from '@prisma/client'

export const fakeUser: User = {
  id: 1,
  cpf: '70494749083',
  email: 'user@mail.com.br',
  name: 'Deyverson Kleyson',
  password: 'fake-hashed-pass',
  username: 'user',
  createdAt: new Date('2022-12-24T13:00:00Z'),
  updatedAt: new Date('2022-12-24T13:00:00Z')
}
