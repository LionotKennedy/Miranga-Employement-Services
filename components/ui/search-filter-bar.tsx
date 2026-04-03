"use client"

import { Search, Filter } from "lucide-react"
import  Input  from "@/components/ui/input"
import  Button  from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface SearchFilterBarProps {
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  filters?: {
    diplome?: string
    categorie?: string
    statut?: string
    date?: string
  }
  onFilterChange?: (filters: any) => void
}

export function SearchFilterBar({
  searchPlaceholder = "Rechercher...",
  onSearch,
  filters,
  onFilterChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={searchPlaceholder} className="pl-9" onChange={(e) => onSearch?.(e.target.value)} />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtres</SheetTitle>
            <SheetDescription>Affinez votre recherche avec les filtres ci-dessous</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Diplôme</label>
              <Select
                value={filters?.diplome}
                onValueChange={(value) => onFilterChange?.({ ...filters, diplome: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les diplômes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les diplômes</SelectItem>
                  <SelectItem value="MASTER">MASTER</SelectItem>
                  <SelectItem value="LICENCE">LICENCE</SelectItem>
                  <SelectItem value="BACC">BACC</SelectItem>
                  <SelectItem value="BEPC">BEPC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Catégorie</label>
              <Select
                value={filters?.categorie}
                onValueChange={(value) => onFilterChange?.({ ...filters, categorie: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Informatique">Informatique</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Droit">Droit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Statut de paiement</label>
              <Select
                value={filters?.statut}
                onValueChange={(value) => onFilterChange?.({ ...filters, statut: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Select value={filters?.date} onValueChange={(value) => onFilterChange?.({ ...filters, date: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les dates</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onFilterChange?.({})}>
                Réinitialiser
              </Button>
              <Button className="flex-1">Appliquer</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
