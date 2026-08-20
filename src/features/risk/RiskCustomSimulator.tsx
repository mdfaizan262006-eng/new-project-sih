import React from 'react';
import { Sliders, X, RotateCcw, CreditCard, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface RiskCustomSimulatorProps {
  rainfall: number;
  cropWeather: number;
  market: number;
  paymentDue: number;
  hasLoan: boolean;
  loanDueDays: number;
  loanAmount: number;
  onUpdateValues: (vals: {
    rainfall: number;
    cropWeather: number;
    market: number;
    paymentDue: number;
    hasLoan: boolean;
    loanDueDays: number;
    loanAmount: number;
  }) => void;
  onReset: () => void;
  onClose: () => void;
}

export const RiskCustomSimulator: React.FC<RiskCustomSimulatorProps> = ({
  rainfall,
  cropWeather,
  market,
  paymentDue,
  hasLoan,
  loanDueDays,
  loanAmount,
  onUpdateValues,
  onReset,
  onClose,
}) => {
  const { t } = useLanguage();

  // Compute live preview
  const liveTotal = Math.round(
    (rainfall * 30) / 100 +
      (cropWeather * 25) / 100 +
      (market * 25) / 100 +
      (paymentDue * 20) / 100
  );

  const getPreviewCategory = (score: number) => {
    if (score <= 25) return { name: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (score <= 50) return { name: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (score <= 75) return { name: 'High', color: 'bg-orange-100 text-orange-800 border-orange-300' };
    return { name: 'Critical', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  };

  const cat = getPreviewCategory(liveTotal);

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-600/30 shadow-lg p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              {t('risk.customSimulator')}
            </h2>
            <p className="text-xs text-stone-500">
              Adjust individual parameters to evaluate live formula re-weighting.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 border border-stone-200"
            title="Reset to default baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            title="Close Custom Adjuster"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Live Calculated Output Header */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Simulated Composite Score
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-3xl font-black text-stone-900">{liveTotal}</span>
            <span className="text-sm font-semibold text-stone-400">/ 100</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-xl font-bold text-sm border ${cat.color}`}>
            {cat.name} Category
          </span>
        </div>

        <div className="text-xs font-mono text-stone-600 bg-white px-3 py-2 rounded-lg border border-stone-200">
          ({rainfall}×0.3) + ({cropWeather}×0.25) + ({market}×0.25) + ({paymentDue}×0.2) = <strong>{liveTotal}</strong>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Slider 1: Rainfall Risk (30%) */}
        <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>🌧️ Rainfall Risk</span>
              <span className="px-1.5 py-0.5 bg-sky-100 text-sky-800 rounded text-[10px] font-bold">
                Weight: 30%
              </span>
            </label>
            <span className="text-sm font-black text-stone-900 font-mono">
              {rainfall}/100 <span className="text-xs font-normal text-stone-500">(+{(rainfall * 0.3).toFixed(1)} pts)</span>
            </span>
          </div>
          <input
            id="slider-rainfall"
            type="range"
            min="0"
            max="100"
            value={rainfall}
            onChange={(e) =>
              onUpdateValues({
                rainfall: Number(e.target.value),
                cropWeather,
                market,
                paymentDue,
                hasLoan,
                loanDueDays,
                loanAmount,
              })
            }
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[10px] font-semibold text-stone-400 mt-1">
            <span>0 (Normal rain)</span>
            <span>50 (Heavy)</span>
            <span>100 (Cloudburst/Flood)</span>
          </div>
        </div>

        {/* Slider 2: Crop / Weather Risk (25%) */}
        <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>🌾 Crop & Weather Risk</span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                Weight: 25%
              </span>
            </label>
            <span className="text-sm font-black text-stone-900 font-mono">
              {cropWeather}/100 <span className="text-xs font-normal text-stone-500">(+{(cropWeather * 0.25).toFixed(1)} pts)</span>
            </span>
          </div>
          <input
            id="slider-crop-weather"
            type="range"
            min="0"
            max="100"
            value={cropWeather}
            onChange={(e) =>
              onUpdateValues({
                rainfall,
                cropWeather: Number(e.target.value),
                market,
                paymentDue,
                hasLoan,
                loanDueDays,
                loanAmount,
              })
            }
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] font-semibold text-stone-400 mt-1">
            <span>0 (Healthy canopy)</span>
            <span>50 (Moderate pests)</span>
            <span>100 (Severe infestation)</span>
          </div>
        </div>

        {/* Slider 3: Market Risk (25%) */}
        <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>📈 Market Price Risk</span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                Weight: 25%
              </span>
            </label>
            <span className="text-sm font-black text-stone-900 font-mono">
              {market}/100 <span className="text-xs font-normal text-stone-500">(+{(market * 0.25).toFixed(1)} pts)</span>
            </span>
          </div>
          <input
            id="slider-market"
            type="range"
            min="0"
            max="100"
            value={market}
            onChange={(e) =>
              onUpdateValues({
                rainfall,
                cropWeather,
                market: Number(e.target.value),
                paymentDue,
                hasLoan,
                loanDueDays,
                loanAmount,
              })
            }
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-[10px] font-semibold text-stone-400 mt-1">
            <span>0 (Price &gt; MSP +10%)</span>
            <span>50 (At MSP)</span>
            <span>100 (Severe crash &lt; -20%)</span>
          </div>
        </div>

        {/* Slider 4: Payment Due Risk (20%) */}
        <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>💳 Payment Due Risk</span>
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded text-[10px] font-bold">
                Weight: 20%
              </span>
            </label>
            <span className="text-sm font-black text-stone-900 font-mono">
              {paymentDue}/100 <span className="text-xs font-normal text-stone-500">(+{(paymentDue * 0.2).toFixed(1)} pts)</span>
            </span>
          </div>
          <input
            id="slider-payment-due"
            type="range"
            min="0"
            max="100"
            value={paymentDue}
            onChange={(e) =>
              onUpdateValues({
                rainfall,
                cropWeather,
                market,
                paymentDue: Number(e.target.value),
                hasLoan,
                loanDueDays,
                loanAmount,
              })
            }
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-[10px] font-semibold text-stone-400 mt-1">
            <span>0 (No debt / &gt;90d safe)</span>
            <span>50 (Due in 30 days)</span>
            <span>100 (Overdue / Default risk)</span>
          </div>
        </div>
      </div>

      {/* Strict Payment Info Verification / Ledger Controls */}
      <div className="bg-stone-100/80 rounded-xl p-4 border border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-stone-700" />
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {t('risk.creditTimeline')} (Verified Farm Ledger)
            </span>
          </div>
          <span className="text-[11px] text-stone-500 italic">
            *No synthetic debt is invented; strictly reflects farmer-provided ledger status
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-stone-600 font-medium mb-1">Credit Obligation Status</label>
            <select
              value={hasLoan ? 'kcc' : 'none'}
              onChange={(e) => {
                const has = e.target.value === 'kcc';
                onUpdateValues({
                  rainfall,
                  cropWeather,
                  market,
                  paymentDue: has ? 35 : 0,
                  hasLoan: has,
                  loanDueDays,
                  loanAmount,
                });
              }}
              className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:ring-1 focus:ring-emerald-500"
            >
              <option value="kcc">Active KCC (Kisan Credit Card)</option>
              <option value="none">No Active Loan / Self-Financed (0 Risk)</option>
            </select>
          </div>

          {hasLoan ? (
            <>
              <div>
                <label className="block text-stone-600 font-medium mb-1">Due Date Proximity</label>
                <select
                  value={loanDueDays}
                  onChange={(e) => {
                    const days = Number(e.target.value);
                    let computedPayScore = 15;
                    if (days <= 0) computedPayScore = 90;
                    else if (days <= 10) computedPayScore = 75;
                    else if (days <= 35) computedPayScore = 40;
                    else computedPayScore = 15;

                    onUpdateValues({
                      rainfall,
                      cropWeather,
                      market,
                      paymentDue: computedPayScore,
                      hasLoan,
                      loanDueDays: days,
                      loanAmount,
                    });
                  }}
                  className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="90">Due in 90+ days (Low stress)</option>
                  <option value="35">Due in 35 days (Approaching)</option>
                  <option value="8">Due in 8 days (Imminent)</option>
                  <option value="-2">Overdue by 2 days (Penalty active)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Amount Due</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1.5 text-stone-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) =>
                      onUpdateValues({
                        rainfall,
                        cropWeather,
                        market,
                        paymentDue,
                        hasLoan,
                        loanDueDays,
                        loanAmount: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg pl-6 pr-2 py-1.5 text-stone-800 font-mono font-medium focus:ring-1 focus:ring-emerald-500"
                    placeholder="45000"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="sm:col-span-2 flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold">
                Self-financed status: Payment Due risk remains at 0 with 0 penalty impact.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
