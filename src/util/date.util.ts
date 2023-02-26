export const hasPassedHours = (date: Date, hours: number): boolean => {
  const now = new Date()

  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = diffInMs / 1000 / 60 / 60

  return diffInHours >= hours
}
