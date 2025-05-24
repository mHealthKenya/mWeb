import * as React from 'react'
import { Chart } from 'react-google-charts'

export interface AgeDist {
  name: string
  value: number
}

const AgeDistributionStats: React.FC<{ data: AgeDist[] }> = ({ data: items }) => {
  const nVal = React.useMemo(() => items.map((item) => [item.name, item.value]), [items])

  nVal.unshift(['Age Group', 'Count'])

  return (
    <>
      <Chart chartType="PieChart" data={nVal} width={'100%'} height={'500px'} />
    </>
  )
}

export default AgeDistributionStats
