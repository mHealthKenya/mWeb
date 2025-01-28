import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@ui/ui/dialog'
import DischargeForm from './approve-form'
import { FC } from 'react'

const ApproveDialog: FC<{ id: string; open: boolean; toggleOpen: () => void }> = ({
  id,
  open,
  toggleOpen
}) => {
  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Approve Discharge</DialogTitle>
          <DialogDescription>
            Approve the discharge of this patient to complete the admission process and deduct the
            amount from the wallet
          </DialogDescription>
        </DialogHeader>
        <DischargeForm id={id} handleToggle={toggleOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default ApproveDialog
