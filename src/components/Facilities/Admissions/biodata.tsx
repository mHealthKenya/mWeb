import { DataTable } from '@components/billing/table'
import { FacilityBioData } from '@models/biodata'
import useAdmit from '@services/admissions/admit'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@ui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/ui/dialog'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
// import ApproveTransaction from './approve'

const FacilityBioDataComponent: FC<{
  bioData: FacilityBioData[]
  facilityId: string
}> = ({ bioData, facilityId }) => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const { mutate: admit, isLoading, isSuccess, isError, reset } = useAdmit()

  const handleAdmit = ({ userId }: { userId: string }) => {
    admit({
      facilityId,
      userId
    })
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setOpen(false)
    }

    return () => {
      reset()
    }
  }, [isSuccess, reset, isError])

  const columns: ColumnDef<FacilityBioData>[] = [
    {
      accessorKey: 'name',
      accessorFn: (row) => `${row.user.f_name} ${row.user.l_name}`,
      header: 'Name',
      cell: ({ row }) => {
        return <div className={`text-left font-medium`}>{row.getValue('name')}</div>
      }
    },

    {
      accessorKey: 'phone',
      accessorFn: (row) => row.user.phone_number,
      header: 'Phone Number',
      cell: ({ row }) => {
        return <div className={`text-left font-medium`}>{row.getValue('phone')}</div>
      }
    },

    {
      accessorKey: 'points',
      accessorFn: (row) => row.user.Wallet.balance,
      header: () => <div className="text-right">Balance</div>,
      cell: ({ row }) => {
        return <div className={`text-right font-medium `}>{row.getValue('points')}</div>
      }
    },

    {
      accessorKey: 'age',
      accessorFn: (row) => row.age,
      header: () => <div className="text-right">Age</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue('age')}</div>
      }
    },

    {
      accessorKey: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end font-medium">
            <Dialog open={open} onOpenChange={handleToggle}>
              <DialogTrigger asChild>
                <Button>Admit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Admit {row.getValue('name')}</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to admit {row.getValue('name')}?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button variant="destructive" onClick={handleToggle}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleAdmit({
                        userId: row.original.userId
                      })
                    }
                    disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    Proceed
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={bioData} />
    </div>
  )
}

export default FacilityBioDataComponent
