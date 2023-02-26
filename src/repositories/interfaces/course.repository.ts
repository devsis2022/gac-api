import { Course, Institution, Prisma } from '@prisma/client'
import { InputCreateCourseDTO } from 'src/dto/course/create.dto'

export const CourseToken = Symbol.for('CourseRepository')

export interface CourseRepository {
  findManyByCoordinatorId(coordinatorId: number): Promise<CourseWithRelations[]>
  create(
    input: Omit<InputCreateCourseDTO, 'userId'>,
    options?: { trx?: Prisma.TransactionClient }
  ): Promise<Course>
}

export type CourseWithRelations = Course & {
  institution: Institution
}
