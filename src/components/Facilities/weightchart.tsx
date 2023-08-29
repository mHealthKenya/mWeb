import { ClinicalVisit } from '@models/clinicvisits'
import { FC, useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import dayjs from 'dayjs'
import styles from '../../styles/Charts.module.css'
import { Card, CardContent, CardHeader } from '@mui/material'

const WeightChart: FC<{ visits: ClinicalVisit[] }> = ({ visits }) => {
  const data = useMemo(
    () =>
      visits.map((visit) => ({
        Date: dayjs(new Date(visit.createdAt)).format('YY-MM-DD'),
        Weight: +visit.weight,
        BMI: +visit.weight / (((+visit.bioData.height / 100) * +visit.bioData.height) / 100)
      })),
    [visits]
  )

  const title = `Weight chart for ${visits[0].bioData.user.f_name} ${visits[0].bioData.user.l_name}`

  return (
    <div className={styles.chartContainer}>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <ResponsiveContainer width="99%" height={450}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Weight" stroke="#82ca9d" />
              <Line type="monotone" dataKey="BMI" stroke="#d8392b" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeightChart
