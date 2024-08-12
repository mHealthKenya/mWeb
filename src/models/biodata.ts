export interface FacilityBioData {
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
  parity?: string
  gravidity?: number
  createdById: string
  updatedById: string
  createdAt: Date
  updatedAt: Date
  user: User
}

export interface User {
  f_name: string;
  l_name: string;
  phone_number: string;
  Wallet: Wallet[];
}

export interface Wallet {
  balance: number;
}


export interface AddBioData {
  userId: string
  facilityId: string
  height: string
  weight: string
  last_clinic_visit: Date
  last_monthly_period: Date
  pregnancy_period: string
  age: string
  gravidity: number
  parity: string
  expected_delivery_date: Date
}
