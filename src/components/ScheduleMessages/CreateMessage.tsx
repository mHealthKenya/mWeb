"use client"

import { useState, useEffect, useMemo } from "react"
import { X, Calendar, Users, MessageSquare } from "lucide-react"
import { Checkbox } from "@ui/ui/checkbox"
import { Label } from "@ui/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/ui/select"
import { Input } from "@ui/ui/input"
import { Button } from "@ui/ui/button"
import { Textarea } from "@ui/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/ui/card"
import useUsersByRole from 'src/services/users/by-role'
import useAddScheduledMessage from "@services/scheduledMessages/scheduledMessages"

// Import the UserByRole interface from your models
import type { UserByRole as ModelUserByRole } from 'src/models/user-by-role'
import useGetAllBioData from "@services/biodata/all-biodata"


interface BioDatum {
  id: string
  userId: string
  height: number | null
  weight: number | null
  active: boolean
  age: number
  last_monthly_period: Date | null
  expected_delivery_date: Date | null
  pregnancy_period: number | null
  last_clinic_visit: Date
  facilityId: string
  gravidity: number
  createdById: string
  updatedById: string
  createdAt: Date
  updatedAt: Date
  parity: null | string
}

interface EnhancedBioDatum extends BioDatum {
  timeToDelivery?: number | null
}

// Extend the model interface with our enhanced properties
export interface UserByRole extends ModelUserByRole {
  BioData?: EnhancedBioDatum
}

type CreateMessageFormProps = {
  onCancel: () => void
  role: 'Mother'
}

type TddOption = 'all' | '2' | '6' | '8'

