import { Class, ClassUser, Course, Institution, UserRegistration } from '@prisma/client'

export const UserRegistrationToken = Symbol.for('UserRegistrationRepository')

export interface UserRegistrationRepository {
  getManyByStudentId(studentId: number): Promise<UserRegistrationWithRelations[]>
}

export type UserRegistrationWithRelations = UserRegistration & {
  classUser:
    | (ClassUser & { class: Class & { course: Course & { institution: Institution } } })
    | null
}
