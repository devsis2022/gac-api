export interface InputCreateCourseDTO {
  userId: number
  name: string
  description?: string
  institutionId: number
  coordinatorId: number
}

export interface OutputCreateCourseDTO {
  id: number
}
