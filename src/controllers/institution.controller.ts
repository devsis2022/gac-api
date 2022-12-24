import { prismaClientToken } from '@config/prisma-client'
import { ControllerResponse } from '@core/interfaces/controller'
import { AuthMessage } from '@core/messages/auth.messages'
import { Prisma, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Roles } from 'src/core/interfaces/roles'
import { InstitutionMessage } from 'src/core/messages/institution.messages'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'
import { RoleMessage } from 'src/core/messages/role.messages'
import {
  OutputApproveInstitutionDto,
  InputApproveInstitutionDto
} from 'src/dto/institution/approve.dto'
import {
  InputCreateInstitutionDTO,
  OutputCreateInstitutionDTO
} from 'src/dto/institution/create.dto'
import { InputUpdateInstitution, OutputUpdateInstitution } from 'src/dto/institution/update.dto'
import {
  InstitutionRepository,
  InstitutionToken
} from 'src/repositories/interfaces/institution.repository'
import { RoleRepository, RoleToken } from 'src/repositories/interfaces/role.respository'
import { UserRoleRepository, UserRoleToken } from 'src/repositories/interfaces/user-role.repository'

@injectable()
export class InstitutionController {
  constructor(
    @inject(prismaClientToken) private prisma: PrismaClient,
    @inject(InstitutionToken) private institutionRepository: InstitutionRepository,
    @inject(UserRoleToken) private userRolesRepository: UserRoleRepository,
    @inject(RoleToken) private roleRepository: RoleRepository
  ) {}

  async requestRegister(
    input: InputCreateInstitutionDTO
  ): Promise<ControllerResponse<OutputCreateInstitutionDTO>> {
    try {
      const institution = await this.institutionRepository.create({
        ...input,
        managerId: Number(input.userId)
      })
      return { statusCode: 201, json: { id: institution.id } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: PersistenceMessages.FAILED_TO_CREATE_ENTITY } }
    }
  }

  async approveRegister(
    input: InputApproveInstitutionDto
  ): Promise<ControllerResponse<OutputApproveInstitutionDto>> {
    try {
      const institution = await this.institutionRepository.findOne(Number(input.institutionId))
      if (!institution) {
        return { statusCode: 404, json: { message: InstitutionMessage.NOT_FOUND } }
      }
      if (institution.status === 'active') {
        return { statusCode: 400, json: { message: InstitutionMessage.ALREADY_ACTIVE } }
      }
      const result: ControllerResponse | undefined = await this.prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          await this.institutionRepository.activate(institution.id, { trx: tx })
          const userRoles = await this.userRolesRepository.getByUserId(institution.managerId)
          if (userRoles.find((userRole) => userRole.role.name === Roles.MANAGER) === undefined) {
            const role = await this.roleRepository.getByName(Roles.MANAGER)
            if (!role) return { statusCode: 400, json: { message: RoleMessage.NOT_FOUND } }
            await this.userRolesRepository.create({
              userId: institution.managerId,
              roleId: role.id
            })
          }
        }
      )
      if (result?.statusCode) {
        return { statusCode: result.statusCode, json: result.json as { message: string } }
      }

      return { statusCode: 200, json: { id: institution.id } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: InstitutionMessage.UPDATE_ERROR } }
    }
  }

  async update({
    userId,
    id,
    ...input
  }: InputUpdateInstitution): Promise<ControllerResponse<OutputUpdateInstitution>> {
    try {
      const userRoles = await this.userRolesRepository.getByUserId(userId)
      const isCurrentInstitutionManager = userRoles.find(
        (userRole) => userRole.role.name === Roles.MANAGER && userRole.institutionId === id
      )
      if (!isCurrentInstitutionManager) {
        return { statusCode: 403, json: { message: AuthMessage.USER_ARE_NOT_AUTHORIZED } }
      }
      await this.institutionRepository.update(id, input)
      return { statusCode: 204, json: undefined }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: InstitutionMessage.UPDATE_ERROR } }
    }
  }
}
