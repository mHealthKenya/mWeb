export interface BirthPlan {
  id: string
  motherId: string
  facilityId: string
  alternative_facility_id: string
  delivery_mode: string
  support_person_name: string
  support_person_phone: string
  preferred_transport: string
  preferred_attendant_name: string
  preferred_attendant_phone: string
  blood_donor_name: string
  blood_donor_phone: string
  emergency_decision_maker_phone: string
  emergency_decision_maker_name: string
  delivery_bag: boolean
  emergency_cs_plan: string
  savings_plan: string
  createdAt: Date
  updatedAr: Date
  mother: Mother
}

export interface Mother {
  f_name: string
  l_name: string
}

export interface AddBirthPlan {
  motherId: string
  facilityId: string
  delivery_mode: string
  preferred_transport: string
  alternative_facility_id: string
  support_person_name: string
  support_person_phone: string
  preferred_attendant_name?: string | null | undefined
  preferred_attendant_phone?: string | null | undefined
  blood_donor_name?: string | null | undefined
  blood_donor_phone?: string | null | undefined
  emergency_decision_maker_phone: string
  emergency_decision_maker_name: string
  emergency_cs_plan?: string | null | undefined
  savings_plan?: string | null | undefined
  delivery_bag: boolean
}
