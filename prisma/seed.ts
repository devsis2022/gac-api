import { PrismaClient } from '@prisma/client'

export class PrismaSeed {
  private prisma = new PrismaClient()

  constructor() {
    void this.exec()
  }

  async exec(): Promise<void> {
    const seeds = ['admin', 'manager', 'coordinator', 'student'].map((role, index) => ({
      id: index + 1,
      name: role
    }))
    for (const seed of seeds) {
      await this.prisma.role.upsert({
        create: seed,
        update: seed,
        where: { id: seed.id }
      })
    }
    const users = [
      {
        cpf: '46508503049',
        email: 'admin@mail.com',
        name: 'Administrator',
        password: '21232f297a57a5a743894a0e4a801fc3', // admin
        username: 'admin',
        userRole: { create: { roleId: 1 } }
      }
    ]
    const promises = users.map((user) => {
      return this.prisma.user.create({
        data: { ...user }
      })
    })
    await Promise.all(promises)
  }
}

export default new PrismaSeed()
