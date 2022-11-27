import { prismaClientToken } from '@config/prismaClient'
import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client'
import { Response } from 'express'
import { inject, injectable } from 'inversify'
import { IRequest } from 'src/core/interfaces/request'
import { IResponse } from 'src/core/interfaces/response'
import { Roles } from 'src/core/interfaces/roles'
import { InstitutionMessage } from 'src/core/messages/institution.messages'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'
import { RoleMessage } from 'src/core/messages/role.messages'
import {
  OutputApproveInstitutionDto,
  ParamsApproveInstitutionDto
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
    req: IRequest<InputCreateInstitutionDTO>,
    res: Response
  ): Promise<IResponse<OutputCreateInstitutionDTO>> {
    try {
      const institution = await this.institutionRepository.create({
        ...req.body,
        managerId: Number(req.userId)
      })
      return res.status(201).json({ id: institution.id })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: PersistenceMessages.FAILED_TO_CREATE_ENTITY })
    }
  }

  async approveRegister(
    req: IRequest<{}, ParamsApproveInstitutionDto>,
    res: Response
  ): Promise<IResponse<OutputApproveInstitutionDto>> {
    try {
      const institution = await this.institutionRepository.findOne(Number(req.params.institutionId))
      if (!institution) {
        return res.status(404).json({ message: InstitutionMessage.NOT_FOUND })
      }
      if (institution.status === 'active') {
        return res.status(400).json({ message: InstitutionMessage.ALREADY_ACTIVE })
      }
      await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await this.institutionRepository.activate(institution.id, { trx: tx })
        const userRoles = await this.userRolesRepository.getByUserId(institution.managerId)
        if (userRoles.find((userRole) => userRole.role.name === Roles.MANAGER) === undefined) {
          const role = await this.roleRepository.getByName(Roles.MANAGER)
          if (!role) return res.status(400).json({ message: RoleMessage.NOT_FOUND })
          await this.userRolesRepository.create({
            userId: institution.managerId,
            roleId: role.id
          })
        }
      })
      return res.status(200).json({ id: institution.id })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: InstitutionMessage.UPDATE_ERROR })
    }
  }
}
