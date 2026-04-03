export const routes = {
  public: [
    { href: "/", label: "Accueil" },
    { href: "/depose-cv", label: "Déposer CV" },
    { href: "/contact", label: "Contact" },
  ],
  admin: [
    { href: "/login", label: "Connexion" },
    { href: "/forgotPassword", label: "forgotPassword" },
    { href: "/admin/dashboards", label: "Dashboard" },
    { href: "/admin/candidatures", label: "Candidatures" },
    { href: "/admin/payments", label: "Paiements" },
    { href: "/admin/settings", label: "Paramètres" },
  ],
  payment: [
    { href: "/payment/step1", label: "Étape 1" },
    { href: "/payment/step2", label: "Étape 2" },
    { href: "/payment/step3", label: "Étape 3" },
  ],
} as const

export type Route = {
  href: string
  label: string
}
