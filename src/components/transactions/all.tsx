import { DataTable } from '@components/billing/table'
import SharedModal from '@components/Shared/Modal'
import { AllTransactionsType } from '@models/alltransactions'
import useAllTransactions from '@services/bills/alltransactions'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@ui/ui/button'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { FC } from 'react'
import { approveAtom } from 'src/atoms/approve'
import ApproveTransaction from './approve'

export const columns: ColumnDef<AllTransactionsType>[] = [
  {
    accessorKey: 'patient',
    accessorFn: (row) => row.user,
    header: 'Patient',
    cell: ({ row }) => {
      const patient = row.original.user

      return (
        <div className="flex flex-col gap-2 justify-start">
          <div className="font-medium">
            {patient.f_name} {patient.l_name}
          </div>
          <div className="font-medium">{patient.phone_number}</div>
        </div>
      )
    }
  },
  {
    accessorKey: 'attendant',
    accessorFn: (row) => row.createdBy,
    header: 'Attendant',
    cell: ({ row }) => {
      const attendant = row.original.createdBy

      return (
        <div className="flex flex-col gap-2 justify-start">
          <div className="font-medium">
            {attendant.f_name} {attendant.l_name}
          </div>
          <div className="font-medium">{attendant.phone_number}</div>
        </div>
      )
    }
  },

  {
    accessorKey: 'name',
    accessorFn: (row) => row.facility.name,
    header: 'Facility',
    cell: ({ row }) => {
      return <div className={`text-right font-medium`}>{row.getValue('name')}</div>
    }
  },

  {
    accessorKey: 'points',
    accessorFn: (row) => row.points,
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => {
      const approved = row.original.approvedBy

      return (
        <div className={`text-right font-medium ${approved ? 'text-green-600' : 'text-red-600'}`}>
          {row.getValue('points')}
        </div>
      )
    }
  },

  {
    accessorKey: 'approved',
    accessorFn: (row) => row.approvedBy,
    header: () => <div className="text-right">Approved</div>,
    cell: ({ row }) => {
      const approved = row.original.approvedBy

      if (!approved) {
        return <div className="text-right font-medium text-red-600">Pending</div>
      }

      return (
        <div className="flex flex-col gap-2 justify-end">
          <div className="font-medium text-right">
            {approved.f_name} {approved.l_name}
          </div>
          <div className="font-medium text-right">{approved.phone_number}</div>
        </div>
      )
    }
  },

  {
    accessorKey: 'createdAt',
    accessorFn: (row) => row.createdAt,
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date = dayjs(row.getValue('createdAt'))
      const formatted = date.format('dddd DD MMM, YYYY HH:mm A')
      return <div className="text-right font-medium">{formatted}</div>
    }
  },

  {
    id: 'actions',

    accessorKey: 'actions',

    accessorFn: (row) => row,

    cell: ({ row }) => {
      const data: AllTransactionsType = row.getValue('actions')

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [_, setApproved] = useAtom(approveAtom)

      const handleClick = () => {
        setApproved((approved) => ({ ...approved, data: data, open: true }))
      }

      return (
        <Button onClick={handleClick} disabled={!!data.approvedBy}>
          {!!data.approvedBy ? 'Approved' : 'Approve'}
        </Button>
      )
    }
  }
]

const AllTransactions: FC<{
  bills: AllTransactionsType[]
}> = ({ bills }) => {
  const { data: initial } = useAllTransactions(bills)

  const [approved, setApproved] = useAtom(approveAtom)

  const { open, data } = approved

  const handleToggle = () => {
    setApproved((approved) => ({ ...approved, open: !approved.open }))
  }

  return (
    <div>
      <DataTable columns={columns} data={initial} />
      <SharedModal items={{ open: open, handleToggle }}>
        <ApproveTransaction data={data!} />
      </SharedModal>
    </div>
  )
}

export default AllTransactions
