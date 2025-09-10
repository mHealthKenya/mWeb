import { DataTable } from '@components/Shared/Table'
import { UserByRole } from '@models/user-by-role'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@ui/ui/button'
import dayjs from 'dayjs'
import { MoreHorizontal } from 'lucide-react'
import React, { FC } from 'react'
import CHVsDropDown from './dropdown'
import { Facility } from '@models/facility'

const CHPsFromAdmin: FC<{ data: UserByRole[]; facilities: Facility[] }> = ({
  data,
  facilities
}) => {
  const columns: ColumnDef<UserByRole>[] = [
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
        return <div className={`justify-start font-medium`}>{facility}</div>
      }
    },

    {
      accessorKey: 'date',
      accessorFn: (row) => row.phone_number,
      header: 'Date Registered',
      cell: ({ row }) => {
        const date = row.original.createdAt

        const fDate = dayjs(date).format('ddd DD MMM YYYY')

        return (
          <div className="flex flex-col gap-2 justify-start">
            <div className="font-medium">{fDate}</div>
          </div>
        )
      }
    },

    {
      accessorKey: 'action',
      header: () => <div className="flex justify-end">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <CHVsDropDown
              drop={{
                label: 'Manage CHPs',
                user: row.original,
                facilities
              }}>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CHVsDropDown>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default CHPsFromAdmin
