import { DataTable } from '@components/billing/table'
import { Admission } from '@models/admission'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { FC } from 'react'
// import ApproveTransaction from './approve'

const AdmissionsMonitorComponent: FC<{
  admissions: Admission[]
}> = ({ admissions }) => {
  const columns: ColumnDef<Admission>[] = [
    {
      accessorKey: 'name',

      header: 'Patient',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2">
            <div>
              {row.original.user.f_name} {row.original.user.l_name}
            </div>
            <div>{row.original.user.phone_number}</div>
          </div>
        )
      }
    },

    {
      accessorKey: 'admittedBy',

      header: 'Admitted By',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2">
            <div>
              {row.original.admittedBy.f_name} {row.original.admittedBy.l_name}
            </div>
            <div>{row.original.admittedBy.phone_number}</div>
          </div>
        )
      }
    },

    {
      accessorKey: 'date',
      header: () => <div className="text-right">Admission Date</div>,
      cell: ({ row }) => {
        return (
          <div className={`text-right font-medium `}>
            {dayjs(row.original.createdAt).format('ddd DD MMM YYYY HH:mm')}
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={admissions} />
    </div>
  )
}

export default AdmissionsMonitorComponent
