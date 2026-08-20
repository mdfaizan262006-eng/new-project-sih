import React from 'react';
import { Badge } from './Badge';
import { Card } from './Card';
import { Button } from './Button';
import { Section } from './Section';
import { Alert } from './Alert';
import { AppSection } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface SectionPlaceholderProps {
  id: string;
  title: string;
  hindiTitle?: string;
  tagline: string;
  sectionKey: AppSection;
  icon: React.ReactNode;
  subModules: { name: string; desc: string }[];
  onNavigate?: (section: AppSection) => void;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  id,
  title,
  hindiTitle,
  tagline,
  sectionKey,
  icon,
  subModules,
  onNavigate,
}) => {
  const { t } = useLanguage();

  return (
    <Section
      id={id}
      title={title}
      hindiTitle={hindiTitle}
      description={tagline}
      icon={icon}
      badge={<Badge variant="emerald">{t('dashboard.readyStatus')}</Badge>}
      action={<Badge variant="stone">{t('common.section')}: {sectionKey}</Badge>}
    >
      {/* Submodules Grid in White Rounded Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            {t('common.moduleStructure')}
          </h2>
          <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
            {subModules.length} {t('common.subAreasDefined')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {subModules.map((item, idx) => (
            <Card
              key={idx}
              className="group hover:border-emerald-500 hover:shadow-sm transition-all"
              bodyClassName="p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-mono">
                  {t('common.area')} 0{idx + 1}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-1 leading-snug">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Agriculture Context Alert Banner */}
      <Alert
        type="info"
        title={t('common.domainReadyTitle')}
        message={t('common.domainReadyDesc')}
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-700" />}
      />

      {/* Quick Navigation Footer with Large Button */}
      {onNavigate && (
        <Card
          className="bg-white border-stone-200"
          bodyClassName="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-stone-800 text-xs sm:text-sm">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">{t('common.switchViewPrompt')}</p>
              <p className="text-stone-500 text-xs">{t('common.switchViewSubtext')}</p>
            </div>
          </div>
          <Button
            size="lg"
            variant="primary"
            onClick={() => onNavigate('dashboard')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            {t('btn.backToDashboard')}
          </Button>
        </Card>
      )}
    </Section>
  );
};
