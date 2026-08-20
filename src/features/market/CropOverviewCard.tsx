import React from 'react';
import { CropMarketData } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  Calendar,
  Truck,
  Sparkles,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';

interface CropOverviewCardProps {
  cropData: CropMarketData;
  onOpenAlertModal: () => void;
}

export const CropOverviewCard: React.FC<CropOverviewCardProps> = ({
  cropData,
  onOpenAlertModal,
}) => {
  const { t, language } = useLanguage();

  const getLocalizedName = (crop: CropMarketData) => {
    if (language === 'hi') return crop.cropHindi;
    if (language === 'or') return crop.cropOdia;
    return crop.cropName;
  };

  const isTrendUp = cropData.overallTrend === 'increasing';
  const isTrendDown = cropData.overallTrend === 'decreasing';
  const isTrendStable = cropData.overallTrend === 'stable';

  // Government MSP difference calculation
  const hasMsp = cropData.msp > 0;
  const mspDiff = cropData.avgModalPrice - cropData.msp;
  const isAboveMsp = mspDiff >= 0;

  // Max price across history for chart scaling
  const maxHistoricalPrice = Math.max(...cropData.history7d.map((h) => h.highestPrice));
  const minHistoricalPrice = Math.min(...cropData.history7d.map((h) => h.lowestPrice));
  const priceRange = Math.max(1, maxHistoricalPrice - minHistoricalPrice);

  return (
    <div
      id={`crop-overview-${cropData.cropId}`}
      className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-6"
    >
      {/* Top Banner with DEMO Badge & Commodity Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-3xl shadow-inner">
              {cropData.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {getLocalizedName(cropData)}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {cropData.category}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5 flex items-center gap-2">
                <span>{cropData.cropName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  {t('market.date')}: {cropData.currentDate}
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <ListenButton
              id={`listen-crop-overview-${cropData.cropId}`}
              text={{
                hi: `${cropData.cropHindi} मंडी भाव: मॉडल भाव ₹${cropData.avgModalPrice} प्रति क्विंटल। उच्चतम ₹${cropData.highestPrice}, न्यूनतम ₹${cropData.lowestPrice}। सबसे बढ़िया मंडी ${cropData.bestMandiName} है, जहां शुद्ध भाव ₹${cropData.bestMandiNetPayout} प्रति क्विंटल मिल रहा है।`,
                or: `${cropData.cropOdia} ମଣ୍ଡି ଦର: ହାରାହାରି ଦର ₹${cropData.avgModalPrice}। ସର୍ବୋତ୍ତମ ମଣ୍ଡି ${cropData.bestMandiName}।`,
                en: `${cropData.cropName} market rates: Modal price is ₹${cropData.avgModalPrice} per quintal. Highest price is ₹${cropData.highestPrice} and lowest is ₹${cropData.lowestPrice}. Top recommended mandi is ${cropData.bestMandiName} with net payout of ₹${cropData.bestMandiNetPayout} per quintal.`,
              }}
              variant="outline"
              size="sm"
            />
            <button
              onClick={onOpenAlertModal}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('market.priceAlert')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid (Crop, Price/Quintal, Highest, Lowest, Best Mandi, Trend) */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 1. Modal / Average Price per Quintal */}
          <div
            id="metric-modal-price"
            className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
              <span>{t('market.modalPrice')}</span>
              <span className="text-[11px] font-normal text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                Avg Today
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-950">
                ₹{cropData.avgModalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-700 font-medium">/ quintal</span>
            </div>
            {/* Trend status */}
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span
                className={`inline-flex items-center font-bold px-2 py-0.5 rounded-full ${
                  isTrendUp
                    ? 'bg-emerald-100 text-emerald-800'
                    : isTrendDown
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                {isTrendUp && <TrendingUp className="w-3 h-3 mr-1" />}
                {isTrendDown && <TrendingDown className="w-3 h-3 mr-1" />}
                {isTrendStable && <Minus className="w-3 h-3 mr-1" />}
                <span>
                  {isTrendUp
                    ? t('market.increasing')
                    : isTrendDown
                    ? t('market.decreasing')
                    : t('market.stable')}
                </span>
                <span className="ml-1 opacity-90">
                  ({cropData.priceChangePercent > 0 ? `+${cropData.priceChangePercent}%` : `${cropData.priceChangePercent}%`})
                </span>
              </span>
            </div>
          </div>

          {/* 2. Highest Price & Lowest Price in Region */}
          <div
            id="metric-high-low-price"
            className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">
                Price Range (Min - Max)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                    <span>{t('market.highestPrice')}</span>
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    ₹{cropData.highestPrice.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-rose-700 font-medium flex items-center gap-0.5">
                    <ArrowDownRight className="w-3 h-3 text-rose-600" />
                    <span>{t('market.lowestPrice')}</span>
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    ₹{cropData.lowestPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Range bar visual */}
            <div className="mt-3">
              <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden flex">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        10,
                        ((cropData.avgModalPrice - cropData.lowestPrice) /
                          Math.max(1, cropData.highestPrice - cropData.lowestPrice)) *
                          100
                      )
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>₹{cropData.lowestPrice}</span>
                <span className="text-emerald-700 font-bold">Avg: ₹{cropData.avgModalPrice}</span>
                <span>₹{cropData.highestPrice}</span>
              </div>
            </div>
          </div>

          {/* 3. Best Mandi to Sell (Highest Net Return) */}
          <div
            id="metric-best-mandi"
            className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-4 shadow-2xs relative overflow-hidden"
          >
            <div className="absolute top-2 right-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-1.5 text-xs text-amber-900 font-bold mb-1">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>{t('market.bestMandi')}</span>
              </div>
              <ListenButton
                id={`listen-best-mandi-rec-${cropData.cropId}`}
                text={{
                  hi: `सर्वोत्तम बिक्री मंडी सिफारिश: ${cropData.bestMandiName}। मॉडल भाव ₹${cropData.bestMandiPrice} प्रति क्विंटल और परिवहन कटौती के बाद शुद्ध मुनाफा ₹${cropData.bestMandiNetPayout} प्रति क्विंटल मिलेगा।`,
                  or: `ସର୍ବୋତ୍ତମ ମଣ୍ଡି ସୁପାରିଶ: ${cropData.bestMandiName}। ଦର ₹${cropData.bestMandiPrice} ଏବଂ ଖର୍ଚ୍ଚ ପରେ ନିଟ୍ ₹${cropData.bestMandiNetPayout}।`,
                  en: `Best Mandi Recommendation: ${cropData.bestMandiName} offering modal price of ₹${cropData.bestMandiPrice} with estimated net in-hand payout of ₹${cropData.bestMandiNetPayout} per quintal.`,
                }}
                variant="chip"
                size="xs"
              />
            </div>
            <div className="text-base sm:text-lg font-black text-stone-900 truncate">
              {cropData.bestMandiName}
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl font-black text-amber-900">
                ₹{cropData.bestMandiPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-amber-800">/ qtl</span>
            </div>
            <div className="text-[11px] text-amber-950 font-semibold mt-2 flex items-center gap-1">
              <Truck className="w-3 h-3 text-amber-700" />
              <span>Net in-hand: ₹{cropData.bestMandiNetPayout.toLocaleString('en-IN')} / qtl</span>
            </div>
          </div>

          {/* 4. MSP Benchmark Card */}
          <div
            id="metric-msp-benchmark"
            className={`border rounded-xl p-4 flex flex-col justify-between ${
              hasMsp
                ? isAboveMsp
                  ? 'bg-blue-50/60 border-blue-200'
                  : 'bg-orange-50/60 border-orange-200'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-stone-600 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-stone-500" />
                  {t('market.mspComparison')}
                </span>
              </div>
              {hasMsp ? (
                <>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-stone-900">
                      ₹{cropData.msp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500">/ qtl (Govt Rate)</span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-md ${
                        isAboveMsp
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : 'bg-orange-100 text-orange-900 border border-orange-200'
                      }`}
                    >
                      {isAboveMsp ? `+₹${mspDiff} ${t('market.aboveMsp')}` : `-₹${Math.abs(mspDiff)} ${t('market.belowMsp')}`}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-base font-bold text-stone-700 mt-1">
                    Free Market Pricing
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Perishable horticultural produce. Not covered under standard CACP MSP.
                  </p>
                </>
              )}
            </div>

            <div className="text-[10px] text-stone-400 flex items-center gap-1 mt-2">
              <Info className="w-3 h-3" />
              <span>Source: CACP Kharif/Rabi MSP</span>
            </div>
          </div>
        </div>

        {/* 7-Day Trend Chart Sparkline Breakdown */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-stone-800 uppercase tracking-wide">
                {t('market.trend7d')}
              </span>
              <span className="text-xs text-stone-500">
                (7-Day Moving Avg & Day Range)
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                Modal Avg
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 inline-block"></span>
                Day Range (Min-Max)
              </span>
            </div>
          </div>

          {/* Bar / Sparkline Chart */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-3 items-end h-28 pt-4 pb-1 border-b border-stone-200">
            {cropData.history7d.map((day, idx) => {
              const heightPercent = Math.max(
                15,
                Math.min(
                  100,
                  ((day.avgPrice - minHistoricalPrice) / priceRange) * 80 + 20
                )
              );
              const isToday = idx === cropData.history7d.length - 1;

              return (
                <div
                  key={day.date}
                  className="flex flex-col items-center justify-end h-full group relative"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-mono shadow-md">
                    ₹{day.avgPrice} (H: ₹{day.highestPrice} / L: ₹{day.lowestPrice})
                  </div>

                  {/* Range indicator background pill */}
                  <div
                    className={`w-full max-w-[36px] rounded-t-lg transition-all flex flex-col justify-end items-center p-0.5 ${
                      isToday ? 'bg-emerald-700 text-white' : 'bg-emerald-500/80 hover:bg-emerald-600 text-white'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <span className="text-[9px] font-black leading-none mb-1 hidden sm:inline-block">
                      ₹{day.avgPrice}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] mt-1 font-semibold ${
                      isToday ? 'text-emerald-800 font-extrabold' : 'text-stone-500'
                    }`}
                  >
                    {day.date}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-stone-500 mt-2">
            <span>Total Regional Mandi Arrivals: <strong>{cropData.totalArrivalTonnes} Tonnes</strong></span>
            <span className="text-emerald-700 font-bold">
              {isTrendUp ? '🟢 Strong buying demand' : isTrendDown ? '🔴 Heavy arrival pressure' : '🟡 Balanced supply-demand'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
