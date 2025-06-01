import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card'
import { FC } from 'react'
import { currencyFormatter } from 'utils/currency_formatter'
import { WalletTotalProps } from './totals'

const PeriodTotalsComponent: FC<WalletTotalProps> = ({ title, amount, description }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{currencyFormatter.format(amount)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  )
}

export default PeriodTotalsComponent
