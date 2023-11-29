export interface ChvMothers {
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
  createdById: string
}

export interface Motherstats {
  totalMothersRegistered: number
  count: number
}

export interface TotalMotherstats {
  totalMothersRegistered: number
}
