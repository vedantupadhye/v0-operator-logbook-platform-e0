"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, FileText, Search, Eye, Download, Camera, Video, Mic, CheckCircle } from "lucide-react"

export function EventRecording() {
  const [activeTab, setActiveTab] = useState("recent")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showResolutionDialog, setShowResolutionDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedEventForResolution, setSelectedEventForResolution] = useState(null)
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [resolutionData, setResolutionData] = useState({
    comment: "",
    resolutionTime: "",
  })
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    severity: "",
    equipment: "",
    location: "",
    description: "",
    immediateActions: "",
    attachments: [],
  })

  const [events, setEvents] = useState([
    {
      id: 1,
      issueTime: "2024-01-15 08:00:00",
      registrationTime: "2024-01-15 08:15:23",
      title: "Temperature Spike in Blast Furnace #1",
      category: "Process",
      severity: "warning",
      equipment: "Blast Furnace #1",
      location: "Furnace",
      operator: "John Smith (A-001)",
      status: "open",
      description:
        "Temperature exceeded normal operating range by 50°C. Immediate cooling procedures initiated. System stabilized within 15 minutes.",
      immediateActions:
        "Activated emergency cooling system, reduced feed rate by 20%, monitored temperature continuously",
      attachments: ["temp_chart.png", "voice_note.mp3"],
      resolutionComment: "",
      resolutionTime: "",
    },
    {
      id: 2,
      issueTime: "2024-01-15 07:30:00",
      registrationTime: "2024-01-15 07:45:12",
      title: "PPE Inspection Completed",
      category: "Safety",
      severity: "operational",
      equipment: "N/A",
      location: "MR",
      operator: "John Smith (A-001)",
      status: "resolved",
      description: "Weekly PPE inspection completed. All equipment in good condition. No defects found.",
      immediateActions: "Documented inspection results, updated maintenance log",
      attachments: ["inspection_checklist.pdf"],
      resolutionComment: "Inspection completed successfully, all PPE items verified and documented.",
      resolutionTime: "2024-01-15 08:00:00",
    },
    {
      id: 3,
      issueTime: "2024-01-15 07:15:00",
      registrationTime: "2024-01-15 07:30:45",
      title: "Conveyor Belt Maintenance",
      category: "Maintenance",
      severity: "maintenance",
      equipment: "Conveyor B",
      location: "FM",
      operator: "Mike Wilson (C-003)",
      status: "in-progress",
      description:
        "Scheduled maintenance on conveyor belt drive system. Replacing worn bearings and lubricating drive chains.",
      immediateActions: "Isolated conveyor system, installed temporary bypass, began component replacement",
      attachments: ["maintenance_plan.pdf", "before_photo.jpg"],
      resolutionComment: "",
      resolutionTime: "",
    },
    {
      id: 4,
      issueTime: "2024-01-15 06:15:00",
      registrationTime: "2024-01-15 06:30:18",
      title: "Quality Check - Batch #2024-001",
      category: "Quality",
      severity: "operational",
      equipment: "Quality Lab",
      location: "Lab",
      operator: "Sarah Johnson (B-002)",
      status: "resolved",
      description:
        "Steel grade analysis completed. All parameters within specification. Carbon content: 0.45%, Tensile strength: 580 MPa.",
      immediateActions: "Collected samples, performed chemical analysis, documented results",
      attachments: ["lab_results.pdf", "sample_photo.jpg"],
      resolutionComment: "Quality analysis completed, all parameters within acceptable limits.",
      resolutionTime: "2024-01-15 07:00:00",
    },
    {
      id: 5,
      issueTime: "2024-01-14 23:30:00",
      registrationTime: "2024-01-14 23:45:33",
      title: "Emergency Stop - Rolling Mill",
      category: "Safety",
      severity: "critical",
      equipment: "Rolling Mill A",
      location: "Mill Floor",
      operator: "Lisa Chen (D-004)",
      status: "open",
      description:
        "Emergency stop activated due to material jam. System cleared and restarted after safety inspection.",
      immediateActions: "Activated emergency stop, evacuated immediate area, cleared jam, performed safety inspection",
      attachments: ["incident_video.mp4", "post_inspection.jpg", "voice_report.mp3"],
      resolutionComment: "",
      resolutionTime: "",
    },
    {
      id: 6,
      issueTime: "2024-01-14 22:00:00",
      registrationTime: "2024-01-14 22:15:10",
      title: "Hydraulic Pressure Drop",
      category: "Process",
      severity: "critical",
      equipment: "Press #3",
      location: "Forming Bay",
      operator: "Mike Wilson (C-003)",
      status: "open",
      description:
        "Sudden hydraulic pressure drop detected. Emergency shutdown initiated. Leak found in main hydraulic line.",
      immediateActions:
        "Emergency shutdown, isolated hydraulic system, located and repaired leak, pressure tested system",
      attachments: ["pressure_log.csv", "repair_photo.jpg"],
      resolutionComment: "",
      resolutionTime: "",
    },
    {
      id: 7,
      issueTime: "2024-01-14 20:15:00",
      registrationTime: "2024-01-14 20:30:22",
      title: "Gas Leak Detection",
      category: "Safety",
      severity: "critical",
      equipment: "Gas Line C",
      location: "Utility Area",
      operator: "Sarah Johnson (B-002)",
      status: "resolved",
      description: "Gas leak detected by monitoring system. Area evacuated and leak sealed. No personnel injuries.",
      immediateActions:
        "Activated gas leak protocol, evacuated area, shut off gas supply, sealed leak, ventilated area",
      attachments: ["gas_readings.pdf", "evacuation_log.pdf"],
      resolutionComment: "Gas leak successfully sealed, area cleared and ventilated, all safety protocols followed.",
      resolutionTime: "2024-01-14 21:15:00",
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600"
      case "warning":
        return "bg-yellow-600"
      case "maintenance":
        return "bg-blue-600"
      case "operational":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "safety":
        return "bg-red-600"
      case "quality":
        return "bg-green-600"
      case "process":
        return "bg-blue-600"
      case "maintenance":
        return "bg-yellow-600"
      case "breakdown":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSeverity = filterSeverity === "all" || event.severity === filterSeverity
    const matchesCategory = filterCategory === "all" || event.category.toLowerCase() === filterCategory
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.equipment.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSeverity && matchesCategory && matchesSearch
  })

  const viewEvent = (event: any) => {
    setSelectedEvent(event)
    setShowViewDialog(true)
  }

  const resolveEvent = (event: any) => {
    setSelectedEventForResolution(event)
    setResolutionData({
      comment: "",
      resolutionTime: new Date().toISOString().slice(0, 16), // Current datetime in YYYY-MM-DDTHH:MM format
    })
    setShowResolutionDialog(true)
  }

  const handleResolutionSubmit = () => {
    if (!resolutionData.comment.trim()) {
      alert("Please provide a resolution comment.")
      return
    }
    if (!resolutionData.resolutionTime) {
      alert("Please provide a resolution time.")
      return
    }

    setEvents(
      events.map((event) =>
        event.id === selectedEventForResolution.id
          ? {
              ...event,
              status: "resolved",
              resolutionComment: resolutionData.comment,
              resolutionTime: resolutionData.resolutionTime,
            }
          : event,
      ),
    )

    setShowResolutionDialog(false)
    setSelectedEventForResolution(null)
    setResolutionData({ comment: "", resolutionTime: "" })
    alert(`Event ${selectedEventForResolution.id} has been resolved successfully!`)
  }

  const handleSubmit = () => {
    console.log("Event submitted:", formData)
    setShowCreateDialog(false)
    setFormData({
      title: "",
      category: "",
      severity: "",
      equipment: "",
      location: "",
      description: "",
      immediateActions: "",
      attachments: [],
    })
    alert("Event recorded successfully! Event ID: EVT-2024-" + Math.floor(Math.random() * 1000))
  }

  const handleFileUpload = (type: string) => {
    const fileName = `${type}_${Date.now()}.${type === "photo" ? "jpg" : type === "video" ? "mp4" : "mp3"}`
    setFormData({
      ...formData,
      attachments: [...formData.attachments, fileName],
    })
    alert(`${type} uploaded: ${fileName}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Event & Incident Recording</h3>
          <p className="text-sm text-gray-400">Record and track operational events, incidents, and observations</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />
              Record Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Record New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Event Title</label>
                  <Input
                    placeholder="Brief description of the event"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-gray-800 text-white border-gray-600 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-gray-800 text-white border-gray-600">
                      <SelectValue placeholder="Select event category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="safety" className="text-white hover:bg-gray-700">
                        Safety
                      </SelectItem>
                      <SelectItem value="quality" className="text-white hover:bg-gray-700">
                        Quality
                      </SelectItem>
                      <SelectItem value="process" className="text-white hover:bg-gray-700">
                        Process
                      </SelectItem>
                      <SelectItem value="maintenance" className="text-white hover:bg-gray-700">
                        Maintenance
                      </SelectItem>
                      <SelectItem value="breakdown" className="text-white hover:bg-gray-700">
                        Breakdown
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Severity</label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) => setFormData({ ...formData, severity: value })}
                  >
                    <SelectTrigger className="bg-gray-800 text-white border-gray-600">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="critical" className="text-white hover:bg-gray-700">
                        Critical
                      </SelectItem>
                      <SelectItem value="warning" className="text-white hover:bg-gray-700">
                        Warning
                      </SelectItem>
                      <SelectItem value="maintenance" className="text-white hover:bg-gray-700">
                        Maintenance
                      </SelectItem>
                      <SelectItem value="operational" className="text-white hover:bg-gray-700">
                        Operational
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Equipment</label>
                  <Input
                    placeholder="Equipment involved"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                    className="bg-gray-800 text-white border-gray-600 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Location</label>
                  <Input
                    placeholder="Location of event"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-gray-800 text-white border-gray-600 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Event Description</label>
                <Textarea
                  placeholder="Detailed description of what happened..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="bg-gray-800 text-white border-gray-600 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white">Immediate Actions Taken</label>
                <Textarea
                  placeholder="Describe immediate actions and responses..."
                  value={formData.immediateActions}
                  onChange={(e) => setFormData({ ...formData, immediateActions: e.target.value })}
                  rows={3}
                  className="bg-gray-800 text-white border-gray-600 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Attachments</label>
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload("photo")}
                    className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Camera className="h-4 w-4" />
                    Add Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload("video")}
                    className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Video className="h-4 w-4" />
                    Add Video
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload("voice")}
                    className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Mic className="h-4 w-4" />
                    Voice Note
                  </Button>
                </div>
                {formData.attachments.length > 0 && (
                  <div className="space-y-1">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="text-sm text-gray-400 flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Record Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="pl-10 bg-gray-800 text-white border-gray-600 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-40 bg-gray-800 text-white border-gray-600">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Severities
                </SelectItem>
                <SelectItem value="critical" className="text-white hover:bg-gray-700">
                  Critical
                </SelectItem>
                <SelectItem value="warning" className="text-white hover:bg-gray-700">
                  Warning
                </SelectItem>
                <SelectItem value="maintenance" className="text-white hover:bg-gray-700">
                  Maintenance
                </SelectItem>
                <SelectItem value="operational" className="text-white hover:bg-gray-700">
                  Operational
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 bg-gray-800 text-white border-gray-600">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Categories
                </SelectItem>
                <SelectItem value="safety" className="text-white hover:bg-gray-700">
                  Safety
                </SelectItem>
                <SelectItem value="quality" className="text-white hover:bg-gray-700">
                  Quality
                </SelectItem>
                <SelectItem value="process" className="text-white hover:bg-gray-700">
                  Process
                </SelectItem>
                <SelectItem value="maintenance" className="text-white hover:bg-gray-700">
                  Maintenance
                </SelectItem>
                <SelectItem value="breakdown" className="text-white hover:bg-gray-700">
                  Breakdown
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 bg-gray-800 border border-gray-700">
          <TabsTrigger
            value="recent"
            className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Recent Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Event Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Issue Time</TableHead>
                    <TableHead className="text-gray-300">Event Title</TableHead>
                    <TableHead className="text-gray-300">Category</TableHead>
                    <TableHead className="text-gray-300">Equipment</TableHead>
                    <TableHead className="text-gray-300">Location</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Operator</TableHead>
                    <TableHead className="text-gray-300">Registration Time</TableHead>
                    <TableHead className="text-gray-300">Comments</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id} className="border-gray-700 hover:bg-gray-800">
                      <TableCell className="text-white font-mono text-sm">{event.issueTime}</TableCell>
                      <TableCell className="text-white">
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{event.title}</p>
                          <p className="text-sm text-gray-400 truncate">{event.description}</p>
                          {event.attachments.length > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              <FileText className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-400">
                                {event.attachments.length} file{event.attachments.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-white ${getCategoryColor(event.category)}`}>{event.category}</Badge>
                      </TableCell>
                      <TableCell className="text-white">{event.equipment}</TableCell>
                      <TableCell className="text-white">{event.location}</TableCell>
                      <TableCell>
                        <Badge
                          className={`text-white ${
                            event.status === "resolved"
                              ? "bg-green-600"
                              : event.status === "in-progress"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                          }`}
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white text-sm">{event.operator}</TableCell>
                      <TableCell className="text-gray-400 font-mono text-sm">{event.registrationTime}</TableCell>
                      <TableCell className="text-white text-sm max-w-xs">
                        {event.resolutionComment ? (
                          <div>
                            <p className="truncate">{event.resolutionComment}</p>
                            {event.resolutionTime && (
                              <p className="text-xs text-gray-400 font-mono">Resolved: {event.resolutionTime}</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewEvent(event)}
                            className="text-white hover:bg-gray-700 h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {event.status !== "resolved" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resolveEvent(event)}
                              className="text-green-400 hover:bg-gray-700 h-8 w-8 p-0"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Event Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Event ID</p>
                  <p className="font-medium text-white">EVT-2024-{selectedEvent.id.toString().padStart(3, "0")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Timestamp</p>
                  <p className="font-medium text-white">{selectedEvent.timestamp}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Category</p>
                  <Badge className={`mt-1 text-white ${getCategoryColor(selectedEvent.category)}`}>
                    {selectedEvent.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Equipment</p>
                  <p className="font-medium text-white">{selectedEvent.equipment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium text-white">{selectedEvent.location}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">Operator</p>
                <p className="font-medium text-white">{selectedEvent.operator}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Event Title</p>
                <h3 className="text-lg font-semibold text-white">{selectedEvent.title}</h3>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Description</p>
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <p className="text-sm text-white">{selectedEvent.description}</p>
                </div>
              </div>

              {selectedEvent.immediateActions && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Immediate Actions Taken</p>
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <p className="text-sm text-white">{selectedEvent.immediateActions}</p>
                  </div>
                </div>
              )}

              {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Attachments</p>
                  <div className="space-y-2">
                    {selectedEvent.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-800 rounded border border-gray-700"
                      >
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-white">{attachment}</span>
                        <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-gray-700">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resolution Dialog */}
      <Dialog open={showResolutionDialog} onOpenChange={setShowResolutionDialog}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Resolve Event</DialogTitle>
          </DialogHeader>
          {selectedEventForResolution && (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-white">Event Details</h4>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Title:</strong> {selectedEventForResolution.title}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Equipment:</strong> {selectedEventForResolution.equipment}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Issue Time:</strong> {selectedEventForResolution.issueTime}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Resolution Time</label>
                <Input
                  type="datetime-local"
                  value={resolutionData.resolutionTime}
                  onChange={(e) => setResolutionData({ ...resolutionData, resolutionTime: e.target.value })}
                  className="bg-gray-800 text-white border-gray-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white">Resolution Comment</label>
                <Textarea
                  placeholder="Describe how the issue was resolved, actions taken, and any follow-up required..."
                  value={resolutionData.comment}
                  onChange={(e) => setResolutionData({ ...resolutionData, comment: e.target.value })}
                  rows={4}
                  className="bg-gray-800 text-white border-gray-600 placeholder:text-gray-400"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowResolutionDialog(false)}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button onClick={handleResolutionSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolve Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
