import React from 'react';
import { AgriculturalRiskScore } from '../../types';
import { getRiskCategory } from '../../services/riskService';
import { AlertOctagon, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';

interface RiskScoreGaugeProps {
  riskData: AgriculturalRiskScore;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ riskData }) => {
  const { language } = useLanguage();
  const { totalScore, category, categoryRange, scoreDescription } = riskData;
  const categoryStyle = getRiskCategory(totalScore);

  // SVG Gauge calculations
  const strokeWidth = 14;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // Use a 240-degree arc for speedo/gauge style
  const arcDegree = 240;
  const arcLength = (circumference * arcDegree) / 360;
  const progressLength = (totalScore / 100) * arcLength;
  const strokeDashoffset = arcLength - progressLength;

  const getCategoryIcon = () => {
    switch (category) {
      case 'Low':
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case 'Moderate':
        return <CheckCircle className="w-5 h-5 text-amber-700" />;
      case 'High':
        return <AlertTriangle className="w-5 h-5 text-orange-700" />;
      case 'Critical':
        return <AlertOctagon className="w-5 h-5 text-rose-700" />;
    }
  };

  const getLocalizedCategoryName = () => {
    if (language === 'hi') {
      switch (category) {
        case 'Low':
          return 'कम जोखिम (Low)';
        case 'Moderate':
          return 'मध्यम जोखिम (Moderate)';
        case 'High':
          return 'उच्च जोखिम (High)';
        case 'Critical':
          return 'गंभीर जोखिम (Critical)';
      }
    } else if (language === 'or') {
      switch (category) {
        case 'Low':
          return 'କମ ବିପଦ (Low)';
        case 'Moderate':
          return 'ମଧ୍ୟମ ବିପଦ (Moderate)';
        case 'High':
          return 'ଉଚ୍ଚ ବିପଦ (High)';
        case 'Critical':
          return 'ଗୁରୁତର ବିପଦ (Critical)';
      }
    }
    return `${category} Risk`;
  };

  const getGaugeColor = () => {
    switch (category) {
      case 'Low':
        return '#059669'; // emerald-600
      case 'Moderate':
        return '#d97706'; // amber-600
      case 'High':
        return '#ea580c'; // orange-600
      case 'Critical':
        return '#e11d48'; // rose-600
    }
  };

  return (
    <div
      id="risk-score-overview-card"
      className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Left: Interactive Circular Gauge */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-56 h-48 flex items-center justify-center">
            <svg
              className="w-56 h-56 -rotate-[210deg] transform"
              viewBox="0 0 200 200"
            >
              {/* Background track */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#e7e5e4"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />
              {/* Active colored score arc */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={getGaugeColor()}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Centered Score Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center top-2">
              <span className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight">
                {totalScore}
              </span>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                out of 100
              </span>
              <div className="mt-1 flex items-center gap-1.5">
                {getCategoryIcon()}
                <span className={`text-xs font-bold ${categoryStyle.textColor}`}>
                  {category}
                </span>
              </div>
            </div>
          </div>

          {/* Scale Legend Bar below gauge */}
          <div className="grid grid-cols-4 gap-1 w-full max-w-xs mt-2 text-[10px] font-semibold text-center text-stone-500">
            <div className={`py-1 rounded ${totalScore <= 25 ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-stone-100'}`}>
              0–25 Low
            </div>
            <div className={`py-1 rounded ${totalScore > 25 && totalScore <= 50 ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-stone-100'}`}>
              26–50 Mod
            </div>
            <div className={`py-1 rounded ${totalScore > 50 && totalScore <= 75 ? 'bg-orange-100 text-orange-800 font-bold' : 'bg-stone-100'}`}>
              51–75 High
            </div>
            <div className={`py-1 rounded ${totalScore > 75 ? 'bg-rose-100 text-rose-800 font-bold' : 'bg-stone-100'}`}>
              76–100 Crit
            </div>
          </div>
        </div>

        {/* Right: Category Narrative & Breakdown */}
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold border ${categoryStyle.badgeColor}`}
              >
                {getCategoryIcon()}
                {getLocalizedCategoryName()} ({categoryRange})
              </span>
              <span className="text-xs font-semibold text-stone-500">
                Composite Agricultural Index
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ListenButton
                id="btn-listen-risk-score-desc"
                text={{
                  hi: `जोखिम स्कोर विवरण: ${totalScore} में से 100, श्रेणी ${category}। ${scoreDescription}`,
                  or: `ବିପଦ ସ୍କୋର ବିବରଣୀ: ${totalScore} ରୁ 100। ଶ୍ରେଣୀ ${category}। ${scoreDescription}`,
                  en: `Risk Score Summary: ${totalScore} out of 100, placed in ${category} risk category (${categoryRange}). ${scoreDescription}`,
                }}
                variant="chip"
                size="xs"
              />
              <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                Score: <strong className="text-stone-900">{totalScore}/100</strong>
              </span>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-2">
            {category === 'Low' && 'Stable Agro-Climatic & Financial Conditions'}
            {category === 'Moderate' && 'Moderate Risk — Active Surveillance Recommended'}
            {category === 'High' && 'High Risk Alert — Immediate Field & Market Intervention'}
            {category === 'Critical' && 'Critical Emergency — Severe Stress Across Multiple Vectors'}
          </h2>

          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            {scoreDescription}
          </p>

          {/* Quick 4-Factors Contribution Mini Bar */}
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80">
            <div className="text-xs font-semibold text-stone-700 mb-2 flex items-center justify-between">
              <span>Mathematical Weighted Composition</span>
              <span className="font-mono text-stone-500">100% Total Base</span>
            </div>

            {/* Stacked Progress Bar */}
            <div className="h-3 w-full bg-stone-200 rounded-full flex overflow-hidden">
              <div
                style={{ width: `${(riskData.factors.rainfall.weightedContribution / Math.max(1, totalScore)) * 100}%` }}
                className="bg-sky-500 transition-all duration-500"
                title={`Rainfall Risk Contribution: ${riskData.factors.rainfall.weightedContribution} pts (Weight 30%)`}
              />
              <div
                style={{ width: `${(riskData.factors.cropWeather.weightedContribution / Math.max(1, totalScore)) * 100}%` }}
                className="bg-emerald-500 transition-all duration-500"
                title={`Crop/Weather Risk Contribution: ${riskData.factors.cropWeather.weightedContribution} pts (Weight 25%)`}
              />
              <div
                style={{ width: `${(riskData.factors.market.weightedContribution / Math.max(1, totalScore)) * 100}%` }}
                className="bg-amber-500 transition-all duration-500"
                title={`Market Risk Contribution: ${riskData.factors.market.weightedContribution} pts (Weight 25%)`}
              />
              <div
                style={{ width: `${(riskData.factors.paymentDue.weightedContribution / Math.max(1, totalScore)) * 100}%` }}
                className="bg-rose-500 transition-all duration-500"
                title={`Payment Due Risk Contribution: ${riskData.factors.paymentDue.weightedContribution} pts (Weight 20%)`}
              />
            </div>

            {/* Mini Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5 text-[11px] text-stone-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                <span className="truncate">Rain (30%): <strong>{riskData.factors.rainfall.weightedContribution}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">Crop/Wx (25%): <strong>{riskData.factors.cropWeather.weightedContribution}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="truncate">Market (25%): <strong>{riskData.factors.market.weightedContribution}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="truncate">Credit (20%): <strong>{riskData.factors.paymentDue.weightedContribution}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
