export type MessageCategory = "GENERAL" | "GESTATION_PERIOD" | "HIGH_RISK"

export type CreateScheduledMessagePayload =
  | { message: string; category: "GENERAL"; scheduledAt: string }
  | { message: string; category: "GESTATION_PERIOD"; gestationTarget: number }
  | { message: string; category: "HIGH_RISK"; riskCondition: string }

export type MessageListItem = {
  id: string
  message: string
  category: MessageCategory
  scheduledAt?: string | null
  sent: boolean
  sentAt?: string | null
}

export type MessageDetailsDto = {
  id: string
  message: string
  category: MessageCategory
  scheduledAt?: string | null
  sent: boolean
  sentAt?: string | null
  gestationTarget?: number | null
  riskCondition?: string | null
  recipients?: Array<{ id: string; f_name: string; l_name: string; phone_number: string; email?: string | null }>
}