import React from 'react';
import { Sparkles, Search, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';
import { VoiceSearchButton } from '../../components/shared/VoiceSearchButton';

interface MarketHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onVoiceSearch?: (transcript: string, cleanQuery: string) => void;
  selectedState: string;
  onStateChange: (s: string) => void;
  speechText: { en: string; hi: string; or: string } | string;
  lastUpdated: string;
}

export const MarketHeader: React.FC<MarketHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onVoiceSearch,
  selectedState,
  onStateChange,
  speechText,
  lastUpdated,
}) => {
  const { t } = useLanguage();

  const handleVoiceTranscript = (transcript: string, cleanQuery: string) => {
    if (onVoiceSearch) {
      onVoiceSearch(transcript, cleanQuery);
    } else {
      onSearchChange(cleanQuery || transcript);
    }
  };

  return (
    <div className="bg-white border-b border-emerald-100/80 shadow-xs mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Top bar: Demo badge + Live timestamp + Voice button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              id="market-demo-data-badge"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-500 text-white shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t('market.demoBadge')}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-stone-600 font-medium bg-stone-100 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t('market.demoDisclaimer')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden sm:inline-block">
              {t('market.date')}: <strong className="text-stone-800 font-semibold">{lastUpdated}</strong>
            </span>
            <ListenButton
              id="market-voice-toggle-btn"
              text={speechText}
              variant="outline"
              size="sm"
              label={t('advisory.listenVoice')}
              stopLabel={t('advisory.stopVoice')}
            />
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <span>{t('market.title')}</span>
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            {t('market.tagline')}
          </p>
        </div>

        {/* Search & State filter toolbar with Microphone speech-to-text button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-stone-100">
          <div className="relative flex-1 flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              id="market-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('market.searchMandi')}
              className="w-full pl-9 pr-20 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
            {/* Clear Button if input has text */}
            {searchQuery && (
              <button
                type="button"
                id="market-clear-search-btn"
                onClick={() => onSearchChange('')}
                className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 rounded-md"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            {/* Microphone Speech to Text Button */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <VoiceSearchButton
                id="market-mic-search-btn"
                onTranscript={handleVoiceTranscript}
                variant="embedded"
                size="sm"
                placeholderExample={'Try: "What is today\'s wheat price?"'}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              id="market-state-filter"
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value)}
              className="px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            >
              <option value="All">{t('market.allStates')}</option>
              <option value="Madhya Pradesh">Madhya Pradesh (Malwa & Nimar)</option>
              <option value="Odisha">Odisha (Western & Coastal)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

