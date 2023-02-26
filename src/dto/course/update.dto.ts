export interface InputUpdateCourseDTO {
  userId: number
  institutionId: string
  courseId: string
  name?: string
  description?: string
  coordinatorId?: number
}

export interface OutputUpdateCourseDTO {
  id: number
}
