import { BillVisit } from '@models/billvisit'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@ui/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@ui/ui/dropdown-menu'
import dayjs from 'dayjs'
import { MoreHorizontal } from 'lucide-react'
import { FC } from 'react'
import { DataTable } from './table'
import useSendBillCode from '@services/bills/request-code'
import BillSheet from './confirm'
import { useAtom } from 'jotai'
import billOpenAtom, { billAtom } from 'src/atoms/bill-open'
import SharedModal from '@components/Shared/Modal'
import useFacilityBills from '@services/bills/facility-bills'
import WalletTotal from '@components/wallet/facility/facility-wallet'
import { FacilityWallet } from '@models/facilitywallet'

export const columns: ColumnDef<BillVisit>[] = [
  {
    accessorKey: 'name',
    accessorFn: (row) => row.bioData.user.f_name + ' ' + row.bioData.user.l_name,
    header: 'Name'
  },
  {
    accessorKey: 'phone_number',
    accessorFn: (row) => row.bioData.user.phone_number,
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
  },

  {
    accessorKey: 'billed',
    accessorFn: (row) => row.billed,
    header: () => <div className="text-right">Billed</div>,
    cell: ({ row }) => {
      const billed = row.getValue('billed')

      if (billed) {
        return <div className="text-right font-medium text-green-600">Yes</div>
      } else {
        return <div className="text-right font-medium">No</div>
      }
    }
  },

  {
    id: 'actions',

    accessorKey: 'actions',

    accessorFn: (row) => row,

    cell: ({ row }) => {
      const data: BillVisit = row.getValue('actions')

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate } = useSendBillCode()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [_, setOpen] = useAtom(billOpenAtom)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [__, setBill] = useAtom(billAtom)

      const { id } = data.bioData.user

      const handleClick = () => {
        mutate(id)
      }

      const handleOpen = () => {
        setOpen(true)
        setBill(data)
      }

      const payment = row.original

      const billed = payment.billed

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" disabled={billed}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleClick} className="cursor-pointer">
              Request Code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleOpen}>
              Send Bill
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">View billing guidelines</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

const Bills: FC<{ bills: BillVisit[]; facilityId: string; wallet: FacilityWallet }> = ({
  bills,
  facilityId,
  wallet
}) => {
  const [open, setOpen] = useAtom(billOpenAtom)

  const { data: initial } = useFacilityBills(facilityId, bills)

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  return (
    <div>
      <WalletTotal wallet={wallet} facilityId={facilityId} />
      <DataTable columns={columns} data={initial} />

      <SharedModal items={{ open: open, handleToggle }}>
        <BillSheet />
      </SharedModal>
    </div>
  )
}

export default Bills
