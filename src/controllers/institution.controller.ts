import { prismaClientToken } from '@config/prisma-client'
import { ControllerResponse } from '@core/interfaces/controller'
import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client'
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
import { InstitutionRepository } from 'src/repositories/institution.repository'
import { RoleRepository } from 'src/repositories/role.repository'
import { UserRoleRepository } from 'src/repositories/user-role.repository'

@injectable()
export class InstitutionController {
  constructor(
    @inject(prismaClientToken) private prisma: PrismaClient,
    @inject(InstitutionRepository) private institutionRepository: InstitutionRepository,
    @inject(UserRoleRepository) private userRolesRepository: UserRoleRepository,
    @inject(RoleRepository) private roleRepository: RoleRepository
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
      const result: ControllerResponse | void = await this.prisma.$transaction(
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
      if (!!result?.statusCode) {
        return { statusCode: result.statusCode, json: result.json as { message: string } }
      }

      return { statusCode: 200, json: { id: institution.id } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: InstitutionMessage.UPDATE_ERROR } }
    }
  }
}
