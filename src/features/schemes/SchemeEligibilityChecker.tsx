import React, { useState, useMemo } from 'react';
import {
  SchemeInfo,
} from '../../types';
import {
  schemesService,
} from '../../services/schemesService';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface SchemeEligibilityCheckerProps {
  schemes: SchemeInfo[];
  onSelectScheme: (scheme: SchemeInfo) => void;
  onClose: () => void;
}

export const SchemeEligibilityChecker: React.FC<SchemeEligibilityCheckerProps> = ({
  schemes,
  onSelectScheme,
  onClose,
}) => {
  const { language } = useLanguage();

  // Farmer test parameters
  const [landAcres, setLandAcres] = useState<number>(4.5);
  const [landOwnership, setLandOwnership] = useState<'owner' | 'tenant' | 'sharecropper' | 'other'>('owner');
  const [hasAadhaar, setHasAadhaar] = useState<boolean>(true);
  const [hasBankPassbook, setHasBankPassbook] = useState<boolean>(true);
  const [hasKhasraRoR, setHasKhasraRoR] = useState<boolean>(true);

  // Evaluate eligibility across all schemes
  const evaluationResults = useMemo(() => {
    return schemes.map((scheme) => {
      const evaluation = schemesService.evaluateEligibility(scheme, {
        landAcres,
        landOwnership,
        hasAadhaar,
        hasBankPassbook,
        hasKhasraRoR,
      });

      return {
        scheme,
        evaluation,
      };
    });
  }, [schemes, landAcres, landOwnership, hasAadhaar, hasBankPassbook, hasKhasraRoR]);

  const eligibleCount = evaluationResults.filter(
    (r) => r.evaluation.status === 'eligible' || r.evaluation.status === 'likely_eligible'
  ).length;

  return (
    <div
      id="scheme-eligibility-tool-panel"
      className="bg-white rounded-3xl border border-emerald-200 shadow-sm overflow-hidden mb-6 animate-in fade-in slide-in-from-top-4 duration-200"
    >
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-emerald-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-emerald-300" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Instant Farmer Eligibility Scanner
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-700 text-emerald-100">
              Interactive Rule Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed max-w-2xl">
            Adjust your land holding size, ownership category, and available documents to instantly match against statutory eligibility criteria across all central and state welfare schemes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => {
              setLandAcres(4.5);
              setLandOwnership('owner');
              setHasAadhaar(true);
              setHasBankPassbook(true);
              setHasKhasraRoR(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold cursor-pointer"
          >
            Hide Scanner
          </button>
        </div>
      </div>

      {/* Input Controls Bar */}
      <div className="p-5 sm:p-6 bg-stone-50 border-b border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Land Holding Size Slider */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <label className="text-xs font-bold text-stone-800">
                1. Total Land Holding Size:
              </label>
              <span className="text-xs font-black text-emerald-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                {landAcres} Acres ({((landAcres * 0.404686).toFixed(1))} Ha)
              </span>
            </div>
            <input
              id="slider-eligibility-land"
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={landAcres}
              onChange={(e) => setLandAcres(parseFloat(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium mt-1">
              <span>0.5 Ac (Marginal)</span>
              <span>5.0 Ac (2 Ha Ceiling)</span>
              <span>20+ Ac (Large)</span>
            </div>
          </div>

          {/* 2. Ownership Status */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1.5">
              2. Cultivator Land Ownership Type:
            </label>
            <select
              id="select-eligibility-ownership"
              value={landOwnership}
              onChange={(e) => setLandOwnership(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none cursor-pointer"
            >
              <option value="owner">Landowner Cultivator (Patta Holder)</option>
              <option value="tenant">Tenant Farmer (Oral / Registered Lease)</option>
              <option value="sharecropper">Sharecropper (Bataidar)</option>
            </select>
            <span className="text-[10px] text-stone-500 mt-1 block">
              PM-KISAN requires title; PMFBY covers tenant & sharecroppers.
            </span>
          </div>

          {/* 3. Document Readiness Toggles */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1.5">
              3. Current Document Readiness:
            </label>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAadhaar}
                  onChange={(e) => setHasAadhaar(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>Aadhaar Link</span>
              </label>

              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBankPassbook}
                  onChange={(e) => setHasBankPassbook(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>Bank NPCI</span>
              </label>

              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasKhasraRoR}
                  onChange={(e) => setHasKhasraRoR(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>Khasra / RoR</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Match Results Grid */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
            <span>Eligibility Scan Results</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
              {eligibleCount} of {schemes.length} Schemes Matched
            </span>
          </h4>
          <span className="text-[11px] text-stone-500">
            Tap any scheme to see application guide
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {evaluationResults.map(({ scheme, evaluation }) => {
            const isEligible = evaluation.status === 'eligible' || evaluation.status === 'likely_eligible';

            return (
              <div
                key={scheme.id}
                onClick={() => onSelectScheme(scheme)}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer hover:shadow-xs ${
                  isEligible
                    ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400'
                    : 'bg-stone-50 border-stone-200/80 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white text-stone-800 border border-stone-200">
                      {scheme.shortCode}
                    </span>
                    {isEligible ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        {evaluation.matchScorePercent}% Match
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3 text-amber-700" />
                        Condition Check
                      </span>
                    )}
                  </div>

                  <h5 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                    {scheme.name}
                  </h5>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    {scheme.benefits[0]?.amountOrMetric || scheme.subtitle}
                  </p>

                  <div className="mt-2.5 text-[11px] text-stone-600 space-y-1">
                    {evaluation.reasons.slice(0, 2).map((r, idx) => (
                      <div key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-700 shrink-0">•</span>
                        <span className="line-clamp-1">{r}</span>
                      </div>
                    ))}
                  </div>

                  {evaluation.missingDocs.length > 0 && (
                    <div className="mt-2 text-[10px] text-rose-700 font-medium bg-rose-50 p-1.5 rounded-lg border border-rose-200">
                      Missing: {evaluation.missingDocs.join(', ')}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-emerald-800 font-bold">
                  <span>View Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
