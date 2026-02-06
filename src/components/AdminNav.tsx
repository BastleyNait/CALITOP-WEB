'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/actions/auth';
import { Package, LogOut, Home } from 'lucide-react';

export default function AdminNav() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname?.startsWith(path);
    };

    return (
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/admin/products" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
                            <span className="text-white font-black text-lg">C</span>
                        </div>
                        <div>
                            <h1 className="text-white font-black text-lg">CALITOP</h1>
                            <p className="text-slate-500 text-xs font-bold">Admin Panel</p>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/products"
                            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${isActive('/admin/products')
                                    ? 'bg-orange-500/10 text-orange-500 border border-orange-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Package className="w-4 h-4" />
                            Productos
                        </Link>

                        <Link
                            href="/"
                            target="_blank"
                            className="px-4 py-2 rounded-xl font-bold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Ver Sitio
                        </Link>

                        <form action={logoutAction}>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-xl font-bold text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Salir
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}
