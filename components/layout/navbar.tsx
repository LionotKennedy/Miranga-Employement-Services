"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { routes } from "@/config/routes"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 370)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  /* Bloque le scroll quand le menu est ouvert */
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
  }, [isMenuOpen])

  const navSpring = { stiffness: 300, damping: 30 }

  /* Variants */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  const mobileItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut" as const 
    }
  }
}

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.span
              // animate={{ fontSize: isSmallScreen ? "0.875rem" : "1.25rem" }}
              transition={{ ...navSpring, duration: 0.4 }}
              className="font-bold whitespace-nowrap sm:text-2xl"
            >
              <span className="text-primary">Miranga</span>{" "}
              <span className="text-foreground">Employment Services</span>
            </motion.span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {routes.public.map((link, i) => {
              const active = pathname === link.href || (pathname === "/" && link.href === "/")
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...navSpring, delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`relative px-2 py-1 font-medium transition-colors hover:text-primary ${active ? "text-primary" : "text-foreground"
                      }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-primary"
                        initial={false}
                        transition={navSpring}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>
          <motion.button
            whileHover={{
              scale: 1.03,
              rotate: 2 // Rotation minimale
            }}
            whileTap={{ scale: 0.97, rotate: -2 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }} // Ralenti
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
        {/* Mobile Navigation avec animations améliorées */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.3, ease: "easeIn" }
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-t border-border/40 bg-background/80 backdrop-blur-lg"
            >
              <motion.div
                className="flex flex-col space-y-2 py-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {routes.public.map((link) => {
                  const isActive = pathname === link.href || (pathname === "/" && link.href === "/")
                  return (
                    <motion.div
                      key={link.href}
                      variants={mobileItemVariants}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center px-4 py-3 mx-2 rounded-xl transition-all duration-300 font-medium ${isActive
                          ? "bg-primary/10 text-primary border-l-4 border-primary"
                          : "text-foreground/80 hover:bg-muted/50 hover:text-primary border-l-4 border-transparent"
                          }`}
                      >
                        <motion.span
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.label}
                        </motion.span>

                        {/* Indicateur visuel pour l'élément actif */}
                        {isActive && (
                          <motion.div
                            className="ml-2 w-2 h-2 bg-primary rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                              delay: 0.1
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  )
}

