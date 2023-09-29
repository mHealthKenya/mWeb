import { UserDistribution } from '@models/user'
import * as React from 'react'
import { Chart } from 'react-google-charts'

const UserDistributionStats: React.FC<{ data: UserDistribution[] }> = ({ data: items }) => {
  const nVal = React.useMemo(() => items.map((item) => [item.role, item._count.role]), [items])

  nVal.unshift(['Role', 'Count'])

  return (
    <>
      <Chart chartType="PieChart" data={nVal} width={'100%'} height={'500px'} />
    </>
  )
}

export default UserDistributionStats
