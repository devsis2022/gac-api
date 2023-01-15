import { ControllerResponse } from '@core/interfaces/controller'
import { ManagerMessage } from '@core/messages/manager.messages'
import { inject, injectable } from 'inversify'
import { InputInviteNewManager, OutputInviteNewManager } from 'src/dto/manager/inviteNewManager'
import { UserRoleRepository, UserRoleToken } from 'src/repositories/interfaces/user-role.repository'
import { UserRepository, UserToken } from 'src/repositories/interfaces/user.repository'

@injectable()
export class ManagerController {
  constructor(
    @inject(UserToken) private userRepository: UserRepository,
    @inject(UserRoleToken) private userRolesRepository: UserRoleRepository
  ) {}

  async inviteNewManager(
    input: InputInviteNewManager
  ): Promise<ControllerResponse<OutputInviteNewManager>> {
    try {
      // resgatar institutionId do usuário já gestor da instituição

      // criar um registro de usuário gestor pendente de aceitação
      // TODO: enviar um email com um convite para o novo gestor
      return { statusCode: 201, json: undefined }
    } catch (err) {
      console.log(err)
      return { statusCode: 500, json: { message: ManagerMessage.INVITE_ERROR } }
    }
  }
}
