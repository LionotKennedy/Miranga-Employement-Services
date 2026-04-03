"use client";

import { useMemo, useState } from "react";
import type { ReactElement } from "react";
import { Download, Trash2, Search, Filter, Users, Clock, CheckCircle } from "lucide-react";
import Button from "@/components/ui/button";
import data from "./data.json";

// --- Interfaces ---
interface Candidate {
  nom: string;
  prenom: string;
  diplome: string;
  categorie: string;
  sousCategorie: string;
  payment: string;
  date: string;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  iconBgColor: string;
  iconTextColor: string;
  cardBgColor: string;
}

// --- Composant StatCard ---
const MockupStatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, iconBgColor, iconTextColor, cardBgColor }) => (
  <div className={`flex items-center p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 ${cardBgColor}`}>
    <div className={`flex items-center justify-center p-2 sm:p-3 rounded-full ${iconBgColor} ${iconTextColor} mr-3 sm:mr-4`}>
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
    </div>
    <div className="flex flex-col min-w-0">
      <p className="text-xs sm:text-sm text-gray-500 truncate">{title}</p>
      <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
    </div>
  </div>
);

// --- Composant SelectField ---
interface SelectFieldProps {
  label: string;
  placeholderText: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, placeholderText, value, options, onSelect }) => (
  <div className="flex flex-col space-y-1 w-full">
    <label className="text-xs sm:text-sm font-medium text-gray-500">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        className="h-9 sm:h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 sm:px-4 text-gray-800 appearance-none pr-8 sm:pr-10 text-xs sm:text-sm"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt === "Tous" ? placeholderText : opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 sm:px-4 text-gray-700">
        <svg className="h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
);

