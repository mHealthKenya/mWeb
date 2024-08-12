import { DataTable } from '@components/Shared/Table'
import { Registered, RegisteredUser } from '@models/registered'
import { User } from '@models/user'
import { ColumnDef } from '@tanstack/react-table'
import { FC } from 'react'

export const columns: ColumnDef<RegisteredUser>[] = [
  {
    accessorKey: 'name',
    accessorFn: (row) => row.f_name + ' ' + row.l_name,
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 justify-start">
          <div className="font-medium">{row.original.f_name + ' ' + row.original.l_name}</div>
        </div>
      )
    }
  },
  {
    accessorKey: 'phone',
    accessorFn: (row) => row.phone_number,
    header: 'Phone Number',
    cell: ({ row }) => {
      const phone = row.original.phone_number

      return (
        <div className="flex flex-col gap-2 justify-start">
          <div className="font-medium">{phone}</div>
        </div>
      )
    }
  },

  {
    accessorKey: 'facility',
    accessorFn: (row) => row.Facility?.name,
    header: () => <div className=" font-medium">Facility</div>,
    cell: ({ row }) => {
      const facility = row.original.Facility?.name
      return <div className={` font-medium`}>{facility}</div>
    }
  }
]

const RegisteredMothersComponent: FC<{
  data: Registered
  user: User
}> = ({ data, user }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-1 flex flex-col gap-2">
        <h3>Seeing Mothers Registered By {user.f_name + ' ' + user.l_name}</h3>
        <p className="text-muted-foreground text-sm">Total registed mothers: {data.count}</p>
      </div>
      <DataTable columns={columns} data={data.mothers} />
    </div>
  )
}

export default RegisteredMothersComponent
