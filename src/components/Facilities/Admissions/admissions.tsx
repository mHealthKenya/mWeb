import { DataTable } from '@components/billing/table'
import { Admission } from '@models/admission'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@ui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/ui/dialog'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import DischargeForm from './dischargeform'
// import ApproveTransaction from './approve'

const AdmissionsComponent: FC<{
  admissions: Admission[]
  facility?: boolean
}> = ({ admissions, facility }) => {
  const [open, setOpen] = useState(false)

  // const [openDelete, setOpenDelete] = useState(false)

  // const handleToggleDelete = () => {
  //   setOpen(false)
  //   setOpenDelete((openDelete) => !openDelete)
  // }

  const [admission, setAdmission] = useState<Admission | null>(null)

  const handleAdmit = (admission: Admission) => {
    setAdmission(admission)
    setOpen(true)
    // setOpenDelete(false)
  }

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
    },

    {
      accessorKey: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2 justify-end font-medium">
            <>
              {/* <Dialog open={openDelete} onOpenChange={handleToggleDelete}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="destructive">
                    <Trash2 />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Admission</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete the admission for{' '}
                      <b>
                        {row.original.user.f_name} {row.original.user.l_name}?
                      </b>
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button variant="destructive" onClick={handleToggleDelete}>
                      Cancel
                    </Button>
                    <Button onClick={handleToggleDelete}>Proceed</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}
            </>

            {facility && <Button onClick={() => handleAdmit(row.original)}>Discharge</Button>}
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={admissions} />
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Discharge Patient</DialogTitle>
            <DialogDescription>
              {`Discharge and bill Patient. Please note that you can only bill an amount upto the
              patient's balance`}
            </DialogDescription>
          </DialogHeader>

          <DischargeForm id={admission?.id || ''} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdmissionsComponent
