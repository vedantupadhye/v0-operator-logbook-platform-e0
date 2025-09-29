import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "SteelOps Digital Logbook",
  description: "Professional digital logbook platform for steel plant operators",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <body className="min-h-screen bg-background font-sans">{children}</body>
    </html>
  )
}
