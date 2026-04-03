"use client"

import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg"
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, size = "md", children, ...props }, ref) => {
        const sizes = {
            sm: "h-8 w-8",
            md: "h-10 w-10",
            lg: "h-12 w-12"
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex shrink-0 overflow-hidden rounded-full",
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)

Avatar.displayName = "Avatar"

interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
    delayMs?: number
}

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex h-full w-full items-center justify-center rounded-full bg-muted",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)

AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback }