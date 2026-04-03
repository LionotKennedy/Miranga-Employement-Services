"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

import { TrendingUp, Users, CreditCard, CalendarDays, ChevronDown, BarChart3 } from "lucide-react"


// Data
const weeklyData = [
  { day: "Lun", candidatures: 14, paiements: 7 },
  { day: "Mar", candidatures: 7, paiements: 10 },
  { day: "Mer", candidatures: 21, paiements: 14 },
  { day: "Jeu", candidatures: 14, paiements: 21 },
  { day: "Ven", candidatures: 28, paiements: 14 },
  { day: "Sam", candidatures: 14, paiements: 7 },
  { day: "Dim", candidatures: 7, paiements: 7 },
]

const degreeData = [
  { name: "BEPC", value: 15 },
  { name: "BACC", value: 20 },
  { name: "LICENCE", value: 40 },
  { name: "MASTER", value: 15 },
  { name: "AUTRE", value: 10 },
]

const degreeColors = ["#dc3545", "#fd7e14", "#3a87ad", "#6f42c1", "#6c757d"]

const COLOR_CANDIDATURES = "#34495e"
const COLOR_PAIEMENTS_TOP = "#66cccc"
const COLOR_PAIEMENTS_BOTTOM = "#339999"

// Variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const pulseVariants = { pulse: { scale: [1, 1.02, 1], transition: { duration: 2, repeat: Infinity, repeatType: "loop" as const } } }
const floatVariants = { float: { y: [0, -8, 0], transition: { duration: 3, repeat: Infinity, repeatType: "loop" as const } } }

// Main Component
export default function AdminDashboardPage() {
  const [activePeriod, setActivePeriod] = useState("Semaine")
  const [selectedDays, setSelectedDays] = useState("7 derniers jours")
  const [showDropdown, setShowDropdown] = useState(false)
  const maxValue = Math.max(...weeklyData.flatMap((d) => [d.candidatures, d.paiements]))
  const dayOptions = ["7 derniers jours", "14 derniers jours", "30 derniers jours", "90 derniers jours"]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="space-y-6 p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 !text-teal-600 text-balance">Tableau de bord</h1>
          <p className="text-sm sm:text-base text-gray-600 text-balance">Bienvenue dans votre espace d'administration</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {["Semaine", "Mois", "Année"].map((period) => (
            <motion.button
              key={period}
              onClick={() => setActivePeriod(period)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 sm:px-4 py-2 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activePeriod === period ? "bg-teal-600 text-white shadow-md" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {period}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <KPICard title="Total Candidatures" value="1,254" change="+12%" changeLabel="depuis le mois dernier" icon={<Users className="w-5 h-5" />} accentColor="border-l-4 border-l-teal-600" bgColor="bg-white" textColor="text-green-600" iconColor="text-teal-600" changeNegative={false} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard title="Paiements Réussis" value="1,012" change="+5%" changeLabel="depuis le mois dernier" icon={<CreditCard className="w-5 h-5" />} accentColor="border-l-4 border-l-blue-600" bgColor="bg-white" textColor="text-green-600" iconColor="text-blue-600" changeNegative={false} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard title="Taux de Conversion" value="80.7%" change="+2%" changeLabel="depuis le mois dernier" icon={<TrendingUp className="w-5 h-5" />} accentColor="border-l-4 border-l-violet-600" bgColor="bg-white" textColor="text-green-600" iconColor="text-violet-600" changeNegative={false} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <motion.div animate="pulse" variants={pulseVariants}>
            <KPICard title="Candidatures ce mois" value="106" change="-5%" changeLabel="depuis le mois dernier" icon={<CalendarDays className="w-5 h-5" />} accentColor="border-l-4 border-l-amber-600" bgColor="bg-white" textColor="text-red-600" iconColor="text-amber-600" changeNegative={true} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyActivityChart weeklyData={weeklyData} maxValue={maxValue} selectedDays={selectedDays} setSelectedDays={setSelectedDays} showDropdown={showDropdown} setShowDropdown={setShowDropdown} dayOptions={dayOptions} floatVariants={floatVariants} />
        <RecentApplications />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DegreeDistribution degreeData={degreeData} degreeColors={degreeColors} />
        <TasksCard />
      </div>
    </motion.div>
  )
}

// KPI Card Component
interface KPICardProps {
  title: string
  value: string
  change: string
  changeLabel: string
  icon: React.ReactNode
  accentColor: string
  bgColor: string
  textColor: string
  iconColor: string
  changeNegative: boolean
}

