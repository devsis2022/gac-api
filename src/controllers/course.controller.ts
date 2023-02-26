import { prismaClientToken } from '@config/prisma-client'
import { ControllerResponse } from '@core/interfaces/controller'
import { Roles } from '@core/interfaces/roles'
import { AuthMessage } from '@core/messages/auth.messages'
import { CourseMessage } from '@core/messages/course.messages'
import { InstitutionMessage } from '@core/messages/institution.messages'
import { RoleMessage } from '@core/messages/role.messages'
import { UserMessage } from '@core/messages/user.message'
import { Prisma, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { InputCreateCourseDTO, OutputCreateCourseDTO } from 'src/dto/course/create.dto'
import { CourseRepository, CourseToken } from 'src/repositories/interfaces/course.repository'
import {
  InstitutionRepository,
  InstitutionToken
} from 'src/repositories/interfaces/institution.repository'
import { RoleRepository, RoleToken } from 'src/repositories/interfaces/role.respository'
import { UserRoleRepository, UserRoleToken } from 'src/repositories/interfaces/user-role.repository'
import { UserRepository, UserToken } from 'src/repositories/interfaces/user.repository'

@injectable()
export class CourseController {
  constructor(
    @inject(prismaClientToken) private prisma: PrismaClient,
    @inject(CourseToken) private courseRepository: CourseRepository,
    @inject(UserToken) private userRepository: UserRepository,
    @inject(RoleToken) private roleRepository: RoleRepository,
    @inject(UserRoleToken) private userRoleRepository: UserRoleRepository,
    @inject(InstitutionToken) private institutionRepository: InstitutionRepository
  ) {}

  async create({
    userId,
    ...input
  }: InputCreateCourseDTO): Promise<ControllerResponse<OutputCreateCourseDTO>> {
    try {
      const institution = await this.institutionRepository.findOne(Number(input.institutionId))
      if (!institution) return { statusCode: 404, json: { message: InstitutionMessage.NOT_FOUND } }
      if (institution.managerId !== userId)
        return { statusCode: 401, json: { message: AuthMessage.UNAUTHORIZED } }
      const coordinator = await this.userRepository.findById(input.coordinatorId)
      if (!coordinator) return { statusCode: 404, json: { message: UserMessage.USER_NOT_FOUND } }
      const coordinatorRole = await this.roleRepository.getByName(Roles.COORDINATOR)
      if (!coordinatorRole) return { statusCode: 404, json: { message: RoleMessage.NOT_FOUND } }
      let courseId = 0
      await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const course = await this.courseRepository.create(
          { ...input, institutionId: Number(input.institutionId) },
          { trx: tx }
        )
        courseId = course.id
        await this.userRoleRepository.create(
          {
            userId: input.coordinatorId,
            institutionId: institution.id,
            roleId: coordinatorRole.id
          },
          { trx: tx }
        )
      })
      return { statusCode: 201, json: { id: courseId } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: CourseMessage.CREATE_ERROR } }
    }
  }
}
