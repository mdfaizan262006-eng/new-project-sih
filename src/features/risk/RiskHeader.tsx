import React from 'react';
import { ShieldAlert, Info, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AgriculturalRiskScore } from '../../types';
import { ListenButton } from '../../components/shared/ListenButton';

interface RiskHeaderProps {
  cropName: string;
  district: string;
  assessmentDate: string;
  riskData: AgriculturalRiskScore;
}

export const RiskHeader: React.FC<RiskHeaderProps> = ({
  cropName,
  district,
  assessmentDate,
  riskData,
}) => {
  const { t } = useLanguage();

  const getRiskSpeechText = () => {
    const score = riskData.totalScore;
    const cat = riskData.category;
    const crop = riskData.cropName;
    const primaryAction = riskData.recommendedActions[0];

    return {
      hi: `कृषि जोखिम रिपोर्ट: आपकी फसल ${crop} का समग्र जोखिम स्कोर 100 में से ${score} है, जो ${
        cat === 'Low'
          ? 'कम जोखिम'
          : cat === 'Moderate'
          ? 'मध्यम जोखिम'
          : cat === 'High'
          ? 'उच्च जोखिम'
          : 'गंभीर जोखिम'
      } श्रेणी में आता है। घटक कारक: वर्षा जोखिम ${riskData.factors.rainfall.score}, फसल मौसम जोखिम ${riskData.factors.cropWeather.score}, बाजार मूल्य जोखिम ${riskData.factors.market.score}, और ऋण भुगतान जोखिम ${riskData.factors.paymentDue.score} है। मुख्य अनुशंसित उपाय: ${primaryAction?.titleHindi || primaryAction?.title || 'खेत की निगरानी रखें'}।`,
      or: `କୃଷି ବିପଦ ବିବରଣୀ: ଆପଣଙ୍କ ଫସଲ ${crop} ର ସମୁଦାୟ ବିପଦ ସ୍କୋର ୧୦୦ ରୁ ${score} ଅଟେ। ଏହା ${cat} ବିପଦ ଶ୍ରେଣୀଭୁକ୍ତ। ବର୍ଷା ବିପଦ ${riskData.factors.rainfall.score}, ଫସଲ ପାଣିପାଗ ବିପଦ ${riskData.factors.cropWeather.score}, ବଜାର ଦର ବିପଦ ${riskData.factors.market.score}, ଏବଂ କିସ୍ତି ପ୍ରଦାନ ବିପଦ ${riskData.factors.paymentDue.score}। ମୁଖ୍ୟ ପଦକ୍ଷେପ: ${primaryAction?.titleOdia || primaryAction?.title || 'ଜମିର ଉପଯୁକ୍ତ ଯତ୍ନ ନିଅନ୍ତୁ'}।`,
      en: `Farmer Agricultural Risk Briefing: The composite agricultural risk score for ${crop} in ${district} is ${score} out of 100, classified as ${cat} risk. Component factors: Rainfall risk is ${riskData.factors.rainfall.score}, Crop and weather risk is ${riskData.factors.cropWeather.score}, Market price risk is ${riskData.factors.market.score}, and Payment due risk is ${riskData.factors.paymentDue.score}. Recommended primary action: ${primaryAction?.title || 'Follow field advisory'}.`,
    };
  };

  return (
    <div className="bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Disclaimer Notice Banner */}
        <div className="mb-4 bg-amber-50/80 border border-amber-200 rounded-xl p-3 sm:p-4 flex items-start gap-3">
          <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded">
                {t('risk.disclaimerBadge')}
              </span>
              <span className="text-xs font-semibold text-stone-500">
                Formula: Rainfall (30%) + Crop/Weather (25%) + Market (25%) + Payment Due (20%)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed font-medium">
              {t('risk.disclaimerNotice')}
            </p>
          </div>
        </div>

        {/* Main Title Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  {t('risk.title')}
                </h1>
                <p className="text-sm text-stone-600 mt-0.5">{t('risk.tagline')}</p>
              </div>
            </div>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm text-stone-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 rounded-md font-medium text-stone-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                {district}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 rounded-md font-medium text-stone-800">
                🌾 {cropName}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 rounded-md font-medium text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                {assessmentDate}
              </span>
            </div>
          </div>

          {/* Voice Audio Readout Action */}
          <div className="flex items-center gap-3">
            <ListenButton
              id="risk-btn-voice-readout"
              text={getRiskSpeechText()}
              variant="outline"
              size="md"
              label={t('risk.readoutVoice')}
              stopLabel={t('risk.readingOut')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
