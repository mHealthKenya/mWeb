import { SMSStats } from '@models/smsstats'
import * as React from 'react'
import { Chart } from 'react-google-charts'

const SMSStatsComponent: React.FC<{ data: SMSStats[] }> = ({ data: items }) => {
  const nVal = React.useMemo(() => items.map((item) => [item.status, item._count.status]), [items])

  nVal.unshift(['Message Status', 'Count'])

  return (
    <>
      <Chart chartType="PieChart" data={nVal} width={'100%'} height={'500px'} />
    </>
  )
}

export default SMSStatsComponent
