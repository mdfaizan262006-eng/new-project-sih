import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Mobile-first large touch-target base styling
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] select-none focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  const sizeStyles = {
    sm: 'min-h-[36px] px-3.5 py-1.5 text-xs gap-1.5',
    md: 'min-h-[44px] px-4 py-2.5 text-sm gap-2',
    lg: 'min-h-[48px] px-5 py-3 text-base gap-2.5 shadow-xs', // Large agriculture button
    xl: 'min-h-[54px] px-6 py-3.5 text-lg gap-3 shadow-sm',   // Prominent mobile CTA button
  };

  const variantStyles = {
    primary: 'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-xs hover:shadow',
    secondary: 'bg-amber-100 hover:bg-amber-200 active:bg-amber-300 text-amber-950 border border-amber-200/60',
    outline: 'bg-white border-2 border-stone-300 hover:border-emerald-600 hover:bg-emerald-50/50 text-stone-800',
    ghost: 'hover:bg-stone-200/60 text-stone-700',
    danger: 'bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white shadow-xs',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span className="truncate">{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
