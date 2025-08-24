"use client"

import { Eye, Calendar, BadgeCheck, Hourglass, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@ui/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/ui/table"
import { Button } from "@ui/ui/button"
import { MessageListItem } from "@models/scheduledMesages"

export function MessagesTable({
  messages,
  onSelectMessage,
  onDeleteMessage,
  selectedMessageId,
}: {
  messages: MessageListItem[]
  onSelectMessage: (m: MessageListItem) => void
  onDeleteMessage: (id: string) => void
  selectedMessageId: string
}) {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "—"
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch {
      return "Invalid"
    }
  }

  const statusBadge = (sent: boolean) =>
    sent ? (
      <Badge className="bg-green-100 text-green-800">Sent</Badge>
    ) : (
      <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pending</Badge>
    )

  const categoryBadge = (cat: string) => (
    <Badge variant="outline" className="uppercase tracking-wide">{cat.replace(/_/g, " ")}</Badge>
  )

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Message</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((m) => (
            <TableRow
              key={m.id}
              className={`cursor-pointer hover:bg-gray-50 ${selectedMessageId === m.id ? "bg-blue-50" : ""}`}
              onClick={() => onSelectMessage(m)}
            >
              <TableCell className="max-w-xs"><div className="truncate font-medium">{m.message}</div></TableCell>
              <TableCell>{categoryBadge(m.category)}</TableCell>
              <TableCell className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {formatDate(m.scheduledAt)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {m.sent ? <BadgeCheck className="w-4 h-4 text-green-600" /> : <Hourglass className="w-4 h-4 text-orange-600" />}
                  {statusBadge(m.sent)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectMessage(m)
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteMessage(m.id)
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