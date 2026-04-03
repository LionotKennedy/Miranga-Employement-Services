"use client"
import React, { useState } from 'react';
import { User, Shield, Info, Settings, Code, Calendar, Mail } from 'lucide-react';
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import "./style.css"

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('personal');

    const tabContentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    }

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div>
                <motion.h1
                    className="text-2xl font-bold !text-[#129C9C]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >Paramètres</motion.h1>
                <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >Gérez vos informations personnelles et vos préférences</motion.p>
            </div>

            <Card>
                <CardHeader className="border-b p-0">
                    <div className="flex flex-col sm:flex-row overflow-x-auto">
                        <TabButton
                            icon={<User size={18} />}
                            label="Informations Personnelles"
                            active={activeTab === 'personal'}
                            onClick={() => setActiveTab('personal')}
                        />
                        <TabButton
                            icon={<Shield size={18} />}
                            label="Sécurité"
                            active={activeTab === 'security'}
                            onClick={() => setActiveTab('security')}
                        />
                        <TabButton
                            icon={<Info size={18} />}
                            label="À Propos"
                            active={activeTab === 'about'}
                            onClick={() => setActiveTab('about')}
                        />
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    <AnimatePresence mode="wait">

                        {activeTab === 'personal' && (
                            <motion.div
                                key="personal"
                                variants={tabContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-foreground">
                                            Nom
                                        </Label>
                                        <Input
                                            type="text"
                                            name="nom"
                                            placeholder='Entrez votre nom'
                                            className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-foreground">
                                            Prénom
                                        </Label>
                                        <Input
                                            type="text"
                                            name="prenom"
                                            placeholder='Entrez votre prénom'
                                            className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-foreground">
                                            Email
                                        </Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder='Entrez votre email'
                                            className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-foreground">
                                            Téléphone
                                        </Label>
                                        <Input
                                            type="tel"
                                            name="telephone"
                                            placeholder='Entrez votre numéro de téléphone'
                                            className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <motion.div
                                    className="flex justify-end pt-4"
                                    key="personal"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center gap-2 cursor-pointer
                                        max-[330px]:text-xs max-[330px]:px-3 max-[330px]:py-1.5"
                                    >
                                        <Settings size={18} />
                                        Enregistrer
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div
                                key="security"
                                variants={tabContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className='space-y-6'
                            >
                                <div className='flex flex-col gap-6'>
                                    <div className='space-y-2'>
                                        <Label>
                                            Mot de passe actuel
                                        </Label>
                                        <Input
                                            type="password"
                                            name="current_password"
                                            placeholder='Entrez votre mot de passe actuel'
                                            className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label>
                                            Nouveau mot de passe
                                        </Label>
                                        <Input
                                            type="password"
                                            name="new_password"
                                            placeholder='Entrez votre nouveau mot de passe'
                                            className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label>
                                            Confirmation du nouveau mot de passe
                                        </Label>
                                        <Input
                                            type="password"
                                            name="new_password_confirmation"
                                            placeholder='Confirmez votre nouveau mot de passe'
                                            className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <motion.div
                                        className="flex justify-end pt-4"
                                        key="personal"
                                        variants={tabContentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center gap-2 cursor-pointer
                                            max-[330px]:text-xs max-[330px]:px-3 max-[330px]:py-1.5"
                                        >
                                            Changer le mot de passe
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'about' && (
                            <motion.div
                                key="about"
                                variants={tabContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <Card className='p-0 border-none shadow-none'>
                                    <div className='flex flex-col justify-center'>
                                        <CardHeader>
                                            <div className="flex justify-center">
                                                <div className="w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,_#17B8A6,_#8ED5D5)] flex items-center justify-center shadow-lg">
                                                    <Info size={48} className="text-white" />
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className='flex gap-2'><Code className='text-[#129C9C]' /> Version</CardTitle>
                                                        <CardDescription>1.0.0</CardDescription>
                                                    </CardHeader>
                                                </Card>
                                                <Card className='flex flex-col'>
                                                    <CardHeader>
                                                        <CardTitle className='flex gap-2'><Calendar className='text-[#129C9C]' /> Dernière mise à jour</CardTitle>
                                                        <CardDescription>15 Octobre 2023</CardDescription>
                                                    </CardHeader>
                                                </Card>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className='flex gap-2'><User className='text-[#129C9C]' /> Développé par</CardTitle>
                                                        <CardDescription>Miranga Job Agency</CardDescription>
                                                    </CardHeader>
                                                </Card>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className='flex gap-2'><Mail className='text-[#129C9C]' /> Contact support</CardTitle>
                                                        <CardDescription>support@miranga.com</CardDescription>
                                                    </CardHeader>
                                                </Card>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <p className='text-center text-sm md:text-md text-muted-foreground'>© 2023 Miranga Job Agency. Tous droits réservés.</p>
                                        </CardFooter>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function TabButton({
    icon,
    label,
    active,
    onClick
}: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${active
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
        >
            <motion.div
                className='menu_navbar'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {icon}
                <span className="font-medium text-sm">{label}</span>
            </motion.div>
        </button>
    );
}