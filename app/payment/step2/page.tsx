"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CreditCard, Smartphone, CheckCircle2, AlertCircle } from "lucide-react"
import payement2 from "../../assets/Payement2.png"

export default function PaymentStep2Page() {
  const router = useRouter()
  const [transactionNumber, setTransactionNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment validation
    console.log("Transaction number:", transactionNumber)
    // Redirect to payment step 3
    router.push("/payment/step3")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FBFCFC] font-sans text-[#666666]">
      {/* Progress Stepper */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-border"
      >
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 animate-fade-in">
            <Step number={1} label="Sélection" active />
            <div className="flex-1 h-0.5 bg-primary rounded animate-expand" />
            <Step number={2} label="Paiement" active />
            <div className="flex-1 h-0.5 bg-gray-300 rounded" />
            <Step number={3} label="Confirmation" />
          </div>
        </section>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6 sm:mb-8 lg:mb-12"
        >
          <span className="text-primary">Effectuez le paiement</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Service Details & Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Service Details Card */}
            <div className="bg-white rounded-xl shadow-md border border-border p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4 sm:mb-6">
                <span className="text-primary">Détails du service</span>
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Service</p>
                  <p className="text-sm sm:text-base text-foreground">Dépôt de CV et traitement de candidature</p>
                </div>

                <div className="flex items-end justify-between pt-3 sm:pt-4 border-t border-border">
                  <span className="text-xs sm:text-sm text-muted-foreground">Montant</span>
                  <span className="text-2xl sm:text-3xl font-bold text-primary">20,000 Ar</span>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="max-w-xs sm:max-w-sm lg:max-w-md animate-float">
                <img
                //   src="/mobile-payment-illustration-with-smartphone-and-mo.jpg"
                src={payement2.src}
                  alt="Illustration du paiement"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Orange Money Instructions */}
            <div className="bg-white rounded-xl shadow-md border border-border p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className="text-base sm:text-lg text-primary font-semibold">Orange Money</h3>
                <span className="text-xs sm:text-sm text-primary font-medium cursor-pointer hover:underline">
                  - Instructions
                </span>
              </div>

              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>Composez *144# sur votre téléphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>Sélectionnez l'option 1 "Envoyer de l'argent"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>Entrez le numéro 034 00 000 00</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>Entrez le montant: 20,000 Ar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>Entrez votre code secret</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>Notez le numéro de transaction qui s'affiche</span>
                </li>
              </ul>
            </div>

            {/* Alert Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-accent/10 border border-accent/30 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-accent">
                Après avoir effectué le paiement, vous recevrez un numéro de transaction par SMS. Veuillez saisir ce
                numéro ci-dessous pour valider votre dépôt de CV.
              </p>
            </motion.div>

            {/* Transaction Number Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-border p-4 sm:p-6">
              <label
                htmlFor="transaction"
                className="block text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3"
              >
                Numéro de transaction
              </label>

              <input
                id="transaction"
                type="text"
                placeholder="Ex: TR123456789"
                value={transactionNumber}
                onChange={(e) => setTransactionNumber(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring transition-all duration-300 placeholder:text-muted-foreground mb-2"
              />

              <p className="text-xs text-muted-foreground mb-4 sm:mb-6">Entrez le numéro de transaction reçu par SMS</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  className="flex-1 text-primary px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base 
                  rounded-lg border-2 border-border bg-primary/10 font-medium hover:bg-primary/20 
                  transition-all duration-300 cursor-pointer
                  max-[310px]:text-xs max-[310px]:px-3 max-[310px]:py-1.5"
                  onClick={() => router.push("/payment/step1")}
                >
                  Retour
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-primary 
                  text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 flex items-center 
                  justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer
                  max-[310px]:text-xs max-[310px]:px-3 max-[310px]:py-1.5"
                >
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  Valider le paiement
                </button>
              </div>

              {/* Security Note */}
              <div className="flex items-start gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Paiement sécurisé - Votre CV sera validé après confirmation du paiement
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Step({ number, label, active }: { number: number; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center transition-all duration-500 hover:scale-110">
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 transition-all duration-500 ${
          active
            ? "bg-[#129C9C] text-white shadow-lg scale-110"
            : "bg-white border border-gray-200 text-gray-500 hover:border-[#129C9C]"
        }`}
      >
        <span className="font-semibold text-xs sm:text-base">{number}</span>
      </div>
      <span className="text-[10px] sm:text-xs">{label}</span>
    </div>
  )
}
