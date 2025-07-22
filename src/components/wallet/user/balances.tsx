import { Calendar, Search, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Facility } from '@models/facility'

import { Badge } from '@ui/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@ui/ui/card'
import { Input } from '@ui/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/ui/select'
import dayjs from 'dayjs'
import useAllFacilities from '@services/locations/all'
import { MotherBalances } from '@models/mother-balances'
import { abbrev } from 'utils/abbrev'

export function MothersBalances({
  facilities,
  balances
}: {
  facilities: Facility[]
  balances: MotherBalances[]
}) {
  const { data: allFacilities } = useAllFacilities(facilities)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFacility, setSelectedFacility] = useState('all')

  const filteredData = useMemo(() => {
    return balances.filter((item) => {
      const fullName = `${item.user.f_name} ${item.user.l_name}`.toLowerCase()
      const phoneNumber = item.user.phone_number.toLowerCase()
      const searchLower = searchTerm.toLowerCase()

      const matchesSearch = fullName.includes(searchLower) || phoneNumber.includes(searchLower)
      const matchesFacility =
        selectedFacility === 'all' || item.user.Facility.name === selectedFacility

      return matchesSearch && matchesFacility
    })
  }, [searchTerm, selectedFacility, balances])

  const initialBalance = useMemo(() => {
    return (
      filteredData.length * 7000 - filteredData.reduce((sum, account) => sum + account.balance, 0)
    )
  }, [filteredData])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>

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

        <Select value={selectedFacility} onValueChange={setSelectedFacility}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Filter by facility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Facilities</SelectItem>
            {allFacilities.map((facility) => (
              <SelectItem key={facility.id} value={facility.name}>
                {facility.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-gray-600">
        Showing {filteredData.length} of {balances.length} accounts
      </div>
      <div className="text-sm font-semibold">
        Total Balance:
        <span className="text-lg text-green-600">{formatCurrency(initialBalance)}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredData.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold capitalize">
                    {account.user.f_name} {account.user.l_name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{account.user.phone_number}</p>
                </div>
                <Badge variant="outline" className={`text-xs ${'bg-gray-100 text-gray-800'}`}>
                  {abbrev(account.user.Facility.name)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Balance</span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(account.balance)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Created {dayjs(account.createdAt).format('DD MMM YYYY')}</span>
              </div>

              <div className="text-xs text-gray-400 font-mono">ID: {account.id.slice(-8)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No accounts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}
