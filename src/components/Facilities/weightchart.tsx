import { ClinicalVisit } from '@models/clinicvisits'
import { FC, useMemo } from 'react'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { Card, CardContent, CardHeader } from '@mui/material'
import dayjs from 'dayjs'
import styles from '../../styles/Charts.module.css'

const WeightChart: FC<{ visits: ClinicalVisit[] }> = ({ visits }) => {
  const data = useMemo(
    () =>
      visits.map((visit) => ({
        Date: dayjs(new Date(visit.createdAt)).format('YY-MM-DD'),
        BMI: +visit.weight / (((+visit.bioData.height / 100) * +visit.bioData.height) / 100),
        underWeight: 18.5,
        healthy: 24.9,
        overweight: 29.9,
        obese: 40
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
            <ComposedChart width={730} height={250} data={data}>
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />

              <Area type="monotone" dataKey="obese" fill="#5ab3d9" stroke="#5ab3d9" />
              <Area type="monotone" dataKey="overweight" fill="#be5dfa" stroke="#be5dfa" />
              <Area type="monotone" dataKey="healthy" fill="#47dc7a" stroke="		#47dc7a" />
              <Area type="basis" dataKey="underWeight" fill="#856be6" stroke="#856be6" />
              <Bar dataKey="BMI" barSize={20} fill="#000035" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeightChart
