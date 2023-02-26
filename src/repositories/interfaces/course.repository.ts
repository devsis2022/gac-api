import { Course, Institution } from '@prisma/client'

export const CourseToken = Symbol.for('CourseRepository')

export interface CourseRepository {
  findManyByCoordinatorId(coordinatorId: number): Promise<CourseWithRelations[]>
}

export type CourseWithRelations = Course & {
  institution: Institution
}
