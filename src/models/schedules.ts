export interface AddSchedule {
  title: string
  description: string
  facilityId: string
  date: string
  motherId: string
}

export interface UserSchedule {
  id: string
  title: string
  description: string
  facilityId: string
  date: Date
  status: string
  motherId: string
  createdById: string
  updatedById: string
  createdAt: Date
  updatedAt: Date
  mother: Mother
}

export interface Mother {
  f_name: string
  l_name: string
  phone_number: string
  createdById: string | null
}
