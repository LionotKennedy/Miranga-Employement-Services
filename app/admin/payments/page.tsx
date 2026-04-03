"use client"

import { useState } from "react"
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Button from "@/components/ui/button"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js"
import { motion } from "framer-motion"
import data from "./data.json"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function AdminPaymentsPage() {
  const [payments] = useState(data.payments)
  const [stats] = useState(data.stats)
  const [active, setActive] = useState<"prev" | "next" | null>(null)

  const total = stats.reduce((sum, s) => sum + s.value, 0)
  const successRate = ((stats[0].value / total) * 100).toFixed(0)
  const failedRate = ((stats[1].value / total) * 100).toFixed(0)

  const chartData = {
    labels: stats.map((s) => s.name),
    datasets: [
      {
        data: stats.map((s) => s.value),
        backgroundColor: stats.map((s) => s.color),
        borderColor: "#fff",
        borderWidth: 3
      }
    ]
  }

  // Configuration du graphique (plein + position du rouge en bas)
  const chartOptions: ChartOptions<"pie"> = {
    rotation: 180,
    animation: {
      animateRotate: true,
      duration: 1500,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed} paiements`,
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="p-4 space-y-2 space-x-4">
      {/* Titre principal */}
      <header>
        <h1 className="text-2xl font-bold !text-[#129C9C]">Paiements</h1>
        <p className="text-muted-foreground">Suivi des paiements des candidats</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bloc Historique */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Historique des paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr className="text-sm text-gray-600">
                    <th className="py-2 px-3">Candidat</th>
                    <th className="py-2 px-3">Montant</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50 text-sm">
                      <td className="py-3 px-3">{p.candidate}</td>
                      <td className="px-3">{p.amount}</td>
                      <td className="px-3">{p.date}</td>
                      <td className="px-3">{p.trx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <p>Affichage de {payments.length} paiements</p>
              <div className="flex items-center gap-2">
                {/* Bouton précédent */}
                <Button
                  onClick={() => setActive("prev")}
                  size="sm"
                  className={`transition-colors duration-300 border-none cursor-pointer ${active === "prev"
                      ? "bg-[#129C9C] text-white"
                      : "bg-white text-[#129C9C]"
                    }`}
                >
                  &lt;
                </Button>

                {/* Page actuelle */}
                <Button
                  size="sm"
                  className="bg-[#129C9C] text-white border-none hover:opacity-90 cursor-pointer"
                >
                  1
                </Button>

                {/* Bouton suivant */}
                <Button
                  onClick={() => setActive("next")}
                  size="sm"
                  className={`transition-colors duration-300 border-none cursor-pointer ${active === "next"
                      ? "bg-[#129C9C] text-white"
                      : "bg-white text-[#129C9C]"
                    }`}
                >
                  &gt;
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Bloc Statut des paiements */}
        <Card>
          <CardHeader>
            <CardTitle>Statut des paiements</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center relative">
            <div className="relative flex items-center justify-center w-full">
              {/* Texte en haut à gauche - ESPACE AJOUTÉ */}
              <div className="absolute top-0 left-0 text-left 
                            mb-4 sm:mb-6 md:mb-8 
                            ml-0 sm:ml-2 md:ml-4">
                <span className="text-[#129C9C] text-sm font-medium">
                  Paiements réussis {successRate}%
                </span>
              </div>

              {/* Animation + Chart - TAILLE RESPONSIVE */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 0.9, opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="relative 
                          w-[200px] h-[200px] 
                          sm:w-[230px] sm:h-[230px] 
                          md:w-[250px] md:h-[250px] 
                          lg:w-[270px] lg:h-[270px]
                          mx-4 sm:mx-6 md:mx-8" // Espace horizontal ajouté
              >
                <Pie data={chartData} options={chartOptions} />
              </motion.div>

              {/* Texte en bas à droite - ESPACE AJOUTÉ */}
              <div className="absolute bottom-0 right-0 text-right 
                            mt-4 sm:mt-6 md:mt-8 
                            mr-0 sm:mr-2 md:mr-4">
                <span className="text-[#F87171] text-sm font-medium">
                  Paiements échoués {failedRate}%
                </span>
              </div>
            </div>

            {/* Légende SANS IMAGES - AVEC CARRÉS COLORÉS */}
            <div className="absolute bottom-50 left-6 space-y-3">
              <div className="flex items-center gap-3">
                {/* Carré bleu pour succès */}
                <div className="w-5 h-5 bg-[#129C9C] rounded-sm border-2 border-white shadow-sm"></div>
                <span className="text-sm font-bold text-[#129C9C]">Paiements Réussis</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Carré rouge pour échec */}
                <div className="w-5 h-5 bg-[#F87171] rounded-sm border-2 border-white shadow-sm"></div>
                <span className="text-sm font-bold text-[#F87171]">Paiements Échoués</span>
              </div>
            </div>

            {/* BOÎTES CHIFFRES */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 
                            [&:nth-child(1)]:col-span-2 
                            max-sm:grid-cols-1 w-full mt-35 relative">
              <div className="bg-[#E6F6F6] rounded-xl p-4 text-center">
                <p className="text-xs text-gray-600">Paiements Réussis</p>
                <p className="text-2xl font-bold text-[#129C9C]">{stats[0].value}</p>
              </div>
              <div className="bg-[#FEECEC] rounded-xl p-4 text-center">
                <p className="text-xs text-gray-600">Paiements Échoués</p>
                <p className="text-2xl font-bold text-[#F87171]">{stats[1].value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}