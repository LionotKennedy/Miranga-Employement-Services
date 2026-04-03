"use client"

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import ImagePixel from "../assets/brands/Pixel_DownLogin.png"
import DashStyle from "../assets/dashstylLogin.png"
import UserAnalyst from "../assets/brands/userAnalyst.png"
import PixelTop from "../assets/brands/Pixel_RightTop.png"
import PixelBottom from "../assets/brands/Pixel_RightBottom.png"
import DashPanel from "../assets/brands/DashPanel.png"
import { useState } from "react";
import Link from "next/link";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = 'motDePasseOublier' | 'otp' | 'reset';

export default function LoginPage() {

    const [step, setStep] = useState<Step>("motDePasseOublier");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewPassword(value)
        if (value.length < 6) {
            setErrorPassword("Le mot de passe doit contenir au moins 6 caracteres")
        } else {
            setErrorPassword("");
        }
    }

    const handleChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordConfirm(value)
        if (value.length < 6) {
            setErrorPasswordConfirm("Le mot de passe doit contenir au moins 6 caracteres")
        } else {
            setErrorPasswordConfirm("");
        }
    }

    const handleEnvoyerCode = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('otp');
    };

    const handleVerificationCode = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('reset');
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    return (
        <div className="relative overflow-hidden h-screen grid grid-cols-1 md:grid-cols-2">
            <div
                className="z-10 flex flex-col gap-[100px] px-[58.47px] py-[16px] max-md:px-[20px] max-md:py-[30px] items-center max-lg:w-full">
                <div className="ml-0">
                    <p className="text-[20px] font-bold text-center max-md:text-[18px]">
                        <span className="text-[#129C9C]">Miranga</span> Employment Services
                    </p>
                </div>
                <div className="flex flex-col gap-[20px] items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-[380px] max-md:w-[330px] max-[310px]:w-[350px]"
                        >
                            {
                                step === 'motDePasseOublier' && (
                                    <Card className="border-none shadow-none bg-transparent">
                                        <CardHeader>
                                            <CardTitle className="font-semibold text-[18px] text-[#303030]">Mot de passe oublié
                                                ?</CardTitle>
                                            <CardDescription
                                                className="font-normal text-[12px] text-[#666] text-center">Entrez
                                                votre adresse email pour recevoir un code de
                                                vérification.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form action="/login" className="space-y-6" onSubmit={handleEnvoyerCode}>
                                                <div className="flex flex-col gap-[5px]">
                                                    <label className="text-[12px] text-[#666] font-bold">Email</label>
                                                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Entrer votre adresse email"
                                                        className="w-full h-[50px] border-none bg-[#f0f3f3] placeholder:text-[12px] placeholder:text-[#9e9e9e]" />
                                                </div>
                                                <button type="submit"
                                                    className="bg-[#129c9c] rounded-[15px] text-white cursor-pointer hover:scale-[1.05px] transition-all w-full h-[50px] text-[12px] font-bold">Envoyer
                                                    le code
                                                </button>
                                                <Link href="/login"
                                                    className="bg-transparent text-[12px] font-bold flex justify-center items-center cursor-pointer hover:text-[#129C9C] transition-colors gap-[10px]">
                                                    <ArrowLeft />
                                                    Retour à la connexion
                                                </Link>
                                            </form>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {
                                step === 'otp' && (
                                    <Card className="border-none shadow-none bg-transparent">
                                        <CardHeader>
                                            <CardTitle className="font-semibold text-[18px] text-[#303030]">Vérification de
                                                sécurité</CardTitle>
                                            <CardDescription
                                                className="font-normal text-[12px] text-[#666] text-center"> Entrez le
                                                code à 6 chiffres envoyé à votre adresse email.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form action="/login" className="space-y-6" onSubmit={handleVerificationCode}>
                                                <div className="flex flex-col gap-[5px]">
                                                    <label className="text-[12px] text-[#666] font-bold">Email</label>
                                                    <div className="flex gap-[6px]">
                                                        {otp.map((digit, index) => (
                                                            <Input
                                                                key={index}
                                                                id={`otp-${index}`}
                                                                type="text"
                                                                inputMode="numeric" maxLength={1} value={digit}
                                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                                className="w-[50px] h-[50px] max-md:w-[40px] max-md:h-[40px] rounded-[15px] max-md:rounded-[10px] border-none bg-[#f0f3f3]" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button type="submit"
                                                    className="w-full h-[50px] text-[12px] font-bold">Vérifier</Button>
                                                <div className="flex gap-[5px] text-center text-[12px] font-bold">
                                                    <p className=" text-[#666]">Vous n’avez pas reçu l’email ?
                                                    </p>
                                                    <button type="button" className="text-[#129C9C] space-x-6">Renvoyer le
                                                        code
                                                    </button>
                                                </div>
                                                <button type="button" onClick={() => setStep('motDePasseOublier')}
                                                    className="bg-transparent w-full text-[12px] font-bold flex justify-center items-center cursor-pointer hover:text-[#129C9C] transition-colors gap-[10px]">
                                                    <ArrowLeft />
                                                    Retour à la connexion
                                                </button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {
                                step === 'reset' && (
                                    <Card className="border-none shadow-none bg-transparent">
                                        <CardHeader>
                                            <CardTitle className="font-semibold text-[18px] text-[#303030]">Créer un nouveau mot
                                                de passe</CardTitle>
                                            <CardDescription
                                                className="font-normal text-[12px] text-[#666] text-center">Saisissez
                                                un nouveau mot de passe sécurisé pour
                                                votre compte.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form action="/login" className="space-y-6" onSubmit={handleResetPassword}>
                                                <div className="flex flex-col gap-[5px]">
                                                    <label className="text-[12px] text-[#666] font-bold">Nouveau mot de
                                                        passe</label>
                                                    <div>
                                                        <div className="relative">
                                                            <Input id="nouveau_password"
                                                                type={showPassword ? 'text' : 'password'}
                                                                placeholder="Entrez votre nouveau mot de passe"
                                                                value={newPassword}
                                                                onChange={handleChangePassword}
                                                                className="h-[50px] border-none bg-[#f0f3f3] placeholder:text-[12px] placeholder:text-[#9e9e9e]" />
                                                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700">
                                                                {showPassword ? <EyeOff className="w-5 h-5" /> :
                                                                    <Eye className="w-5 h-5" />}
                                                            </button>
                                                        </div>
                                                        {errorPassword && <span
                                                            className="text-red-500 text-[12px] font-medium">{errorPassword}</span>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-[5px]">
                                                    <label className="text-[12px] text-[#666] font-bold">Confirmer mot de
                                                        passe</label>
                                                    <div>
                                                        <div className="relative">
                                                            <Input id="confirmer_password"
                                                                type={showConfirmPassword ? 'text' : 'password'}
                                                                placeholder="Répétez le mot de passe"
                                                                value={passwordConfirm}
                                                                onChange={handleChangePasswordConfirm}
                                                                className="h-[50px] border-none bg-[#f0f3f3] placeholder:text-[12px] placeholder:text-[#9e9e9e]" />
                                                            <button type="button"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700">
                                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> :
                                                                    <Eye className="w-5 h-5" />}
                                                            </button>
                                                        </div>
                                                        {errorPasswordConfirm && <span
                                                            className="text-red-500 text-[12px] font-medium">{errorPasswordConfirm}</span>}
                                                    </div>
                                                </div>
                                                <Button type="submit" className="w-full h-[50px] text-[12px] font-bold">Réinitialiser
                                                    le mot de passe</Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        </motion.div>
                    </AnimatePresence>
                    <div>
                        <motion.img
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            src={ImagePixel.src}
                            alt="Image Pixel"
                            className="max-md:w-[300px] mt-[50px] max-md:h-auto w-[474.91px] h-[110.79px]"
                        />
                    </div>
                </div>
            </div>
            <div
                className="relative hidden md:flex flex-col gap-[50px] items-center py-[50px] bg-[#129c9c]">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="z-10 flex flex-col items-center"
                >
                    <img src={DashStyle.src} alt="Dashboard Style"
                        className="w-[333px] h-[221px] max-md:w-[250px] max-md:h-auto" />
                    <img src={UserAnalyst.src} alt="User Analyst"
                        className="max-md:w-[120px] w-[150.8px] h-[239.03px] max-md:h-auto" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="z-10 flex items-center justify-center flex-col gap-[5px] text-white text-center px-4"
                >
                    <p className="text-[24px] font-bold max-md:text-[20px]">Un outil de gestion moderne</p>
                    <p className="text-[14px] font-medium w-[258px] max-md:w-[220px] text-center">
                        Bienvenue sur l’espace Administrateur de Miranga Employment Services
                    </p>
                </motion.div>
                <div>
                    <img src={PixelTop.src} alt="Pixel Top"
                        className="absolute top-0 right-0 z-0 w-[241px] h-[194.44px] max-md:w-[150px] max-md:h-auto" />
                    <img src={PixelBottom.src} alt="Pixel Bottom"
                        className="absolute bottom-0 left-0 z-0 w-[241px] h-[194.44px] max-md:w-[150px] max-md:h-auto" />
                </div>
            </div>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="z-0 w-full absolute hidden md:flex items-center h-screen justify-center"
            >
                <img src={DashPanel.src} alt="Dash Panel"
                    className="w-[218.41px] h-[301.82px]" />
            </motion.div>
        </div>
    )
}
