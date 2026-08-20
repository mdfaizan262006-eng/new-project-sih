import React from 'react';
import { CropMarketData } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CropSelectorBarProps {
  crops: CropMarketData[];
  selectedCropId: string;
  onSelectCrop: (cropId: string) => void;
}

export const CropSelectorBar: React.FC<CropSelectorBarProps> = ({
  crops,
  selectedCropId,
  onSelectCrop,
}) => {
  const { language } = useLanguage();

  const getLocalizedName = (crop: CropMarketData) => {
    if (language === 'hi') return crop.cropHindi;
    if (language === 'or') return crop.cropOdia;
    return crop.cropName;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
          Select Commodity / फसल चुनें
        </h2>
        <span className="text-xs text-stone-500">
          Showing {crops.length} Commodities
        </span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-200">
        {crops.map((crop) => {
          const isSelected = crop.cropId === selectedCropId;
          const isTrendUp = crop.overallTrend === 'increasing';
          const isTrendDown = crop.overallTrend === 'decreasing';

          return (
            <button
              key={crop.cropId}
              id={`crop-pill-${crop.cropId}`}
              onClick={() => onSelectCrop(crop.cropId)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-300 hover:bg-stone-50 shadow-2xs'
              }`}
            >
              <span className="text-xl" role="img" aria-label={crop.cropName}>
                {crop.icon}
              </span>
              <div>
                <div className="font-bold text-xs sm:text-sm whitespace-nowrap">
                  {getLocalizedName(crop)}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`font-extrabold text-xs ${
                      isSelected ? 'text-emerald-200' : 'text-stone-900'
                    }`}
                  >
                    ₹{crop.avgModalPrice.toLocaleString('en-IN')}
                  </span>
                  <span
                    className={`inline-flex items-center text-[10px] font-bold px-1 rounded ${
                      isSelected
                        ? isTrendUp
                          ? 'bg-emerald-700 text-emerald-100'
                          : isTrendDown
                          ? 'bg-rose-900 text-rose-100'
                          : 'bg-emerald-900 text-stone-200'
                        : isTrendUp
                        ? 'bg-emerald-100 text-emerald-800'
                        : isTrendDown
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {isTrendUp ? (
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" />
                    ) : isTrendDown ? (
                      <TrendingDown className="w-2.5 h-2.5 mr-0.5 inline" />
                    ) : (
                      <Minus className="w-2.5 h-2.5 mr-0.5 inline" />
                    )}
                    {crop.priceChangePercent > 0 ? `+${crop.priceChangePercent}%` : `${crop.priceChangePercent}%`}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
