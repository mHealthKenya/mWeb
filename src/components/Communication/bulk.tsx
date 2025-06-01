'use client'

import { type FC, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/ui/card'
import { Checkbox } from '@ui/ui/checkbox'
import { Textarea } from '@ui/ui/textarea'
import { Badge } from '@ui/ui/badge'
import { ArrowLeft, ArrowRight, Search, Send, Users, X } from 'lucide-react'
import { Input } from '@ui/ui/input'
import { Button } from '@ui/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/ui/table'
import useUsersByRole from '@services/users/by-role'
import type { UserByRole } from '@models/user-by-role'
import useSendSMS from '@services/communication/send-sms'

const BulkSMS: FC<{ mothers: UserByRole[] }> = ({ mothers }) => {
  const { data: users = [] } = useUsersByRole('Mother', mothers)

  const modedUsers = users.map((user) => ({
    ...user,
    phone_number: '+' + user.phone_number
  }))

  const [step, setStep] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // Number of items per page

  const filteredUsers = modedUsers.filter(
    (user) =>
      user.f_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.l_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const handleSelectAll = () => {
    if (filteredUsers.every((user) => selectedUsers.includes(user.phone_number))) {
      setSelectedUsers(
        selectedUsers.filter(
          (phoneNumber) => !filteredUsers.some((user) => user.phone_number === phoneNumber)
        )
      )
    } else {
      const newSelectedPhoneNumbers = filteredUsers
        .filter((user) => !selectedUsers.includes(user.phone_number))
        .map((user) => user.phone_number)
      setSelectedUsers([...selectedUsers, ...newSelectedPhoneNumbers])
    }
  }

  const handleUserToggle = (phoneNumber: string) => {
    if (selectedUsers.includes(phoneNumber)) {
      setSelectedUsers(selectedUsers.filter((number) => number !== phoneNumber))
    } else {
      setSelectedUsers([...selectedUsers, phoneNumber])
    }
  }

  const successFn = () => {
    setStep(1)
    setSelectedUsers([])
    setMessage('')
  }

  const { mutate: add, isLoading } = useSendSMS({ successFn })

  const handleSend = async () => {
    await add({
      phoneNumbers: selectedUsers,
      message
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Bulk SMS</CardTitle>
        <CardDescription>
          {step === 1 ? 'Select recipients for your message' : 'Compose your message'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or phone number..."
                  className="pl-9 pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Badge variant="default" className="flex items-center gap-1 h-9 px-4">
                <Users className="h-3 w-3" />
                <span>
                  {selectedUsers.length} selected
                  {searchQuery && ` (${filteredUsers.length} filtered)`}
                </span>
              </Badge>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        id="select-all"
                        checked={
                          filteredUsers.length > 0 &&
                          filteredUsers.every((user) => selectedUsers.includes(user.phone_number))
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className={
                          selectedUsers.includes(user.phone_number) ? 'bg-secondary/50' : ''
                        }>
                        <TableCell>
                          <Checkbox
                            id={`user-${user.id}`}
                            checked={selectedUsers.includes(user.phone_number)}
                            onCheckedChange={() => handleUserToggle(user.phone_number)}
                          />
                        </TableCell>
                        <TableCell>
                          {user.f_name} {user.l_name}
                        </TableCell>
                        <TableCell className="font-mono">{user.phone_number}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-muted-foreground mb-2">No users found</p>
                          <p className="text-sm text-muted-foreground">
                            Try a different search term
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                Sending to <strong>{selectedUsers.length}</strong> recipients
              </p>
              <p className="text-sm text-muted-foreground">{message.length}/160 characters</p>
            </div>

            <Textarea
              placeholder="Type your message here..."
              className="min-h-[200px] resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Preview</h4>
              <p className="text-sm whitespace-pre-wrap">
                {message || 'Your message preview will appear here...'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 1 ? (
          <>
            <Button variant="ghost" disabled>
              Back
            </Button>
            <Button onClick={() => setStep(2)} disabled={selectedUsers.length === 0}>
              Next
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setStep(1)} disabled={isLoading}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleSend} disabled={!message.trim() || isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
              {!isLoading && <Send className="h-4 w-4 ml-2" />}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

export default BulkSMS
