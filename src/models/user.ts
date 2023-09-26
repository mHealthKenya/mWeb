export interface User {
  id: string
  f_name: string
  l_name: string
  gender: string
  email: string
  phone_number: string
  national_id: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
  facilityAdmin: null
  facilityId: string
  createdById: null
}

export interface TotalUsers {
  total_users: number
}

export interface MotherDistribution {
  facilityId: string
  count: number
  facilityName: string
}

export interface TotalVisits {
  count: number
}
