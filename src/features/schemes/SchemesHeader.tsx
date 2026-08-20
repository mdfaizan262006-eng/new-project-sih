import React from 'react';
import {
  Landmark,
  Search,
  Filter,
  ShieldCheck,
  Info,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SchemeCategory } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';

interface SchemesHeaderProps {
  categories: {
    id: SchemeCategory;
    label: string;
    labelHindi: string;
    labelOdia: string;
    count: number;
  }[];
  activeCategory: SchemeCategory;
  onSelectCategory: (cat: SchemeCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  speechText: { en: string; hi: string; or: string } | string;
  showEligibilityTool: boolean;
  onToggleEligibilityTool: () => void;
}

const POPULAR_STATES = [
  'All India',
  'Madhya Pradesh',
  'Odisha',
  'Uttar Pradesh',
  'Maharashtra',
  'Rajasthan',
  'Bihar',
  'Punjab',
  'Gujarat',
];

export const SchemesHeader: React.FC<SchemesHeaderProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedState,
  onStateChange,
  speechText,
  showEligibilityTool,
  onToggleEligibilityTool,
}) => {
  const { language } = useLanguage();

  return (
    <div id="schemes-header-container" className="bg-white border-b border-stone-200">
      {/* Top Banner: Title & Voice Assistant */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center text-emerald-800 shrink-0 shadow-xs">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  {language === 'hi'
                    ? 'सरकारी योजनाएं एवं प्रत्यक्ष लाभ (DBT)'
                    : language === 'or'
                    ? 'ସରକାରୀ ଯୋଜନା ଓ ସହାୟତା ପୋର୍ଟାଲ'
                    : 'Government Schemes & Direct Benefits'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'hi'
                    ? 'सत्यापित सरकारी स्रोत'
                    : language === 'or'
                    ? 'ସରକାରୀ ପ୍ରମାଣିତ'
                    : 'Verified Govt Portals'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Demo 2026 Batch Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
                {language === 'hi'
                  ? 'केंद्रीय एवं राज्य कृषि कल्याण योजनाओं, प्रत्यक्ष नकद सब्सिडी, फसल बीमा, सोलर पंप अनुदान, एवं रियायती कृषि ऋण (KCC) की संपूर्ण आधिकारिक जानकारी।'
                  : language === 'or'
                  ? 'କେନ୍ଦ୍ର ଓ ରାଜ୍ୟ ସରକାରଙ୍କ କୃଷି ସହାୟତା ଯୋଜନା, ଫସଲ ବୀମା, ସୌର ପମ୍ପ ଓ ଶସ୍ତା କୃଷି ଋଣର ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ।'
                  : 'Comprehensive directory of Central & State agricultural welfare programs, direct income transfers (PM-KISAN), subsidized crop insurance (PMFBY), solar pumps (PM-KUSUM), and low-interest credit (KCC).'}
              </p>
            </div>
          </div>

          {/* Action Buttons: Voice & Eligibility Scanner */}
          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              id="btn-schemes-eligibility-toggle"
              onClick={onToggleEligibilityTool}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                showEligibilityTool
                  ? 'bg-emerald-800 text-white hover:bg-emerald-900'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                {showEligibilityTool
                  ? language === 'hi'
                    ? 'पात्रता जांच बंद करें'
                    : 'Close Eligibility Tool'
                  : language === 'hi'
                  ? 'मेरी पात्रता जांचें'
                  : 'Check My Eligibility'}
              </span>
            </button>

            <ListenButton
              id="btn-schemes-audio-brief"
              text={speechText}
              variant="outline"
              size="md"
              label={language === 'hi' ? 'योजनाएं सुनें' : 'Audio Guide'}
              stopLabel={language === 'hi' ? 'आवाज बंद करें' : 'Stop Audio'}
            />
          </div>
        </div>

        {/* OFFICIAL SOURCE DISCLAIMER NOTICE BANNER */}
        <div
          id="official-source-disclaimer-banner"
          className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 flex items-start gap-3 shadow-2xs"
        >
          <div className="p-1 rounded-lg bg-amber-200/60 text-amber-900 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm leading-relaxed">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">
                Official Source & Advisory Notice
              </span>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-900">
                Sample Demonstration Cycles Labeled
              </span>
            </div>
            <p className="text-stone-700">
              <strong className="text-stone-900">KrishiDrishti</strong> provides structured decision-support guides, document checklists, and direct links to official government portals (such as <em>pmkisan.gov.in</em>, <em>pmfby.gov.in</em>, <em>agrimachinery.nic.in</em>, and <em>pmkusum.mnre.gov.in</em>). All scheme guidelines, grant cycles, and statutory terms are governed strictly by the respective Central and State Ministries.
              <span className="block mt-1 text-stone-600">
                Farmers must complete formal applications, biometric e-KYC, and land registration directly on official government portals or at authorized Common Service Centers (CSC / Krishi Vigyan Kendra).
              </span>
            </p>
          </div>
        </div>

        {/* Search Bar & State Filter */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-schemes-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'योजना का नाम, लाभ या कीवर्ड खोजें (उदा. PM-KISAN, ट्रैक्टर, सोलर, 6000)...'
                  : language === 'or'
                  ? 'ଯୋଜନା ନାମ କିମ୍ବା ସବସିଡି ଖୋଜନ୍ତୁ...'
                  : 'Search scheme by name, benefit, or keyword (e.g. PM-KISAN, Tractor, Solar, 6000)...'
              }
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* State / Region Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="select-schemes-state"
                value={selectedState}
                onChange={(e) => onStateChange(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white cursor-pointer transition-all shadow-2xs appearance-none"
              >
                {POPULAR_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state === 'All India' ? '🌐 All India (National)' : `📍 ${state}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>

          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const label =
              language === 'hi'
                ? cat.labelHindi
                : language === 'or'
                ? cat.labelOdia
                : cat.label;

            return (
              <button
                key={cat.id}
                id={`btn-cat-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/80'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected
                      ? 'bg-emerald-950 text-emerald-200'
                      : 'bg-stone-200/80 text-stone-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
