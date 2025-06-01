import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/ui/card'
import { FC } from 'react'
import { currencyFormatter } from 'utils/currency_formatter'

export interface WalletTotalProps {
  title: string
  amount: number
  description: string
}

const WalletTotals: FC<{ data: WalletTotalProps }> = ({ data }) => {
  return (
    <Card className="p-2">
      <CardHeader className="pb-3">
        <CardTitle>{data.title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>{currencyFormatter.format(data.amount)}</CardFooter>
    </Card>
  )
}

export default WalletTotals
