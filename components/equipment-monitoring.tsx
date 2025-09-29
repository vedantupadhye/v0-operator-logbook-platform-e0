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
import {
  Settings,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  Thermometer,
  Gauge,
  Zap,
  Activity,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export function EquipmentMonitoring() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showLogDialog, setShowLogDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [selectedLog, setSelectedLog] = useState(null)
  const [formData, setFormData] = useState({
    equipment: "",
    subsystem: "",
    parameter: "",
    value: "",
    unit: "",
    status: "",
    observations: "",
    recommendations: "",
  })

  const equipmentHierarchy = [
    {
      id: "blast-furnace-1",
      name: "Blast Furnace #1",
      status: "operational",
      subsystems: [
        { id: "bf1-heating", name: "Heating System", status: "operational" },
        { id: "bf1-cooling", name: "Cooling System", status: "warning" },
        { id: "bf1-control", name: "Control System", status: "operational" },
      ],
      parameters: [
        { name: "Temperature", value: "1,580°C", status: "normal", trend: "stable" },
        { name: "Pressure", value: "2.4 bar", status: "normal", trend: "up" },
        { name: "Flow Rate", value: "850 m³/h", status: "normal", trend: "stable" },
      ],
    },
    {
      id: "rolling-mill-a",
      name: "Rolling Mill A",
      status: "operational",
      subsystems: [
        { id: "rma-drive", name: "Drive System", status: "operational" },
        { id: "rma-hydraulic", name: "Hydraulic System", status: "operational" },
        { id: "rma-cooling", name: "Cooling System", status: "maintenance" },
      ],
      parameters: [
        { name: "Speed", value: "12 m/s", status: "normal", trend: "stable" },
        { name: "Load", value: "85%", status: "normal", trend: "down" },
        { name: "Vibration", value: "2.1 mm/s", status: "warning", trend: "up" },
      ],
    },
    {
      id: "conveyor-b",
      name: "Conveyor B",
      status: "maintenance",
      subsystems: [
        { id: "cb-motor", name: "Motor System", status: "maintenance" },
        { id: "cb-belt", name: "Belt System", status: "operational" },
        { id: "cb-sensors", name: "Sensor Array", status: "operational" },
      ],
      parameters: [
        { name: "Speed", value: "0 m/min", status: "stopped", trend: "stable" },
        { name: "Load", value: "0%", status: "normal", trend: "stable" },
        { name: "Temperature", value: "35°C", status: "normal", trend: "stable" },
      ],
    },
  ]

  const monitoringLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 08:30:00",
      equipment: "Blast Furnace #1",
      subsystem: "Cooling System",
      parameter: "Coolant Flow",
      value: "750 L/min",
      status: "warning",
      operator: "John Smith (A-001)",
      observations: "Flow rate below optimal range. Possible blockage in line 3.",
      recommendations: "Schedule inspection of cooling line 3. Monitor pressure readings.",
    },
    {
      id: 2,
      timestamp: "2024-01-15 08:15:00",
      equipment: "Rolling Mill A",
      subsystem: "Drive System",
      parameter: "Motor Temperature",
      value: "78°C",
      status: "normal",
      operator: "John Smith (A-001)",
      observations: "Temperature within normal operating range.",
      recommendations: "Continue monitoring. No action required.",
    },
    {
      id: 3,
      timestamp: "2024-01-15 08:00:00",
      equipment: "Conveyor B",
      subsystem: "Motor System",
      parameter: "Vibration Level",
      value: "4.2 mm/s",
      status: "critical",
      operator: "Mike Wilson (C-003)",
      observations: "Excessive vibration detected. Motor bearing showing signs of wear.",
      recommendations: "Immediate maintenance required. Replace motor bearing assembly.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-600"
      case "warning":
        return "bg-yellow-600"
      case "critical":
        return "bg-red-600"
      case "maintenance":
        return "bg-blue-600"
      case "stopped":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "maintenance":
        return <Settings className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-green-500" />
      case "stable":
        return <Minus className="h-3 w-3 text-gray-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const handleSubmit = () => {
    console.log("Equipment log submitted:", formData)
    setShowLogDialog(false)
    setFormData({
      equipment: "",
      subsystem: "",
      parameter: "",
      value: "",
      unit: "",
      status: "",
      observations: "",
      recommendations: "",
    })
    alert("Equipment monitoring log recorded successfully!")
  }

  const viewEquipment = (equipment: any) => {
    setSelectedEquipment(equipment)
    setShowViewDialog(true)
  }

  const viewLog = (log: any) => {
    setSelectedLog(log)
    setShowViewDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold high-contrast">Equipment Monitoring</h3>
          <p className="text-sm text-muted-foreground">Monitor equipment status, parameters, and log observations</p>
        </div>
        <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Log Observation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Log Equipment Observation</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Equipment</label>
                  <Select
                    value={formData.equipment}
                    onValueChange={(value) => setFormData({ ...formData, equipment: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentHierarchy.map((eq) => (
                        <SelectItem key={eq.id} value={eq.id}>
                          {eq.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Subsystem</label>
                  <Select
                    value={formData.subsystem}
                    onValueChange={(value) => setFormData({ ...formData, subsystem: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subsystem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="heating">Heating System</SelectItem>
                      <SelectItem value="cooling">Cooling System</SelectItem>
                      <SelectItem value="control">Control System</SelectItem>
                      <SelectItem value="drive">Drive System</SelectItem>
                      <SelectItem value="hydraulic">Hydraulic System</SelectItem>
                      <SelectItem value="motor">Motor System</SelectItem>
                      <SelectItem value="belt">Belt System</SelectItem>
                      <SelectItem value="sensors">Sensor Array</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Parameter</label>
                  <Select
                    value={formData.parameter}
                    onValueChange={(value) => setFormData({ ...formData, parameter: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parameter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="pressure">Pressure</SelectItem>
                      <SelectItem value="flow-rate">Flow Rate</SelectItem>
                      <SelectItem value="speed">Speed</SelectItem>
                      <SelectItem value="load">Load</SelectItem>
                      <SelectItem value="vibration">Vibration</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="voltage">Voltage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Value</label>
                  <Input
                    placeholder="Parameter value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Unit</label>
                  <Input
                    placeholder="Unit (°C, bar, m/s, etc.)"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Status Assessment</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="maintenance">Maintenance Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Observations</label>
                <Textarea
                  placeholder="Detailed observations about equipment condition, performance, anomalies..."
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Recommendations</label>
                <Textarea
                  placeholder="Recommended actions, maintenance needs, follow-up requirements..."
                  value={formData.recommendations}
                  onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowLogDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Log Observation</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Equipment Overview</TabsTrigger>
          <TabsTrigger value="parameters">Live Parameters</TabsTrigger>
          <TabsTrigger value="logs">Monitoring Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipmentHierarchy.map((equipment) => (
              <Card
                key={equipment.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => viewEquipment(equipment)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    {equipment.name}
                    <span
                      className={`flex items-center gap-1 text-white px-2 py-1 rounded text-xs ${getStatusColor(equipment.status)}`}
                    >
                      {getStatusIcon(equipment.status)}
                      {equipment.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Subsystems</p>
                    <div className="space-y-1">
                      {equipment.subsystems.map((subsystem) => (
                        <div key={subsystem.id} className="flex items-center justify-between text-sm">
                          <span>{subsystem.name}</span>
                          <Badge className={`text-xs ${getStatusColor(subsystem.status)}`}>{subsystem.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Key Parameters</p>
                    <div className="space-y-1">
                      {equipment.parameters.slice(0, 2).map((param, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{param.name}</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{param.value}</span>
                            {getTrendIcon(param.trend)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          {equipmentHierarchy.map((equipment) => (
            <Card key={equipment.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-primary" />
                    {equipment.name}
                  </div>
                  <Badge className={`${getStatusColor(equipment.status)}`}>{equipment.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {equipment.parameters.map((param, index) => (
                    <div key={index} className="p-4 rounded-lg bg-accent/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{param.name}</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(param.trend)}
                          <Badge
                            variant="outline"
                            className={`text-xs ${param.status === "warning" ? "border-yellow-500 text-yellow-700" : param.status === "critical" ? "border-red-500 text-red-700" : "border-green-500 text-green-700"}`}
                          >
                            {param.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-2xl font-bold high-contrast">{param.value}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {param.name === "Temperature" && <Thermometer className="h-4 w-4 text-muted-foreground" />}
                        {param.name === "Pressure" && <Gauge className="h-4 w-4 text-muted-foreground" />}
                        {param.name === "Speed" && <Activity className="h-4 w-4 text-muted-foreground" />}
                        {param.name === "Load" && <Zap className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Monitoring Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monitoringLogs.map((log) => (
                  <div key={log.id} className="flex items-start justify-between p-4 rounded-lg bg-accent/50">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-xs text-muted-foreground font-mono mt-1 w-32">{log.timestamp}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium high-contrast">{log.equipment}</h4>
                          <Badge variant="outline" className="text-xs">
                            {log.subsystem}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(log.status)}`}>{log.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          <span className="font-medium">{log.parameter}:</span> {log.value} • {log.operator}
                        </div>
                        <p className="text-sm mb-2">{log.observations}</p>
                        {log.recommendations && (
                          <div className="text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                            <span className="font-medium text-blue-800">Recommendation:</span>
                            <span className="text-blue-700 ml-1">{log.recommendations}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => viewLog(log)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Equipment Dialog */}
      <Dialog open={showViewDialog && selectedEquipment} onOpenChange={(open) => !open && setSelectedEquipment(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Equipment Details</DialogTitle>
          </DialogHeader>
          {selectedEquipment && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold high-contrast">{selectedEquipment.name}</h3>
                  <p className="text-sm text-muted-foreground">Equipment ID: {selectedEquipment.id}</p>
                </div>
                <Badge className={`${getStatusColor(selectedEquipment.status)}`}>{selectedEquipment.status}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Subsystems</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedEquipment.subsystems.map((subsystem) => (
                      <div key={subsystem.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <span className="font-medium">{subsystem.name}</span>
                        <Badge className={`${getStatusColor(subsystem.status)}`}>{subsystem.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Current Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedEquipment.parameters.map((param, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <div>
                          <span className="font-medium">{param.name}</span>
                          <p className="text-sm text-muted-foreground">{param.value}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(param.trend)}
                          <Badge
                            variant="outline"
                            className={`text-xs ${param.status === "warning" ? "border-yellow-500 text-yellow-700" : "border-green-500 text-green-700"}`}
                          >
                            {param.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Log Dialog */}
      <Dialog open={showViewDialog && selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Monitoring Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-medium">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Operator</p>
                  <p className="font-medium">{selectedLog.operator}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equipment</p>
                  <p className="font-medium">{selectedLog.equipment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subsystem</p>
                  <p className="font-medium">{selectedLog.subsystem}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parameter</p>
                  <p className="font-medium">{selectedLog.parameter}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-medium">{selectedLog.value}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <Badge className={`${getStatusColor(selectedLog.status)}`}>{selectedLog.status}</Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Observations</p>
                <div className="bg-accent/50 p-3 rounded-lg">
                  <p className="text-sm">{selectedLog.observations}</p>
                </div>
              </div>

              {selectedLog.recommendations && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Recommendations</p>
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">{selectedLog.recommendations}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
