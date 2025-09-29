"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, RefreshCw, AlertTriangle, Settings, FileText, Factory, Users, Clock } from "lucide-react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "shift-handover", name: "Shift Handover", icon: RefreshCw },
  { id: "event-recording", name: "Event Recording", icon: AlertTriangle },
  { id: "equipment-maintenance", name: "Equipment Maintenance", icon: Settings },
  { id: "document-management", name: "Document Management", icon: FileText },
]

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Factory className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-white">SteelOps</h1>
            <p className="text-sm text-gray-400">Digital Logbook</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors",
                activeSection === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 text-sm">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-white">Operator A-001</p>
            <p className="text-gray-400">Shift A</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Shift A: 6AM - 2PM</span>
        </div>
      </div>
    </div>
  )
}
