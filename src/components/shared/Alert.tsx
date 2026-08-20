import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { ListenButton, MultilingualText } from './ListenButton';

export type AlertType = 'info' | 'warning' | 'critical' | 'success';

export interface AlertProps {
  type?: AlertType;
  title: string;
  hindiTitle?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
  id?: string;
  enableListen?: boolean;
  listenText?: MultilingualText;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  hindiTitle,
  message,
  icon,
  action,
  onClose,
  className = '',
  id,
  enableListen = true,
  listenText,
}) => {
  const typeConfig = {
    info: {
      defaultIcon: <Info className="w-5 h-5 text-emerald-800 shrink-0" />,
      containerStyles: 'bg-emerald-50/70 border-emerald-300 text-emerald-950',
      iconContainer: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      badgeStyles: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      actionBtn: 'bg-emerald-800 hover:bg-emerald-900 text-white',
      listenVariant: 'chip' as const,
    },
    warning: {
      defaultIcon: <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0" />,
      containerStyles: 'bg-amber-50/80 border-amber-300 text-amber-950',
      iconContainer: 'bg-amber-100 text-amber-900 border-amber-200',
      badgeStyles: 'bg-amber-100 text-amber-900 border-amber-200',
      actionBtn: 'bg-amber-800 hover:bg-amber-900 text-white',
      listenVariant: 'amber' as const,
    },
    critical: {
      defaultIcon: <AlertCircle className="w-5 h-5 text-rose-800 shrink-0" />,
      containerStyles: 'bg-rose-50/80 border-rose-300 text-rose-950',
      iconContainer: 'bg-rose-100 text-rose-900 border-rose-200',
      badgeStyles: 'bg-rose-100 text-rose-900 border-rose-200',
      actionBtn: 'bg-rose-800 hover:bg-rose-900 text-white',
      listenVariant: 'rose' as const,
    },
    success: {
      defaultIcon: <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0" />,
      containerStyles: 'bg-emerald-50/90 border-emerald-300 text-emerald-950',
      iconContainer: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      badgeStyles: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      actionBtn: 'bg-emerald-800 hover:bg-emerald-900 text-white',
      listenVariant: 'chip' as const,
    },
  };

  const current = typeConfig[type];

  // Prepare text for speech synthesis
  const speechContent = listenText || `${title}. ${message || ''}`;

  return (
    <div
      id={id}
      role="alert"
      className={`rounded-2xl border p-4 sm:p-5 shadow-xs flex items-start gap-3.5 ${current.containerStyles} ${className}`}
    >
      <div className={`p-2 rounded-xl border shrink-0 ${current.iconContainer}`}>
        {icon || current.defaultIcon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
              {title}
            </h4>
            {hindiTitle && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${current.badgeStyles}`}>
                {hindiTitle}
              </span>
            )}
          </div>

          {enableListen && (
            <div className="shrink-0">
              <ListenButton
                text={speechContent}
                variant={current.listenVariant}
                size="xs"
                id={id ? `listen-${id}` : undefined}
              />
            </div>
          )}
        </div>

        {message && (
          <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
            {message}
          </p>
        )}

        {action && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <button
              onClick={action.onClick}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer ${current.actionBtn}`}
            >
              {action.label}
            </button>
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-black/5 transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
