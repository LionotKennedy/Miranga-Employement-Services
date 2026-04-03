"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/* ---------- Overlay + container ---------- */
const Sheet = ({ children, open, onOpenChange }: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (o: boolean) => void
}) => {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={() => onOpenChange?.(false)}
    >
      <div
        className="bg-background rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

/* ---------- Content ---------- */
const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 w-full max-w-md", className)} {...props} />
  )
)
SheetContent.displayName = "SheetContent"

/* ---------- Header ---------- */
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props} />
)

/* ---------- Title ---------- */
const SheetTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold", className)} {...props} />
)

/* ---------- Description ---------- */
const SheetDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

/* ---------- Trigger (simple clone) ---------- */
const SheetTrigger = ({ asChild, children, ...props }: {
  asChild?: boolean
  children: React.ReactElement
}) => React.cloneElement(children, props)

export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger }