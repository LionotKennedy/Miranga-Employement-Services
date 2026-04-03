// app/contact/page.tsx
"use client";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import img1 from "../assets/Container.png"
import img2 from "../assets/Frame.png"

function Textarea({ label, ...props }: any) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#666666] mb-2 max-[310px]:text-xs">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className="w-full min-h-[120px] px-3 py-2 rounded-lg border border-gray-200 bg-white text-[#333333]
          focus:outline-none focus:border-[#129C9C] focus:ring-2 focus:ring-[#129C9C]/20 
          transition-all duration-300 placeholder:text-muted-foreground resize-vertical
          max-[310px]:text-sm max-[310px]:px-2 max-[310px]:py-2"
      />
    </div>
  );
}

const variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#FFFFFF] font-inter overflow-hidden max-[310px]:px-2">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        variants={variants}
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-12 md:py-20 bg-[#FBFCFC] rounded-md max-[310px]:px-3 max-[310px]:py-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-[310px]:gap-4">
          <motion.div variants={variants} className="max-w-2xl space-y-6 max-[310px]:space-y-3">
            <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-[#129C9C] text-white rounded-3xl px-6 py-2 shadow-md hover:bg-[#0f8787] transition-all
                  max-[310px]:text-xs max-[310px]:px-3 max-[310px]:py-1.5 cursor-pointer"
                type="submit"
              >
                <span className="flex items-center gap-2 max-[310px]:gap-1">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
                    <circle cx="5" cy="5" r="5" fill="white" />
                  </svg>
                  Contactez-nous
                </span>
              </Button>
            </motion.div>

            <h1 className="text-3xl md:text-[31px] text-[#129C9C] font-bold mb-3 max-[310px]:text-xl max-[310px]:mb-2">
              Nous sommes à votre écoute
            </h1>

            <p className="text-base text-[#666666] max-[310px]:text-sm">
              Des questions, des suggestions ou besoin d'aide ? N'hésitez pas à
              nous contacter. Notre équipe est là pour répondre.
            </p>
          </motion.div>

          {/* Carte d’aide */}
          <motion.div variants={variants} className="w-full max-w-md max-[310px]:max-w-full">
            <Card className="p-6 rounded-xl shadow-md bg-[#FBFCFC] border border-gray-100 max-[310px]:p-4">
              <div className="flex flex-col items-start gap-4 max-[310px]:gap-2">
                <div className="flex items-center gap-2 ml-2 mt-2">
                  <img src={img1.src} alt="Message"  />
                  <h3 className="text-lg font-semibold text-[#666666] pl-2 max-[310px]:text-base">
                    Comment pouvons-nous vous aider ?
                  </h3>
                </div>

                <ul className="mt-4 list-none space-y-3 pl-2 max-[310px]:space-y-2">
                  {[
                    "Questions sur le recrutement",
                    "Support dépôt de CV",
                    "Demandes de partenariat",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-2 cursor-pointer text-[#666666] hover:text-black text-sm max-[310px]:text-xs"
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img src={img2.src} alt="Flesh"  />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact + Formulaire */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-8 md:py-12 max-[310px]:px-3 max-[310px]:py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-[310px]:gap-4">
          {/* Informations */}
          <motion.aside variants={fadeUp}>
            <Card className="p-6 max-[310px]:p-4">
              <h3 className="text-lg font-semibold text-[#129C9C] mb-4 max-[310px]:text-base">
                Informations de contact
              </h3>
              <motion.div className="space-y-5 text-sm text-[#666666] max-[310px]:space-y-3">
                <div className="flex gap-3 items-start max-[310px]:gap-2">
                  <div className="p-2 bg-[#E6F6F6] rounded-full text-[#129C9C]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <strong className="text-sm text-[#2F3333] block">Adresse</strong>
                    <p className="max-[310px]:text-xs">
                      Lot II A 25 Bis, Ankadifotsy<br />Antananarivo 101, Madagascar
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start max-[310px]:gap-2">
                  <div className="p-2 bg-[#E6F6F6] rounded-full text-[#129C9C]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <strong className="text-sm text-[#2F3333] block">Téléphone</strong>
                    <p className="max-[310px]:text-xs">
                      +261 34 00 00 00<br />+261 33 00 000 00
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start max-[310px]:gap-2">
                  <div className="p-2 bg-[#E6F6F6] rounded-full text-[#129C9C]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong className="text-sm text-[#2F3333] block">Email</strong>
                    <p className="max-[310px]:text-xs">
                      contact@miranga-agency.com<br />info@miranga-agency.com
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.aside>

          {/* Formulaire */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <Card className="p-6 max-[310px]:p-4">
              <h3 className="text-lg font-semibold text-[#129C9C] mb-4 max-[310px]:text-base">
                Envoyez-nous un message
              </h3>
              <motion.form className="space-y-4" variants={fadeIn}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-[310px]:gap-3">
                  <Input placeholder="Votre nom" label="Nom complet *" />
                  <Input placeholder="Votre email" label="Email *" type="email" />
                </div>

                <div className="relative w-full">
                  <label className="block text-sm font-medium text-[#666666] mb-2 max-[310px]:text-xs">
                    Sujet *
                  </label>
                  <div className="relative">
                    <select
                      onClick={() => setIsOpen(!isOpen)}
                      onBlur={() => setIsOpen(false)}
                      className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#333333]
                        focus:outline-none focus:border-[#129C9C] focus:ring-2 focus:ring-[#129C9C]/20 
                        transition-all duration-300 cursor-pointer
                        max-[310px]:text-xs max-[310px]:px-2 max-[310px]:py-2"
                    >
                      <option>Sélectionnez un sujet</option>
                      <option>Support dépôt CV</option>
                      <option>Recrutement</option>
                      <option>Partenariat</option>
                    </select>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        stroke="#129C9C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.span>
                  </div>
                </div>

                <Textarea label="Message *" placeholder="Votre message" />

                <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-[#129C9C] text-white rounded-md px-6 py-3 shadow-sm
                      max-[310px]:px-3 max-[310px]:py-2 max-[310px]:text-sm cursor-pointer"
                    type="submit"
                  >
                    <span className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 2 11 13"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 2 15 22 11 13 2 9 22 2z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Envoyer
                    </span>
                  </Button>
                </motion.div>
              </motion.form>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Carte Map */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-12 max-[310px]:px-3 max-[310px]:py-6"
      >
        <Card className="p-8 max-[310px]:p-4">
          <h3 className="text-lg font-semibold text-[#129C9C] mb-6 max-[310px]:text-base">
            Notre localisation
          </h3>
          <motion.div
            className="h-88 rounded-md bg-[#FBFCFC] flex items-center justify-center text-center text-sm text-[#666666] max-[310px]:text-xs"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <div className="text-[#129C9C] inline-block">
                <MapPin size={24} />
              </div>
              <div>
                Lot II A 25 Bis, Ankadifotsy, Antananarivo 101, Madagascar
              </div>
            </div>
          </motion.div>
        </Card>
      </motion.section>
    </main>
  );
}
