import { useState, useMemo } from 'react'
import {
  Search,
  Users,
  UserCheck,
  UserPlus,
  Phone,
  Activity,
  BarChart as BarChartIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@ui/ui/card'
import { Badge } from '@ui/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/ui/select'
import { Input } from '@ui/ui/input'
import { VisitsDashBoard } from '@models/visits-dash'
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

const getVisitBadge = (visitCount: number) => {
  if (visitCount === 0) {
    return {
      label: 'Zero Visit Patients',
      className: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: UserPlus
    }
  } else if (visitCount === 1) {
    return {
      label: 'First Visit Patient',
      className: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: UserCheck
    }
  } else if (visitCount <= 5) {
    return {
      label: 'Regular',
      className: 'bg-green-100 text-green-700 border-green-200',
      icon: Activity
    }
  } else {
    return {
      label: 'Frequent',
      className: 'bg-purple-100 text-purple-700 border-purple-200',
      icon: Activity
    }
  }
}

export function PatientVisitsDisplay({
  patientData
}: {
  patientData: VisitsDashBoard[]
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredData = useMemo(() => {
    return patientData.filter((patient) => {
      const fullName = patient.fullName.toLowerCase()
      const phoneNumber = patient.phoneNumber.toLowerCase()
      const searchLower = searchTerm.toLowerCase()

      const matchesSearch = fullName.includes(searchLower) || phoneNumber.includes(searchLower)

      let matchesCategory = true
      if (selectedCategory !== 'all') {
        switch (selectedCategory) {
          case 'registered':
            matchesCategory = patient.visitCount === 0
            break
          case 'first':
            matchesCategory = patient.visitCount === 1
            break
          case 'regular':
            matchesCategory = patient.visitCount > 1 && patient.visitCount <= 8
            break
          case 'frequent':
            matchesCategory = patient.visitCount > 5
            break
        }
      }

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, patientData])

  const stats = useMemo(() => {
    const totalPatients = patientData.length
    const registeredOnly = patientData.filter((p) => p.visitCount === 0).length
    // const registeredOnly = zeroVisits.count

    const firstVisitPatients = patientData.filter((p) => p.visitCount === 1).length
    const returningPatients = patientData.filter((p) => p.visitCount > 1).length
    const totalVisits = patientData.reduce((sum, patient) => sum + patient.visitCount, 0)
    const averageVisits = totalVisits / totalPatients

    return {
      totalPatients,
      registeredOnly,
      firstVisitPatients,
      returningPatients,
      totalVisits,
      averageVisits
    }
  }, [patientData])

  const formatPhoneNumber = (phone: string) => {
    // Format Kenyan phone number for better readability
    if (phone.startsWith('254')) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`
    }
    return phone
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Patient Visits Dashboard</h1>
        <p className="text-gray-600">Track patient visits and engagement across mPlus</p>
      </div>

      {/* Visit Distribution Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChartIcon className="h-5 w-5 text-blue-600" />
            Patient Visit Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                {
                  name: 'Patients with Bio Data',
                  count: stats.totalPatients,
                  fill: '#4B5563' // gray-600
                },
                {
                  name: 'Zero Visit Patients',
                  count: stats.registeredOnly,
                  fill: '#9CA3AF' // gray-400
                },
                {
                  name: 'First Visit Patients',
                  count: stats.firstVisitPatients,
                  fill: '#3B82F6' // blue-500
                },
                {
                  name: 'Returning Patients',
                  count: stats.returningPatients,
                  fill: '#10B981' // emerald-500
                },
                {
                  name: 'Total Visits',
                  count: stats.totalVisits,
                  fill: '#8B5CF6' // violet-500
                }
              ]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 40
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                tick={{
                  fontSize: 12,
                  height: 100 // Adjust height to prevent text cutoff
                }}
                interval={0}
                height={60}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => [value, 'Count']}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Legend />
              <Bar dataKey="count" name="Patients/Visits" fill="#8884d8" radius={[4, 4, 0, 0]}>
                {[
                  { name: 'Patients with Bio Data', fill: '#4B5563' },
                  { name: 'Zero Visit Patients', fill: '#9CA3AF' },
                  { name: 'First Visit Patients', fill: '#3B82F6' },
                  { name: 'Returning Patients', fill: '#10B981' },
                  { name: 'Total Visits', fill: '#8B5CF6' }
                ].map((entry, index) => (
                  <Bar
                    key={`bar-${index}`}
                    dataKey="count"
                    name={entry.name}
                    fill={entry.fill}
                    hide={
                      entry.name !== 'Patients with Bio Data' &&
                      entry.name !== 'Zero Visit Patients' &&
                      entry.name !== 'First Visit Patients' &&
                      entry.name !== 'Returning Patients' &&
                      entry.name !== 'Total Visits'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients with Bio Data</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Registered in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">First Visit Patients</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.firstVisitPatients}</div>
            <p className="text-xs text-muted-foreground">First-time visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returning Patients</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.returningPatients}</div>
            <p className="text-xs text-muted-foreground">Multiple visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {stats.averageVisits.toFixed(1)} per patient
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Filter by patient type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patients</SelectItem>
            <SelectItem value="registered">Zero Visit Patients</SelectItem>
            <SelectItem value="first">First Visit Patients</SelectItem>
            <SelectItem value="regular">Returning Patients</SelectItem>
            <SelectItem value="frequent">Frequent Patients</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-gray-600">
        Showing {filteredData.length} of {patientData.length} patients
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredData.map((patient) => {
          const visitBadge = getVisitBadge(patient.visitCount)
          const IconComponent = visitBadge.icon

          return (
            <Card
              key={patient.id}
              className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg font-semibold leading-tight capitalize">
                      <div className="flex flex-col space-y-1">
                        {patient.fullName.trim()}
                        <div className="flex items-center gap-2 text-sm text-gray-600 pt-3">
                          <Phone className="h-3 w-3" />
                          <span className="font-mono text-xs">
                            {formatPhoneNumber(patient.phoneNumber)}
                          </span>
                        </div>
                      </div>
                    </CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs flex items-center gap-1 ${visitBadge.className}`}>
                    <IconComponent className="h-3 w-3" />
                    {visitBadge.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Visit Count</span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-2xl font-bold ${
                        patient.visitCount === 0
                          ? 'text-gray-500'
                          : patient.visitCount === 1
                          ? 'text-blue-600'
                          : patient.visitCount <= 5
                          ? 'text-green-600'
                          : 'text-purple-600'
                      }`}>
                      { patient.visitCount}
                    </div>
                    <span className="text-xs text-gray-500">
                      {patient.visitCount === 1 ? 'visit' : 'visits'}
                    </span>
                  </div>
                </div>

                {/* Progress bar for visit frequency */}
                {/* <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Engagement Level</span>
                    <span>{Math.min(patient.visitCount * 20, 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        patient.visitCount === 0
                          ? 'bg-gray-400'
                          : patient.visitCount === 1
                          ? 'bg-blue-500'
                          : patient.visitCount <= 5
                          ? 'bg-green-500'
                          : 'bg-purple-500'
                      }`}
                      style={{ width: `${Math.min(patient.visitCount * 20, 100)}%` }}
                    />
                  </div>
                </div> */}

                <div className="text-xs text-gray-400 font-mono">ID: {patient.id.slice(-8)}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No patients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
      {/* {
        showCreateForm && (
          <ManageVisits
            onCancel={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false)
              // Optionally, refresh data or show a success message
            }}
          />
          // <div>Manage Visits Form Placeholder</div>
        )
      } */}
    </div>
  )
}
