import { Course, Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { InputCreateCourseDTO } from 'src/dto/course/create.dto'
import { CourseRepository, CourseWithRelations } from './interfaces/course.repository'

@injectable()
export class PrismaCourseRepository implements CourseRepository {
  private prisma = new PrismaClient()

  async findManyByCoordinatorId(coordinatorId: number): Promise<CourseWithRelations[]> {
    return this.prisma.course.findMany({ where: { coordinatorId }, include: { institution: true } })
  }

  async create(
    input: Omit<InputCreateCourseDTO, 'userId'>,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Course> {
    const prisma = options?.trx ?? this.prisma
    return prisma.course.create({ data: input })
  }

  async list(input: {
    page: number
    count: number
    institutionId: number
    search?: string
  }): Promise<Course[]> {
    const search = input.search ?? ''
    return this.prisma.course.findMany({
      where: {
        AND: [
          { institutionId: input.institutionId },
          { name: { startsWith: search, mode: 'insensitive' } }
        ]
      },
      take: input.count,
      skip: (input.page - 1) * input.count,
      orderBy: { name: 'asc' }
    })
  }
}
