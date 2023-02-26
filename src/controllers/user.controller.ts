import { ControllerResponse } from '@core/interfaces/controller'
import { Roles } from '@core/interfaces/roles'
import { UserMessage } from '@core/messages/user.message'
import { inject, injectable } from 'inversify'
import { FormatedRoles, InputShowMeDTO, OutputShowMeDTO } from 'src/dto/user/show-me.dto'
import { CourseRepository, CourseToken } from 'src/repositories/interfaces/course.repository'
import {
  InstitutionRepository,
  InstitutionToken
} from 'src/repositories/interfaces/institution.repository'
import {
  UserRegistrationRepository,
  UserRegistrationToken
} from 'src/repositories/interfaces/user-registration.repository'
import { UserRepository, UserToken } from 'src/repositories/interfaces/user.repository'

@injectable()
export class UserController {
  constructor(
    @inject(UserToken) private userRepository: UserRepository,
    @inject(InstitutionToken) private institutionRepository: InstitutionRepository,
    @inject(CourseToken) private courseRepository: CourseRepository,
    @inject(UserRegistrationToken) private userRegistrationRepository: UserRegistrationRepository
  ) {}

  async showMe(input: InputShowMeDTO): Promise<ControllerResponse<OutputShowMeDTO>> {
    try {
      const userData = await this.userRepository.findById(input.userId)
      if (!userData) {
        return { statusCode: 404, json: { message: UserMessage.USER_NOT_FOUND } }
      }
      const { userRole: userRoles, ...user } = userData
      Reflect.deleteProperty(user, 'password')
      const roles: FormatedRoles[] = []
      if (!userRoles) return { statusCode: 200, json: { user, roles } }
      if (userRoles.find((userRole) => userRole.role.name === Roles.ADMIN)) {
        roles.push({
          name: Roles.ADMIN
        })
      }
      if (userRoles.find((userRole) => userRole.role.name === Roles.MANAGER)) {
        const managerInstitutions = await this.institutionRepository.findManyByManagerId(
          input.userId
        )
        managerInstitutions.forEach((institution) => {
          roles.push({
            name: Roles.MANAGER,
            institutionId: institution.id,
            institutionName: institution.name,
            institutionNickname: institution.nickname
          })
        })
      }
      if (userRoles.find((userRole) => userRole.role.name === Roles.COORDINATOR)) {
        const coordinatorCourses = await this.courseRepository.findManyByCoordinatorId(input.userId)
        coordinatorCourses.forEach((course) => {
          roles.push({
            name: Roles.COORDINATOR,
            institutionId: course.institutionId,
            institutionName: course.institution.name,
            institutionNickname: course.institution.nickname,
            courseId: course.id,
            courseName: course.name
          })
        })
      }
      if (userRoles.find((userRole) => userRole.role.name === Roles.STUDENT)) {
        const registrations = await this.userRegistrationRepository.getManyByStudentId(input.userId)
        registrations.forEach((registration) => {
          roles.push({
            name: Roles.STUDENT,
            institutionId: registration.classUser?.class.course.institutionId,
            institutionName: registration.classUser?.class.course.institution.name,
            institutionNickname: registration.classUser?.class.course.institution.nickname,
            registrationId: registration.id,
            courseId: registration.classUser?.class.course.id,
            courseName: registration.classUser?.class.course.name
          })
        })
      }
      return { statusCode: 200, json: { user, roles } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: UserMessage.USER_GET_INFORMATION } }
    }
  }
}
