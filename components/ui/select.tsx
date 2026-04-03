"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Select = ({ children, value, onValueChange }: { children: React.ReactNode; value?: string; onValueChange?: (value: string) => void }) => {
    return (
        <select
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            )}
        >
            {children}
        </select>
    )
}

const SelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex items-center justify-between", className)}>{children}</div>
)

const SelectValue = ({ placeholder }: { placeholder?: string }) => <span className="text-muted-foreground">{placeholder}</span>

const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option value={value}>{children}</option>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }