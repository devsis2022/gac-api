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
  }
}

export default new PrismaSeed()
