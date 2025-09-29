import { Bell, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  activeSection: string
}

const sectionTitles = {
  dashboard: "Operations Dashboard",
  "shift-handover": "Shift Handover",
  "event-recording": "Event & Incident Recording",
  "equipment-maintenance": "Equipment Maintenance",
  "document-management": "Document Management",
}

export function Header({ activeSection }: HeaderProps) {
  const currentTime = new Date().toLocaleString()

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold high-contrast">
          {sectionTitles[activeSection as keyof typeof sectionTitles]}
        </h2>
        <p className="text-sm text-muted-foreground">Steel Plant Operations - Line A</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{currentTime}</span>
        </div>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
