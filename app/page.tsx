"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { ShiftHandover } from "@/components/shift-handover"
import { EventRecording } from "@/components/event-recording"
import { EquipmentMaintenance } from "@/components/equipment-maintenance"
import { DocumentManagement } from "@/components/document-management"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "shift-handover":
        return <ShiftHandover />
      case "event-recording":
        return <EventRecording />
      case "equipment-maintenance":
        return <EquipmentMaintenance />
      case "document-management":
        return <DocumentManagement />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background industrial-grid">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeSection={activeSection} />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
