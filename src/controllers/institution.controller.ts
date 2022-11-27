import { Response } from 'express'
import { inject, injectable } from 'inversify'
import { IRequest } from 'src/core/interfaces/request'
import { IResponse } from 'src/core/interfaces/response'
import { InstitutionMessage } from 'src/core/messages/institution.messages'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'
import {
  OutputApproveInstitutionDto,
  ParamsApproveInstitutionDto
} from 'src/dto/institution/approve.dto'
import {
  InputCreateInstitutionDTO,
  OutputCreateInstitutionDTO
} from 'src/dto/institution/create.dto'
import { InstitutionRepository } from 'src/repositories/institution.repository'

@injectable()
export class InstitutionController {
  constructor(
    @inject(InstitutionRepository) private institutionRepository: InstitutionRepository
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
      await this.institutionRepository.activate(institution.id)
      return res.status(200).json({ id: institution.id })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: InstitutionMessage.UPDATE_ERROR })
    }
  }
}
