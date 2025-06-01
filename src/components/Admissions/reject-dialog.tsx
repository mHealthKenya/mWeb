import useProcessDischarge, { Status } from '@services/discharges/process-discharge'
import { Button } from '@ui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@ui/ui/dialog'
import { Loader2 } from 'lucide-react'
import { FC, useEffect } from 'react'

const RejectDialog: FC<{ id: string; open: boolean; toggleOpen: () => void }> = ({
  id,
  open,
  toggleOpen
}) => {
  const { mutate: reject, isLoading, isSuccess, isError, reset } = useProcessDischarge()

  const handleReject = () => {
    reject({
      id,
      status: Status.Rejected
    })
  }

  useEffect(() => {
    if (isSuccess || isError) {
      toggleOpen()
    }

    return () => {
      reset()
    }
  }, [isSuccess, isError, toggleOpen, reset])

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Discharge</DialogTitle>
          <DialogDescription>
            Reject the discharge of this patient. This process is irreversible
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleReject}>
            {isLoading && <Loader2 className="animate-spin mr-2" size={20} />}
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RejectDialog
