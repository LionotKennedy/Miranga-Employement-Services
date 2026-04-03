"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
    // Si la modale n'est pas ouverte, ne rien afficher
    if (!open) return null

    return (
        // Overlay pour fermer la modale en cliquant à l'extérieur
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => onOpenChange?.(false)}>
            {/* Conteneur principal de la modale */}
            <div className="bg-background rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

// 🚨 CORRECTION : Ajout du composant DialogTrigger (factice)
// Dans votre implémentation simplifiée, il sert uniquement de wrapper pour satisfaire l'import.
const DialogTrigger = ({ children }: { children: React.ReactNode; asChild?: boolean }) => {
    return <>{children}</>
}
DialogTrigger.displayName = "DialogTrigger"


const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        // Cette implémentation ne gère pas le positionnement complexe des Dialogs Radix, elle applique juste le padding et les classes
        <div ref={ref} className={cn("p-6", className)} {...props} />
    )
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("mb-4", className)} {...props} />
)

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-lg font-semibold", className)} {...props} />
)

const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex justify-end gap-2 mt-4", className)} {...props} />
)

// 🚨 CORRECTION : AJOUT DE DIALOGTRIGGER À L'EXPORT
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger }