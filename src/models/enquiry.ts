export interface Enquiry {
  id: string
  senderId: string
  title: string
  description: string
  replyTitle: null
  replyDescription: null
  facilityId: string
  createdAt: Date
  updatedAt: Date
  repliedById: null
}

export interface Enquirystats {
  totalEnquiries: number
}
