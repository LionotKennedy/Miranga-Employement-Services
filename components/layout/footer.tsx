"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { routes } from "@/config/routes"

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const , 
        staggerChildren: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="bg-[#2C2D2D] text-white mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Miranga Employment Services</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre partenaire de confiance pour l'emploi et le recrutement professionnel.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span>+261 34 00 000 00</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <span>contact@miranga-agency.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Antananarivo, Madagascar</span>
              </li>
            </ul>
          </motion.div>

          {/* Liens */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Liens</h3>
            <ul className="space-y-2">
              {routes.public.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/conditions"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Miranga Job Agency. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
