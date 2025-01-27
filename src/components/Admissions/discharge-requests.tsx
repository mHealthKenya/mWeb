import { DataTable } from '@components/billing/table'
import { DischargeRequest } from '@models/discharge-request'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@ui/ui/button'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FC } from 'react'
// import ApproveTransaction from './approve'

const DischargeRequestsComponent: FC<{
  requests: DischargeRequest[]
}> = ({ requests }) => {
  const router = useRouter()

  const handleRedirect = (request: DischargeRequest) => {
    router.push(`/sadmin/admissions/request/${request.id}`)
  }

  const columns: ColumnDef<DischargeRequest>[] = [
    {
      accessorKey: 'patient',

      header: 'Patient',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2">
            <div>
              {row.original.admission.user.f_name} {row.original.admission.user.l_name}
            </div>
            <div>{row.original.admission.user.phone_number}</div>
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
              {row.original.requestedBy.f_name} {row.original.requestedBy.l_name}
            </div>
            <div>{row.original.requestedBy.phone_number}</div>
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
            {dayjs(row.original.admission.createdAt).format('ddd DD MMM YYYY HH:mm')}
          </div>
        )
      }
    },

    {
      accessorKey: 'date',
      header: () => <div className="text-right">Discharge Date</div>,
      cell: ({ row }) => {
        return (
          <div className={`text-right font-medium `}>
            {dayjs(row.original.createdAt).format('ddd DD MMM YYYY HH:mm')}
          </div>
        )
      }
    },

    {
      accessorKey: 'action',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button onClick={() => handleRedirect(row.original)}>Process</Button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={requests} />
    </div>
  )
}

export default DischargeRequestsComponent
