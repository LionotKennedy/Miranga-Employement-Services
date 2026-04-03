"use client"

import { Home, Users, CreditCard, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Button from "@/components/ui/button"
import "./style.css"

const menuItems = [
  {
    href: "/admin/dashbords",
    label: "Tableau de bord",
    icon: Home,
  },
  {
    href: "/admin/candidatures",
    label: "Candidatures",
    icon: Users,
  },
  {
    href: "/admin/payments",
    label: "Paiements",
    icon: CreditCard,
  },
  {
    href: "/admin/settings",
    label: "Paramètres",
    icon: Settings,
  },
]

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname()
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isMobile ? (isOpen ? 0 : "-100%") : 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-border flex flex-col z-40 shadow-lg",
          "max-w-full",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center p-4 border-b border-border md:hidden"
        >
          <span className="font-bold whitespace-nowrap text-sm sm:text-base">
            <span className="text-primary">Miranga</span> <span className="text-foreground">Employment Services</span>
          </span>
        </motion.div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto max-h-full">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: isMobile && isOpen ? index * 0.1 : 0,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => window.innerWidth < 768 && onClose()}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
                    "md:px-3 md:py-2",
                  )}
                >
                  <motion.div
                    whileHover={{ rotate: isActive ? 0 : 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                  </motion.div>
                  <span className="truncate">{item.label}</span>
                </Link>
              </motion.div>
            )
          })}

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: isMobile && isOpen ? menuItems.length * 0.1 : 0,
              duration: 0.3,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium w-full mt-4 cursor-pointer",
              "text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200",
            )}
            onClick={() => setIsLogoutDialogOpen(true)}
            aria-label="Déconnexion"
          >
            <motion.div whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <LogOut className="h-5 w-5 flex-shrink-0" />
            </motion.div>
            <span className="truncate">Déconnexion</span>
          </motion.button>
        </nav>
      </motion.aside>

      <AnimatePresence>
        {isLogoutDialogOpen && (
          <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
            <DialogContent>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <DialogHeader className="text-center sm:text-left">
                  <DialogTitle className="text-lg sm:text-xl">Confirmation de déconnexion</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base mt-2">
                    Êtes-vous sûr de vouloir vous déconnecter ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className={cn("flex flex-col-reverse gap-2 mt-6", "sm:flex-row sm:justify-end")}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base",
                        "border border-gray-300 rounded-lg btn-annuler",
                        "hover:bg-[#129C9C] hover:text-white hover:border-[#129C9C]",
                        "transition-all duration-200 ease-in-out cursor-pointer",
                      )}
                      onClick={() => setIsLogoutDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      onClick={handleLogout}
                      className={cn(
                        "w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base",
                        "bg-red-600 hover:bg-red-700 text-white cursor-pointer",
                        "rounded-lg transition-all duration-200 ease-in-out",
                      )}
                    >
                      Se déconnecter
                    </Button>
                  </motion.div>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
