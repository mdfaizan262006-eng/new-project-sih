import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

export interface SectionProps {
  id: string;
  title: string;
  hindiTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  hideHeaderCard?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  hindiTitle,
  description,
  icon,
  badge,
  action,
  children,
  className = '',
  headerClassName = '',
  hideHeaderCard = false,
}) => {
  return (
    <div id={id} className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Mobile-First Section Hero / Header Card */}
      {!hideHeaderCard && (
        <Card
          className={`bg-white border-stone-200 shadow-xs ${headerClassName}`}
          bodyClassName="p-4 sm:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 sm:gap-4">
              {icon && (
                <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-700 text-white shadow-xs shrink-0 flex items-center justify-center">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    {title}
                  </h1>
                  {hindiTitle && (
                    <span className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                      {hindiTitle}
                    </span>
                  )}
                  {badge || <Badge variant="emerald">Krishi App</Badge>}
                </div>
                {description && (
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {action && (
              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                {action}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Main Section Content Children */}
      <div className="space-y-4 sm:space-y-6">
        {children}
      </div>
    </div>
  );
};
