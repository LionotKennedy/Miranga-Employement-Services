"use client"

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import LogoFacebook from "../assets/brands/LogoFacebook.png"
import LogoGoogle from "../assets/brands/LogoGoogle.png"
import ImagePixel from "../assets/brands/Pixel_DownLogin.png"
import DashStyle from "../assets/dashstylLogin.png"
import UserAnalyst from "../assets/brands/userAnalyst.png"
import PixelTop from "../assets/brands/Pixel_RightTop.png"
import PixelBottom from "../assets/brands/Pixel_RightBottom.png"
import DashPanel from "../assets/brands/DashPanel.png"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Step = 'signIn' | 'signOut';

export default function LoginPage() {
    const [step, setStep] = useState<Step>("signIn");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [fullName, setFullName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

    const handleChangementPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value)
        if (value.length < 6) {
            setErrorPassword("Le mot de passe doit contenir au moins 6 caracteres")
        } else {
            setErrorPassword("");
        }
    }
    const handleChangementPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordConfirm(value)
        if (value.length < 6) {
            setErrorPasswordConfirm("Le mot de passe doit contenir au moins 6 caracteres")
        } else {
            setErrorPasswordConfirm("");
        }
    }

    const handleTermsChange = () => {
        setTermsAccepted(!termsAccepted)
    }

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
        if (e.target.value.length < 3) {
            setErrorName("Le nom doit contenir au moins 3 caractères");
        } else {
            setErrorName("");
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('signOut');
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(value && !emailRegex.test(value) ? "Adresse email invalide" : "");
    };

    return (
        <div className="relative overflow-hidden h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="z-10 flex flex-col gap-[100px] max-md:gap-[20px] px-[58.47px] py-[16px] max-md:px-[20px] items-center max-lg:w-full">
                <div className="ml-0">
                    <p className="text-[20px] font-bold text-center max-md:text-[18px]">
                        <span className="text-[#129C9C]">Miranga</span> Employment Services
                    </p>
                </div>
                <AnimatePresence mode="wait">
                    {step === "signIn" && (
                        <motion.div
                            key="signIn"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-[20px] items-center"
                        >
                            <div className="w-[344px] h-auto max-md:w-[280px]">
                                <form action="" onSubmit={handleRegister} className="flex flex-col w-full h-auto gap-[13px]">
                                    <p className="text-[18px] font-semibold text-[#303030] text-center">Se connecter à votre compte</p>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="text-[12px] font-bold">Email</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            placeholder="Entrer votre adresse email"
                                            className="w-full h-[50px] border-none bg-[#f0f3f3] rounded-[15px] placeholder:text-[12px] placeholder:text-[#9e9e9e] placeholder:font-medium"
                                        />
                                        {error && (
                                            <span className="text-red-500 text-[12px] font-medium">{error}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="text-[12px] font-bold">Mot de passe</label>
                                        <div className="relative">
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={password}
                                                    onChange={handleChangementPassword}
                                                    placeholder="Entrer votre mot de passe"
                                                    className="w-full h-[50px] border-none bg-[#f0f3f3] rounded-[15px] placeholder:text-[12px] placeholder:text-[#9e9e9e] placeholder:font-medium"
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700">
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {errorPassword && <span className="text-red-500 text-[12px] font-medium">{errorPassword}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" className="bg-[#17b8a6] checked:bg-[#17b8a6] w-[20px] h-[20px]" />
                                            <p className="font-bold text-[12px]">Se souvenir de moi</p>
                                        </div>
                                        <Link href="/forgotPassword" className="text-[#17b8a6] text-[12px] font-bold">Mot de passe oublié ?</Link>
                                    </div>
                                    <Button className="text-[12px] font-bold text-white bg-[#129c9c] hover:bg-[#129c9c] rounded-[15px] w-full h-[50px]">
                                        Se connecter
                                    </Button>
                                    <div className="flex items-center">
                                        <div className="flex-1 h-px bg-[#666]"></div>
                                        <span className="px-2 text-[12px] font-bold">Ou</span>
                                        <div className="flex-1 h-px bg-[#666]"></div>
                                    </div>
                                    <div className="flex gap-[15px] justify-center flex-wrap">
                                        <Button className="flex gap-2 bg-transparent shadow-none border-[0.77px] border-[#666] w-[158px] max-md:w-[130px] h-[50px] text-[14px] font-medium text-[#666] rounded-[15px]">
                                            <img src={LogoGoogle.src} alt="LogoGoogle" className="w-[25px] h-[25px]" />
                                            Google
                                        </Button>
                                        <Button className="flex gap-2 bg-transparent shadow-none border-[0.77px] border-[#666] w-[158px] max-md:w-[130px] h-[50px] text-[14px] font-medium text-[#666] rounded-[15px]">
                                            <img src={LogoFacebook.src} alt="LogoFacebook" className="w-[25px] h-[25px]" />
                                            Facebook
                                        </Button>
                                    </div>
                                    <div className="flex">
                                        <p className="text-[12px] font-bold flex gap-2">
                                            <span>Vous n’avez pas encore de compte ?</span>
                                            <button type="submit" className="text-[#2db0b0] cursor-pointer">Créez-en un</button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <img
                                    src={ImagePixel.src}
                                    alt="Image Pixel"
                                    className="max-md:w-[300px] mt-[50px] max-md:h-auto w-[474.91px] h-[110.79px]"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                    {step === "signOut" && (
                        <motion.div
                            key="signOut"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-[20px] items-center"
                        >
                            <div className="w-[344px] h-auto max-md:w-[280px]">
                                <form action="" className="flex flex-col gap-[13px] h-auto">
                                    <p className="text-[18px] font-semibold text-[#303030] text-center">Créer un compte</p>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="text-[12px] font-bold">Nom complet</label>
                                        <Input
                                            type="text"
                                            name="fullName"
                                            value={fullName}
                                            onChange={handleFullNameChange}
                                            placeholder="Entrez votre nom complet"
                                            className="w-full h-[50px] border-none bg-[#f0f3f3] rounded-[15px] placeholder:text-[12px] placeholder:text-[#9e9e9e] placeholder:font-medium"
                                        />
                                        {errorName && (
                                            <span className="text-red-500 text-[12px] font-medium">{errorName}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="text-[12px] font-bold">Email</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            placeholder="Entrer votre adresse email"
                                            className="w-full h-[50px] border-none bg-[#f0f3f3] rounded-[15px] placeholder:text-[12px] placeholder:text-[#9e9e9e] placeholder:font-medium"
                                        />
                                        {error && (
                                            <span className="text-red-500 text-[12px] font-medium">{error}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="text-[12px] font-bold">Mot de passe</label>
                                        <div className="relative">
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={password}
                                                    onChange={handleChangementPassword}
                                                    placeholder="Entrer votre mot de passe"
                                                    className="w-full h-[50px] border-none bg-[#f0f3f3] rounded-[15px] placeholder:text-[12px] placeholder:text-[#9e9e9e] placeholder:font-medium"
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700">
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {errorPassword && <span className="text-red-500 text-[12px] font-medium">{errorPassword}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="text-[12px] font-bold">Confirmer le mot de passe</label>
                                        <div className="relative">
                                            <div className="relative">
                                                <Input
                                                    type={showPasswordConfirm ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    value={passwordConfirm}
                                                    onChange={handleChangementPasswordConfirm}
                                                    placeholder="Entrer votre mot de passe"
                                                    className="w-full h-[50px] border-none bg-[#f0f3f3] rounded-[15px] placeholder:text-[12px] placeholder:text-[#9e9e9e] placeholder:font-medium"
                                                />
                                                <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700">
                                                    {showPasswordConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {errorPasswordConfirm && <span className="text-red-500 text-[12px] font-medium">{errorPasswordConfirm}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={termsAccepted}
                                            onChange={handleTermsChange}
                                            className="bg-[#17b8a6] checked:bg-[#17b8a6] w-[20px] h-[20px]"
                                        />
                                        <p className="font-bold text-[12px]">
                                            J’accepte les <a href="/terms" className="text-[#129c9c]">conditions générales</a>
                                        </p>
                                    </div>
                                    <Button className="text-[12px] font-bold text-white bg-[#129c9c] hover:bg-[#129c9c] rounded-[15px] w-full h-[50px]">
                                        S’inscrire
                                    </Button>
                                    <div className="flex">
                                        <p className="text-[12px] font-bold flex gap-2">
                                            <span>Vous avez déjà de compte ?</span>
                                            <button type="button" onClick={() => setStep("signIn")} className="text-[#129c9c] cursor-pointer">Se connecter</button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <img
                                    src={ImagePixel.src}
                                    alt="Image Pixel"
                                    className="max-md:w-[300px] mt-[50px] max-md:h-auto w-[474.91px] h-[110.79px]"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative hidden md:flex flex-col gap-[50px] items-center py-[50px] bg-[#129c9c] w-full"
            >
                <div className="z-10 flex flex-col items-center">
                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        src={DashStyle.src}
                        alt="Dashboard Style"
                        className="w-[333px] h-[221px] max-md:w-[250px] max-md:h-auto"
                    />
                    <motion.img
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        src={UserAnalyst.src}
                        alt="User Analyst"
                        className="max-md:w-[120px] w-[150.8px] h-[239.03px] max-md:h-auto"
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="z-10 flex items-center justify-center flex-col gap-[5px] text-white text-center px-4"
                >
                    <p className="text-[24px] font-bold max-md:text-[20px]">Un outil de gestion moderne</p>
                    <p className="text-[14px] font-medium w-[258px] max-md:w-[220px] text-center">
                        Bienvenue sur l’espace Administrateur de Miranga Employment Services
                    </p>
                </motion.div>
                <div>
                    <img src={PixelTop.src} alt="Pixel Top" className="absolute top-0 right-0 z-0 w-[241px] h-[194.44px] max-md:w-[150px] max-md:h-auto" />
                    <img src={PixelBottom.src} alt="Pixel Bottom" className="absolute bottom-0 left-0 z-0 w-[241px] h-[194.44px] max-md:w-[150px] max-md:h-auto" />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="z-0 w-full absolute hidden md:flex items-center h-screen justify-center"
            >
                <img
                    src={DashPanel.src}
                    alt="Dash Panel"
                    className="w-[218.41px] h-[301.82px] max-[1400px]:ml-[100px]"
                />
            </motion.div>
        </div>
    )
}
