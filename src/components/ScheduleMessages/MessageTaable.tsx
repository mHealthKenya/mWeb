"use client"


import { Trash2, Eye, Users, Calendar } from "lucide-react"
import { format } from "date-fns"
import { MessageSquare } from "lucide-react" // Import MessageSquare
import { Badge } from "@ui/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/ui/table"
import { Button } from "@ui/ui/button"

type Message = {
  id: string
  message: string
  userId: string[]
  scheduledAt: string
  status: string
}

interface MessagesTableProps {
  messages: Message[]
  onSelectMessage: (message: Message) => void
  onDeleteMessage: (id: string) => void
  selectedMessageId: string
}

export function MessagesTable({ messages, onSelectMessage, onDeleteMessage, selectedMessageId }: MessagesTableProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch {
      return "Invalid date"
    }
  }

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Sent
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No messages found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Message</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow
              key={message.id}
              className={`cursor-pointer hover:bg-gray-50 ${selectedMessageId === message.id ? "bg-blue-50" : ""}`}
              onClick={() => onSelectMessage(message)}
            >
              <TableCell className="max-w-xs">
                <div className="truncate font-medium">
                  {message.message.length > 50 ? `${message.message.substring(0, 50)}...` : message.message}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{message.userId.length}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {formatDate(message.scheduledAt)}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(message.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectMessage(message)
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteMessage(message.id)
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
