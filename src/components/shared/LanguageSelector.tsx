import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageCode } from '../../i18n/translations';
import { Languages, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'compact' | 'dropdown' | 'cards' | 'inline';
  className?: string;
  onLanguageSelect?: (lang: LanguageCode) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = '',
  onLanguageSelect,
}) => {
  const { language, setLanguage, supportedLanguages, currentLanguageInfo, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (lang: LanguageCode) => {
    setLanguage(lang);
    setIsOpen(false);
    if (onLanguageSelect) {
      onLanguageSelect(lang);
    }
  };

  // Card Grid Variant (Used in Onboarding & Settings)
  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {supportedLanguages.map((langItem) => {
          const isSelected = language === langItem.code;
          return (
            <button
              key={langItem.code}
              id={`lang-card-${langItem.code}`}
              type="button"
              onClick={() => handleSelect(langItem.code)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/30 text-emerald-950 shadow-xs'
                  : 'bg-white border-stone-200 hover:border-emerald-400 hover:bg-stone-50 text-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {langItem.code.toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900 leading-tight">
                    {langItem.nativeName}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">{langItem.name}</div>
                </div>
              </div>

              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Inline Switcher (Pill Row)
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/80 ${className}`}>
        {supportedLanguages.map((langItem) => {
          const isSelected = language === langItem.code;
          return (
            <button
              key={langItem.code}
              id={`lang-inline-${langItem.code}`}
              type="button"
              onClick={() => handleSelect(langItem.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200/70 hover:text-stone-900'
              }`}
            >
              {langItem.nativeName}
            </button>
          );
        })}
      </div>
    );
  }

  // Compact Icon Trigger
  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          id="lang-compact-btn"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
          title={t('lang.selectLanguage')}
        >
          <Languages className="w-3.5 h-3.5 text-emerald-700" />
          <span>{currentLanguageInfo.nativeName}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-44 bg-white border border-stone-200 rounded-2xl shadow-lg p-1.5 z-50">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 mb-1">
              {t('lang.selectLanguage')}
            </div>
            {supportedLanguages.map((langItem) => (
              <button
                key={langItem.code}
                id={`lang-compact-option-${langItem.code}`}
                type="button"
                onClick={() => handleSelect(langItem.code)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
                  language === langItem.code
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{langItem.nativeName} ({langItem.name})</span>
                {language === langItem.code && <Check className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default Standard Header Dropdown
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        id="header-lang-selector-btn"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-emerald-500 text-xs font-bold text-stone-800 transition-all shadow-xs cursor-pointer"
        aria-expanded={isOpen}
        aria-label={t('lang.selectLanguage')}
      >
        <Languages className="w-4 h-4 text-emerald-700 shrink-0" />
        <span className="font-semibold">{currentLanguageInfo.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 mb-1">
            {t('lang.selectLanguage')}
          </div>
          <div className="space-y-1">
            {supportedLanguages.map((langItem) => {
              const isSelected = language === langItem.code;
              return (
                <button
                  key={langItem.code}
                  id={`header-lang-item-${langItem.code}`}
                  type="button"
                  onClick={() => handleSelect(langItem.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/60'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-stone-900">{langItem.nativeName}</span>
                    <span className="text-[10px] text-stone-500 font-medium">{langItem.name}</span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
