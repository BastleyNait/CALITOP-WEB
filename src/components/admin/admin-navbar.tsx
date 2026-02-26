"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function AdminNavbar() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 h-24 flex items-center shadow-2xl"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full flex items-center justify-between">
                <div className="flex items-center gap-6 sm:gap-10">
                    <Link href="/" className="flex items-center group transition-transform hover:scale-105">
                        <div className="relative w-40 sm:w-52 h-12 sm:h-16">
                            <Image
                                src="https://f005.backblazeb2.com/file/CALITOP/images/products/logo.png"
                                alt="Calitop"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    <div className="h-10 w-px bg-white/10 hidden md:block" />
                    <div className="hidden md:flex flex-col gap-1">
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#F97316]">
                            PANEL DE CONTROL
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-80">
                            Gestión de Productos
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="h-10 w-px bg-white/5 hidden sm:block" />
                    <div className="relative w-32 sm:w-44 h-12 sm:h-20 grayscale brightness-125 opacity-90 transition-all hover:grayscale-0">
                        <Image
                            src="https://f005.backblazeb2.com/file/CALITOP/images/products/logo2.png"
                            alt="Topservice"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
