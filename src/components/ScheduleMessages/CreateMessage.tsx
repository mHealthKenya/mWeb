"use client"

import { useState } from "react"
import { X, Plus, Calendar, Users, MessageSquare } from "lucide-react"
import { Checkbox } from "@ui/ui/checkbox"
import { Label } from "@ui/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/ui/select"
import { Input } from "@ui/ui/input"
import { Button } from "@ui/ui/button"
import { Textarea } from "@ui/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/ui/card"
import useUsersByRole from 'src/services/users/by-role'
import useAddScheduledMessage from "@services/scheduledMessages/scheduledMessages"

interface Facility {
  name: string
  id: string
}

interface BioDatum {
  age: number
}

export interface UserByRole {
  id: string
  f_name: string
  l_name: string
  gender: string
  email: string
  phone_number: string
  national_id: string
  role: string
  active?: boolean
  createdAt: Date
  updatedAt: Date
  facilityAdmin: string | null
  facilityId?: string
  Facility?: Facility
  BioData?: BioDatum
  name?: string | null
  hasWallet?: boolean
  hasDelivered?: boolean
}

type CreateMessageFormProps = {
  onCancel: () => void
  role: 'Mother'
}

export function CreateMessageForm({ onCancel, role }: CreateMessageFormProps) {
  const { data: users = [], isLoading: isUsersLoading } = useUsersByRole(role, [])
  console.log("Users:", users)
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

  const [phone_number, setPhoneNumber] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [errors, setErrors] = useState<{
    userId?: string;
    message?: string;
    scheduledAt?: string;
  }>({})

  const addUserId = () => {
    if (phone_number.trim() && !formData.userId.includes(phone_number.trim())) {
      setFormData({
        ...formData,
        userId: [...formData.userId, phone_number.trim()],
      })
      setPhoneNumber("")
    }
  }

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
      const allUserIds = users.map((user) => user.id)
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
    const user = users.find((u) => u.id === userId)
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addUserId()
    }
  }

  const availableUsers = users.filter((user) => !formData.userId.includes(user.id))
  const isAllSelected = formData.userId.length === users.length && users.length > 0

  if (isUsersLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Loading users...</CardTitle>
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

              {/* Select All Checkbox */}
              {users.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="select-all" 
                    checked={isAllSelected} 
                    onCheckedChange={toggleSelectAll} 
                    disabled={users.length === 0 || isLoading}
                  />
                  <Label htmlFor="select-all" className="text-sm font-medium">
                    Select all users ({users.length})
                  </Label>
                </div>
              )}

              {/* User Dropdown */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Add from user list:</Label>
                <Select 
                  value={selectedUser} 
                  onValueChange={addUserFromDropdown} 
                  disabled={users.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={users.length === 0 ? "No users available" : "Select a user to add..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.length === 0 ? (
                      <SelectItem value="no-users" disabled>
                        All users already selected
                      </SelectItem>
                    ) : (
                      availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.f_name} {user.l_name}</span>
                            <span className="text-sm text-gray-500">{user.phone_number}</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Manual Input */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Or add manually:</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Phone Number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="button" 
                    onClick={addUserId} 
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
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
                Scheduled Date & Time
              </Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
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