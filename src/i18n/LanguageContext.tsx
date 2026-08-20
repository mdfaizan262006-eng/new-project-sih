import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { LanguageCode, LanguageInfo, SUPPORTED_LANGUAGES, translations } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>, defaultText?: string) => string;
  currentLanguageInfo: LanguageInfo;
  supportedLanguages: LanguageInfo[];
}

const STORAGE_KEY_LANG = 'krishidrishti_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG) as LanguageCode;
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'or')) {
        return saved;
      }
    } catch {
      // Storage access fail
    }
    return 'en';
  });

  const setLanguage = useCallback((newLang: LanguageCode) => {
    if (newLang === 'en' || newLang === 'hi' || newLang === 'or') {
      setLanguageState(newLang);
      try {
        localStorage.setItem(STORAGE_KEY_LANG, newLang);
        // Also update stored user profile preferredLanguage if present
        const userJson = localStorage.getItem('krishidrishti_user');
        if (userJson) {
          const user = JSON.parse(userJson);
          user.preferredLanguage = newLang;
          localStorage.setItem('krishidrishti_user', JSON.stringify(user));
        }
      } catch {
        // Ignore storage write error
      }
    }
  }, []);

  // Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>, defaultText?: string): string => {
      const currentDict = translations[language] as Record<string, string> | undefined;
      const fallbackDict = translations.en as Record<string, string>;

      let text = currentDict?.[key] || fallbackDict?.[key] || defaultText || key;

      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
        });
      }

      return text;
    },
    [language]
  );

  const currentLanguageInfo = useMemo(() => {
    return SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES.en;
  }, [language]);

  const supportedLanguages = useMemo(() => {
    return Object.values(SUPPORTED_LANGUAGES);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      currentLanguageInfo,
      supportedLanguages,
    }),
    [language, setLanguage, t, currentLanguageInfo, supportedLanguages]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
