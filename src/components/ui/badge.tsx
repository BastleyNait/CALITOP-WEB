import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-zinc-800 text-slate-300 border-zinc-700',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    danger: 'bg-red-500/10 text-red-500 border-red-500/30',
    info: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    return (
        <span
            className={`
                inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border
                ${variantStyles[variant]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
