import { Institution } from '@prisma/client'
import { IError } from 'src/core/interfaces/error'
import { InstitutionMessage } from 'src/core/messages/institution.messages'

export type InputCreateInstitutionDTO = Omit<Institution, 'id'>

export type OutputCreateInstitutionDTO = {} | IError
