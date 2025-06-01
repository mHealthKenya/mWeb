import { DataTable } from '@components/billing/table'
import { Contact } from '@models/emergency-contact'
import useAllEmergencyContacts from '@services/emergency-contact/all'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { FC } from 'react'

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    accessorFn: (row) => row.facility?.name,
    header: 'Name'
  },
  {
    accessorKey: 'phone_number',
    accessorFn: (row) => row.phone,
    header: 'Phone'
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

const AllEmergencyContacts: FC<{ contacts: Contact[] }> = ({ contacts }) => {
  const { data: initial } = useAllEmergencyContacts(contacts)

  return (
    <div>
      <DataTable columns={columns} data={initial} />
    </div>
  )
}

export default AllEmergencyContacts
