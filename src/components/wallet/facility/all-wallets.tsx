import { DataTable } from '@components/billing/table'
import { FacilityWallet } from '@models/facilitywallets'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { FC } from 'react'
// import ApproveTransaction from './approve'

export const columns: ColumnDef<FacilityWallet>[] = [
  {
    accessorKey: 'name',
    accessorFn: (row) => row.facility.name,
    header: 'Facility',
    cell: ({ row }) => {
      return <div className={`text-left font-medium`}>{row.getValue('name')}</div>
    }
  },

  {
    accessorKey: 'points',
    accessorFn: (row) => row.balance,
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      return <div className={`text-right font-medium `}>{row.getValue('points')}</div>
    }
  },

  {
    accessorKey: 'createdAt',
    accessorFn: (row) => row.createdAt,
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date = dayjs(row.getValue('createdAt'))
      const formatted = date.format('dddd DD MMM, YYYY')
      return <div className="text-right font-medium">{formatted}</div>
    }
  }
]

const AllFacilityWallets: FC<{
  allFacilityWallets: FacilityWallet[]
}> = ({ allFacilityWallets }) => {
  return (
    <div>
      <DataTable columns={columns} data={allFacilityWallets} />
      {/* <SharedModal items={{ open: open, handleToggle }}>
        <ApproveTransaction data={data!} />
      </SharedModal> */}
    </div>
  )
}

export default AllFacilityWallets
