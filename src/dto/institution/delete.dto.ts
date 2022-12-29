import { AuthPayload } from '@core/interfaces/authenticated'

export type InputDeleteInstitutionDto = AuthPayload & { institutionId: number }

export type OutputDeleteInstitution = undefined
