"use client"

import { useMemo, useState } from "react"
import { Plus, MessageSquare, Send, Clock, Search, Loader2, Trash2, BadgeCheck, Hourglass, EyeIcon } from "lucide-react"
import { useToast } from "@ui/ui/use-toast"
import { Button } from "@ui/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@ui/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui/ui/dialog"
import { Input } from "@ui/ui/input"
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { Badge } from "@ui/ui/badge"

import { CreateMessageForm } from "./CreateMessage"
import { MessageDetails } from "./MessageDetails"

import useAllScheduledMessages from "@services/scheduledMessages/allScheduledMessages"
import { MessageListItem } from "@models/scheduledMesages"
import { useDeleteScheduledMessage } from "@services/scheduledMessages/deleteScheduledMessages"
import Swal from "sweetalert2"

export default function ScheduledMessagesComponent() {
  const { data: allScheduledMessages = [], isLoading, isError, refetch } = useAllScheduledMessages()
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "sent" | "unsent">("all")
  const [q, setQ] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const messagesData = useMemo(() => {
    if (!allScheduledMessages) return [];
    return Array.isArray(allScheduledMessages) 
      ? allScheduledMessages 
      : allScheduledMessages.data || [];
  }, [allScheduledMessages])

  const messages: MessageListItem[] = useMemo(
    () =>
      messagesData.map((m: any) => ({
        id: m.id,
        message: m.message,
        category: m.category,
        scheduledAt: m.scheduledAt,
        sent: Boolean(m.sent),
        sentAt: m.sentAt ?? null,
      })),
    [messagesData]
  )

  const filtered = useMemo(() => {
    let list = messages;
    if (activeTab === "sent") list = list.filter((x) => x.sent);
    if (activeTab === "unsent") list = list.filter((x) => !x.sent);
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (x) =>
          x.message.toLowerCase().includes(term) ||
          x.category.toLowerCase().includes(term)
      );
    }
    return list;
  }, [messages, activeTab, q])

  const stats = useMemo(
    () => ({
      total: messages.length,
      sent: messages.filter((m) => m.sent).length,
      pending: messages.filter((m) => !m.sent).length,
    }),
    [messages]
  )

  const { mutate: deleteMessage } = useDeleteScheduledMessage()

  const handleDeleteMessage = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        deleteMessage(id, {
          onSuccess: () => {
            toast({ title: "Deleted", description: "Message removed successfully." });
            refetch();
            if (selectedMessageId === id) setSelectedMessageId(null);
          },
          onError: (error: any) => {
            toast({ title: "Error", description: error?.message || "Failed to delete.", variant: "destructive" });
          },
          onSettled: () => setDeletingId(null),
        });
      }
    });
  }

  const handleViewMessage = (id: string) => {
    setSelectedMessageId(id);
  }

  // DataGrid columns configuration
  const columns: GridColDef[] = [
    {
      field: 'message',
      headerName: 'Message',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div className="truncate font-medium">{params.value}</div>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      renderCell: (params) => (
        <Badge>{params.value}</Badge>
      ),
    },
    {
      field: 'scheduledAt',
      headerName: 'Scheduled At',
      width: 200,
      valueFormatter: (params) => {
        if (!params.value) return "-";
        try {
          return new Date(params.value).toLocaleString();
        } catch {
          return "Invalid";
        }
      },
    },
    {
      field: 'sent',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        params.value ? (
          <div className="flex flex-row items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">Sent</span>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <Hourglass className="animate-spin w-4 h-4 text-orange-600" />
            <span className="text-orange-600 font-semibold">Pending</span>
          </div>
        )
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewMessage(params.row.id)}
          >
            <EyeIcon className="w-4 h-4 mr-1" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteMessage(params.row.id)}
            disabled={deletingId === params.row.id}
          >
            {deletingId === params.row.id ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin w-4 h-4 mr-1" />
              </span>
            ) : (
              <span className="flex items-center">
                <Trash2 className="w-4 h-4 mr-1" />
              </span>
            )}
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading messages...</div>;
  if (isError) return <div className="min-h-screen flex items-center justify-center">Error loading messages</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Scheduled Messages</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your scheduled campaigns</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2 bg-primary">
            <Plus className="w-4 h-4" /> Schedule Message
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total" value={stats.total} icon={<MessageSquare className="h-4 w-4" />} />
          <StatCard title="Sent" value={stats.sent} icon={<Send className="h-4 w-4 text-green-600" />} valueClass="text-green-600" />
          <StatCard title="Pending" value={stats.pending} icon={<Clock className="h-4 w-4 text-orange-600" />} valueClass="text-orange-600" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search message or category..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="unsent">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* DataGrid Table */}
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>View and manage your scheduled messages</CardDescription>
          </CardHeader>
          <CardContent>
            {filtered.length > 0 ? (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={filtered}
                  columns={columns}
                  pageSizeOptions={[5, 10, 25]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                  disableRowSelectionOnClick
                  sx={{
                    '& .MuiDataGrid-cell:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    '& .MuiDataGrid-row:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-center py-10 text-gray-500">No messages found</div>
                <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2 bg-primary">
                  <Plus className="w-4 h-4" /> Schedule Message
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Details Modal */}
        <Dialog open={!!selectedMessageId} onOpenChange={() => setSelectedMessageId(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
            </DialogHeader>
            {selectedMessageId && <MessageDetails messageId={selectedMessageId} />}
          </DialogContent>
        </Dialog>

        {/* Create Message Modal */}
        {showCreateForm && (
          <CreateMessageForm
            onCancel={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false);
              refetch();
            }}
          />
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, valueClass }: { title: string; value: number; icon: JSX.Element; valueClass?: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueClass || ""}`}>{value}</div>
      </CardContent>
    </Card>
  )
}