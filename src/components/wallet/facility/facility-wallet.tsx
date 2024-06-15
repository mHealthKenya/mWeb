import { FacilityWallet } from '@models/facilitywallet'
import useFacilityWallet from '@services/bills/facility-wallet'
import { Card } from '@ui/ui/card'
import { FC } from 'react'

const WalletTotal: FC<{ wallet: FacilityWallet; facilityId: string }> = ({
  wallet,
  facilityId
}) => {
  const { data } = useFacilityWallet(facilityId, wallet)

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PTS'
  }).format(data.balance)
  return (
    <Card className="px-2 flex max-w-[600px] items-center justify-center h-[100px]">
      <div className="text-center">{`Total unclaimed points: ${formatted}`}</div>
    </Card>
  )
}

export default WalletTotal
