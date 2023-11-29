import { SchedulesDist } from '@models/facilitydash/all'
import { FC, useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const FacilitySchedulesDistribution: FC<{ data: SchedulesDist }> = ({ data }) => {
  const { schedules } = data

  const items = useMemo(
    () =>
      schedules.map((item) => ({
        count: item._count.status,
        status: item.status
      })),
    [schedules]
  )

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={items}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default FacilitySchedulesDistribution
