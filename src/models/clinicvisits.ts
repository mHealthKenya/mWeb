export interface ClinicalVisit {
  id: string
  bioDataId: string
  facilityId: string
  weight: string
  hiv: string
  hbLevel: string
  rhesusFactor: string
  bloodGroup: string
  urinalysis: string
  vdrl: string
  bloodRBS: string
  TB: string
  hepatitisB: string
  notes: null
  treatment: string
  tetanus: string
  hivTestDate: Date
  tetanusInjectionDate: Date
  createdAt: Date
  updatedAt: Date
  facility: Facility
  bioData: BioData
}

export interface BioData {
  user: User
  height: number
  weight: number
  active: boolean
  age: number
  last_monthly_period: Date
  expected_delivery_date: Date
  pregnancy_period: number
  last_clinic_visit: Date
  previous_pregnancies: number
}

export interface User {
  f_name: string
  l_name: string
  phone_number: string
}

export interface Facility {
  name: string
}


