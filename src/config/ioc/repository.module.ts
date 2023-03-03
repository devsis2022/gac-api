import { ContainerModule, interfaces } from 'inversify'
import { PrismaActivityRepository } from 'src/repositories/activity.repository'
import { PrismaAnnouncementRepository } from 'src/repositories/announcement.repository'
import { PrismaCourseRepository } from 'src/repositories/course.repository'
import { PrismaInstitutionRepository } from 'src/repositories/institution.repository'
import { ActivityToken } from 'src/repositories/interfaces/activity.repository'
import { AnnouncementToken } from 'src/repositories/interfaces/announcement.repository'
import { CourseToken } from 'src/repositories/interfaces/course.repository'
import { InstitutionToken } from 'src/repositories/interfaces/institution.repository'
import { RoleToken } from 'src/repositories/interfaces/role.respository'
import { UserRecoveryToken } from 'src/repositories/interfaces/user-recovery.recovery'
import { UserRegistrationToken } from 'src/repositories/interfaces/user-registration.repository'
import { UserRoleToken } from 'src/repositories/interfaces/user-role.repository'
import { UserToken } from 'src/repositories/interfaces/user.repository'
import { PrismaRoleRepository } from 'src/repositories/role.repository'
import { PrismaUserRecoveryRepository } from 'src/repositories/user-recovery.repository'
import { PrismaUserRegistrationRepository } from 'src/repositories/user-registration.repository'
import { PrismaUserRoleRepository } from 'src/repositories/user-role.repository'
import { PrismaUserRepository } from 'src/repositories/user.repository'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserToken).to(PrismaUserRepository)
  bind(InstitutionToken).to(PrismaInstitutionRepository)
  bind(UserRoleToken).to(PrismaUserRoleRepository)
  bind(RoleToken).to(PrismaRoleRepository)
  bind(CourseToken).to(PrismaCourseRepository)
  bind(UserRegistrationToken).to(PrismaUserRegistrationRepository)
  bind(UserRecoveryToken).to(PrismaUserRecoveryRepository)
  bind(AnnouncementToken).to(PrismaAnnouncementRepository)
  bind(ActivityToken).to(PrismaActivityRepository)
})
