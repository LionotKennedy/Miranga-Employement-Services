"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Button from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  label: string
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  itemsPerPage?: number
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 8,
  className,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead key={column.key} className="font-medium">
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Affichage de {startIndex + 1} à {Math.min(endIndex, data.length)} sur {data.length}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline"}
              size="sm"
              onClick={() => goToPage(page)}
              className={cn(currentPage === page && "bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
