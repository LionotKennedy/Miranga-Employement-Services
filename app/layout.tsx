import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "@/components/layout/layout-wrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Miranga Employment Services",
  description: "Plateforme de gestion d'emploi et de recrutement",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}

