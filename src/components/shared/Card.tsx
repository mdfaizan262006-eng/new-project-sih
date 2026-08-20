import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  hindiTitle?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  id?: string;
  onClick?: () => void;
  selected?: boolean;
  variant?: 'default' | 'accent' | 'outlined' | 'muted';
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  hindiTitle,
  icon,
  badge,
  action,
  footer,
  className = '',
  bodyClassName = '',
  id,
  onClick,
  selected = false,
  variant = 'default',
}) => {
  const isInteractive = Boolean(onClick);

  const variantStyles = {
    default: 'bg-white border-stone-200/90 text-stone-900 shadow-xs',
    accent: 'bg-white border-emerald-300 ring-1 ring-emerald-500/20 text-stone-900 shadow-xs',
    outlined: 'bg-white border-2 border-stone-300 text-stone-900',
    muted: 'bg-stone-50 border-stone-200 text-stone-900',
  };

  const selectedStyles = selected
    ? 'border-emerald-600 ring-2 ring-emerald-600/30 bg-emerald-50/30'
    : '';

  const interactiveStyles = isInteractive
    ? 'cursor-pointer hover:border-emerald-500 hover:shadow-md active:scale-[0.99] transition-all duration-150'
    : '';

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-2xl border ${variantStyles[variant]} ${selectedStyles} ${interactiveStyles} overflow-hidden ${className}`}
    >
      {/* Optional Card Header */}
      {(title || icon || badge || action) && (
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {icon && (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {title && (
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight leading-snug">
                    {title}
                  </h3>
                )}
                {hindiTitle && (
                  <span className="text-xs font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                    {hindiTitle}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {badge && <div>{badge}</div>}
            {action && <div>{action}</div>}
          </div>
        </div>
      )}

      {/* Card Content Body */}
      {children && (
        <div className={`p-4 sm:p-5 ${bodyClassName}`}>
          {children}
        </div>
      )}

      {/* Optional Card Footer */}
      {footer && (
        <div className="px-4 sm:px-5 py-3 bg-stone-50/70 border-t border-stone-100 text-xs text-stone-600">
          {footer}
        </div>
      )}
    </div>
  );
};
