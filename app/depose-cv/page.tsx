"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { useRouter } from "next/navigation"
export default function DeposeCVPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    genre: "",
    nationalite: "",
    niveauDiplome: "",
    categorie: "",
    sousCategorie: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData, selectedFile)
    // Redirect to payment step 1
    router.push("/payment/step1")
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const ,
      },
    },
  }
  return (
    // <div className="min-h-screen bg-background py-12 px-4">
    <div className="min-h-[calc(100vh-4rem)] bg-[#FBFCFC]">
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-primary mb-3">Déposer votre CV</h1>
          <p className="text-foreground text-base leading-relaxed">
            Nous travaillons avec plusieurs entreprises et transmettons votre CV aux recruteurs adaptés à votre profil.
          </p>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations personnelles */}
          <motion.section variants={itemVariants}>
            <h2 className="text-primary mb-6">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
                placeholder="Votre nom"
              />
              <Input
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
                placeholder="Votre prénom"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="votre.email@exemple.com"
              />
              <Input
                label="Téléphone"
                name="telephone"
                type="tel"
                value={formData.telephone}
                onChange={handleInputChange}
                required
                placeholder="+33 6 12 34 56 78"
              />
              <div className="w-full">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date de naissance <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring transition-all duration-300"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Genre <span className="text-destructive">*</span>
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Sélectionner</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="w-full md:col-span-2">
                <Input
                  label="Nationalité"
                  name="nationalite"
                  value={formData.nationalite}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre nationalité"
                />
              </div>
            </div>
          </motion.section>
          {/* Formation et profession */}
          <motion.section variants={itemVariants}>
            <h2 className="text-primary mb-6">Formation et profession</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Niveau de diplôme <span className="text-destructive">*</span>
                </label>
                <select
                  name="niveauDiplome"
                  value={formData.niveauDiplome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Sélectionner</option>
                  <option value="bac">Baccalauréat</option>
                  <option value="bac+2">Bac +2</option>
                  <option value="bac+3">Bac +3 (Licence)</option>
                  <option value="bac+5">Bac +5 (Master)</option>
                  <option value="doctorat">Doctorat</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Catégorie <span className="text-destructive">*</span>
                </label>
                <select
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Sélectionner</option>
                  <option value="informatique">Informatique</option>
                  <option value="commerce">Commerce</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="rh">Ressources Humaines</option>
                </select>
              </div>
              <div className="w-full md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sous-catégorie <span className="text-destructive">*</span>
                </label>
                <select
                  name="sousCategorie"
                  value={formData.sousCategorie}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Sélectionner</option>
                  <option value="developpement">Développement</option>
                  <option value="design">Design</option>
                  <option value="gestion">Gestion de projet</option>
                  <option value="analyse">Analyse de données</option>
                </select>
              </div>
            </div>
          </motion.section>
          {/* Téléchargement du CV */}
          <motion.section variants={itemVariants}>
            <h2 className="text-primary mb-6">Téléchargement du CV</h2>
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-primary font-medium mb-2">Cliquez pour télécharger votre CV</p>
                <p className="text-sm text-muted-foreground">Formats acceptés: PDF, DOC, DOCX (max 5MB)</p>
                {selectedFile && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-sm text-primary font-medium"
                  >
                    Fichier sélectionné: {selectedFile.name}
                  </motion.p>
                )}
              </motion.div>
            </div>
            <label
              htmlFor="cv-upload"
              className="inline-block mt-4 px-6 py-2 bg-secondary text-secondary-foreground rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300"
            >
              Parcourir
            </label>
          </motion.section>
          {/* Submit Button */}
          <motion.div variants={itemVariants} className="flex justify-center pt-4">
            <Button type="submit" variant="primary" size="lg" className="min-w-[200px] cursor-pointer
             max-[360px]:text-xs max-[360px]:px-3 max-[360px]:py-2.5">
              Soumettre
            </Button>
          </motion.div>
          {/* Privacy Notice */}
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground text-center leading-relaxed">
            En soumettant ce formulaire, vous acceptez nos conditions d'utilisation et notre politique de
            confidentialité.
          </motion.p>
        </form>
      </motion.div>
    </div>
  )
}
