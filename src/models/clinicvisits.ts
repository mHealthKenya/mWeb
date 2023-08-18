export interface ClinicalVisit {
  id: string
  motherId: string
  facilityId: string
  bloodGroup: string
  weight: number
  hiv: string
  hbLevel: number
  rhesusFactor: string
  urinalysis: string
  vdrl: string
  bloodRBS: string
  TB: null
  syphilis: string
  hepatitisB: string
  notes: null
  createdAt: Date
  updatedAt: Date
  facility: Facility
  mother: Mother
}

export interface Facility {
  name: string
}

export interface Mother {
  f_name: string
  l_name: string
  phone_number: string
  BioData: BioDatum[]
}

export interface BioDatum {
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
