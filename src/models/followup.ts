export interface FollowUp {
    scheduleId: Schedule;
    chvId:      User;
}

export interface User {
    f_name: string
    l_name: string
    email: string
    phone_number: string
  }

  export interface Schedule {
    title: string
    description: string
    date: Date

  }
