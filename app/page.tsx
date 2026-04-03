'use client';
import Button from '@/components/ui/button';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircleIcon, CreditCardIcon, FileTextIcon, MonitorIcon, UsersIcon, ZapIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import imgHome from "./assets/Acceuil_Miranga.png"
import { motion } from "framer-motion"

// --- Hero Illustration ---
const HeroIllustration = () => {
  return (
    <img
      src={imgHome.src}
      alt="Illustration des services d'emploi Miranga"
      className="
        w-full h-[180px] sm:h-[250px] md:h-[400px] lg:h-[500px]
        -mt-10 md:-mt-20
        object-contain
        transition-all duration-500 ease-in-out
        hover:scale-[1.02]
        hero-img
      "
    />
  );
};
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
      staggerChildren: 0.6,
    },
  },
}
// --- Hero Section ---
const HeroSection = () => {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="pt-16 pb-24 md:pt-24 md:pb-32 bg-background fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">

        <div className="md:w-1/2">
          <h1 className="text-2xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-foreground w-full">
            <span className="text-primary">Déposez votre CV</span> et accédez aux meilleures opportunités
          </h1>

          <p className="text-sm xs:text-sm sm:text-lg md:text-lg lg:text-lg text-foreground/80 mb-8 max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl">
            Laissez-nous vous aider à trouver le poste idéal correspondant à vos compétences et aspirations professionnelles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              className="cursor-pointer w-full sm:w-50 px-6 h-auto py-3 rounded-full font-semibold shadow-lg shadow-primary/30
              max-[360px]:text-xs max-[360px]:px-3 max-[360px]:py-1.5"
              onClick={() => router.push("/depose-cv")}
            >
              Déposer mon CV
            </Button>

            <Button
              className="cursor-pointer w-full sm:w-50 px-6 h-auto py-3 rounded-full font-semibold transition-all !bg-[#E0F0F0] text-primary
              max-[360px]:text-xs max-[360px]:px-3 max-[360px]:py-1.5"
            >
              Voir plus
            </Button>
          </div>
        </div>

        <div className="md:w-1/2 w-full flex justify-center p-4">
          <HeroIllustration />
        </div>

      </div>
    </motion.section>

  );
};

// --- How It Works Section ---
const HowItWorksSection = () => (
  <motion.section
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="py-20 fade-in bg-foreground/4 -mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="!text-primary text-3xl font-bold mb-10 -mt-10">
        Comment ça marche
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Étape 1 */}
        <Card className="group shadow-md flex flex-col items-center p-8 border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl">
          <CardHeader className="items-center pb-0">
            <div className="flex justify-center mb-4">
              <FileTextIcon className="w-10 h-10 text-foreground transition-colors duration-300 group-hover:text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary card-title">
              Remplir le formulaire
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6 card-content">
            <p className="text-sm text-foreground/70 text-center">
              Remplissez le formulaire en quelques étapes simples et téléchargez votre CV.
            </p>
          </CardContent>
        </Card>

        {/* Étape 2 */}
        <Card className="group shadow-md flex flex-col items-center p-8 border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl">
          <CardHeader className="items-center pb-0">
            <div className="flex justify-center mb-4">
              <CreditCardIcon className="w-12 h-12 text-foreground transition-colors duration-300 group-hover:text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary card-title">
              Payer
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6 card-content">
            <p className="text-sm text-foreground/70 text-center">
              Effectuez le paiement de notre service Miranga en toute sécurité.
            </p>
          </CardContent>
        </Card>

        {/* Étape 3 */}
        <Card className="group shadow-md flex flex-col items-center p-8 border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl">
          <CardHeader className="items-center pb-0">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="w-10 h-10 text-foreground transition-colors duration-300 group-hover:text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary card-title">
              Recevoir confirmation
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6 card-content">
            <p className="text-sm text-foreground/70 text-center">
              Obtenez une confirmation immédiate et une planification avec nos experts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </motion.section>
);

// --- Why Choose Us Section ---
const WhyChooseUsSection = () => (
  <motion.section
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="py-20 fade-in mt-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-12 !text-primary -mt-15">
        Pourquoi nous choisir
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avantage 1 */}
        <Card className="bg-foreground/4 group shadow-lg flex flex-col items-center p-8 border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl">
          <ZapIcon className="w-10 h-10 text-foreground mb-4 transition-colors duration-300 group-hover:text-primary" />
          <CardTitle className="text-xl font-semibold mb-2 text-foreground transition-colors duration-300 group-hover:text-primary card-title">
            Processus simplifié
          </CardTitle>
          <CardContent className="p-0 pt-2 card-content">
            <p className="text-center text-sm text-foreground/70">
              Déposez votre CV en quelques clics seulement pour des démarches professionnelles rapides et fluides.
            </p>
          </CardContent>
        </Card>

        {/* Avantage 2 */}
        <Card className="bg-foreground/4 group shadow-lg flex flex-col items-center p-8 border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl">
          <UsersIcon className="w-10 h-10 text-foreground mb-4 transition-colors duration-300 group-hover:text-primary" />
          <CardTitle className="text-xl font-semibold mb-2 text-foreground transition-colors duration-300 group-hover:text-primary card-title">
            Réseau d'entreprises
          </CardTitle>
          <CardContent className="p-0 pt-2 card-content">
            <p className="text-center text-sm text-foreground/70">
              Accédez à notre vaste réseau d'entreprises partenaires pour des opportunités que vous ne trouvez pas ailleurs.
            </p>
          </CardContent>
        </Card>

        {/* Avantage 3 */}
        <Card className="bg-foreground/4 group shadow-lg flex flex-col items-center p-8 border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl">
          <MonitorIcon className="w-10 h-10 text-foreground mb-4 transition-colors duration-300 group-hover:text-primary" />
          <CardTitle className="text-xl font-semibold mb-2 text-foreground transition-colors duration-300 group-hover:text-primary card-title">
            Suivi personnalisé
          </CardTitle>
          <CardContent className="p-0 pt-2 card-content">
            <p className="text-center text-sm text-foreground/70">
              Bénéficiez d'un suivi, des retours et des conseils personnalisés avec des experts dédiés à votre réussite.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </motion.section>
);

// Call-to-Action Banner with title, text, and button navigating to /depose-cv
const CTABanner = () => {
  const router = useRouter();
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-20 bg-[#2F3333] text-white text-center fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl !text-white/80 md:text-4xl font-bold mb-6">
          Prêt à faire décoller votre carrière?
        </h2>
        <p className="text-lg text-white/80 mb-8">
          N'attendez plus, passez à la vitesse supérieure et trouvez de nouvelles opportunités professionnelles.
        </p>
        <Button
          className="
          cursor-pointer
          px-8 py-4 h-auto rounded-xl 
          font-bold bg-primary text-accent-foreground
          hover:bg-primary/90 transition-all 
          shadow-primary/40 animate-swing-in
          max-[360px]:text-xs max-[360px]:px-3 max-[360px]:py-2.5"
          onClick={() => router.push("/depose-cv")}
        >
          Déposer mon CV maintenant
        </Button>
      </div>
    </motion.section>
  );
};

// --- Page Home ---
export default function HomePage() {
  return (
    <>
      <div className="min-h-screen font-[var(--font-sans)] text-foreground">
        <main>
          <HeroSection />
          <HowItWorksSection />
          <WhyChooseUsSection />
          <CTABanner />
        </main>
      </div>
    </>
  );
}
