"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RefreshCw, Clock, Plus, Eye, Power, Edit, Save, PenTool, RotateCcw, CheckCircle } from "lucide-react"

export function ShiftHandover() {
  const [activeTab, setActiveTab] = useState("current")
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEndShiftDialog, setShowEndShiftDialog] = useState(false)
  const [showSignatureDialog, setShowSignatureDialog] = useState(false)
  const [selectedHandover, setSelectedHandover] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [signature, setSignature] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [formData, setFormData] = useState({ incomingOperator: "" })

  const [currentShiftData, setCurrentShiftData] = useState({
    operator: "John Smith (A-001)",
    shiftType: "Shift A",
    startTime: "6AM",
    currentTime: "8:30AM",
    equipmentStatus: "All systems operational",
    pendingJobs: [
      "Scheduled maintenance on Conveyor B at 10:00",
      "Quality inspection due for Batch #2024-001",
      "Temperature calibration for Furnace #2",
    ],
    safetyNotes: "PPE inspection completed. All safety systems active.",
    processNotes: "Production running at 98% efficiency. No deviations.",
    qualityMetrics: {
      batchesCompleted: 12,
      qualityScore: "98.5%",
      rejectionRate: "0.2%",
    },
  })

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#60a5fa"
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const signatureData = canvas.toDataURL()
    setSignature(signatureData)
    setShowSignatureDialog(false)

    // Show success message
    alert("Digital signature captured successfully!")
  }

  const handleEndShift = () => {
    if (!signature) {
      setShowSignatureDialog(true)
      return
    }

    const newPendingIssue = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      outgoing: currentShiftData.operator,
      incoming: formData.incomingOperator || "To be assigned",
      shift: `${currentShiftData.shiftType} → Next Shift`,
      status: "pending_approval",
      pendingItems: currentShiftData.pendingJobs,
      requiresSignature: true,
      signature: signature,
      shiftData: currentShiftData,
    }

    setPendingIssues([...pendingIssues, newPendingIssue])
    setShowEndShiftDialog(false)

    // Show success message
    alert("Shift ended successfully! Handover created and awaiting incoming operator approval.")
  }

  const updateShiftData = (field: string, value: any) => {
    setCurrentShiftData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveShiftData = () => {
    setIsEditing(false)
    alert("Shift data updated successfully!")
  }

  const viewHandover = (handover: any) => {
    setSelectedHandover(handover)
    setShowViewDialog(true)
  }

  const resolvePendingIssue = (issueId: number) => {
    setPendingIssues(pendingIssues.map((issue) => (issue.id === issueId ? { ...issue, status: "resolved" } : issue)))
    alert(`Pending issue ${issueId} has been resolved successfully!`)
  }

  const updatePendingJob = (index: number, newJob: string) => {
    const updatedJobs = [...currentShiftData.pendingJobs]
    updatedJobs[index] = newJob
    setCurrentShiftData((prev) => ({
      ...prev,
      pendingJobs: updatedJobs,
    }))
  }

  const addPendingJob = () => {
    setCurrentShiftData((prev) => ({
      ...prev,
      pendingJobs: [...prev.pendingJobs, "New pending job"],
    }))
  }

  const removePendingJob = (index: number) => {
    setCurrentShiftData((prev) => ({
      ...prev,
      pendingJobs: prev.pendingJobs.filter((_, i) => i !== index),
    }))
  }

  const [pendingIssues, setPendingIssues] = useState([
    {
      id: 1,
      timestamp: "2024-01-15 08:45:00",
      outgoing: "John Smith (A-001)",
      incoming: "Sarah Johnson (B-002)",
      shift: "Shift A → Shift B",
      status: "pending_approval",
      pendingItems: ["Conveyor B maintenance", "Quality inspection Batch #2024-001"],
      requiresSignature: true,
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Shift Handover Management</h3>
          <p className="text-sm text-gray-400">Manage shift transitions and operator handovers</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showEndShiftDialog} onOpenChange={setShowEndShiftDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white">
                <Power className="h-4 w-4" />
                End Shift
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">End Current Shift</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2 text-white">Shift Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Operator:</span>
                      <span className="ml-2 font-medium text-white">{currentShiftData.operator}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Shift:</span>
                      <span className="ml-2 font-medium text-white">{currentShiftData.shiftType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <span className="ml-2 font-medium text-white">2h 30m</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <Badge className="ml-2 bg-green-600 text-white">Operational</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Incoming Operator (Optional)</label>
                  <Select
                    value={formData.incomingOperator}
                    onValueChange={(value) => setFormData({ ...formData, incomingOperator: value })}
                  >
                    <SelectTrigger className="bg-gray-800 text-white border-gray-600">
                      <SelectValue placeholder="Select incoming operator or leave blank" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="sarah-b002" className="text-white hover:bg-gray-700">
                        Sarah Johnson (B-002)
                      </SelectItem>
                      <SelectItem value="mike-c003" className="text-white hover:bg-gray-700">
                        Mike Wilson (C-003)
                      </SelectItem>
                      <SelectItem value="lisa-d004" className="text-white hover:bg-gray-700">
                        Lisa Chen (D-004)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-white">Pending Items to Handover</h4>
                  <div className="space-y-2">
                    {currentShiftData.pendingJobs.map((job, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-800 rounded border border-gray-700"
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-white">{job}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <PenTool className="h-5 w-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="font-medium text-white">Digital Signature Required</p>
                    <p className="text-sm text-gray-400">
                      {signature ? "Signature captured ✓" : "Click to add your digital signature"}
                    </p>
                  </div>
                  <Button
                    variant={signature ? "outline" : "default"}
                    onClick={() => setShowSignatureDialog(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {signature ? "Update" : "Sign"}
                  </Button>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowEndShiftDialog(false)}
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEndShift}
                    disabled={!signature}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Power className="h-4 w-4 mr-2" />
                    End Shift
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700">
          <TabsTrigger
            value="current"
            className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Current Shift
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Pending Issues
            {pendingIssues.length > 0 && (
              <Badge className="ml-2 bg-orange-600 text-white">{pendingIssues.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Current Shift Status
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isEditing ? saveShiftData() : setIsEditing(true))}
                  className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800"
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Operator</p>
                  <p className="font-semibold text-white">{currentShiftData.operator}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Shift Type</p>
                  <p className="font-semibold text-white">{currentShiftData.shiftType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Start Time</p>
                  <p className="font-semibold text-white">{currentShiftData.startTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Time</p>
                  <p className="font-semibold text-white">{currentShiftData.currentTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-white">Quality Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Batches</span>
                      <span className="font-medium text-white">{currentShiftData.qualityMetrics.batchesCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Quality Score</span>
                      <span className="font-medium text-green-400">{currentShiftData.qualityMetrics.qualityScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Rejection Rate</span>
                      <span className="font-medium text-white">{currentShiftData.qualityMetrics.rejectionRate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-white">Equipment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={currentShiftData.equipmentStatus}
                        onChange={(e) => updateShiftData("equipmentStatus", e.target.value)}
                        rows={2}
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    ) : (
                      <p className="text-sm text-white">{currentShiftData.equipmentStatus}</p>
                    )}
                    <Badge variant="default" className="mt-2 bg-green-600 text-white">
                      All Systems Operational
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-white">Safety Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={currentShiftData.safetyNotes}
                        onChange={(e) => updateShiftData("safetyNotes", e.target.value)}
                        rows={2}
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    ) : (
                      <p className="text-sm text-white">{currentShiftData.safetyNotes}</p>
                    )}
                    <Badge variant="default" className="mt-2 bg-green-600 text-white">
                      Safety Compliant
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base text-white">Notes from last shift</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-3">
                      {currentShiftData.pendingJobs.map((job, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={job}
                            onChange={(e) => updatePendingJob(index, e.target.value)}
                            className="bg-gray-700 text-white border-gray-600"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePendingJob(index)}
                            className="text-red-400 hover:bg-gray-700"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addPendingJob}
                        className="border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {currentShiftData.pendingJobs.map((job, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-white">{job}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Pending Issues Requiring Approval</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingIssues.length === 0 ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No pending issues requiring approval</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingIssues.map((issue) => (
                    <div key={issue.id} className="p-4 rounded-lg bg-orange-900/30 border border-orange-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-orange-200">Shift Handover - {issue.shift}</h4>
                            <Badge
                              className={`text-white ${issue.status === "resolved" ? "bg-green-600" : "bg-orange-600"}`}
                            >
                              {issue.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-orange-300 mb-2">
                            <p>
                              <strong>From:</strong> {issue.outgoing}
                            </p>
                            <p>
                              <strong>To:</strong> {issue.incoming}
                            </p>
                            <p>
                              <strong>Time:</strong> {issue.timestamp}
                            </p>
                          </div>
                          <div className="text-sm text-orange-200">
                            <p className="font-medium mb-1">Pending Items:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {issue.pendingItems.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewHandover(issue)}
                            className="border-gray-600 text-white hover:bg-gray-800"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {issue.status !== "resolved" && (
                            <Button
                              size="sm"
                              onClick={() => resolvePendingIssue(issue.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Handover History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingIssues.map((handover) => (
                  <div
                    key={handover.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <p className="font-medium text-white">
                          {handover.timestamp.split(" ")[0]} at {handover.timestamp.split(" ")[1]}
                        </p>
                        <p className="text-gray-400">
                          {handover.outgoing} → {handover.incoming}
                        </p>
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-white">
                        {handover.shift}
                      </Badge>
                      {handover.pendingItems.length > 0 && (
                        <Badge variant="destructive" className="bg-red-600 text-white">
                          {handover.pendingItems.length} issue{handover.pendingItems.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewHandover(handover)}
                      className="text-white hover:bg-gray-800"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showSignatureDialog} onOpenChange={setShowSignatureDialog}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Digital Signature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Please sign below to authenticate your shift handover. Use your mouse or touch to draw your signature.
            </p>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 bg-gray-800">
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                className="signature-canvas w-full cursor-crosshair bg-white rounded"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={clearSignature}
                className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSignatureDialog(false)}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button onClick={saveSignature} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Save Signature
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Handover Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Handover Details</DialogTitle>
          </DialogHeader>
          {selectedHandover && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Date & Time</p>
                  <p className="font-medium text-white">
                    {selectedHandover.timestamp.split(" ")[0]} at {selectedHandover.timestamp.split(" ")[1]}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Shift Transition</p>
                  <p className="font-medium text-white">{selectedHandover.shift}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Outgoing Operator</p>
                  <p className="font-medium text-white">{selectedHandover.outgoing}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Incoming Operator</p>
                  <p className="font-medium text-white">{selectedHandover.incoming}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <Badge variant="default" className="bg-green-600 text-white mt-1">
                  {selectedHandover.status}
                </Badge>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-2">Handover Notes</p>
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <p className="text-sm text-white">
                    Equipment running normally. Scheduled maintenance completed on Conveyor A. Quality metrics within
                    specification. No safety incidents reported.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
