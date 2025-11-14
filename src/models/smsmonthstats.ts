export interface Month {
  month: string
  count: number
}

export interface MonthlySMSStats {
  year: number
  months: Month[]
}
