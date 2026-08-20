import React from 'react';
import { AgriculturalRiskScore } from '../../types';
import { AlertCircle, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';

interface RiskReasonsCardProps {
  riskData: AgriculturalRiskScore;
}

export const RiskReasonsCard: React.FC<RiskReasonsCardProps> = ({ riskData }) => {
  const { t } = useLanguage();
  const { reasons, category } = riskData;

  const getReasonsSpeechText = () => {
    return {
      hi: `जोखिम के मुख्य कारण: प्राथमिक जोखिम कारक हैं: ${reasons.keyDrivers.join('। ')}। राहत देने वाले कारक: ${reasons.mitigatingFactors.join('। ')}।`,
      or: `ବିପଦର ମୁଖ୍ୟ କାରଣ: ${reasons.keyDrivers.join('। ')}। ସୁରକ୍ଷା କାରକ: ${reasons.mitigatingFactors.join('। ')}।`,
      en: `Risk Drivers and Mitigating Factors: Primary risk drivers include: ${reasons.keyDrivers.join('. ')}. Mitigating factors: ${reasons.mitigatingFactors.join('. ')}.`,
    };
  };

  return (
    <div
      id="risk-reasons-card"
      className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 mb-6"
    >
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-stone-100 rounded-xl text-stone-800">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {t('risk.reasonsHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Algorithmic attribution of climatic, entomological, price, and credit conditions.
            </p>
          </div>
        </div>

        <ListenButton
          id="btn-listen-risk-reasons"
          text={getReasonsSpeechText()}
          variant="chip"
          size="sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Primary Risk Drivers */}
        <div className="bg-rose-50/40 border border-rose-200/80 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <h3 className="text-sm font-bold text-rose-950 uppercase tracking-wide">
              {t('risk.keyDrivers')}
            </h3>
          </div>

          <ul className="space-y-2.5">
            {reasons.keyDrivers.map((driver, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-stone-800 leading-relaxed bg-white/80 p-3 rounded-lg border border-rose-100 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                <span>{driver}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mitigating Factors */}
        <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
              {t('risk.mitigatingFactors')}
            </h3>
          </div>

          <ul className="space-y-2.5">
            {reasons.mitigatingFactors.map((mitigator, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-stone-800 leading-relaxed bg-white/80 p-3 rounded-lg border border-emerald-100 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                <span>{mitigator}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Regulatory Context Notice */}
      <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs text-stone-600">
        <span className="font-medium">
          Category Threshold: <strong>{category}</strong> ({riskData.categoryRange}) | Evaluated against CACP MSP & IMD Regional Weather Radar.
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 font-semibold text-emerald-800">
          <span>Action Protocol Synced</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
