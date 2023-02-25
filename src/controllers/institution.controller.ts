import { prismaClientToken } from '@config/prisma-client'
import { ControllerResponse } from '@core/interfaces/controller'
import { IError } from '@core/interfaces/error'
import { AuthMessage } from '@core/messages/auth.messages'
import { InstitutionStatus, Prisma, PrismaClient, Role, UserRole } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Roles } from 'src/core/interfaces/roles'
import { InstitutionMessage } from 'src/core/messages/institution.messages'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'
import { RoleMessage } from 'src/core/messages/role.messages'
import {
  OutputAudienceInstitutionDto,
  InputAudienceInstitutionDto
} from 'src/dto/institution/approve.dto'
import {
  InputCreateInstitutionDTO,
  OutputCreateInstitutionDTO
} from 'src/dto/institution/create.dto'
import { InputDeleteInstitutionDto, OutputDeleteInstitution } from 'src/dto/institution/delete.dto'
import {
  InputGetInstitutionByIdDto,
  OutputGetInstitutionByIdDto
} from 'src/dto/institution/get-by-id.dto'
import { InputListInstitutionsDto, OutputListInstitutionsDto } from 'src/dto/institution/list.dto'
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

  async requestRegister({
    userId,
    ...input
  }: InputCreateInstitutionDTO): Promise<ControllerResponse<OutputCreateInstitutionDTO>> {
    try {
      console.log(input)
      const institution = await this.institutionRepository.create({
        ...input,
        managerId: Number(userId)
      })
      return { statusCode: 201, json: { id: institution.id } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: PersistenceMessages.FAILED_TO_CREATE_ENTITY } }
    }
  }

  async approveRegister(
    input: InputAudienceInstitutionDto
  ): Promise<ControllerResponse<OutputAudienceInstitutionDto>> {
    let error: { statusCode: number; json: IError } | null = null
    try {
      const institution = await this.institutionRepository.findOne(Number(input.institutionId))
      if (!institution) {
        return { statusCode: 404, json: { message: InstitutionMessage.NOT_FOUND } }
      }
      if (institution.status === InstitutionStatus.active) {
        return { statusCode: 400, json: { message: InstitutionMessage.ALREADY_ACTIVE } }
      }
      await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await this.institutionRepository.activate(institution.id, { trx: tx })
        const userRoles = await this.userRolesRepository.getByUserId(institution.managerId)
        if (
          userRoles.find(
            (userRole) =>
              userRole.role.name === Roles.MANAGER && userRole.institutionId === institution.id
          ) === undefined
        ) {
          const role = await this.roleRepository.getByName(Roles.MANAGER)
          if (!role) {
            error = { statusCode: 404, json: { message: RoleMessage.NOT_FOUND } }
            throw new Error('')
          }
          await this.userRolesRepository.create({
            institutionId: institution.id,
            userId: institution.managerId,
            roleId: role.id
          })
        }
      })

      return { statusCode: 200, json: { id: institution.id } }
    } catch (err) {
      console.log(err)
      if (error) {
        return error
      }
      return { statusCode: 500, json: { message: InstitutionMessage.UPDATE_ERROR } }
    }
  }

  async reproveRegister(
    input: InputAudienceInstitutionDto
  ): Promise<ControllerResponse<OutputAudienceInstitutionDto>> {
    try {
      const institution = await this.institutionRepository.findOne(Number(input.institutionId))
      if (!institution) {
        return { statusCode: 404, json: { message: InstitutionMessage.NOT_FOUND } }
      }
      if (institution.status === InstitutionStatus.active) {
        return { statusCode: 400, json: { message: InstitutionMessage.ALREADY_ACTIVE } }
      }
      await this.institutionRepository.repprove(institution.id)
      return { statusCode: 200, json: { id: institution.id } }
    } catch (error) {
      return { statusCode: 500, json: { message: InstitutionMessage.UPDATE_ERROR } }
    }
  }

  async update({
    userId,
    institutionId,
    ...input
  }: InputUpdateInstitution): Promise<ControllerResponse<OutputUpdateInstitution>> {
    try {
      const userRoles = await this.userRolesRepository.getByUserId(userId)
      if (!this.isCurrentInstitutionManager(userRoles, Number(institutionId))) {
        return { statusCode: 403, json: { message: AuthMessage.USER_IS_NOT_AUTHORIZED } }
      }
      await this.institutionRepository.update(Number(institutionId), input)
      return { statusCode: 204, json: undefined }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: InstitutionMessage.UPDATE_ERROR } }
    }
  }

  async delete({
    userId,
    institutionId
  }: InputDeleteInstitutionDto): Promise<ControllerResponse<OutputDeleteInstitution>> {
    try {
      const userRoles = await this.userRolesRepository.getByUserId(Number(userId))
      if (!this.isCurrentInstitutionManager(userRoles, Number(institutionId))) {
        return { statusCode: 403, json: { message: AuthMessage.USER_IS_NOT_AUTHORIZED } }
      }
      await this.institutionRepository.delete(Number(institutionId))
      return { statusCode: 204, json: undefined }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: InstitutionMessage.DELETE_ERROR } }
    }
  }

  async list(
    input: InputListInstitutionsDto
  ): Promise<ControllerResponse<OutputListInstitutionsDto>> {
    try {
      const { page = 1, count = 10, status = 'pending' } = input
      const institutions = await this.institutionRepository.list({ page, count, status })
      return { statusCode: 200, json: { page, count: institutions.length, data: institutions } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: InstitutionMessage.LIST_ERROR } }
    }
  }

  async getById(
    input: InputGetInstitutionByIdDto
  ): Promise<ControllerResponse<OutputGetInstitutionByIdDto>> {
    try {
      const institution = await this.institutionRepository.findOne(Number(input.institutionId), {
        relations: true
      })
      if (!institution) return { statusCode: 404, json: { message: InstitutionMessage.NOT_FOUND } }
      Reflect.deleteProperty(institution.manager, 'password')
      return { statusCode: 200, json: institution }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: InstitutionMessage.GET_ERROR } }
    }
  }

  private isCurrentInstitutionManager(
    userRoles: Array<UserRole & { role: Role }>,
    institutionId: number
  ): boolean {
    return !!userRoles.find(
      (userRole) =>
        (userRole.role.name === Roles.MANAGER && userRole.institutionId === institutionId) ||
        userRole.role.name === Roles.ADMIN
    )
  }
}
