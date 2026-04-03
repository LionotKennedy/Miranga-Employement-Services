
import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

    const variants = {
      primary: "bg-primary text-primary-foreground hover:opacity-90",
      secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      destructive: "bg-destructive text-primary-foreground hover:opacity-90",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    return (
      <button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
