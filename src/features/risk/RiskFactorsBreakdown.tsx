import React from 'react';
import { AgriculturalRiskScore, RiskFactorItem } from '../../types';
import { getRiskCategory } from '../../services/riskService';
import { CloudRain, Sprout, TrendingDown, CreditCard, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface RiskFactorsBreakdownProps {
  riskData: AgriculturalRiskScore;
}

export const RiskFactorsBreakdown: React.FC<RiskFactorsBreakdownProps> = ({ riskData }) => {
  const { language, t } = useLanguage();
  const { factors } = riskData;

  const factorList: (RiskFactorItem & {
    icon: React.ReactNode;
    accentColor: string;
    bgHover: string;
  })[] = [
    {
      ...factors.rainfall,
      icon: <CloudRain className="w-5 h-5 text-sky-600" />,
      accentColor: 'border-sky-200 bg-sky-50/50 text-sky-800',
      bgHover: 'hover:border-sky-300',
    },
    {
      ...factors.cropWeather,
      icon: <Sprout className="w-5 h-5 text-emerald-600" />,
      accentColor: 'border-emerald-200 bg-emerald-50/50 text-emerald-800',
      bgHover: 'hover:border-emerald-300',
    },
    {
      ...factors.market,
      icon: <TrendingDown className="w-5 h-5 text-amber-600" />,
      accentColor: 'border-amber-200 bg-amber-50/50 text-amber-800',
      bgHover: 'hover:border-amber-300',
    },
    {
      ...factors.paymentDue,
      icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      accentColor: 'border-purple-200 bg-purple-50/50 text-purple-800',
      bgHover: 'hover:border-purple-300',
    },
  ];

  const getLocalizedFactorName = (item: RiskFactorItem) => {
    if (language === 'hi') return item.nameHindi;
    if (language === 'or') return item.nameOdia;
    return item.name;
  };

  const getLocalizedFactorReason = (item: RiskFactorItem) => {
    if (language === 'hi') return item.reasonHindi;
    if (language === 'or') return item.reasonOdia;
    return item.reason;
  };

  return (
    <div id="risk-factors-section" className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            {t('risk.factorsHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Four weighted components calculate the 0–100 composite risk score.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-lg text-xs font-semibold text-stone-700">
          <span>Formula:</span>
          <span className="font-mono text-emerald-800">
            (Rain×0.30) + (Crop×0.25) + (Mkt×0.25) + (Pay×0.20)
          </span>
        </div>
      </div>

      {/* 4 Factor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factorList.map((factor) => {
          const categoryStyle = getRiskCategory(factor.score);

          return (
            <div
              key={factor.id}
              id={`risk-factor-card-${factor.id}`}
              className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 transition-all flex flex-col justify-between ${factor.bgHover}`}
            >
              <div>
                {/* Header row with Icon, Title, Weight and Category badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 shrink-0">
                      {factor.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-stone-900">
                          {getLocalizedFactorName(factor)}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-stone-100 text-stone-700">
                          {factor.weightPercent}% {t('risk.weight')}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-stone-500 mt-0.5">
                        {factor.dataPoint}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${categoryStyle.badgeColor}`}
                  >
                    {factor.status}
                  </span>
                </div>

                {/* Score & Weighted Math Calculation */}
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70 mb-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-stone-600">Factor Raw Score:</span>
                    <span className="font-bold text-stone-900 text-sm">{factor.score} / 100</span>
                  </div>

                  {/* Horizontal Score Bar */}
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-2">
                    <div
                      style={{ width: `${factor.score}%` }}
                      className={`h-full transition-all duration-500 ${
                        factor.score <= 25
                          ? 'bg-emerald-500'
                          : factor.score <= 50
                          ? 'bg-amber-500'
                          : factor.score <= 75
                          ? 'bg-orange-500'
                          : 'bg-rose-500'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 border-t border-stone-200/60 pt-1.5">
                    <span>
                      {factor.score} × {factor.weightPercent}% =
                    </span>
                    <span className="font-bold text-emerald-900">
                      +{factor.weightedContribution} pts to total
                    </span>
                  </div>
                </div>

                {/* Agronomic / Economic Reason */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {getLocalizedFactorReason(factor)}
                </p>
              </div>

              {/* Bottom Micro-Badge */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  Impact Rank: {factor.score > 50 ? 'Active Risk Trigger' : 'Stable Parameter'}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-stone-700">
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
