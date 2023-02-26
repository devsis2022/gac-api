import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import {
  UserRegistrationRepository,
  UserRegistrationWithRelations
} from './interfaces/user-registration.repository'

@injectable()
export class PrismaUserRegistrationRepository implements UserRegistrationRepository {
  private prisma = new PrismaClient()

  async getManyByStudentId(studentId: number): Promise<UserRegistrationWithRelations[]> {
    return this.prisma.userRegistration.findMany({
      where: { userId: studentId },
      include: {
        classUser: {
          include: { class: { include: { course: { include: { institution: true } } } } }
        }
      }
    })
  }
}
