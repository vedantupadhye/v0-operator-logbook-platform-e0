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
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  Plus,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Wrench,
  MapPin,
  Zap,
  Thermometer,
  Gauge,
  Activity,
  Eye,
  Save,
  X,
} from "lucide-react"

export function EquipmentMaintenance() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false)
  const [showChecklistDialog, setShowChecklistDialog] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [selectedChecklist, setSelectedChecklist] = useState(null)
  const [checklistItems, setChecklistItems] = useState({})
  const [maintenanceNotes, setMaintenanceNotes] = useState("")

  const equipmentData = [
    {
      id: "blast-furnace-1",
      name: "Blast Furnace #1",
      location: "Furnace Area",
      status: "operational",
      image: "/industrial-blast-furnace-steel-plant.jpg",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-01-25",
      daysUntilMaintenance: 10,
      maintenanceType: "Scheduled Inspection",
      priority: "medium",
      completionRate: 85,
      specifications: {
        capacity: "2,500 tons/day",
        temperature: "1,580°C",
        pressure: "2.4 bar",
        commissioned: "2018",
      },
      recentIssues: [
        { date: "2024-01-12", issue: "Cooling system flow rate below optimal", status: "resolved" },
        { date: "2024-01-08", issue: "Temperature sensor calibration", status: "pending" },
      ],
    },
    {
      id: "rolling-mill-a",
      name: "Rolling Mill A",
      location: "Mill Floor",
      status: "maintenance",
      image: "/industrial-rolling-mill-steel-production.jpg",
      lastMaintenance: "2024-01-14",
      nextMaintenance: "2024-01-16",
      daysUntilMaintenance: 1,
      maintenanceType: "Bearing Replacement",
      priority: "high",
      completionRate: 60,
      specifications: {
        capacity: "150 tons/hour",
        speed: "12 m/s",
        power: "2.5 MW",
        commissioned: "2020",
      },
      recentIssues: [
        { date: "2024-01-14", issue: "Excessive vibration in drive motor", status: "in-progress" },
        { date: "2024-01-10", issue: "Hydraulic pressure fluctuation", status: "resolved" },
      ],
    },
    {
      id: "conveyor-b",
      name: "Conveyor System B",
      location: "Transport Zone",
      status: "overdue",
      image: "/industrial-conveyor-belt-system-steel-plant.jpg",
      lastMaintenance: "2023-12-20",
      nextMaintenance: "2024-01-10",
      daysUntilMaintenance: -5,
      maintenanceType: "Belt Inspection & Lubrication",
      priority: "critical",
      completionRate: 30,
      specifications: {
        length: "500 meters",
        capacity: "800 tons/hour",
        speed: "2.5 m/s",
        commissioned: "2019",
      },
      recentIssues: [
        { date: "2024-01-12", issue: "Belt alignment issues", status: "pending" },
        { date: "2024-01-05", issue: "Motor overheating", status: "pending" },
      ],
    },
    {
      id: "crane-c1",
      name: "Overhead Crane C1",
      location: "Bay 3",
      status: "operational",
      image: "/industrial-overhead-crane-steel-plant.jpg",
      lastMaintenance: "2024-01-12",
      nextMaintenance: "2024-02-12",
      daysUntilMaintenance: 28,
      maintenanceType: "Monthly Safety Check",
      priority: "medium",
      completionRate: 95,
      specifications: {
        capacity: "50 tons",
        span: "25 meters",
        height: "15 meters",
        commissioned: "2017",
      },
      recentIssues: [{ date: "2024-01-08", issue: "Wire rope inspection completed", status: "resolved" }],
    },
  ]

  const maintenanceChecklists = {
    "blast-furnace-1": {
      name: "Blast Furnace Maintenance Checklist",
      frequency: "Bi-weekly",
      estimatedTime: "4 hours",
      items: [
        { id: 1, task: "Check refractory lining condition", category: "structural", completed: false, critical: true },
        { id: 2, task: "Inspect cooling water system", category: "cooling", completed: true, critical: true },
        {
          id: 3,
          task: "Verify temperature sensors calibration",
          category: "instrumentation",
          completed: false,
          critical: false,
        },
        { id: 4, task: "Check gas cleaning system", category: "environmental", completed: true, critical: true },
        { id: 5, task: "Inspect charging equipment", category: "mechanical", completed: false, critical: false },
        { id: 6, task: "Test emergency shutdown systems", category: "safety", completed: false, critical: true },
        { id: 7, task: "Check blast air system", category: "pneumatic", completed: true, critical: true },
        { id: 8, task: "Inspect tapping equipment", category: "mechanical", completed: false, critical: false },
      ],
    },
    "rolling-mill-a": {
      name: "Rolling Mill Maintenance Checklist",
      frequency: "Weekly",
      estimatedTime: "6 hours",
      items: [
        { id: 1, task: "Check roll condition and alignment", category: "mechanical", completed: true, critical: true },
        { id: 2, task: "Inspect drive motor bearings", category: "mechanical", completed: false, critical: true },
        { id: 3, task: "Test hydraulic system pressure", category: "hydraulic", completed: true, critical: true },
        { id: 4, task: "Check cooling system flow rates", category: "cooling", completed: false, critical: false },
        { id: 5, task: "Inspect electrical connections", category: "electrical", completed: false, critical: false },
        { id: 6, task: "Verify safety interlocks", category: "safety", completed: true, critical: true },
        { id: 7, task: "Check lubrication system", category: "mechanical", completed: false, critical: false },
        { id: 8, task: "Test emergency stops", category: "safety", completed: false, critical: true },
      ],
    },
    "conveyor-b": {
      name: "Conveyor System Maintenance Checklist",
      frequency: "Monthly",
      estimatedTime: "3 hours",
      items: [
        {
          id: 1,
          task: "Inspect belt condition and tracking",
          category: "mechanical",
          completed: false,
          critical: true,
        },
        {
          id: 2,
          task: "Check motor temperature and vibration",
          category: "mechanical",
          completed: false,
          critical: true,
        },
        { id: 3, task: "Lubricate bearings and rollers", category: "mechanical", completed: false, critical: false },
        { id: 4, task: "Test belt tension", category: "mechanical", completed: false, critical: false },
        { id: 5, task: "Inspect safety guards", category: "safety", completed: false, critical: true },
        { id: 6, task: "Check emergency pull cords", category: "safety", completed: false, critical: true },
      ],
    },
    "crane-c1": {
      name: "Overhead Crane Maintenance Checklist",
      frequency: "Monthly",
      estimatedTime: "5 hours",
      items: [
        { id: 1, task: "Inspect wire ropes and chains", category: "mechanical", completed: true, critical: true },
        { id: 2, task: "Check hoist motor operation", category: "mechanical", completed: true, critical: true },
        { id: 3, task: "Test load block and hook", category: "mechanical", completed: true, critical: true },
        { id: 4, task: "Inspect runway and rails", category: "structural", completed: false, critical: false },
        { id: 5, task: "Check electrical systems", category: "electrical", completed: true, critical: false },
        { id: 6, task: "Test safety devices", category: "safety", completed: true, critical: true },
        { id: 7, task: "Lubricate moving parts", category: "mechanical", completed: false, critical: false },
      ],
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-600"
      case "maintenance":
        return "bg-blue-600"
      case "overdue":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-orange-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mechanical":
        return <Settings className="h-4 w-4" />
      case "electrical":
        return <Zap className="h-4 w-4" />
      case "hydraulic":
        return <Gauge className="h-4 w-4" />
      case "cooling":
        return <Thermometer className="h-4 w-4" />
      case "safety":
        return <AlertTriangle className="h-4 w-4" />
      case "structural":
        return <Activity className="h-4 w-4" />
      default:
        return <Wrench className="h-4 w-4" />
    }
  }

  const handleChecklistItemChange = (equipmentId: string, itemId: number, completed: boolean) => {
    setChecklistItems((prev) => ({
      ...prev,
      [equipmentId]: {
        ...prev[equipmentId],
        [itemId]: completed,
      },
    }))
  }

  const getCompletedCount = (equipmentId: string, items: any[]) => {
    const checklist = checklistItems[equipmentId] || {}
    return items.filter((item) => checklist[item.id] || item.completed).length
  }

  const openChecklist = (equipment: any) => {
    setSelectedEquipment(equipment)
    setSelectedChecklist(maintenanceChecklists[equipment.id])
    setShowChecklistDialog(true)
  }

  const saveChecklist = () => {
    console.log("[v0] Saving checklist for:", selectedEquipment?.name)
    console.log("[v0] Checklist items:", checklistItems[selectedEquipment?.id])
    console.log("[v0] Maintenance notes:", maintenanceNotes)
    alert("Maintenance checklist saved successfully!")
    setShowChecklistDialog(false)
    setMaintenanceNotes("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Equipment Maintenance</h3>
          <p className="text-sm text-gray-400">Manage maintenance schedules, checklists, and equipment status</p>
        </div>
        <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Schedule Maintenance
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Schedule New Maintenance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Equipment</label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {equipmentData.map((eq) => (
                        <SelectItem key={eq.id} value={eq.id} className="text-white">
                          {eq.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Maintenance Type</label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="inspection" className="text-white">
                        Routine Inspection
                      </SelectItem>
                      <SelectItem value="repair" className="text-white">
                        Repair Work
                      </SelectItem>
                      <SelectItem value="replacement" className="text-white">
                        Component Replacement
                      </SelectItem>
                      <SelectItem value="calibration" className="text-white">
                        Calibration
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Scheduled Date</label>
                  <Input type="date" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Priority</label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="critical" className="text-white">
                        Critical
                      </SelectItem>
                      <SelectItem value="high" className="text-white">
                        High
                      </SelectItem>
                      <SelectItem value="medium" className="text-white">
                        Medium
                      </SelectItem>
                      <SelectItem value="low" className="text-white">
                        Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Description</label>
                <Textarea
                  placeholder="Describe the maintenance work to be performed..."
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowMaintenanceDialog(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowMaintenanceDialog(false)} className="bg-blue-600 hover:bg-blue-700">
                  Schedule Maintenance
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
          >
            Equipment Overview
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
          >
            Maintenance Schedule
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
          >
            Maintenance History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipmentData.map((equipment) => (
              <Card key={equipment.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className="relative">
                  <img
                    src={equipment.image || "/placeholder.svg"}
                    alt={equipment.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className={`${getStatusColor(equipment.status)} text-white`}>{equipment.status}</Badge>
                    <Badge className={`${getPriorityColor(equipment.priority)} text-white`}>{equipment.priority}</Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between">
                    <div>
                      <h4 className="text-lg">{equipment.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <MapPin className="h-3 w-3" />
                        {equipment.location}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Last Maintenance</p>
                      <p className="text-white font-medium">{equipment.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Next Due</p>
                      <p
                        className={`font-medium ${equipment.daysUntilMaintenance < 0 ? "text-red-400" : equipment.daysUntilMaintenance <= 7 ? "text-yellow-400" : "text-green-400"}`}
                      >
                        {equipment.daysUntilMaintenance < 0
                          ? `${Math.abs(equipment.daysUntilMaintenance)} days overdue`
                          : `${equipment.daysUntilMaintenance} days`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Maintenance Progress</span>
                      <span className="text-white">{equipment.completionRate}%</span>
                    </div>
                    <Progress value={equipment.completionRate} className="h-2" />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Maintenance Type</p>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {equipment.maintenanceType}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => openChecklist(equipment)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Checklist
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipmentData
                  .sort((a, b) => a.daysUntilMaintenance - b.daysUntilMaintenance)
                  .map((equipment) => (
                    <div
                      key={equipment.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 border border-gray-600"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${equipment.daysUntilMaintenance < 0 ? "bg-red-500" : equipment.daysUntilMaintenance <= 7 ? "bg-yellow-500" : "bg-green-500"}`}
                        />
                        <div>
                          <h4 className="font-medium text-white">{equipment.name}</h4>
                          <p className="text-sm text-gray-400">{equipment.maintenanceType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white">{equipment.nextMaintenance}</p>
                        <p
                          className={`text-xs ${equipment.daysUntilMaintenance < 0 ? "text-red-400" : equipment.daysUntilMaintenance <= 7 ? "text-yellow-400" : "text-gray-400"}`}
                        >
                          {equipment.daysUntilMaintenance < 0
                            ? `${Math.abs(equipment.daysUntilMaintenance)} days overdue`
                            : `${equipment.daysUntilMaintenance} days remaining`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => openChecklist(equipment)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Maintenance Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipmentData.map((equipment) =>
                  equipment.recentIssues.map((issue, index) => (
                    <div
                      key={`${equipment.id}-${index}`}
                      className="flex items-start justify-between p-4 rounded-lg bg-gray-700/50 border border-gray-600"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-xs text-gray-400 font-mono mt-1 w-20">{issue.date}</div>
                        <div>
                          <h4 className="font-medium text-white">{equipment.name}</h4>
                          <p className="text-sm text-gray-300 mt-1">{issue.issue}</p>
                        </div>
                      </div>
                      <Badge
                        className={`${issue.status === "resolved" ? "bg-green-600" : issue.status === "in-progress" ? "bg-blue-600" : "bg-yellow-600"} text-white`}
                      >
                        {issue.status}
                      </Badge>
                    </div>
                  )),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Maintenance Checklist Dialog */}
      <Dialog open={showChecklistDialog} onOpenChange={setShowChecklistDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              {selectedChecklist?.name}
            </DialogTitle>
            {selectedEquipment && (
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Equipment: {selectedEquipment.name}</span>
                <span>•</span>
                <span>Frequency: {selectedChecklist?.frequency}</span>
                <span>•</span>
                <span>Est. Time: {selectedChecklist?.estimatedTime}</span>
              </div>
            )}
          </DialogHeader>

          {selectedChecklist && selectedEquipment && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700">
                <div>
                  <h4 className="font-medium text-white">Progress Overview</h4>
                  <p className="text-sm text-gray-400">
                    {getCompletedCount(selectedEquipment.id, selectedChecklist.items)} of{" "}
                    {selectedChecklist.items.length} tasks completed
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {Math.round(
                      (getCompletedCount(selectedEquipment.id, selectedChecklist.items) /
                        selectedChecklist.items.length) *
                        100,
                    )}
                    %
                  </div>
                  <Progress
                    value={
                      (getCompletedCount(selectedEquipment.id, selectedChecklist.items) /
                        selectedChecklist.items.length) *
                      100
                    }
                    className="w-32 h-2 mt-2"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-white">Maintenance Tasks</h4>
                {selectedChecklist.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${item.critical ? "bg-red-900/20 border-red-800" : "bg-gray-800 border-gray-700"}`}
                  >
                    <Checkbox
                      checked={checklistItems[selectedEquipment.id]?.[item.id] || item.completed}
                      onCheckedChange={(checked) => handleChecklistItemChange(selectedEquipment.id, item.id, checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-sm font-medium ${checklistItems[selectedEquipment.id]?.[item.id] || item.completed ? "text-green-400 line-through" : "text-white"}`}
                        >
                          {item.task}
                        </span>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {item.category}
                          </Badge>
                          {item.critical && <Badge className="text-xs bg-red-600 text-white">Critical</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Maintenance Notes</label>
                <Textarea
                  placeholder="Add any observations, issues found, or additional notes..."
                  value={maintenanceNotes}
                  onChange={(e) => setMaintenanceNotes(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowChecklistDialog(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={saveChecklist} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Checklist
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
