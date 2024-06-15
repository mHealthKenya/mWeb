import { DataTable } from '@components/billing/table'
import WalletTotal from '@components/wallet/facility/facility-wallet'
import { FacilityTransactions } from '@models/facilitytransactions'
import { FacilityWallet } from '@models/facilitywallet'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { FC } from 'react'

export const columns: ColumnDef<FacilityTransactions>[] = [
  {
    accessorKey: 'name',
    accessorFn: (row) => row.user.f_name + ' ' + row.user.l_name,
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
        <div className="flex flex-col gap-2 justify-start">
          <div className="font-medium">
            {approved.f_name} {approved.l_name}
          </div>
          <div className="font-medium">{approved.phone_number}</div>
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
  }
]

const FTransactions: FC<{
  bills: FacilityTransactions[]
  facilityId: string
  wallet: FacilityWallet
}> = ({ bills, facilityId, wallet }) => {
  //   const { data: initial } = useFacilityBills(facilityId, bills)

  return (
    <div>
      <WalletTotal wallet={wallet} facilityId={facilityId} />
      <DataTable columns={columns} data={bills} />
    </div>
  )
}

export default FTransactions
