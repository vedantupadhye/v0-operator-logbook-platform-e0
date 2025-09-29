"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Plus, Search, Download, Eye, CheckCircle, AlertTriangle, Edit, History, Clock } from "lucide-react"

export function DocumentManagement() {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showRevisionDialog, setShowRevisionDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    version: "",
    effectiveDate: "",
    expiryDate: "",
    accessLevel: "",
    tags: "",
    file: null,
  })

  const documents = [
    {
      id: 1,
      title: "Blast Furnace Operating Procedures",
      category: "SOP",
      version: "3.2",
      status: "active",
      effectiveDate: "2024-01-01",
      expiryDate: "2024-12-31",
      lastModified: "2024-01-15 10:30:00",
      modifiedBy: "Engineering Team",
      accessLevel: "operators",
      tags: ["blast-furnace", "operations", "safety"],
      description:
        "Standard operating procedures for blast furnace operations including startup, normal operation, and shutdown procedures.",
      fileSize: "2.4 MB",
      fileType: "PDF",
      downloadCount: 45,
      linkedEvents: 3,
    },
    {
      id: 2,
      title: "Emergency Response Procedures",
      category: "Safety",
      version: "2.1",
      status: "active",
      effectiveDate: "2024-01-10",
      expiryDate: "2025-01-10",
      lastModified: "2024-01-10 14:20:00",
      modifiedBy: "Safety Department",
      accessLevel: "all",
      tags: ["emergency", "safety", "response"],
      description:
        "Comprehensive emergency response procedures for various incident types including fire, chemical spills, and equipment failures.",
      fileSize: "1.8 MB",
      fileType: "PDF",
      downloadCount: 78,
      linkedEvents: 1,
    },
    {
      id: 3,
      title: "Quality Control Checklist",
      category: "Quality",
      version: "1.5",
      status: "review",
      effectiveDate: "2024-02-01",
      expiryDate: "2024-11-30",
      lastModified: "2024-01-12 09:15:00",
      modifiedBy: "Quality Team",
      accessLevel: "quality-inspectors",
      tags: ["quality", "checklist", "inspection"],
      description: "Daily quality control checklist for steel production processes and final product inspection.",
      fileSize: "856 KB",
      fileType: "PDF",
      downloadCount: 23,
      linkedEvents: 0,
    },
    {
      id: 4,
      title: "Maintenance Schedule Template",
      category: "Maintenance",
      version: "2.0",
      status: "draft",
      effectiveDate: "2024-02-15",
      expiryDate: "2025-02-15",
      lastModified: "2024-01-14 16:45:00",
      modifiedBy: "Maintenance Team",
      accessLevel: "maintenance",
      tags: ["maintenance", "schedule", "template"],
      description:
        "Template for creating maintenance schedules for all equipment types including preventive and corrective maintenance.",
      fileSize: "1.2 MB",
      fileType: "Excel",
      downloadCount: 12,
      linkedEvents: 0,
    },
    {
      id: 5,
      title: "Environmental Compliance Manual",
      category: "Environmental",
      version: "4.1",
      status: "expired",
      effectiveDate: "2023-01-01",
      expiryDate: "2023-12-31",
      lastModified: "2023-12-15 11:30:00",
      modifiedBy: "Environmental Team",
      accessLevel: "supervisors",
      tags: ["environmental", "compliance", "regulations"],
      description: "Environmental compliance requirements and procedures for steel plant operations.",
      fileSize: "3.1 MB",
      fileType: "PDF",
      downloadCount: 67,
      linkedEvents: 2,
    },
  ]

  const revisionHistory = [
    {
      version: "3.2",
      date: "2024-01-15",
      author: "Engineering Team",
      changes: "Updated temperature parameters and safety protocols",
      status: "active",
    },
    {
      version: "3.1",
      date: "2023-11-20",
      author: "John Smith",
      changes: "Added new equipment specifications and revised startup procedures",
      status: "superseded",
    },
    {
      version: "3.0",
      date: "2023-08-10",
      author: "Engineering Team",
      changes: "Major revision - restructured entire document and updated all procedures",
      status: "superseded",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "review":
        return "bg-yellow-600"
      case "draft":
        return "bg-blue-600"
      case "expired":
        return "bg-red-600"
      case "superseded":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "review":
        return <Clock className="h-4 w-4" />
      case "draft":
        return <Edit className="h-4 w-4" />
      case "expired":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchTerm === "" ||
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = filterCategory === "all" || doc.category === filterCategory
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleUpload = () => {
    console.log("Document uploaded:", formData)
    setShowUploadDialog(false)
    setFormData({
      title: "",
      category: "",
      description: "",
      version: "",
      effectiveDate: "",
      expiryDate: "",
      accessLevel: "",
      tags: "",
      file: null,
    })
    alert("Document uploaded successfully! Document ID: DOC-2024-" + Math.floor(Math.random() * 1000))
  }

  const viewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowViewDialog(true)
  }

  const viewRevisions = (document: any) => {
    setSelectedDocument(document)
    setShowRevisionDialog(true)
  }

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setFormData({ ...formData, file: file })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold high-contrast">Document Management</h3>
          <p className="text-sm text-muted-foreground">Manage controlled documents, SOPs, manuals, and procedures</p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Document Title</label>
                  <Input
                    placeholder="Enter document title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOP">Standard Operating Procedure</SelectItem>
                      <SelectItem value="Safety">Safety Manual</SelectItem>
                      <SelectItem value="Quality">Quality Manual</SelectItem>
                      <SelectItem value="Maintenance">Maintenance Manual</SelectItem>
                      <SelectItem value="Environmental">Environmental Manual</SelectItem>
                      <SelectItem value="Training">Training Material</SelectItem>
                      <SelectItem value="Technical">Technical Specification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Brief description of the document content and purpose"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Version</label>
                  <Input
                    placeholder="e.g., 1.0, 2.1"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Effective Date</label>
                  <Input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Access Level</label>
                  <Select
                    value={formData.accessLevel}
                    onValueChange={(value) => setFormData({ ...formData, accessLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Personnel</SelectItem>
                      <SelectItem value="operators">Operators Only</SelectItem>
                      <SelectItem value="supervisors">Supervisors & Above</SelectItem>
                      <SelectItem value="maintenance">Maintenance Team</SelectItem>
                      <SelectItem value="quality-inspectors">Quality Inspectors</SelectItem>
                      <SelectItem value="engineers">Engineers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    placeholder="Comma-separated tags (e.g., safety, blast-furnace)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Document File</label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, Word, Excel, PowerPoint (Max 10MB)
                  </p>
                </div>
                {formData.file && (
                  <div className="mt-2 p-2 bg-accent/50 rounded flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{formData.file.name}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload}>Upload Document</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents by title, description, or tags..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="SOP">SOP</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="Quality">Quality</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Environmental">Environmental</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document Repository */}
      <Card>
        <CardHeader>
          <CardTitle>Document Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-start justify-between p-4 rounded-lg bg-accent/50">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium high-contrast">{document.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {document.category}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(document.status)}`}>
                        {getStatusIcon(document.status)}
                        {document.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        v{document.version}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{document.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Modified: {document.lastModified}</span>
                      <span>By: {document.modifiedBy}</span>
                      <span>Size: {document.fileSize}</span>
                      <span>Downloads: {document.downloadCount}</span>
                      {document.linkedEvents > 0 && (
                        <span className="text-blue-600">Linked Events: {document.linkedEvents}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => viewDocument(document)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => viewRevisions(document)}>
                    <History className="h-4 w-4" />
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

      {/* View Document Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Document Details</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold high-contrast">{selectedDocument.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Document ID: DOC-{selectedDocument.id.toString().padStart(4, "0")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${getStatusColor(selectedDocument.status)}`}>{selectedDocument.status}</Badge>
                  <Badge variant="outline">v{selectedDocument.version}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedDocument.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Access Level</p>
                  <p className="font-medium">{selectedDocument.accessLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Effective Date</p>
                  <p className="font-medium">{selectedDocument.effectiveDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">{selectedDocument.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Modified</p>
                  <p className="font-medium">{selectedDocument.lastModified}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Modified By</p>
                  <p className="font-medium">{selectedDocument.modifiedBy}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <div className="bg-accent/50 p-3 rounded-lg">
                  <p className="text-sm">{selectedDocument.description}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Tags</p>
                <div className="flex gap-1">
                  {selectedDocument.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-medium">{selectedDocument.fileSize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">File Type</p>
                  <p className="font-medium">{selectedDocument.fileType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Download Count</p>
                  <p className="font-medium">{selectedDocument.downloadCount}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button>
                  <History className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Revision History Dialog */}
      <Dialog open={showRevisionDialog} onOpenChange={setShowRevisionDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Revision History</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="mb-4">
                <h4 className="font-medium">{selectedDocument.title}</h4>
                <p className="text-sm text-muted-foreground">Document revision history and changes</p>
              </div>

              <div className="space-y-3">
                {revisionHistory.map((revision, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                    <div className="p-2 rounded bg-primary/10">
                      <History className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Version {revision.version}</span>
                        <Badge className={`text-xs ${getStatusColor(revision.status)}`}>{revision.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {revision.date} • {revision.author}
                      </p>
                      <p className="text-sm">{revision.changes}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
