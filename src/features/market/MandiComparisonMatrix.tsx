import React, { useState } from 'react';
import { CropMarketData, MandiRecord } from '../../types';
import {
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Truck,
  MapPin,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface MandiComparisonMatrixProps {
  cropData: CropMarketData;
}

export const MandiComparisonMatrix: React.FC<MandiComparisonMatrixProps> = ({
  cropData,
}) => {
  const { t } = useLanguage();
  const [lotQuantity, setLotQuantity] = useState<number>(30); // Default 30 quintals

  const mandis = [...cropData.mandis].sort((a, b) => b.netPayoutPerQtl - a.netPayoutPerQtl);
  const bestMandi = mandis[0];
  const lowestMandi = mandis[mandis.length - 1];

  // Extra gain calculation on lot
  const bestMandiProfit = (bestMandi?.netPayoutPerQtl || 0) * lotQuantity;
  const lowestMandiProfit = (lowestMandi?.netPayoutPerQtl || 0) * lotQuantity;
  const extraGain = Math.max(0, bestMandiProfit - lowestMandiProfit);

  return (
    <div id="mandi-comparison-section" className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            <span>{t('market.comparisonTitle')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Compare regional APMC mandis by distance, transport cost, and true net in-hand payout.
          </p>
        </div>

        {/* Quantity lot selector pill */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-700 pl-2">
            Lot Size:
          </span>
          {[10, 30, 50, 100].map((qty) => (
            <button
              key={qty}
              onClick={() => setLotQuantity(qty)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                lotQuantity === qty
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              {qty} qtl
            </button>
          ))}
          <div className="flex items-center gap-1 pl-1">
            <input
              type="number"
              min="1"
              max="1000"
              value={lotQuantity}
              onChange={(e) => setLotQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-14 px-1.5 py-0.5 text-xs text-center font-bold bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-[11px] text-stone-500 pr-1">qtl</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mandis.map((mandi: MandiRecord, index: number) => {
          const isBest = index === 0;
          const grossLotRevenue = mandi.modalPrice * lotQuantity;
          const totalTransport = mandi.transportCostPerQtl * lotQuantity;
          const netLotProfit = mandi.netPayoutPerQtl * lotQuantity;
          const isTrendUp = mandi.trend === 'increasing';
          const isTrendDown = mandi.trend === 'decreasing';

          return (
            <div
              key={mandi.id}
              id={`mandi-card-${mandi.id}`}
              className={`rounded-2xl border transition-all p-5 flex flex-col justify-between relative ${
                isBest
                  ? 'bg-gradient-to-b from-emerald-50/90 to-white border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'
              }`}
            >
              {/* Best Mandi Banner Badge */}
              {isBest && (
                <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('market.bestMandi')}</span>
                </div>
              )}

              <div>
                {/* Mandi Header with Name & Distance */}
                <div className="flex items-start justify-between gap-2 mt-1 mb-2">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 leading-tight">
                      {mandi.mandiName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{mandi.district}, {mandi.state}</span>
                      <span>•</span>
                      <span className="font-semibold text-stone-700">{mandi.distanceKm} km</span>
                    </div>
                  </div>

                  {/* Trend pill */}
                  <span
                    className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                      isTrendUp
                        ? 'bg-emerald-100 text-emerald-800'
                        : isTrendDown
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isTrendUp && <TrendingUp className="w-3 h-3 mr-1" />}
                    {isTrendDown && <TrendingDown className="w-3 h-3 mr-1" />}
                    {mandi.trend === 'stable' && <Minus className="w-3 h-3 mr-1" />}
                    <span>{mandi.priceChange > 0 ? `+₹${mandi.priceChange}` : `${mandi.priceChange === 0 ? '±₹0' : `-₹${Math.abs(mandi.priceChange)}`}`}</span>
                  </span>
                </div>

                {/* Variety & Grade info */}
                <div className="bg-stone-50 rounded-lg px-2.5 py-1.5 mb-3 text-xs text-stone-600 flex justify-between items-center">
                  <span className="truncate">Variety: <strong>{mandi.variety}</strong></span>
                  <span className="text-[11px] text-stone-500 font-medium">{mandi.grade}</span>
                </div>

                {/* Price Breakdown Matrix */}
                <div className="space-y-2 mb-4">
                  {/* Mandi Modal Price */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-600">{t('market.pricePerQuintal')} (Modal):</span>
                    <span className="font-bold text-stone-900 text-sm">
                      ₹{mandi.modalPrice.toLocaleString('en-IN')} / qtl
                    </span>
                  </div>

                  {/* High & Low prices */}
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                    <span>Range: Low ₹{mandi.minPrice}</span>
                    <span>High ₹{mandi.maxPrice}</span>
                  </div>

                  {/* Transport Deduction */}
                  <div className="flex items-center justify-between text-xs text-stone-600 pt-1 border-t border-dashed border-stone-200">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-stone-400" />
                      {t('market.transportCost')}:
                    </span>
                    <span className="text-rose-700 font-semibold">
                      -₹{mandi.transportCostPerQtl} / qtl
                    </span>
                  </div>

                  {/* Net Payout / Quintal (Prominent) */}
                  <div
                    className={`flex items-center justify-between p-2.5 rounded-xl ${
                      isBest
                        ? 'bg-emerald-100/90 text-emerald-950 border border-emerald-300'
                        : 'bg-stone-100 text-stone-900'
                    }`}
                  >
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                        {t('market.netPayout')}
                      </div>
                      <div className="text-[10px] text-stone-500">In-hand after transport</div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-emerald-900">
                        ₹{mandi.netPayoutPerQtl.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-semibold text-emerald-800"> / qtl</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Lot Simulator Outcome for this Mandi */}
              <div className="pt-3 border-t border-stone-100">
                <div className="text-[11px] text-stone-500 font-semibold mb-1 flex justify-between">
                  <span>Payout for {lotQuantity} Quintals:</span>
                  <span className="text-stone-400">{mandi.date}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-stone-600">
                    Gross: ₹{grossLotRevenue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-black text-stone-900">
                    Net: ₹{netLotProfit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Profit Highlight Banner for Choosing Best Mandi */}
      {extraGain > 0 && (
        <div
          id="best-mandi-extra-gain-banner"
          className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xl shadow-sm">
              <Sparkles className="w-6 h-6 text-amber-900" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
                {t('market.bestAdvantage')}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-white">
                Sell at <span className="underline decoration-amber-400">{bestMandi.mandiName}</span> to earn{' '}
                <span className="text-amber-300 font-black">+₹{extraGain.toLocaleString('en-IN')} extra</span> on {lotQuantity} quintals!
              </div>
            </div>
          </div>

          <div className="text-right flex items-center gap-3">
            <div className="text-xs text-emerald-100 text-left sm:text-right">
              <div>Net In-Hand: <strong>₹{bestMandiProfit.toLocaleString('en-IN')}</strong></div>
              <div className="text-[11px] text-emerald-300">vs ₹{lowestMandiProfit.toLocaleString('en-IN')} in lowest mandi</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
