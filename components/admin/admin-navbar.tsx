"use client"

import { Bell, Menu, Moon, Sun, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Button from "@/components/ui/button"

type Props = {
  isOpen: boolean
  onToggle: () => void
}

export function AdminNavbar({ isOpen, onToggle }: Props) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 fixed top-0 left-0 right-0 z-50 shadow-sm"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-1 rounded-md hover:bg-muted transition-colors"
          onClick={onToggle}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-4 w-4 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6 text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-center h-16"
        >
          <span className="hidden md:block font-bold whitespace-nowrap text-xl md:text-2xl">
            <span className="text-primary">Miranga</span> <span className="text-foreground">Employment Services</span>
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 sm:gap-4 flex-shrink-0"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="secondary" size="sm" className="relative flex-shrink-0">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 15 }}
              className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center"
            >
              3
            </motion.span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="secondary" size="sm" onClick={toggleTheme} aria-label="Changer de thème">
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
            <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs sm:text-sm">
              A
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium">Admin</span>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}
