"use client"

import { useState } from "react"
import { Plus, MessageSquare, Send, Clock } from "lucide-react"
import { useToast } from "@ui/ui/use-toast"
import { Button } from "@ui/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/ui/tabs"
import { CreateMessageForm } from "./CreateMessage"
import { MessagesTable } from "./MessageTaable"
import { MessageDetails } from "./MessageDetails"
import useAllScheduledMessages from "@services/scheduledMessages/allScheduledMessages"

export type Message = {
  id: string
  userId: string
  message: string
  scheduledAt: string
  status: boolean // Changed from string to boolean to match API
  sentAt: string | null
  user: {
    id: string
    f_name: string
    l_name: string
    email: string | null
    phone_number: string
  }
}

export default function ScheduledMessagesComponent() {
  const { data: apiMessages = [], isLoading, isError } = useAllScheduledMessages()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  // Transform API data to match your component's expected format
  const messages = apiMessages.map((msg: any) => ({
    id: msg.id,
    userId: msg.userId,
    message: msg.message,
    scheduledAt: msg.scheduledAt,
    status: msg.sent ? "sent" : "pending", // Convert boolean to string status
    sentAt: msg.sent ? msg.scheduledAt : null,
    user: {
      id: msg.user.id,
      f_name: msg.user.f_name,
      l_name: msg.user.l_name,
      email: msg.user.email,
      phone_number: msg.user.phone_number
    }
  }))

  const handleCreateMessage = async (messageData: Omit<Message, 'id' | 'status' | 'sentAt' | 'user'>) => {
    try {
      const newMessage = {
        id: Date.now().toString(),
        ...messageData,
        status: "pending",
        sentAt: null,
        user: {
          id: "temp-id",
          f_name: "New",
          l_name: "User",
          email: null,
          phone_number: "0000000000"
        }
      }
      // In a real app, you would call your API here to create the message
      // and then update the local state with the response
      toast({
        title: "Message Scheduled",
        description: "Your message has been scheduled successfully.",
      })
      setShowCreateForm(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteMessage = async (id: string) => {
    try {
      // In a real app, you would call your API here to delete the message
      // and then update the local state
      toast({
        title: "Message Deleted",
        description: "The scheduled message has been deleted.",
      })
      setSelectedMessage(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getFilteredMessages = () => {
    switch (activeTab) {
      case "sent":
        return messages.filter((msg) => msg.status === "sent")
      case "unsent":
        return messages.filter((msg) => msg.status === "pending")
      default:
        return messages
    }
  }

  const stats = {
    total: messages.length,
    sent: messages.filter((msg) => msg.status === "sent").length,
    pending: messages.filter((msg) => msg.status === "pending").length,
  }

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 p-4">Loading messages...</div>
  }

  if (isError) {
    return <div className="min-h-screen bg-gray-50 p-4">Error loading messages</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Scheduled Messages</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your scheduled message campaigns</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2 bg-primary">
            <Plus className="w-4 h-4" />
            Schedule Message
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent Messages</CardTitle>
              <Send className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Messages</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex items-start gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>View and manage your scheduled messages</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Messages</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                    <TabsTrigger value="unsent">Pending</TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeTab} className="mt-4">
                    <MessagesTable
                      messages={getFilteredMessages()}
                      onSelectMessage={(message) => setSelectedMessage(message)}
                      onDeleteMessage={handleDeleteMessage}
                      selectedMessageId={selectedMessage?.id || ''}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Message Details */}
          {selectedMessage && (
            <div className="lg:col-span-1">
              <MessageDetails 
                messageId={selectedMessage.id}
                onDelete={handleDeleteMessage} 
              />
            </div>
          )}
        </div>

        {/* Create Message Form Modal */}
        {showCreateForm && (
          <CreateMessageForm 
            onCancel={() => setShowCreateForm(false)} 
            role="Mother"
          />
        )}
      </div>
    </div>
  )
}