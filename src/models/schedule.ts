export interface Schedule {
  id: string
  title: string
  description: string
  facilityId: string
  date: Date
  status: string
  motherId: string
}

export interface ScheduleUpdate {
  id: string
  motherId: string
  title: string
  status: string
}