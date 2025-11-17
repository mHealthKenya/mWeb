import React, { useState, useMemo, useEffect } from 'react'
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
import {
  Typography,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
  Box,
  Checkbox,
  ListItemText,
  InputLabel
} from '@mui/material'
import { MonthlySMSStats } from '@models/smsmonthstats'

interface MonthlySMSChartProps {
  data?: MonthlySMSStats[]
}

interface ChartData {
  month: string
  [year: string]: number | string
}

// In MonthlySMSChartData.tsx
const MonthlySMSChart: React.FC<MonthlySMSChartProps> = ({ data }) => {
  // Handle both array and object with count property
  const safeData = React.useMemo(() => {
    if (Array.isArray(data)) {
      return data
    }
    if (data && typeof data === 'object' && 'count' in data) {
      // Return empty array if no data
      return []
    }
    return [] // default to empty array
  }, [data])

  // Generate years from 2023 to current year
  const currentYear = new Date().getFullYear()
  const allYears = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i)

  // State to track selected years
  const [selectedYears, setSelectedYears] = useState<number[]>(allYears)

  // Get available years from data (in case some years have no data)
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(safeData.map((item) => item.year)))
    return years.length > 0 ? years.sort((a, b) => b - a) : allYears
  }, [safeData, allYears])

  // Rest of your component...
  // Make sure to use safeData instead of data in the rest of the component

  // Update selected years when available years change
  useEffect(() => {
    setSelectedYears((prev) => {
      // Keep only the years that are in availableYears
      const validYears = prev.filter((year) => availableYears.includes(year))
      return validYears.length > 0 ? validYears : [availableYears[0]] // Default to most recent year
    })
  }, [availableYears])

  // Handle year selection change
  const handleYearChange = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target
    // Ensure we always have an array of numbers
    const selected = typeof value === 'string' ? [Number(value)] : (value as number[])

    // If nothing is selected, show most recent year
    setSelectedYears(selected.length > 0 ? selected : [availableYears[0]])
  }

  // Transform data for the chart
  // In MonthlySMSChartData.tsx, update the chartData useMemo hook:
  const chartData = useMemo(() => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const dataMap = new Map()

    safeData.forEach((yearData) => {
      const year = Number(yearData.year) // Ensure year is a number
      // console.log(
      //   `Processing year ${year} (${typeof year}), included in selectedYears:`,
      //   selectedYears.includes(year),
      //   'Selected years:',
      //   selectedYears
      // )

      if (selectedYears.includes(year)) {
        yearData.months.forEach((monthData) => {
          const monthIndex = monthNames.findIndex(
            (m) => m.toLowerCase() === monthData.month.toLowerCase()
          )

          if (monthIndex === -1) {
            console.warn(`Could not find month: ${monthData.month}`)
            return
          }

          const monthNumber = (monthIndex + 1).toString()
          const key = `${monthNumber}-${year}`
          // console.log(`Setting key: ${key} = ${monthData.count}`)
          dataMap.set(key, monthData.count)
        })
      }
    })

    return monthNames.map((_month, index) => {
      const monthNumber = (index + 1).toString()
      const monthData: ChartData = { month: monthNames[index] } // Use full month name for display
      selectedYears.forEach((year) => {
        const lookupKey = `${monthNumber}-${year}`
        const value = dataMap.get(lookupKey)
        monthData[year] = value !== undefined ? value : 0
      })
      return monthData
    })
  }, [data, selectedYears])

  // At the start of the MonthlySMSChart component
  // console.log('MonthlySMSChart received data:', {
  //   rawData: data,
  //   dataLength: data?.length,
  //   firstItem: data?.[0]
  // })
  // Define more vibrant and distinct colors for better visibility
  const colors = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#06b6d4',
    '#f97316',
    '#84cc16',
    '#ec4899',
    '#6366f1',
    '#14b8a6',
    '#f43f5e'
  ]

  // Calculate max value for YAxis domain
  const maxValue = useMemo(() => {
    const allValues = chartData.flatMap((item) =>
      selectedYears.map((year) => Number(item[year]) || 0)
    )
    const max = Math.max(...allValues)
    return max === 0 ? 100 : Math.ceil(max * 1.1) // Add 10% padding
  }, [chartData, selectedYears])

  // Custom Tooltip Component
  const CustomTooltip: React.FC<{
    active?: boolean
    payload?: Array<{ value: number; name: string; color?: string; dataKey?: string }>
    label?: string
  }> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
          <Typography
            variant="subtitle2"
            style={{ color: '#333', marginBottom: '8px', fontWeight: 'bold' }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <div
              key={index}
              style={{
                color: entry.color,
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: entry.color,
                  borderRadius: '2px'
                }}
              />
              <span style={{ fontWeight: 'bold' }}>{entry.dataKey}:</span>
              <span>{entry.value.toLocaleString()} messages</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div style={{ width: '100%', height: '100%', padding: '16px' }}>
      {/* Improved Filter Section */}
      <Box
        sx={{
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Monthly SMS Statistics
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', ml: 'auto' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            Filter by Year:
          </Typography>
          <FormControl variant="outlined" size="small" sx={{ minWidth: '200px' }}>
            <InputLabel id="year-select-label">Years</InputLabel>
            <Select
              labelId="year-select-label"
              label="Years"
              multiple
              value={selectedYears}
              onChange={handleYearChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as number[])
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <Chip
                        key={year}
                        label={year}
                        size="small"
                        sx={{
                          backgroundColor: colors[availableYears.indexOf(year) % colors.length],
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    ))}
                </Box>
              )}>
              {availableYears.map((year) => (
                <MenuItem key={year} value={year}>
                  <Checkbox checked={selectedYears.includes(year)} />
                  <ListItemText primary={year} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Chart Container */}
      <Box
        sx={{
          width: '100%',
          height: 'calc(100% - 80px)',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60
            }}
            barGap={selectedYears.length > 1 ? 4 : 0}
            barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12, fontWeight: 'bold' }}
              interval={0}
            />
            <YAxis
              domain={[0, maxValue]}
              tickCount={6}
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              label={{
                value: 'Number of Messages',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                style: { textAnchor: 'middle', fontSize: 12 }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                bottom: 0
              }}
            />
            {selectedYears.map((year, index) => (
              <Bar
                key={year}
                dataKey={year.toString()}
                name={`${year}`}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
                maxBarSize={selectedYears.length > 1 ? 40 : 60}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Data Availability Notice */}
      {chartData.length > 0 && maxValue === 0 && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: 'warning.light',
            borderRadius: 1,
            textAlign: 'center'
          }}>
          <Typography variant="body2" color="warning.contrastText">
            No SMS data available for the selected years and months.
          </Typography>
        </Box>
      )}
    </div>
  )
}

export default MonthlySMSChart
