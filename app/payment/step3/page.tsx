
"use client"
import "./page.css"

import Button from "@/components/ui/button"
import Card, { CardContent } from "@/components/ui/card"
import { CheckCircle, Copy, FileText} from "lucide-react"
import { useRouter } from "next/navigation"
import payement3 from "../../assets/Payement3.png"

export default function PaymentStep3Page() {
  const router = useRouter()
  return (
    // === Main container ===
    // Fade-in animation when the page loads
    <div className="min-h-[calc(100vh-4rem)] bg-[#FBFCFC] flex flex-col items-center justify-center py-8 md:py-12 animate-fade-in fill-mode-forwards">
      {/* === Main layout section === */}
      {/* Two columns: image on the left + confirmation card on the right */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full max-w-5xl px-3 sm:px-6">
        {/* === Floating illustration === */}
        {/* The image slides in from the left and floats up and down infinitely */}
        <div className="flex-1 flex justify-center items-center animate-slide-in-left delay-100 fill-mode-forwards animate-float">
          <img
            src={payement3.src}
            alt="Paiement confirmé"
            className="w-48 sm:w-70 md:w-64 lg:w-96 h-auto object-contain animate-float"
          />
        </div>

        {/* === Confirmation card section === */}
        {/* The entire card slides in from the right */}
        <div className="flex-1 w-full animate-slide-in-right delay-200 fill-mode-forwards">
          <div className="!shadow-none !border-none !bg-none">
            <CardContent className="p-4 sm:p-8">
              {/* === Header: fades in from the bottom === */}
              {/* Contains success icon, title, and short confirmation message */}
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6 animate-fade-in-up delay-400">
                {/* L'icône peut pulser légèrement */}
                <CheckCircle
                  size={28}
                  className="sm:w-9 sm:h-9 text-[var(--color-primary)] mb-2 animate-pulse-subtle"
                />
                <h2 className="text-base sm:!text-lg max-w-full sm:w-80 !text-primary font-semibold px-2">
                  Merci, votre candidature est enregistrée
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3 px-2">
                  Votre CV a été soumis avec succès et votre paiement a été confirmé.
                </p>
              </div>

              {/* === Tracking information card === */}
              {/* Fades in from below with a short delay */}
              <div className="bg-[#F8FAFA] rounded-xl p-4 sm:p-6 text-xs sm:text-sm text-gray-700 animate-fade-in-up delay-600">
                <h3 className="text-[var(--color-primary)] font-medium mb-2 sm:mb-3 items-center text-center">
                  Informations de suivi
                </h3>
                <div className="text-center -mt-2">
                  <p className="text-gray-600 text-xs">Identifiant unique</p>
                  <div className="flex gap-2 justify-center font-medium py-1 text-xs sm:text-sm">
                    <span className="text-primary">MJA-483838-514</span>
                    <Copy size={14} className="text-gray-500 mt-1 sm:mt-2 cursor-pointer flex-shrink-0" />
                  </div>
                  <p className="max-w-full sm:w-80 !text-xs pt-2 px-2">
                    Conservez cet identifiant pour suivre votre candidature
                  </p>
                </div>

                {/* Payment details section */}
                <div className="flex flex-row justify-between gap-4 sm:gap-25 text-xs pt-4 sm:pt-5 text-gray-600">
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <p className="mb-1">Statut</p>
                      <div className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-primary font-bold" />
                        <p className="text-primary font-medium">Payé</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-1">Téléphone</p>
                      <p className="font-medium">034 610 83 39</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:gap-6">
                    <div>
                      <p className="mb-1">Méthode</p>
                      <p>Orange Money</p>
                    </div>
                    <div>
                      <p className="mb-1">Montant</p>
                      <p className="font-medium">20,000 Ar</p>
                    </div>
                  </div>
                </div>
                <div className="border mb-3 mt-3"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 !text-xs">
                  <p className="text-gray-600">N° de transaction</p>
                  <p className="font-medium break-all">0101537888668</p>
                </div>
              </div>

              {/* === Next steps section === */}
              {/* Appears after the tracking info */}
              <Card className="!bg-[#F8FAFA] border-none shadow-none mt-4 sm:mt-5 mx-auto animate-fade-in-up delay-800">
                <CardContent className="p-3 sm:p-4 text-center text-xs !text-chart-1">
                  <p className="font-semibold pt-3 sm:pt-4 pb-2 sm:pb-3">Que se passe-t-il maintenant ?</p>
                  <p className="max-w-full px-2 sm:pl-5">
                    Notre équipe va examiner votre CV et le transmettre à nos partenaires correspondant à votre profil.
                    Vous serez contacté directement par email ou téléphone si votre profil correspond à une offre
                    d'emploi.
                  </p>
                </CardContent>
              </Card>

              {/* === Action buttons === */}
              {/* Fades in last with slight delay */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-5 animate-fade-in-up delay-1000">
                <Button
                  className="bg-[var(--color-primary)] text-white rounded-lg px-4 sm:px-6 
                  !text-xs sm:!text-sm w-full sm:w-50
                  max-[310px]:text-xs max-[310px]:px-3 max-[310px]:py-1.5 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  Retour à l'accueil
                </Button>
                <Button className="bg-blue-100 text-primary rounded-lg px-4 sm:px-6 !text-xs 
                sm:!text-sm w-full sm:w-50 flex items-center justify-center
                max-[310px]:text-xs max-[310px]:px-3 max-[310px]:py-1.5 cursor-pointer">
                  <FileText size={15} className="text-primary" />
                  <span className="pl-2">Imprimer reçu</span>
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  )
}
