"use client"
import type React from "react"
import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideLayout = pathname === "/login" || pathname === "/forgotPassword" || pathname?.startsWith("/admin")
  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </>
  )
}