export interface InputActivity {
  name: string
  maxMinutes: number
}

export interface InputCreateAnnouncementDTO {
  userId: number
  institutionId: string
  name: string
  activities: InputActivity[]
}

export interface OutputCreateAnnouncementDTO {
  id: number
}
