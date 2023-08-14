// import { Schedule } from '@models/schedule'
import { UserByRole } from '@models/user-by-role'

export interface Col {
  field: string
  headerName: string
}

export const colsWithOutFacilityCol: Col[] = [
  {
    field: 'name',
    headerName: 'Name'
  },
  {
    field: 'gender',
    headerName: 'Gender'
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'action',
    headerName: 'Action'
  }
]

export const colsWithFacilityCol: Col[] = [
  {
    field: 'name',
    headerName: 'Name'
  },
  {
    field: 'gender',
    headerName: 'Gender'
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
    field: 'facility',
    headerName: 'Facility'
  },
  {
    field: 'action',
    headerName: 'Action'
  }
]

export const rowsWithoutFacility = (users: UserByRole[]) => {
  return users.map((user) => ({
    id: user.id,
    name: user.f_name + ' ' + user.l_name,
    gender: user.gender,
    email: user.email,
    action: user,
    user
  }))
}

export const rowsWithFacility = (users: UserByRole[]) => {
  return users.map((user) => ({
    id: user.id,
    name: user.f_name + ' ' + user.l_name,
    gender: user.gender,
    phone: user.phone_number,
    facility: user.Facility?.name,
    action: user,
    user
  }))
}
