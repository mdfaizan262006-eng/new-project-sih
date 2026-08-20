import React from 'react';
import { RiskCategoryLevel } from '../../types';
import { RiskTestPreset } from '../../services/riskService';
import { CheckCircle2, Sliders, Beaker } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface RiskCategoryTesterProps {
  presets: RiskTestPreset[];
  activePresetId: string | 'custom';
  onSelectPreset: (preset: RiskTestPreset) => void;
  onEnableCustomMode: () => void;
}

export const RiskCategoryTester: React.FC<RiskCategoryTesterProps> = ({
  presets,
  activePresetId,
  onSelectPreset,
  onEnableCustomMode,
}) => {
  const { t } = useLanguage();

  const getPresetBadgeStyle = (category: RiskCategoryLevel, isSelected: boolean) => {
    if (!isSelected) {
      return 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-sm';
    }

    switch (category) {
      case 'Low':
        return 'bg-emerald-50 text-emerald-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md';
      case 'Moderate':
        return 'bg-amber-50 text-amber-900 border-amber-500 ring-2 ring-amber-500/20 shadow-md';
      case 'High':
        return 'bg-orange-50 text-orange-900 border-orange-500 ring-2 ring-orange-500/20 shadow-md';
      case 'Critical':
        return 'bg-rose-50 text-rose-900 border-rose-500 ring-2 ring-rose-500/20 shadow-md';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-400';
    }
  };

  const getCategoryDot = (category: RiskCategoryLevel) => {
    switch (category) {
      case 'Low':
        return 'bg-emerald-700';
      case 'Moderate':
        return 'bg-amber-700';
      case 'High':
        return 'bg-orange-700';
      case 'Critical':
        return 'bg-rose-700';
    }
  };

  return (
    <div className="my-6 bg-stone-100/80 border border-stone-200/90 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-white rounded-lg border border-stone-200 text-emerald-800 shadow-xs">
            <Beaker className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900">
              {t('risk.testScenarios')}
            </h2>
            <p className="text-xs text-stone-600">
              {t('risk.testScenariosSub')}
            </p>
          </div>
        </div>

        <button
          id="risk-btn-custom-mode"
          onClick={onEnableCustomMode}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            activePresetId === 'custom'
              ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-300'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{t('risk.customSimulator')}</span>
        </button>
      </div>

      {/* Preset Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              id={`risk-preset-btn-${preset.category.toLowerCase()}`}
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${getPresetBadgeStyle(
                preset.category,
                isSelected
              )}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${getCategoryDot(
                        preset.category
                      )}`}
                    />
                    <span className="font-bold text-sm">{preset.name}</span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-medium text-stone-500">
                <span>Target Score: ~{preset.targetScore}/100</span>
                <span className="font-semibold text-stone-700">{preset.cropName.split(' ')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
