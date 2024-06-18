import { FC, useEffect, useState } from 'react'
import WalletTotals, { WalletTotalProps } from './totals'

const WalletDashboard: FC<{
  facility: WalletTotalProps
  mother: WalletTotalProps
  todaysTransactionsTotal: WalletTotalProps
  weeksTransactionsTotal: WalletTotalProps
  monthsTransactionsTotal: WalletTotalProps
}> = ({
  facility,
  mother,
  todaysTransactionsTotal,
  weeksTransactionsTotal,
  monthsTransactionsTotal
}) => {
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    const totalBalance = facility.amount + mother.amount

    setTotalBalance(totalBalance)
  }, [facility, mother])

  return (
    <div className="bg-muted/40">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <WalletTotals data={facility} />
          <WalletTotals data={mother} />
          <WalletTotals
            data={{ title: 'Total', amount: totalBalance, description: 'Total points balance' }}
          />
          <WalletTotals data={todaysTransactionsTotal} />
          <WalletTotals data={weeksTransactionsTotal} />
          <WalletTotals data={monthsTransactionsTotal} />
        </div>
      </div>
    </div>
  )
}

export default WalletDashboard
