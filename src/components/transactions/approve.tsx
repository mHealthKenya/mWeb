import CenterComponent from '@components/Shared/Center'
import { AllTransactionsType } from '@models/alltransactions'
import useApproveTransaction from '@services/bills/approve'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@ui/ui/card'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { approveAtom } from 'src/atoms/approve'

const ApproveTransaction: FC<{ data: AllTransactionsType }> = ({ data }) => {
  const { id } = data
  const { mutate: approve, isLoading } = useApproveTransaction()

  const handleApprove = () => {
    approve(id)
  }

  const [_, setApproved] = useAtom(approveAtom)

  const handleClose = () => {
    setApproved((approved) => ({ ...approved, open: false }))
  }

  return (
    <CenterComponent>
      <Card>
        <CardContent className="gap-y-2">
          <CardTitle className="my-4">Approve Transaction</CardTitle>
          <div className="text-md">Are you sure you want to approve this transaction?</div>
          <div className="text-xs text-muted italic">{`This action will approve the bill sent for ${data.user.f_name} ${data.user.l_name} from ${data.facility.name}. This confirms that ypu have paid ${data.points} to ${data.facility.name}`}</div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button disabled={isLoading} onClick={handleApprove}>
            <div className="flex flex-row items-center justify-center">
              {' '}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Approve</span>
            </div>
          </Button>
          <Button variant="destructive" onClick={handleClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </CenterComponent>
  )
}

export default ApproveTransaction
