import { MotherStats } from '@models/motherstats'
import * as React from 'react'
import { Chart } from 'react-google-charts'

// TODO: Removed inactive mothers from the stats

const MotherActiveStats: React.FC<{ data: MotherStats[] }> = ({ data: items }) => {
  const nVal: (string | number)[][] = React.useMemo(
    () => [
      ['Active', 'Count'],
      ...items.map((item) => [item.active ? 'Active' : 'Deactivated', item._count.active]),
    ],
    [items]
  )

  return <Chart chartType="PieChart" data={nVal} width="100%" height="500px" />
}

export default MotherActiveStats
