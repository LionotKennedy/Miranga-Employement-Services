"use client"

import Button from "@/components/ui/button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation"
import { useState } from "react"
import payement1 from "../../assets/Payement1.png"


export default function PaymentStep1Page() {
  const [selectedMethod, setSelectedMethod] = useState("")
   const router = useRouter()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FBFCFC] font-sans text-[#666666]">
      {/* Progress steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 animate-fade-in">
          <Step number={1} label="Sélection" active />
          <div className="flex-1 h-0.5 bg-gray-300 rounded animate-expand" />
          <Step number={2} label="Paiement" />
          <div className="flex-1 h-0.5 bg-gray-300 rounded" />
          <Step number={3} label="Confirmation" />
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-start">
          {/* Left column */}
          <div className="space-y-8 animate-slide-in-left pl-10">
            <h1 className="text-primary !text-xl md:text-[31px] font-bold">Choisissez votre méthode de paiement</h1>

            <Card className="max-w-sm w-full bg-gray-100 border-none shadow-none transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="!text-base text-primary font-semibold">Détails du service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Dépôt de CV et traitement de candidature</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-[#666666]">Montant</span>
                  <span className="text-primary font-semibold text-lg animate-pulse-subtle">20,000 Ar</span>
                </div>
              </CardContent>
            </Card>

            {/* Image d'illustration */}
            <div className="mt-6 max-w-sm animate-float">
              <img src={payement1.src}
               alt="Illustration du paiement" 
               className="w-full h-auto" 
               />
            </div>
          </div>

          {/* Right column - form */}
          <aside className="animate-slide-in-right pl-12">
            <h3 className="text-primary !text-base md:text-lg font-semibold mb-4">
              Choisissez votre méthode de paiement
            </h3>
            <form className="space-y-4 max-w-sm w-full">
              <RadioItem
                label="Orange Money"
                name="method"
                selected={selectedMethod === "orange"}
                onClick={() => setSelectedMethod("orange")}
                delay="100"
              />
              <RadioItem
                label="Mvola"
                name="method"
                selected={selectedMethod === "mvola"}
                onClick={() => setSelectedMethod("mvola")}
                delay="200"
              />
              <RadioItem
                label="Airtel Money"
                name="method"
                selected={selectedMethod === "airtel"}
                onClick={() => setSelectedMethod("airtel")}
                delay="300"
              />

              <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <label className="block text-sm text-[#666666] mb-2">Numéro de téléphone</label>
                <Input
                  placeholder="Ex: 034 00 000 00"
                  className="placeholder-gray-300 focus-visible:ring-[#129C9C] transition-all duration-300 focus:scale-[1.02]"
                />
                <p className="text-xs text-gray-400 mt-2">Entrez le numéro associé à votre compte Mobile Money</p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <Button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-[6px] 
                  bg-[#129C9C] text-white py-3 px-4 shadow-lg hover:shadow-xl 
                  hover:scale-105 active:scale-95 transition-all duration-300 group
                  max-[360px]:text-xs max-[360px]:px-3 max-[360px]:py-2.5 cursor-pointer"
                   onClick={() => router.push("/payment/step2")}
                >
                  Continuer
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M12 5l7 7-7 7"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>

              <p
                className="text-xs text-gray-400 flex items-start gap-2 animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zM10.5 16l6-6"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Paiement sécurisé - Votre CV sera validé après confirmation du paiement
              </p>
            </form>
          </aside>
        </div>
      </main>
    </div>
  )
}

function Step({ number, label, active }: { number: number; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center transition-all duration-500 hover:scale-110">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
          active
            ? "bg-[#129C9C] text-white shadow-lg scale-110"
            : "bg-white border border-gray-200 text-gray-500 hover:border-[#129C9C]"
        }`}
      >
        <span className="font-semibold">{number}</span>
      </div>
      <span className="text-[10px] sm:text-xs">{label}</span>
    </div>
  )
}

function RadioItem({
  label,
  name,
  selected,
  onClick,
  delay,
}: {
  label: string
  name: string
  selected?: boolean
  onClick?: () => void
  delay?: string
}) {
  return (
    <label
      className="block border border-gray-200 rounded-md p-3 cursor-pointer hover:shadow-md hover:border-[#129C9C] hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <input
          type="radio"
          name={name}
          checked={selected}
          onChange={() => {}}
          className="h-4 w-4 text-[#129C9C] focus:ring-[#129C9C] transition-all duration-200"
        />
        <span className="text-sm">{label}</span>
      </div>
    </label>
  )
}
