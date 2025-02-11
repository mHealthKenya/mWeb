import { UserByRole } from '@models/user-by-role'
import dayjs from 'dayjs'

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
    field: 'date_added',
    headerName: 'Date Registered'
  },
  // {
  //   field: 'added_by',
  //   headerName: 'Registered By'
  // },
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
    field: 'age',
    headerName: 'Age'
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
    field: 'national_id',
    headerName: 'National ID'
  },
  {
    field: 'facility',
    headerName: 'Facility'
  },
  {
    field: 'date_added',
    headerName: 'Date Registered'
  },
  {
    field: 'active',
    headerName: 'Status'
  },

  {
    field: 'added_by',
    headerName: 'Registered By'
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
    date_added: dayjs(user.createdAt).format('ddd DD MMM, YYYY'),
    // added_by: user?.name,
    action: user,
    user
  }))
}

export const rowsWithFacility = (users: UserByRole[], show?: boolean) => {
  console.log({ name: users[0].name })

  if (show) {
    return users.map((user) => ({
      id: user.id,
      name: user.f_name + ' ' + user.l_name,
      gender: user.gender,
      phone: user.phone_number,
      national_id: user.national_id,
      age: user.BioData.length > 0 ? user?.BioData[0].age : 'N/A',
      facility: user.Facility?.name,
      date_added: dayjs(user.createdAt).format('ddd DD MMM, YYYY'),
      added_by: user?.name,
      action: user,
      user
    }))
  }

  return users.map((user) => ({
    id: user.id,
    name: user.f_name + ' ' + user.l_name,
    gender: user.gender,
    phone: user.phone_number,
    national_id: user.national_id,
    age: user.BioData.length > 0 ? user?.BioData[0].age : 'N/A',
    facility: user.Facility?.name,
    fullName: user.name,
    date_added: dayjs(user.createdAt).format('ddd DD MMM, YYYY'),
    active: user.active ? 'Active' : 'Inactive',
    added_by: user?.name,
    action: user,
    user
  }))
}