function KPICard({ title, value, change, changeLabel, icon, accentColor, bgColor, textColor, iconColor }: KPICardProps) {
  const parts = changeLabel.split(" ")
  const firstLine = parts.slice(0, 3).join(" ")
  const secondLine = parts.slice(3).join(" ")

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }} className="group">
      <Card className={`${accentColor} ${bgColor} shadow-sm transition-all duration-300 cursor-pointer min-h-[140px] flex`}>
        <CardContent className="pt-6 flex-1 flex items-start">
          <div className="flex items-start justify-between gap-3 flex-1">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 whitespace-nowrap">{title}</p>
              <motion.h3 className="text-2xl sm:text-3xl font-bold text-gray-800 whitespace-nowrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                {value}
              </motion.h3>
              <div className="flex items-start gap-1 mt-2">
                <motion.div className={`text-xs sm:text-sm font-semibold ${textColor}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3, type: "spring" }}>
                  {change}
                </motion.div>
                <div className="text-[9px] sm:text-[10px] text-gray-500 font-medium leading-tight">
                  <div>{firstLine}</div>
                  <div>{secondLine}</div>
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.3, rotate: 15 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className={`${iconColor} bg-gray-100 p-2 rounded-full cursor-pointer flex-shrink-0`}>
              {icon}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Weekly Activity Chart Component
interface WeeklyActivityChartProps {
  weeklyData: typeof weeklyData
  maxValue: number
  selectedDays: string
  setSelectedDays: (days: string) => void
  showDropdown: boolean
  setShowDropdown: (show: boolean) => void
  dayOptions: string[]
  floatVariants: typeof floatVariants
}

function WeeklyActivityChart({ weeklyData, maxValue, selectedDays, setSelectedDays, showDropdown, setShowDropdown, dayOptions, floatVariants }: WeeklyActivityChartProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-2">
      <motion.div animate="float" variants={floatVariants}>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
            <div className="min-w-0">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-balance">
                <BarChart3 className="w-4 h-4" />
                Activité hebdomadaire
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500 text-balance">Suivi des candidatures et paiements</CardDescription>
            </div>
            <div className="relative flex-shrink-0">
              <motion.button onClick={() => setShowDropdown(!showDropdown)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                {selectedDays}
                <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
              </motion.button>
              {showDropdown && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {dayOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedDays(option)
                        setShowDropdown(false)
                      }}
                      className={`block w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        selectedDays === option ? "bg-teal-50 text-teal-700 font-medium" : ""
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </CardHeader>
          <CardContent className="max-[310px]:p-2">
            <div className="space-y-4 max-[310px]:space-y-2">
              <div className="relative flex items-end justify-between gap-1 max-[310px]:gap-0 h-48 lg:h-72 p-2 lg:p-4 bg-white rounded-lg border max-[310px]:h-40">
                {weeklyData.map((data, i) => (
                  <motion.div key={data.day} className="flex flex-col items-center gap-1 flex-1 z-20 max-[310px]:gap-0.5" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    <div className="flex gap-0.5 items-end h-40 relative w-full justify-center max-[310px]:gap-0 max-[310px]:h-32">
                      <motion.div
                        className="rounded-t shadow-md cursor-pointer max-[310px]:w-[12px]"
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.candidatures / maxValue) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                        whileHover={{ scaleY: 1.05, filter: "brightness(1.2)" }}
                        whileTap={{ scaleY: 0.95 }}
                        style={{ width: "12px", backgroundColor: COLOR_CANDIDATURES }}
                      />
                      <motion.div
                        className="rounded-t shadow-md cursor-pointer max-[310px]:w-[12px]"
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.paiements / maxValue) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                        whileHover={{ scaleY: 1.05, filter: "brightness(1.2)" }}
                        whileTap={{ scaleY: 0.95 }}
                        style={{ width: "12px", background: `linear-gradient(to top, ${COLOR_PAIEMENTS_BOTTOM}, ${COLOR_PAIEMENTS_TOP})` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 max-[310px]:text-[10px]">{data.day}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-4 text-xs justify-center max-[310px]:gap-2 max-[310px]:text-[10px]">
                <div className="flex items-center gap-1 max-[310px]:gap-0.5">
                  <div className="w-2 h-2 bg-[#34495e] rounded border border-gray-300 max-[310px]:w-1.5 max-[310px]:h-1.5" />
                  <span>Candidatures</span>
                </div>
                <div className="flex items-center gap-1 max-[310px]:gap-0.5">
                  <div className="w-2 h-2 border border-gray-300 max-[310px]:w-1.5 max-[310px]:h-1.5" style={{ background: `linear-gradient(to top, ${COLOR_PAIEMENTS_BOTTOM}, ${COLOR_PAIEMENTS_TOP})`, borderRadius: "2px" }} />
                  <span>Paiements</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

// Recent Applications Component
function RecentApplications() {
  const applications = [
    { initials: "SM", name: "Sophie Martin", role: "MASTER", specialization: "Informatique", date: "14/10/2023", status: "Payé" },
    { initials: "TD", name: "Thomas Dubois", role: "LICENCE", specialization: "Marketing", date: "14/10/2023", status: "En attente" },
    { initials: "EL", name: "Emma Lefebvre", role: "BACC", specialization: "Commerce", date: "14/10/2023", status: "Payé" },
    { initials: "LB", name: "Lucas Bernard", role: "MASTER", specialization: "Droit", date: "14/10/2023", status: "Payé" },
  ]

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold">Candidatures récentes</CardTitle>
            <div className="text-xs sm:text-sm text-teal-700 font-medium flex items-center gap-1 flex-shrink-0">4 nouveaux</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {applications.map((item, i) => (
            <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ x: 5, backgroundColor: "rgba(0, 0, 0, 0.02)" }}>
              <RecentApplicationItem {...item} />
            </motion.div>
          ))}
        </CardContent>
        <div className="px-6 pb-6">
          <Button className="mx-auto mt-4 bg-transparent hover:bg-teal-50 text-teal-700 font-medium cursor-pointer text-xs sm:text-sm max-[360px]:text-xs max-[360px]:px-3 max-[360px]:py-1.5">
            Voir toutes les candidatures →
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

// Recent Application Item
interface RecentApplicationItemProps {
  initials: string
  name: string
  role: string
  specialization: string
  date: string
  status: string
}

function RecentApplicationItem({ initials, name, role, specialization, date, status }: RecentApplicationItemProps) {
  const statusColor = status === "Payé" ? "bg-[#79d2c0] text-gray-800" : status === "En attente" ? "bg-[#ffc107] text-gray-800" : "bg-gray-100 text-gray-700"

  return (
    <motion.div className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0 px-2 py-1 rounded" whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}>
      <motion.div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0" whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400 }}>
        {initials}
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-xs sm:text-sm text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-500 truncate">{role} • {specialization}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="flex-shrink-0">
        <Badge className={`${statusColor} text-xs font-medium border border-transparent`}>{status}</Badge>
      </motion.div>
    </motion.div>
  )
}

// Degree Distribution Component
interface DegreeDistributionProps {
  degreeData: typeof degreeData
  degreeColors: typeof degreeColors
}

function DegreeDistribution({ degreeData, degreeColors }: DegreeDistributionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-semibold">Répartition par diplôme</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-500">Distribution des candidats par niveau d'étude</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {degreeData.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 + index * 0.15 }}
                className="space-y-1 p-2 rounded-lg transition-all duration-300 cursor-pointer"
                whileHover={{ y: -3, boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">{item.value}%</span>
                </div>
                <motion.div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden" whileHover={{ scaleY: 1.5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <motion.div
                    className="h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + index * 0.15 }}
                    style={{ backgroundColor: degreeColors[index % degreeColors.length] }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Tasks Card Component
function TasksCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-semibold">Tâches en cours</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TaskList />
      </CardContent>
    </Card>
  )
}

// Task List Component
function TaskList() {
  const [tasks, setTasks] = useState([
    { label: "Vérifier les nouvelles candidatures", priority: "Urgent", priorityColor: "bg-[#ffdddd] text-[#dc3545]", completed: false },
    { label: "Contacter les candidats en attente", priority: "Important", priorityColor: "bg-[#fff3cd] text-[#ffc107]", completed: false },
    { label: "Préparer le rapport mensuel", priority: "Cette semaine", priorityColor: "bg-[#ddf7f5] text-[#20c997]", completed: false },
    { label: "Mettre à jour les offres d'emploi", priority: "Plus tard", priorityColor: "bg-[#f8f9fa] text-[#6c757d]", completed: false },
  ])

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, i) => (
        <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-b-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(i)} className="border-gray-400 flex-shrink-0" />
            <span className={`text-xs sm:text-sm font-medium truncate ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{task.label}</span>
          </div>
          <Badge className={`${task.priorityColor} text-xs font-medium border border-transparent flex-shrink-0 ml-2`}>{task.priority}</Badge>
        </div>
      ))}
      <Button className="w-full mt-4 bg-transparent hover:bg-teal-50 text-teal-700 font-medium border border-teal-700 cursor-pointer text-xs sm:text-sm max-[360px]:text-xs max-[360px]:px-3 max-[360px]:py-1.5">
        Ajouter une tâche +
      </Button>
    </div>
  )
}