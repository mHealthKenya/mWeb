export interface FollowUp {
    scheduleId: string;
    chvId:      string;
    Schedule: Schedule
    User: User
}

export interface User {
    f_name: string
    l_name: string
    email: string
    phone_number: string
  }

export interface Schedule {
    id: string;
    title: string
    description: string
    date: Date
    status: string
  }