"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AdminNavbar } from "@/components/admin/admin-navbar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <AdminNavbar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={cn("flex-1 flex flex-col transition-all duration-300 ease-in-out pt-16", "md:ml-64")}>
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden"
        >
          <div className="max-w-full mx-auto">{children}</div>
        </motion.main>
      </div>
    </div>
  )
}