export function CreateMessageForm({ onCancel, role }: CreateMessageFormProps) {
  const { data: users = [], isLoading: isUsersLoading } = useUsersByRole(role, [])
  const { data: bioData = [], isLoading: isBioDataLoading } = useGetAllBioData()
  const { mutate, isLoading } = useAddScheduledMessage()

  const [formData, setFormData] = useState<{
    userId: string[];
    message: string;
    scheduledAt: string;
  }>({
    userId: [],
    message: "",
    scheduledAt: "",
  })


  const [selectedUser, setSelectedUser] = useState("")
  const [tddFilter, setTddFilter] = useState<TddOption>('all')
  const [errors, setErrors] = useState<{
    userId?: string;
    message?: string;
    scheduledAt?: string;
  }>({})

  // Combine users with their bio data and calculate time to delivery
const usersWithBioData = useMemo<UserByRole[]>(() => {
  if (!Array.isArray(bioData)) return users as UserByRole[]
  
  return users.map(user => {
    const userBioData = bioData.find((bio: BioDatum) => bio.userId === user.id)
    const enhancedBioData: EnhancedBioDatum | undefined = userBioData ? {
      ...userBioData,
      timeToDelivery: userBioData.expected_delivery_date 
        ? Math.floor((new Date(userBioData.expected_delivery_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7))
        : null
    } : undefined

    // Create a new object with all properties from user and add our enhanced BioData
    const enhancedUser: UserByRole = {
      ...user,
      BioData: enhancedBioData
    }
    
    return enhancedUser
  })
}, [users, bioData])

  // Filter users based on TDD selection
  const filteredUsers = useMemo(() => {
    return usersWithBioData.filter(user => {
      if (tddFilter === 'all') return true
      if (!user.BioData?.timeToDelivery) return false
      
      const weeksToDelivery = user.BioData.timeToDelivery
      
      switch(tddFilter) {
        case '2':
          return weeksToDelivery >= 6 && weeksToDelivery <= 10
        case '6':
          return weeksToDelivery >= 22 && weeksToDelivery <= 26
        case '8':
          return weeksToDelivery >= 30 && weeksToDelivery <= 34
        default:
          return true
      }
    })
  }, [usersWithBioData, tddFilter])

  // Reset selected users when TDD filter changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      userId: []
    }))
  }, [tddFilter])

  const addUserFromDropdown = (userId: string) => {
    if (userId && !formData.userId.includes(userId)) {
      setFormData({
        ...formData,
        userId: [...formData.userId, userId],
      })
      setSelectedUser("")
    }
  }

  const removeUserId = (userId: string) => {
    setFormData({
      ...formData,
      userId: formData.userId.filter((id) => id !== userId),
    })
  }

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const allUserIds = filteredUsers.map((user) => user.id)
      setFormData({
        ...formData,
        userId: allUserIds,
      })
    } else {
      setFormData({
        ...formData,
        userId: [],
      })
    }
  }

  const getUserDisplayName = (userId: string) => {
    const user = usersWithBioData.find((u) => u.id === userId)
    return user ? `${user.f_name} ${user.l_name} (${user.email})` : userId
  }

  const validateForm = () => {
    const newErrors: {
      userId?: string;
      message?: string;
      scheduledAt?: string;
    } = {}

    if (formData.userId.length === 0) {
      newErrors.userId = "At least one recipient is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    if (!formData.scheduledAt) {
      newErrors.scheduledAt = "Scheduled date and time is required"
    } else {
      const scheduledDate = new Date(formData.scheduledAt)
      if (scheduledDate <= new Date()) {
        newErrors.scheduledAt = "Scheduled time must be in the future"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      mutate({
        userId: formData.userId,
        message: formData.message,
        scheduledAt: formData.scheduledAt,
        id: "",
        status: "",
        sentAt: null
      })
    }
  }

  const availableUsers = filteredUsers.filter((user) => !formData.userId.includes(user.id))
  const isAllSelected = formData.userId.length === filteredUsers.length && filteredUsers.length > 0

  if (isUsersLoading || isBioDataLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Loading users and pregnancy data...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Schedule New Message
            </CardTitle>
            <CardDescription>Create a new scheduled message to send to multiple users</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} disabled={isLoading}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipients Section */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Recipients
              </Label>

              {/* Time to Delivery Filter */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Filter by Time to Delivery:</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="tdd-all"
                      name="tdd-filter"
                      checked={tddFilter === 'all'}
                      onChange={() => setTddFilter('all')}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="tdd-all" className="text-sm font-medium">
                      All Mothers ({usersWithBioData.length})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="tdd-2"
                      name="tdd-filter"
                      checked={tddFilter === '2'}
                      onChange={() => setTddFilter('2')}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="tdd-2" className="text-sm font-medium">
                      2 Months ({usersWithBioData.filter(u => {
                        const weeks = u.BioData?.timeToDelivery
                        return weeks && weeks >= 6 && weeks <= 10
                      }).length})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="tdd-6"
                      name="tdd-filter"
                      checked={tddFilter === '6'}
                      onChange={() => setTddFilter('6')}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="tdd-6" className="text-sm font-medium">
                      6 Months ({usersWithBioData.filter(u => {
                        const weeks = u.BioData?.timeToDelivery
                        return weeks && weeks >= 22 && weeks <= 26
                      }).length})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="tdd-8"
                      name="tdd-filter"
                      checked={tddFilter === '8'}
                      onChange={() => setTddFilter('8')}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="tdd-8" className="text-sm font-medium">
                      8 Months ({usersWithBioData.filter(u => {
                        const weeks = u.BioData?.timeToDelivery
                        return weeks && weeks >= 30 && weeks <= 34
                      }).length})
                    </Label>
                  </div>
                </div>
              </div>

              {/* Select All Checkbox */}
              {filteredUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="select-all" 
                    checked={isAllSelected} 
                    onCheckedChange={toggleSelectAll} 
                    disabled={filteredUsers.length === 0 || isLoading}
                  />
                  <Label htmlFor="select-all" className="text-sm font-medium">
                    Select all filtered users ({filteredUsers.length})
                  </Label>
                </div>
              )}

              {/* User Dropdown */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Add from user list:</Label>
                <Select 
                  value={selectedUser} 
                  onValueChange={addUserFromDropdown} 
                  disabled={filteredUsers.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={filteredUsers.length === 0 ? "No users available" : "Select a user to add..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.length === 0 ? (
                      <SelectItem value="no-users" disabled>
                        All filtered users already selected
                      </SelectItem>
                    ) : (
                      availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.f_name} {user.l_name}</span>
                            <span className="text-sm text-gray-500">
                              {user.phone_number} • 
                              {user.BioData?.timeToDelivery ? 
                                ` ${user.BioData.timeToDelivery} weeks to delivery` : 
                                ' No delivery date'}
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {errors.userId && <p className="text-sm text-red-600">{errors.userId}</p>}

              {/* Selected Recipients */}
              {formData.userId.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Selected Recipients ({formData.userId.length})</Label>
                  <div className="max-h-32 overflow-y-auto p-3 bg-gray-50 rounded-md space-y-2">
                    {formData.userId.map((userId) => (
                      <div key={userId} className="flex items-center justify-between bg-white p-2 rounded border">
                        <span className="text-sm">{getUserDisplayName(userId)}</span>
                        <button
                          type="button"
                          onClick={() => removeUserId(userId)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Message Section */}
            <div className="space-y-2">
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                placeholder="Enter your message content..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="resize-none"
              />
              {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
              <p className="text-sm text-gray-500">{formData.message.length} characters</p>
            </div>

            {/* Scheduled Date Section */}
            <div className="space-y-2">
              <Label htmlFor="scheduledAt" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Scheduled Date
              </Label>
              <Input
                id="scheduledAt"
                type="date"
                value={formData.scheduledAt}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                min={new Date().toISOString().slice(0, 16)}
              />
              {errors.scheduledAt && <p className="text-sm text-red-600">{errors.scheduledAt}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-primary"
                disabled={isLoading}
              >
                {isLoading ? "Scheduling..." : "Schedule Message"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}