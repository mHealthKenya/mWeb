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
import rejectAtom from 'src/atoms/rejectatom'
import RejectTransaction from './reject'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@ui/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { saveAs } from 'file-saver'

const exportPendingCSV = (data: AllTransactionsType[]) => {
  const pendingTransactions = data.filter((t) => !t.approvedBy && !t.rejected)

  if (pendingTransactions.length === 0) {
    alert('No pending transactions to export.')
    return
  }

  const csvHeaders = [
    'Patient Name',
    'Phone Number',
    'Attendant Name',
    'Facility',
    'Points',
    'Date'
  ]

  const csvRows = pendingTransactions.map((t) => [
    `${t.user.f_name} ${t.user.l_name}`,
    t.user.phone_number,
    `${t.createdBy.f_name} ${t.createdBy.l_name}`,
    t.facility.name,
    t.points,
    dayjs(t.createdAt).format('YYYY-MM-DD')
  ])

  const csvContent = [csvHeaders, ...csvRows].map((e) => e.join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'pending_transactions.csv')
}

export const columns: ColumnDef<AllTransactionsType>[] = [
  {
    accessorKey: 'patient',
    accessorFn: (row) => row.user,
    header: 'Patient',
    cell: ({ row }) => {
      const patient = row.original.user
      const approved = row.original.approvedBy
      const rejected = row.original.rejected

      return (
        <div className="flex flex-col gap-2 justify-start">
          <div
            className={`font-medium ${
              rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
            }`}>
            {patient.f_name} {patient.l_name}
          </div>
          <div
            className={`font-medium ${
              rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
            }`}>
            {patient.phone_number}
          </div>
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
      const approved = row.original.approvedBy
      const rejected = row.original.rejected

      return (
        <div className="flex flex-col gap-2 justify-start">
          <div
            className={`font-medium ${
              rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
            }`}>
            {attendant.f_name} {attendant.l_name}
          </div>
          <div
            className={`font-medium ${
              rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
            }`}>
            {attendant.phone_number}
          </div>
        </div>
      )
    }
  },

  {
    accessorKey: 'name',
    accessorFn: (row) => row.facility.name,
    header: () => <div className="text-right">Facility</div>,
    cell: ({ row }) => {
      const approved = row.original.approvedBy
      const rejected = row.original.rejected
      return (
        <div
          className={`text-right font-medium ${
            rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
          }`}>
          {row.getValue('name')}
        </div>
      )
    }
  },

  {
    accessorKey: 'points',
    accessorFn: (row) => row.points,
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => {
      const approved = row.original.approvedBy
      const rejected = row.original.rejected

      return (
        <div
          className={`text-right font-medium ${
            rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
          }`}>
          {row.getValue('points')}
        </div>
      )
    }
  },

  {
    accessorKey: 'approved',
    accessorFn: (row) => row.approvedBy,
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const approved = row.original.approvedBy

      const rejected = row.original.rejected

      if (!approved) {
        return <div className="text-right font-medium text-blue-600">Pending</div>
      }

      return (
        <div className="flex flex-col gap-2 justify-end">
          <div
            className={`font-medium text-right ${
              rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
            }`}>
            {rejected ? 'Rejected' : 'Approved'}
          </div>
          <div
            className={`font-medium text-right ${
              rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
            }`}>
            {approved.f_name} {approved.l_name}
          </div>
          <div
            className={`font-medium text-right ${
              rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
            }`}>
            {approved.phone_number}
          </div>
        </div>
      )
    }
  },

  {
    accessorKey: 'createdAt',
    accessorFn: (row) => row.createdAt,
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const approved = row.original.approvedBy
      const rejected = row.original.rejected
      const date = dayjs(row.getValue('createdAt'))
      const formatted = date.format('dddd DD MMM, YYYY HH:mm A')
      return (
        <div
          className={`text-right font-medium ${
            rejected ? 'text-red-600' : approved && !rejected ? 'text-gray-900' : 'text-blue-600'
          }`}>
          {formatted}
        </div>
      )
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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [__, setRejectOpen] = useAtom(rejectAtom)

      const handleReject = () => {
        setRejectOpen((rejectOpen) => !rejectOpen)
        setApproved((approved) => ({ ...approved, data: data, open: false }))
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={!!data.approvedBy || data.rejected}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleClick}
              className="cursor-pointer"
              disabled={!!data.approvedBy}>
              Approve Transaction
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleReject}>
              Reject Transaction
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">View billing guidelines</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

// const AllTransactions: FC<{
//   bills: AllTransactionsType[]
// }> = ({ bills }) => {
//   const { data: initial } = useAllTransactions(bills)

//   const [approved, setApproved] = useAtom(approveAtom)

//   const { open, data } = approved

//   const [rejectOpen, setRejectOpen] = useAtom(rejectAtom)

//   const handleToggle = () => {
//     setApproved((approved) => ({ ...approved, open: !approved.open }))
//   }

//   const handleRejectToggle = () => {
//     setRejectOpen((open) => !open)
//   }

//   return (
//     <div>
//       <DataTable columns={columns} data={initial} />
//       <SharedModal items={{ open: open, handleToggle }}>
//         <ApproveTransaction data={data!} />
//       </SharedModal>
//       <SharedModal items={{ open: rejectOpen, handleToggle: handleRejectToggle }}>
//         <RejectTransaction data={data!} />
//       </SharedModal>
//     </div>
//   )
// }

const AllTransactions: FC<{ bills: AllTransactionsType[] }> = ({ bills }) => {
  const { data: initial } = useAllTransactions(bills)
  const [approved, setApproved] = useAtom(approveAtom)
  const { open, data } = approved
  const [rejectOpen, setRejectOpen] = useAtom(rejectAtom)

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => exportPendingCSV(initial)}>Export Pending as CSV</Button>
      </div>
      <DataTable columns={columns} data={initial} />
      <SharedModal
        items={{
          open,
          handleToggle: () => setApproved((prev) => ({ ...prev, open: !prev.open }))
        }}>
        <ApproveTransaction data={data!} />
      </SharedModal>
      <SharedModal items={{ open: rejectOpen, handleToggle: () => setRejectOpen((prev) => !prev) }}>
        <RejectTransaction data={data!} />
      </SharedModal>
    </div>
  )
}

export default AllTransactions
