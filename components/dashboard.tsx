import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, CheckCircle, Clock, Zap, Shield } from "lucide-react"

export function Dashboard() {
  const currentShift = {
    operator: "John Smith (A-001)",
    startTime: "6AM",
    endTime: "2PM",
    status: "Active",
    duration: "2h 30m",
  }

  const systemStatus = [
    { name: "Blast Furnace #1", status: "operational", temp: "1,580°C", efficiency: "98%" },
    { name: "Rolling Mill A", status: "operational", speed: "12 m/s", load: "85%" },
    { name: "Cooling Tower", status: "warning", temp: "45°C", flow: "Low" },
    { name: "Crane System", status: "maintenance", position: "Bay 3", eta: "30min" },
  ]

  const recentEvents = [
    { time: "08:15", type: "Process", event: "Temperature spike in Furnace #1 - Resolved", severity: "warning" },
    { time: "07:45", type: "Safety", event: "PPE inspection completed - All clear", severity: "operational" },
    { time: "07:30", type: "Maintenance", event: "Scheduled maintenance on Conveyor B", severity: "maintenance" },
    { time: "06:30", type: "Quality", event: "Steel grade analysis - Within spec", severity: "operational" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      case "maintenance":
        return "text-blue-400"
      default:
        return "text-gray-400"
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
        return <Clock className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Shift Info */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-blue-400" />
            Current Shift Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-400">Operator</p>
              <p className="font-semibold text-white">{currentShift.operator}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Shift Time</p>
              <p className="font-semibold text-white">
                {currentShift.startTime} - {currentShift.endTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Duration</p>
              <p className="font-semibold text-white">{currentShift.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <Badge variant="default" className="bg-green-600 text-white">
                {currentShift.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900 border-gray-700 transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-600/20">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-gray-400">Critical Events (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700 transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-600/20">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-sm text-gray-400">Total Events (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Categories chart from event recording analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Event Categories (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Process", count: 15, percentage: 35, color: "bg-blue-500" },
                { category: "Maintenance", count: 12, percentage: 28, color: "bg-yellow-500" },
                { category: "Safety", count: 8, percentage: 19, color: "bg-red-500" },
                { category: "Quality", count: 5, percentage: 12, color: "bg-green-500" },
                { category: "Breakdown", count: 3, percentage: 6, color: "bg-purple-500" },
              ].map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-white w-20">{item.category}</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {item.count} events ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Location Wise Event Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {[
                { location: "Furnace", count: 8, trend: "+2", color: "bg-red-500", icon: AlertTriangle },
                { location: "MR", count: 5, trend: "-1", color: "bg-yellow-500", icon: Zap },
                { location: "FM", count: 6, trend: "+1", color: "bg-blue-500", icon: Activity },
                { location: "Mill Floor", count: 4, trend: "0", color: "bg-green-500", icon: Shield },
                { location: "Lab", count: 2, trend: "+1", color: "bg-purple-500", icon: Activity },
                { location: "Utility Area", count: 3, trend: "-1", color: "bg-orange-500", icon: AlertTriangle },
              ].map((item) => (
                <div key={item.location} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${item.color}/20`}>
                      <item.icon className={`h-4 w-4 ${item.color.replace("bg-", "text-")}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.location}</p>
                      <p className="text-sm text-gray-400">{item.count} events</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        item.trend.startsWith("+")
                          ? "text-red-400"
                          : item.trend.startsWith("-")
                            ? "text-green-400"
                            : "text-gray-400"
                      }`}
                    >
                      {item.trend === "0" ? "No change" : item.trend}
                    </p>
                    <p className="text-xs text-gray-400">vs last week</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="h-5 w-5 text-blue-400" />
            Recent Events & Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
                <div className="text-xs text-gray-400 font-mono mt-1">{event.time}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs border-gray-600 text-white">
                      {event.type}
                    </Badge>
                    <span className={`${getStatusColor(event.severity)} flex items-center gap-1`}>
                      {getStatusIcon(event.severity)}
                    </span>
                  </div>
                  <p className="text-sm text-white">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
