import { prismaClientToken } from '@config/prisma-client'
import { ControllerResponse } from '@core/interfaces/controller'
import { AnnouncementMessage } from '@core/messages/announcement.messages'
import { AuthMessage } from '@core/messages/auth.messages'
import { InstitutionMessage } from '@core/messages/institution.messages'
import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import {
  InputCreateAnnouncementDTO,
  OutputCreateAnnouncementDTO
} from 'src/dto/announcement/create.dto'
import { ActivityRepository, ActivityToken } from 'src/repositories/interfaces/activity.repository'
import {
  AnnouncementRepository,
  AnnouncementToken
} from 'src/repositories/interfaces/announcement.repository'
import {
  InstitutionRepository,
  InstitutionToken
} from 'src/repositories/interfaces/institution.repository'

@injectable()
export class AnnouncementController {
  constructor(
    @inject(prismaClientToken) private prisma: PrismaClient,
    @inject(AnnouncementToken) private announcementRepository: AnnouncementRepository,
    @inject(InstitutionToken) private institutionRepository: InstitutionRepository,
    @inject(ActivityToken) private activityRepository: ActivityRepository
  ) {}

  async create(
    input: InputCreateAnnouncementDTO
  ): Promise<ControllerResponse<OutputCreateAnnouncementDTO>> {
    try {
      const institution = await this.institutionRepository.findOne(Number(input.institutionId))
      if (!institution) return { statusCode: 404, json: { message: InstitutionMessage.NOT_FOUND } }
      if (institution.managerId !== input.userId)
        return { statusCode: 401, json: { message: AuthMessage.UNAUTHORIZED } }
      let announcementId = 0
      await this.prisma.$transaction(async (tx) => {
        const newAnnouncement = await this.announcementRepository.create(
          {
            name: `${new Date().getFullYear()}-${new Date().getMonth()}-${input.name}`,
            institutionId: Number(input.institutionId)
          },
          { trx: tx }
        )

        await this.activityRepository.createMany(
          {
            data: input.activities,
            announcementId: newAnnouncement.id
          },
          { trx: tx }
        )
        announcementId = newAnnouncement.id
      })
      return { statusCode: 201, json: { id: announcementId } }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: AnnouncementMessage.CREATE_ERROR } }
    }
  }
}
