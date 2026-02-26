'use client';

import { useState } from 'react';
import { loginAction } from '@/actions/auth';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        try {
            const result = await loginAction(formData);
            if (result && !result.success) {
                setError(result.error);
            }
        } catch (err) {
            // Redirect will throw, which is expected
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 mesh-gradient opacity-40" />
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full bg-orange-500/15 blur-[150px]"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]"
                />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="p-10 rounded-3xl glass-card border border-white/10 shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex flex-col items-center gap-4 mb-4">
                            <div className="relative w-32 h-32">
                                <Image
                                    src="https://f005.backblazeb2.com/file/CALITOP/images/products/logo.png"
                                    alt="CALITOP Logo"
                                    fill
                                    className="object-contain brightness-110"
                                />
                            </div>
                            <h1 className="text-3xl font-black text-white">Panel de Administración</h1>
                        </div>
                    </div>

                    {/* Form */}
                    <form action={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Usuario
                            </label>
                            <input
                                type="text"
                                name="username"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Ingresa tu usuario"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-black text-white text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${loading
                                ? 'bg-slate-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 hover:scale-[1.02] shadow-orange-500/30'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Verificando...
                                </>
                            ) : (
                                <>
                                    Iniciar Sesión
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-slate-500 text-xs">
                            Acceso restringido solo para administradores
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
