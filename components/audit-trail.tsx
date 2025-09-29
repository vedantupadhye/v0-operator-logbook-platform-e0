"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Download,
  Eye,
  Calendar,
  Activity,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  AlertTriangle,
  FileText,
  Users,
} from "lucide-react"

export function AuditTrail() {
  const [activeTab, setActiveTab] = useState("trail")
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedAuditEntry, setSelectedAuditEntry] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterUser, setFilterUser] = useState("all")
  const [dateRange, setDateRange] = useState("7days")

  const auditTrail = [
    {
      id: 1,
      timestamp: "2024-01-15 08:45:23",
      user: "John Smith (A-001)",
      action: "create",
      module: "Event Recording",
      resource: "Temperature Spike Event",
      resourceId: "EVT-2024-001",
      details: "Created new event record for temperature spike in Blast Furnace #1",
      ipAddress: "192.168.1.45",
      userAgent: "Chrome/120.0.0.0",
      severity: "info",
      compliance: ["ISO-9001", "OSHA"],
    },
    {
      id: 2,
      timestamp: "2024-01-15 08:30:15",
      user: "John Smith (A-001)",
      action: "update",
      module: "Equipment Monitoring",
      resource: "Blast Furnace #1 Parameters",
      resourceId: "EQP-BF1-001",
      details: "Updated temperature monitoring parameters and added observation notes",
      ipAddress: "192.168.1.45",
      userAgent: "Chrome/120.0.0.0",
      severity: "info",
      compliance: ["ISO-14001"],
    },
    {
      id: 3,
      timestamp: "2024-01-15 08:15:42",
      user: "Sarah Johnson (B-002)",
      action: "approve",
      module: "Shift Handover",
      resource: "Day Shift Handover",
      resourceId: "SHO-2024-001",
      details: "Approved shift handover from night shift operator Mike Wilson",
      ipAddress: "192.168.1.67",
      userAgent: "Firefox/121.0.0.0",
      severity: "info",
      compliance: ["GMP"],
    },
    {
      id: 4,
      timestamp: "2024-01-15 07:58:33",
      user: "Engineering Team",
      action: "upload",
      module: "Document Management",
      resource: "Safety Procedure Manual",
      resourceId: "DOC-2024-015",
      details: "Uploaded new version 3.2 of Blast Furnace Operating Procedures",
      ipAddress: "192.168.1.89",
      userAgent: "Chrome/120.0.0.0",
      severity: "info",
      compliance: ["ISO-9001", "OSHA"],
    },
    {
      id: 5,
      timestamp: "2024-01-15 06:45:18",
      user: "Mike Wilson (C-003)",
      action: "delete",
      module: "Event Recording",
      resource: "Duplicate Event Entry",
      resourceId: "EVT-2024-002",
      details: "Deleted duplicate event entry created by mistake",
      ipAddress: "192.168.1.23",
      userAgent: "Chrome/120.0.0.0",
      severity: "warning",
      compliance: ["ISO-9001"],
    },
    {
      id: 6,
      timestamp: "2024-01-15 06:30:07",
      user: "System",
      action: "backup",
      module: "System",
      resource: "Database Backup",
      resourceId: "BCK-2024-015",
      details: "Automated daily database backup completed successfully",
      ipAddress: "localhost",
      userAgent: "System Process",
      severity: "info",
      compliance: ["ISO-27001"],
    },
    {
      id: 7,
      timestamp: "2024-01-14 23:55:44",
      user: "Lisa Chen (D-004)",
      action: "emergency_stop",
      module: "Equipment Control",
      resource: "Rolling Mill A",
      resourceId: "EQP-RMA-001",
      details: "Emergency stop activated due to material jam detection",
      ipAddress: "192.168.1.78",
      userAgent: "Chrome/120.0.0.0",
      severity: "critical",
      compliance: ["OSHA", "ISO-45001"],
    },
    {
      id: 8,
      timestamp: "2024-01-14 22:30:12",
      user: "System",
      action: "signature_verify",
      module: "Shift Handover",
      resource: "Digital Signature Verification",
      resourceId: "SIG-2024-003",
      details: "Digital signature verified for shift handover completion",
      ipAddress: "localhost",
      userAgent: "System Process",
      severity: "info",
      compliance: ["ISO-9001", "GMP"],
    },
  ]

  const complianceStandards = [
    {
      standard: "ISO-9001",
      name: "Quality Management Systems",
      status: "compliant",
      lastAudit: "2024-01-10",
      nextAudit: "2024-07-10",
      findings: 0,
      coverage: "98%",
      description: "Quality management system requirements for consistent product quality",
    },
    {
      standard: "OSHA",
      name: "Occupational Safety & Health",
      status: "compliant",
      lastAudit: "2024-01-05",
      nextAudit: "2024-04-05",
      findings: 1,
      coverage: "95%",
      description: "Workplace safety and health regulations compliance",
    },
    {
      standard: "ISO-14001",
      name: "Environmental Management",
      status: "compliant",
      lastAudit: "2023-12-20",
      nextAudit: "2024-06-20",
      findings: 0,
      coverage: "97%",
      description: "Environmental management system requirements",
    },
    {
      standard: "GMP",
      name: "Good Manufacturing Practice",
      status: "review",
      lastAudit: "2023-11-15",
      nextAudit: "2024-02-15",
      findings: 3,
      coverage: "92%",
      description: "Manufacturing quality standards and practices",
    },
    {
      standard: "ISO-45001",
      name: "Occupational Health & Safety",
      status: "compliant",
      lastAudit: "2024-01-08",
      nextAudit: "2024-07-08",
      findings: 0,
      coverage: "99%",
      description: "Occupational health and safety management systems",
    },
    {
      standard: "ISO-27001",
      name: "Information Security Management",
      status: "compliant",
      lastAudit: "2024-01-12",
      nextAudit: "2024-07-12",
      findings: 0,
      coverage: "96%",
      description: "Information security management system requirements",
    },
  ]

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-600"
      case "update":
        return "bg-blue-600"
      case "delete":
        return "bg-red-600"
      case "approve":
        return "bg-purple-600"
      case "upload":
        return "bg-indigo-600"
      case "emergency_stop":
        return "bg-red-700"
      case "backup":
        return "bg-gray-600"
      case "signature_verify":
        return "bg-cyan-600"
      default:
        return "bg-gray-600"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600"
      case "warning":
        return "bg-yellow-600"
      case "info":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-600"
      case "review":
        return "bg-yellow-600"
      case "non-compliant":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const filteredAuditTrail = auditTrail.filter((entry) => {
    const matchesSearch =
      searchTerm === "" ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAction = filterAction === "all" || entry.action === filterAction
    const matchesUser = filterUser === "all" || entry.user.includes(filterUser)

    return matchesSearch && matchesAction && matchesUser
  })

  const viewAuditEntry = (entry: any) => {
    setSelectedAuditEntry(entry)
    setShowViewDialog(true)
  }

  const exportAuditLog = () => {
    alert("Audit log export initiated. You will receive a download link shortly.")
  }

  const generateComplianceReport = () => {
    alert("Compliance report generation started. Report will be available in the Reports section.")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold high-contrast">Audit Trail & Compliance</h3>
          <p className="text-sm text-muted-foreground">Track all system activities and maintain compliance records</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={generateComplianceReport}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          <Button onClick={exportAuditLog} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Audit Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="analytics-card transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-600/20">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold high-contrast">{auditTrail.length}</p>
                <p className="text-sm text-muted-foreground">Total Activities (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="analytics-card transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-600/20">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold high-contrast">
                  {complianceStandards.filter((s) => s.status === "compliant").length}
                </p>
                <p className="text-sm text-muted-foreground">Compliant Standards</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="analytics-card transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-600/20">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold high-contrast">
                  {auditTrail.filter((e) => e.severity === "critical").length}
                </p>
                <p className="text-sm text-muted-foreground">Critical Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="analytics-card transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-600/20">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold high-contrast">{new Set(auditTrail.map((e) => e.user)).size}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trail">Audit Trail</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
          <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="trail" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search audit entries..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="approve">Approve</SelectItem>
                    <SelectItem value="upload">Upload</SelectItem>
                    <SelectItem value="emergency_stop">Emergency Stop</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterUser} onValueChange={setFilterUser}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="John Smith">John Smith (A-001)</SelectItem>
                    <SelectItem value="Sarah Johnson">Sarah Johnson (B-002)</SelectItem>
                    <SelectItem value="Mike Wilson">Mike Wilson (C-003)</SelectItem>
                    <SelectItem value="Lisa Chen">Lisa Chen (D-004)</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">Last 24h</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                System Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAuditTrail.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between p-4 rounded-lg bg-accent/50 border border-border hover:bg-accent/70 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-xs text-muted-foreground font-mono mt-1 w-32">{entry.timestamp}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${getActionColor(entry.action)}`}>{entry.action}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {entry.module}
                          </Badge>
                          <Badge className={`text-xs ${getSeverityColor(entry.severity)}`}>{entry.severity}</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">{entry.resource}</span>
                          <span className="text-muted-foreground"> • {entry.user}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{entry.details}</p>
                        <div className="flex items-center gap-2">
                          {entry.compliance.map((standard, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => viewAuditEntry(entry)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceStandards.map((standard, index) => (
              <Card key={index} className="analytics-card transition-all duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    {standard.standard}
                    <Badge className={`text-xs ${getComplianceStatusColor(standard.status)}`}>{standard.status}</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{standard.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{standard.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Audit</p>
                      <p className="font-medium">{standard.lastAudit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Audit</p>
                      <p className="font-medium">{standard.nextAudit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Findings</p>
                      <p className={`font-medium ${standard.findings > 0 ? "text-yellow-400" : "text-green-400"}`}>
                        {standard.findings}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Coverage</p>
                      <p className="font-medium text-green-400">{standard.coverage}</p>
                    </div>
                  </div>
                  <div className="w-full bg-accent rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: standard.coverage }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-green-950/50 border border-green-800/50">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-300">
                    {complianceStandards.filter((s) => s.status === "compliant").length}
                  </p>
                  <p className="text-sm text-green-400">Compliant Standards</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-950/50 border border-yellow-800/50">
                  <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-300">
                    {complianceStandards.filter((s) => s.status === "review").length}
                  </p>
                  <p className="text-sm text-yellow-400">Under Review</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-950/50 border border-blue-800/50">
                  <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-300">2</p>
                  <p className="text-sm text-blue-400">Audits This Month</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-950/50 border border-purple-800/50">
                  <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-300">96%</p>
                  <p className="text-sm text-purple-400">Overall Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border hover:bg-accent/70 transition-colors">
                  <div>
                    <h4 className="font-medium">Monthly Compliance Report - January 2024</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive compliance status across all standards
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        ISO-9001
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        OSHA
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ISO-14001
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border hover:bg-accent/70 transition-colors">
                  <div>
                    <h4 className="font-medium">Audit Trail Export - Q4 2023</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete audit trail for fourth quarter compliance review
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        All Standards
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        3,247 entries
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border hover:bg-accent/70 transition-colors">
                  <div>
                    <h4 className="font-medium">Safety Incident Analysis - 2023</h4>
                    <p className="text-sm text-muted-foreground">Annual safety incident report and trend analysis</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        OSHA
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ISO-45001
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border hover:bg-accent/70 transition-colors">
                  <div>
                    <h4 className="font-medium">Document Control Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Document revision history and version control compliance
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        ISO-9001
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        GMP
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audit-trail">Audit Trail</SelectItem>
                      <SelectItem value="compliance">Compliance Status</SelectItem>
                      <SelectItem value="user-activity">User Activity</SelectItem>
                      <SelectItem value="system-events">System Events</SelectItem>
                      <SelectItem value="signature-verification">Digital Signatures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Date Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="1year">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Compliance Standards</label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {complianceStandards.map((standard, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
                      {standard.standard}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={generateComplianceReport}>
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Audit Entry Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Audit Entry Details</DialogTitle>
          </DialogHeader>
          {selectedAuditEntry && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold high-contrast">{selectedAuditEntry.resource}</h3>
                  <p className="text-sm text-muted-foreground">
                    Entry ID: AUD-{selectedAuditEntry.id.toString().padStart(4, "0")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${getActionColor(selectedAuditEntry.action)}`}>{selectedAuditEntry.action}</Badge>
                  <Badge className={`${getSeverityColor(selectedAuditEntry.severity)}`}>
                    {selectedAuditEntry.severity}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-medium">{selectedAuditEntry.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User</p>
                  <p className="font-medium">{selectedAuditEntry.user}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Module</p>
                  <p className="font-medium">{selectedAuditEntry.module}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resource ID</p>
                  <p className="font-medium">{selectedAuditEntry.resourceId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IP Address</p>
                  <p className="font-medium">{selectedAuditEntry.ipAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User Agent</p>
                  <p className="font-medium text-xs">{selectedAuditEntry.userAgent}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Action Details</p>
                <div className="bg-accent/50 p-3 rounded-lg">
                  <p className="text-sm">{selectedAuditEntry.details}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Compliance Standards</p>
                <div className="flex gap-2">
                  {selectedAuditEntry.compliance.map((standard, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {standard}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
