import { useState, useMemo } from 'react'
import { Search, Users, UserCheck, UserPlus, Phone, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@ui/ui/card'
import { Badge } from '@ui/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/ui/select'
import { Input } from '@ui/ui/input'
import { VisitsDashBoard } from '@models/visits-dash'

const getVisitBadge = (visitCount: number) => {
  if (visitCount === 0) {
    return {
      label: 'Registered',
      className: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: UserPlus
    }
  } else if (visitCount === 1) {
    return {
      label: 'New Patient',
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

export function PatientVisitsDisplay({ patientData }: { patientData: VisitsDashBoard[] }) {
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
          case 'new':
            matchesCategory = patient.visitCount === 1
            break
          case 'regular':
            matchesCategory = patient.visitCount > 1 && patient.visitCount <= 5
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
    const newPatients = patientData.filter((p) => p.visitCount === 1).length
    const returningPatients = patientData.filter((p) => p.visitCount > 1).length
    const totalVisits = patientData.reduce((sum, patient) => sum + patient.visitCount, 0)
    const averageVisits = totalVisits / totalPatients

    return {
      totalPatients,
      registeredOnly,
      newPatients,
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
        <p className="text-gray-600">
          Track patient visits and engagement across your healthcare facility
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Registered in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.newPatients}</div>
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
            <SelectItem value="registered">Registered Only</SelectItem>
            <SelectItem value="new">New Patients</SelectItem>
            <SelectItem value="regular">Regular Patients</SelectItem>
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
                      {patient.visitCount}
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
    </div>
  )
}
