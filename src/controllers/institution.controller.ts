import { Response } from 'express'
import { inject, injectable } from 'inversify'
import { IRequest } from 'src/core/interfaces/request'
import { PersistenceMessages } from 'src/core/messages/persistence.messages'
import {
  InputCreateInstitutionDTO,
  OutputCreateInstitutionDTO
} from 'src/dto/institution/createInstitutionDto'
import { InstitutionRepository } from 'src/repositories/institution.repository'

@injectable()
export class InstitutionController {
  constructor(
    @inject(InstitutionRepository) private institutionRepository: InstitutionRepository
  ) {}

  async requestRegister(
    req: IRequest<InputCreateInstitutionDTO>,
    res: Response
  ): Promise<OutputCreateInstitutionDTO> {
    try {
      const institution = await this.institutionRepository.create(req.body)
      return res.status(201).json({ id: institution.id })
    } catch (err) {
      return res.status(500).json({ message: PersistenceMessages.FAILED_TO_CREATE_ENTITY })
    }
  }
}
