import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "primary" | "accent"
  hover?: boolean
}

export default function Card({ children, className = "", variant = "default", hover = false }: CardProps) {
  const baseStyles = "rounded-lg shadow-md border transition-all duration-300"

  const variantStyles = {
    default: "bg-card border-border text-card-foreground",
    primary: "bg-primary/10 border-primary/20 text-foreground",
    accent: "bg-accent/10 border-accent/20 text-foreground",
  }

  const hoverStyles = hover ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer" : ""

  return <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>{children}</div>
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return <h3 className={`text-xl font-bold text-foreground ${className}`}>{children}</h3>
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return <p className={`text-sm text-muted-foreground mt-2 ${className}`}>{children}</p>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return <div className={`p-6 pt-4 border-t border-border ${className}`}>{children}</div>
}