// --- Page principale ---
export default function AdminCandidaturesPage(): ReactElement {
  const candidatesStatic: Candidate[] = data;

  const defaultFilterValue = "Tous";
  const uniqueDiplomes = Array.from(new Set(candidatesStatic.map(c => c.diplome)));
  const uniqueCategories = Array.from(new Set(candidatesStatic.map(c => c.categorie)));
  const uniquePayments = Array.from(new Set(candidatesStatic.map(c => c.payment)));
  const uniqueDates = Array.from(new Set(candidatesStatic.map(c => c.date)));

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filterDiplome, setFilterDiplome] = useState(defaultFilterValue);
  const [filterCategorie, setFilterCategorie] = useState(defaultFilterValue);
  const [filterPayment, setFilterPayment] = useState(defaultFilterValue);
  const [filterDate, setFilterDate] = useState(defaultFilterValue);

  const handleResetFilters = () => {
    setFilterDiplome(defaultFilterValue);
    setFilterCategorie(defaultFilterValue);
    setFilterPayment(defaultFilterValue);
    setFilterDate(defaultFilterValue);
  };

  const totalCandidates = candidatesStatic.length;
  const paidCandidates = candidatesStatic.filter(c => c.payment === "Payé").length;
  const pendingCandidates = candidatesStatic.filter(c => c.payment === "En attente").length;
  const candidatesPerPage = 8;

  const filtered = useMemo(() => {
    return candidatesStatic
      .filter(c => (`${c.nom} ${c.prenom}`).toLowerCase().includes(search.toLowerCase()))
      .filter(c => filterDiplome === defaultFilterValue || c.diplome === filterDiplome)
      .filter(c => filterCategorie === defaultFilterValue || c.categorie === filterCategorie)
      .filter(c => filterPayment === defaultFilterValue || c.payment === filterPayment)
      .filter(c => filterDate === defaultFilterValue || c.date === filterDate);
  }, [search, filterDiplome, filterCategorie, filterPayment, filterDate]);

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filtered.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filtered.length / candidatesPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-3 sm:p-4 md:p-6 font-sans max-[310px]:p-2">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1 sm:mb-2">Candidatures</h1>
      <p className="text-gray-500 mb-4 sm:mb-6 text-xs sm:text-sm">Gérez les candidations soumises</p>

      {/* StatCards - Grille responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-[310px]:gap-2">
        <MockupStatCard title="Total Candidatures" value={totalCandidates} icon={Users} iconBgColor="bg-teal-50" iconTextColor="text-teal-600" cardBgColor="bg-white" />
        <MockupStatCard title="En attente de paiement" value={pendingCandidates} icon={Clock} iconBgColor="bg-yellow-100" iconTextColor="text-yellow-600" cardBgColor="bg-yellow-50" />
        <MockupStatCard title="Paiements validés" value={paidCandidates} icon={CheckCircle} iconBgColor="bg-green-100" iconTextColor="text-green-600" cardBgColor="bg-white" />
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Recherche + Bouton filtres */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 max-[310px]:gap-2 max-[310px]:p-2">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 bg-white text-xs sm:text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Rechercher un candidat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${showFilters ? 'bg-gray-200 text-gray-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              } max-[310px]:w-full max-[310px]:justify-center cursor-pointer`}
          >
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
          </Button>
        </div>

        {/* Panneau filtres */}
        <div className={`transition-all duration-300 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 max-[310px]:p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-[310px]:gap-2">
              <SelectField label="Diplôme" placeholderText="Tous les diplômes" value={filterDiplome} options={[defaultFilterValue, ...uniqueDiplomes]} onSelect={setFilterDiplome} />
              <SelectField label="Catégorie" placeholderText="Toutes les catégories" value={filterCategorie} options={[defaultFilterValue, ...uniqueCategories]} onSelect={setFilterCategorie} />
              <SelectField label="Statut de paiement" placeholderText="Tous les statuts" value={filterPayment} options={[defaultFilterValue, ...uniquePayments]} onSelect={setFilterPayment} />
              <SelectField label="Date" placeholderText="Toutes les dates" value={filterDate} options={[defaultFilterValue, ...uniqueDates]} onSelect={setFilterDate} />
            </div>
            <div className="flex flex-row justify-end gap-2 sm:gap-3 mt-4 max-[310px]:gap-1.5 max-[310px]:mt-3">
              <Button className="text-gray-600 h-9 sm:h-10 px-3 sm:px-4 bg-gray-300 text-xs sm:text-sm max-[310px]:px-2 max-[310px]:py-1.5 cursor-pointer" onClick={handleResetFilters}>
                Réinitialiser
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm max-[310px]:px-2 max-[310px]:py-1.5 cursor-pointer" onClick={() => setShowFilters(false)}>
                Appliquer
              </Button>
            </div>
          </div>
        </div>

        {/* Tableau / Cartes responsive */}
        <div className="border-t border-gray-100">
          {/* Tableau pour écran sm+ */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Nom</th>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Prénom</th>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Diplôme</th>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Catégorie</th>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Sous-catégorie</th>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Paiement</th>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Date</th>
                  <th className="text-right p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCandidates.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                    <td className="p-3 text-xs sm:text-sm font-medium text-gray-900 truncate">{c.nom}</td>
                    <td className="p-3 text-xs sm:text-sm text-gray-700 truncate">{c.prenom}</td>
                    <td className="p-3 text-xs sm:text-sm text-gray-700 truncate">{c.diplome}</td>
                    <td className="p-3 text-xs sm:text-sm text-gray-700 truncate">{c.categorie}</td>
                    <td className="p-3 text-xs sm:text-sm text-gray-700 truncate">{c.sousCategorie}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${c.payment === "Payé" ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {c.payment}
                      </span>
                    </td>
                    <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{c.date}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <Button className="p-1.5 h-auto w-auto bg-transparent hover:bg-transparent">
                          <Download className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                        </Button>
                        <Button className="p-1.5 h-auto w-auto bg-transparent hover:bg-transparent">
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cartes pour écran < sm */}
          <div className="sm:hidden divide-y divide-gray-100">
            {currentCandidates.map((c, i) => (
              <div key={i} className="p-3 hover:bg-gray-50 max-[310px]:p-2">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-gray-900 truncate">{c.nom} {c.prenom}</p>
                    <p className="text-xs text-gray-500 truncate">{c.diplome} • {c.categorie}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Button className="p-1.5 h-auto w-auto bg-transparent">
                      <Download className="h-4 w-4 text-teal-600" />
                    </Button>
                    <Button className="p-1.5 h-auto w-auto bg-transparent">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-600"><span className="font-medium">Spécialité:</span> {c.sousCategorie}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${c.payment === "Payé" ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {c.payment}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{c.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 max-[310px]:p-2 max-[310px]:gap-2">
        <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-left whitespace-nowrap">
          {currentCandidates.length} / {filtered.length} candidats (Total: {totalCandidates})
        </span>
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
          >
            &lt;
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <Button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`h-8 w-8 p-0 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${currentPage === pageNumber
                    ? 'bg-teal-600 text-white border border-teal-600'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="h-8 w-8 p-0 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}