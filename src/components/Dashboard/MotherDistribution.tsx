import { MotherDistribution } from '@models/user'
import { Typography } from '@mui/material'
import React, { FC, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const acronymToNameMap: Record<string, string> = {}

function createAcronym(name: string) {
  const words = name.split(' ')

  let acronym = ''

  for (const word of words) {
    for (const char of word) {
      if (char === char.toUpperCase()) {
        acronym += char
      }
    }
  }

  // Store the mapping of acronym to original name
  acronymToNameMap[acronym] = name

  return acronym
}

const CustomTooltip: React.FC<{
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}> = ({ active, payload, label }) => {
  if (active) {
    const dataPoint = payload && payload[0]
    if (dataPoint) {
      const originalName = acronymToNameMap[`${label}`] || dataPoint.name

      return (
        <div className="custom-tooltip">
          <Typography variant="overline" style={{ color: '#67440a' }}>
            {`${originalName}: ${dataPoint.value}`}
          </Typography>
          {/* <b style={{ color: '#67440a' }}></b> */}
        </div>
      )
    }
  }
  return null
}

const MotherDistributionChart: FC<{ data: MotherDistribution[] }> = ({ data }) => {
  const nVal = useMemo(
    () =>
      data.map((item) => ({
        facilityName: createAcronym(item.facilityName),
        count: item.count
      })),
    [data]
  )

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={nVal}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="facilityName" angle={-45} textAnchor="end" interval={0} height={40} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MotherDistributionChart
