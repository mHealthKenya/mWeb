import { MotherStats } from '@models/motherstats'
import * as React from 'react'
import { Chart } from 'react-google-charts'

const MotherActiveStats: React.FC<{ data: MotherStats[] }> = ({ data: items }) => {
  // Transform data into chart-friendly format
  const nVal: (string | number)[][] = React.useMemo(
    () => [
      ['Active', 'Count'], // Header row
      ...items.map((item) => [item.active ? 'Active' : 'Inactive', item._count.active])
    ],
    [items]
  )

  return (
    <>
      <Chart chartType="PieChart" data={nVal} width={'100%'} height={'500px'} />
    </>
  )
}

export default MotherActiveStats
