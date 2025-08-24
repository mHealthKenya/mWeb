"use client"

import { MessageSquare, Calendar, Clock, Send, Tag } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/ui/card"
import { Badge } from "@ui/ui/badge"
import useScheduledMessageById from "@services/scheduledMessages/scheduledessagesById"

export function MessageDetails({ messageId }: { messageId: string }) {
  const { data: message, isLoading, isError } = useScheduledMessageById(messageId)

  if (isLoading)
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12 text-gray-500">Loading message details…</CardContent>
      </Card>
    )

  if (isError || !message)
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12 text-red-500">Failed to load message details</CardContent>
      </Card>
    )

  const formatDate = (d?: string | null) => (d ? format(new Date(d), "EEEE, MMMM dd, yyyy 'at' HH:mm") : "—")

  const statusInfo = message.sent
    ? { badge: <Badge className="bg-green-100 text-green-800">Sent</Badge>, color: "text-green-600", icon: <Send className="w-4 h-4 text-green-600" /> }
    : { badge: <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pending</Badge>, color: "text-orange-600", icon: <Clock className="w-4 h-4 text-orange-600" /> }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">{statusInfo.icon} Message Details</CardTitle>
          {statusInfo.badge}
        </div>
        <CardDescription>ID: {message.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message Content */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Message</h4>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>

        {/* Category & Targeting */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2"><Tag className="w-4 h-4" /> Category</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="uppercase">{String(message.category).replace(/_/g, " ")}</Badge>
            {message.category === "GESTATION_PERIOD" && (
              <Badge>Target: {message.gestationTarget} weeks</Badge>
            )}
            {message.category === "HIGH_RISK" && message.riskCondition && (
              <Badge>Risk: {String(message.riskCondition).replace(/_/g, " ")}</Badge>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2"><Calendar className="w-4 h-4" /> Schedule</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Scheduled for:</span><span className="font-medium">{formatDate(message.scheduledAt)}</span></div>
            {message.sent && (
              <div className="flex justify-between"><span className="text-gray-600">Sent at:</span><span className="font-medium text-green-600">{formatDate(message.sentAt)}</span></div>
            )}
            <div className="flex justify-between"><span className="text-gray-600">Status:</span><span className={`font-medium ${statusInfo.color}`}>{statusInfo.badge}</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}