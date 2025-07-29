"use client"

import { MessageSquare, Users, Calendar, Clock, Trash2, Send } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/ui/card"
import { Badge } from "@ui/ui/badge"
import { Button } from "@ui/ui/button"
import useScheduledMessageById from "@services/scheduledMessages/scheduledessagesById"

interface MessageDetailsProps {
  messageId: string | null
  onDelete: (id: string) => void
}

export function MessageDetails({ messageId, onDelete }: MessageDetailsProps) {
  const { data: message, isLoading, isError } = useScheduledMessageById(messageId || "")

  if (!messageId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Select a message to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300 animate-pulse" />
            <p>Loading message details...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError || !message) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-red-300" />
            <p>Failed to load message details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE, MMMM dd, yyyy 'at' HH:mm")
    } catch {
      return "Invalid date"
    }
  }

  const getStatusInfo = (status: boolean) => {
    const statusText = status ? "sent" : "pending"
    switch (statusText) {
      case "sent":
        return {
          badge: <Badge className="bg-green-100 text-green-800">Sent</Badge>,
          icon: <Send className="w-4 h-4 text-green-600" />,
          color: "text-green-600",
        }
      case "pending":
        return {
          badge: (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Pending
            </Badge>
          ),
          icon: <Clock className="w-4 h-4 text-orange-600" />,
          color: "text-orange-600",
        }
      default:
        return {
          badge: <Badge variant="outline">Unknown</Badge>,
          icon: <MessageSquare className="w-4 h-4 text-gray-600" />,
          color: "text-gray-600",
        }
    }
  }

  const statusInfo = getStatusInfo(message.sent)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {statusInfo.icon}
            Message Details
          </CardTitle>
          {statusInfo.badge}
        </div>
        <CardDescription>ID: {message.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message Content */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message Content
          </h4>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>

        {/* Recipient */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Recipient
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium">{message.user.f_name} {message.user.l_name}</p>
                <p className="text-gray-500">{message.user.phone_number}</p>
                {message.user.email && <p className="text-gray-500">{message.user.email}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Scheduling Info */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Information
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled for:</span>
              <span className="font-medium">{formatDate(message.scheduledAt)}</span>
            </div>

            {message.sent && (
              <div className="flex justify-between">
                <span className="text-gray-600">Sent at:</span>
                <span className="font-medium text-green-600">{formatDate(message.scheduledAt)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${statusInfo.color}`}>
                {statusInfo.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(message.id)}
            className="w-full flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}