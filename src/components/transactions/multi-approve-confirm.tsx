import CenterComponent from '@components/Shared/Center'
import useMultiApprove from '@services/bills/multi-approve'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@ui/ui/card'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import checkBalanceAtom from 'src/atoms/checkbalance'
import { FormData } from './multi-approve'

const MultiApproveConfirm: FC<{ data: FormData }> = ({ data }) => {
  const [balance, setBalance] = useAtom(checkBalanceAtom)

  const handleClose = () => {
    setBalance((balance) => ({ ...balance, open: false }))
  }

  const { mutate: approve, isLoading } = useMultiApprove()

  const handleApprove = () => {
    approve({
      startDate: data?.date?.from?.toISOString() || '',
      endDate: data?.date?.to?.toISOString() || '',
      facilityId: data.facilityId
    })
  }

  return (
    <CenterComponent>
      <Card>
        <CardContent className="gap-y-2">
          <CardTitle className="my-4">Approve Multiple Transactions</CardTitle>
          <div className="text-md">Are you sure you want to approve these transactions?</div>
          <div className="text-xs text-muted italic">{`This action will approve multiple transactions totalling to ${balance.data.totalBalance} points`}</div>
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

export default MultiApproveConfirm
