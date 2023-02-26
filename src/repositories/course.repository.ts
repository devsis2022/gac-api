import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { CourseRepository, CourseWithRelations } from './interfaces/course.repository'

@injectable()
export class PrismaCourseRepository implements CourseRepository {
  private prisma = new PrismaClient()

  async findManyByCoordinatorId(coordinatorId: number): Promise<CourseWithRelations[]> {
    return this.prisma.course.findMany({ where: { coordinatorId }, include: { institution: true } })
  }
}
