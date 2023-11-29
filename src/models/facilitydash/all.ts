export interface TotalFacilityCHVS {
  chvsInFacility: number
}

export interface TotalFacilityVisits {
  totalVisits: number
}

export interface TotalFacilityMothers {
  mothersInFacility: number
}

export interface FacilityMonthlyVisits {
  monthlyVisits: number
}

export interface FacilityMonthlyMothers {
  mothersRegisteredThisMonth: number
}

export interface SchedulesDist {
  schedules: Schedule[]
}

export interface Schedule {
  _count: Count
  status: string
}

export interface Count {
  status: number
}
