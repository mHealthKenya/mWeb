'use client'

import { User } from '@models/biodata'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card'
import { Chart } from 'react-google-charts'

export type DeliveryStatusData = [string, string | number][]

export type DeliveryMethodData = [string, string | number][]

const pieChartOptions = {
  title: '',
  pieHole: 0.4,
  colors: ['#10b981', '#ef4444'],
  backgroundColor: 'transparent',
  legend: {
    position: 'bottom',
    textStyle: { color: '#a1a1aa', fontSize: 12 }
  },
  chartArea: { width: '90%', height: '80%' },
  pieSliceTextStyle: { color: 'white', fontSize: 14 }
}

const barChartOptions = {
  title: '',
  colors: ['#10b981'],
  backgroundColor: 'transparent',
  legend: { position: 'none' },
  hAxis: {
    textStyle: { color: '#a1a1aa', fontSize: 11 },
    titleTextStyle: { color: '#a1a1aa' }
  },
  vAxis: {
    textStyle: { color: '#a1a1aa', fontSize: 11 },
    titleTextStyle: { color: '#a1a1aa' },
    gridlines: { color: '#27272a' },
    minValue: 0
  },
  chartArea: { width: '85%', height: '70%' },
  bar: { groupWidth: '60%' }
}

interface Props {
  mothers: User[]
  deliveredCount: number
  notDeliveredCount: number
  deliveryMethodData: DeliveryMethodData
  deliveryStatusData: DeliveryStatusData
}

export function DeliveryAnalytics({
  mothers,
  deliveredCount,
  notDeliveredCount,
  deliveryMethodData,
  deliveryStatusData
}: Props) {
  const totalRecords = mothers.length
  const deliveryRate = ((deliveredCount / totalRecords) * 100).toFixed(1)

  return (
    <div className="w-full space-y-6 mb-3">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Delivery Analytics</h1>
        <p className="text-muted-foreground">
          Overview of delivery status and methods distribution
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Records</CardDescription>
            <CardTitle className="text-4xl">{totalRecords}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">All pregnancy records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Deliveries Completed</CardDescription>
            <CardTitle className="text-4xl">{deliveredCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{deliveryRate}% delivery rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Deliveries</CardDescription>
            <CardTitle className="text-4xl">{notDeliveredCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active pregnancies</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Delivery Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Status Distribution</CardTitle>
            <CardDescription>Breakdown of completed vs pending deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              chartType="PieChart"
              width="100%"
              height="300px"
              data={deliveryStatusData}
              options={pieChartOptions}
            />
          </CardContent>
        </Card>

        {/* Delivery Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Methods</CardTitle>
            <CardDescription>Distribution of delivery methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="300px"
              data={deliveryMethodData}
              options={barChartOptions}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
