import { DataTable } from '@components/billing/table'
import SharedModal from '@components/Shared/Modal'
import { UserWallet } from '@models/userwallet'
import useUserWallets from '@services/bills/user-wallets'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@ui/ui/button'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { FC } from 'react'
import updateWalletAtom from 'src/atoms/update-wallet'
import ManageWallet from './manage-wallet'

export const columns: ColumnDef<UserWallet>[] = [
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
    accessorKey: 'facility',
    accessorFn: (row) => row.user.Facility.name,
    header: () => <div className="text-right">Facility</div>,
    cell: ({ row }) => {
      return <div className={`text-right font-medium`}>{row.getValue('facility')}</div>
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
      const formatted = date.format('dddd DD MMM, YYYY HH:mm A')
      return <div className="text-right font-medium">{formatted}</div>
    }
  },

  {
    id: 'actions',

    accessorKey: 'actions',

    header: () => <div className="text-right"></div>,

    accessorFn: (row) => row,

    cell: ({ row }) => {
      const wallet = row.original
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [_, updateWallet] = useAtom(updateWalletAtom)

      const handleClick = () => {
        updateWallet({
          open: true,
          wallet
        })
      }

      return <Button onClick={handleClick}>Manage</Button>
    }
  }
]

const UserWallets: FC<{
  wallets: UserWallet[]
}> = ({ wallets }) => {
  const { data: initial } = useUserWallets(wallets)

  const [data, updateWallet] = useAtom(updateWalletAtom)

  const { wallet, open } = data

  const handleToggle = () => {
    updateWallet((wallet) => ({ ...wallet, open: !wallet.open }))
  }

  return (
    <div>
      <DataTable columns={columns} data={initial} />
      <SharedModal items={{ open: open, handleToggle }}>
        <ManageWallet data={wallet!} />
      </SharedModal>
    </div>
  )
}

export default UserWallets
