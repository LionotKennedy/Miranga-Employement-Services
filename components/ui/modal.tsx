"use client"

import type React from "react"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CandidateModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    candidate?: {
        nom: string
        prenom: string
        diplome: string
        categorie: string
        sousCategorie: string
    }
    onSave?: (data: any) => void
}

export function Modal({ open, onOpenChange, candidate, onSave }: CandidateModalProps) {
    const [formData, setFormData] = useState(
        candidate || {
            nom: "",
            prenom: "",
            diplome: "",
            categorie: "",
            sousCategorie: "",
        },
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave?.(formData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{candidate ? "Modifier le candidat" : "Ajouter un candidat"}</DialogTitle>
                    <DialogDescription>Remplissez les informations du candidat ci-dessous.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nom">Nom</Label>
                                <Input
                                    id="nom"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    placeholder="Entrez le nom"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="prenom">Prénom</Label>
                                <Input
                                    id="prenom"
                                    value={formData.prenom}
                                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                    placeholder="Entrez le prénom"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="diplome">Diplôme</Label>
                            <Select value={formData.diplome} onValueChange={(value) => setFormData({ ...formData, diplome: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un diplôme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MASTER">MASTER</SelectItem>
                                    <SelectItem value="LICENCE">LICENCE</SelectItem>
                                    <SelectItem value="BACC">BACC</SelectItem>
                                    <SelectItem value="BEPC">BEPC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categorie">Catégorie</Label>
                            <Select
                                value={formData.categorie}
                                onValueChange={(value) => setFormData({ ...formData, categorie: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Informatique">Informatique</SelectItem>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                    <SelectItem value="Commerce">Commerce</SelectItem>
                                    <SelectItem value="Droit">Droit</SelectItem>
                                    <SelectItem value="Communication">Communication</SelectItem>
                                    <SelectItem value="Administration">Administration</SelectItem>
                                    <SelectItem value="Finance">Finance</SelectItem>
                                    <SelectItem value="Ressources Humaines">Ressources Humaines</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sousCategorie">Sous-catégorie</Label>
                            <Input
                                id="sousCategorie"
                                value={formData.sousCategorie}
                                onChange={(e) => setFormData({ ...formData, sousCategorie: e.target.value })}
                                placeholder="Entrez la sous-catégorie"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">Enregistrer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
