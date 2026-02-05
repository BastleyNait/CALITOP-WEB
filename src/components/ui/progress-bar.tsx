import React from 'react';

interface ProgressBarProps {
    value: number; // 0-100
    max?: number;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'danger';
}

const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
};

const variantColors = {
    default: 'bg-[#F97316]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
};

export function ProgressBar({
    value,
    max = 100,
    showLabel = false,
    size = 'md',
    variant = 'default'
}: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Auto variant based on percentage
    const autoVariant = percentage > 50 ? 'success' : percentage > 20 ? 'warning' : 'danger';
    const finalVariant = variant === 'default' && showLabel ? autoVariant : variant;

    return (
        <div className="flex items-center gap-3">
            <div className={`flex-1 bg-zinc-800 rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <div
                    className={`h-full transition-all duration-300 ${variantColors[finalVariant]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <span className="text-xs font-bold text-slate-400 min-w-[3rem] text-right">
                    {Math.round(percentage)}%
                </span>
            )}
        </div>
    );
}
