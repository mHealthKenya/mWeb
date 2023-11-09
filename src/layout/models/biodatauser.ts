export interface BiodataUser {
  id: string
  userId: string
  height: number
  weight: number
  active: boolean
  age: number
  last_monthly_period: Date
  expected_delivery_date: Date
  pregnancy_period: number
  last_clinic_visit: Date
  facilityId: string
  previous_pregnancies: number
  createdById: string
  updatedById: string
  createdAt: Date
  updatedAt: Date
  user: User
}

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
}
