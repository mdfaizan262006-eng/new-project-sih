import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, AlertCircle, X } from 'lucide-react';
import { sttService } from '../../services/sttService';
import { useLanguage } from '../../i18n/LanguageContext';

export interface VoiceSearchButtonProps {
  id: string;
  onTranscript: (transcript: string, cleanQuery: string) => void;
  onError?: (errorMessage: string) => void;
  variant?: 'embedded' | 'button' | 'icon';
  size?: 'sm' | 'md';
  placeholderExample?: string;
  className?: string;
  title?: string;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  id,
  onTranscript,
  onError,
  variant = 'embedded',
  size = 'md',
  placeholderExample,
  className = '',
  title,
}) => {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      sttService.stopListening();
    };
  }, []);

  const showTemporaryFeedback = (msg: string, durationMs: number = 4000) => {
    setFeedbackMessage(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFeedbackMessage(null);
    }, durationMs);
  };

  const handleToggleListening = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isListening) {
      sttService.stopListening();
      setIsListening(false);
      setFeedbackMessage(null);
      return;
    }

    if (!sttService.isSupported()) {
      const msg = t('voice.micAccessFailed');
      showTemporaryFeedback(msg);
      onError?.(msg);
      return;
    }

    setFeedbackMessage(t('voice.listening'));

    const started = sttService.startListening({
      language: language as 'en' | 'hi' | 'or',
      onStart: () => {
        setIsListening(true);
      },
      onResult: (transcript, cleanQuery) => {
        setIsListening(false);
        setFeedbackMessage(null);
        onTranscript(transcript, cleanQuery);
      },
      onError: (errMsg) => {
        setIsListening(false);
        const fallbackMsg = t('voice.micAccessFailed');
        showTemporaryFeedback(fallbackMsg);
        onError?.(errMsg || fallbackMsg);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    if (!started) {
      setIsListening(false);
      showTemporaryFeedback(t('voice.micAccessFailed'));
    }
  };

  const exampleText = placeholderExample || t('voice.example');
  const buttonTitle = title || (isListening ? t('voice.stopListening') : t('voice.tapToSpeak'));

  return (
    <div className="relative inline-flex items-center">
      {variant === 'embedded' ? (
        <button
          type="button"
          id={id}
          onClick={handleToggleListening}
          title={buttonTitle}
          aria-label={buttonTitle}
          className={`relative p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
            isListening
              ? 'bg-rose-500 text-white shadow-md animate-pulse ring-2 ring-rose-300'
              : 'text-stone-400 hover:text-emerald-700 hover:bg-stone-100'
          } ${className}`}
        >
          {isListening ? (
            <>
              <MicOff className={size === 'sm' ? 'w-4 h-4' : 'w-4 h-4 text-white'} />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
              </span>
            </>
          ) : (
            <Mic className={size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5'} />
          )}
        </button>
      ) : variant === 'button' ? (
        <button
          type="button"
          id={id}
          onClick={handleToggleListening}
          title={buttonTitle}
          aria-label={buttonTitle}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs border ${
            isListening
              ? 'bg-rose-600 text-white border-rose-700 ring-2 ring-rose-300 animate-pulse'
              : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300 hover:border-emerald-500'
          } ${className}`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>{t('voice.stopListening')}</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-emerald-700" />
              <span>{t('voice.tapToSpeak')}</span>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          id={id}
          onClick={handleToggleListening}
          title={buttonTitle}
          aria-label={buttonTitle}
          className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center border ${
            isListening
              ? 'bg-rose-500 text-white border-rose-600 shadow-md animate-pulse ring-2 ring-rose-300'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200 hover:text-emerald-700'
          } ${className}`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      )}

      {/* Floating Status & Example Tooltip Overlay when listening or on feedback */}
      {(isListening || feedbackMessage) && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[220px] max-w-[280px] bg-stone-900 text-white text-xs rounded-xl p-2.5 shadow-xl border border-stone-700 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 font-bold">
              {isListening ? (
                <>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  <span className="text-rose-300">{t('voice.listening')}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-amber-200">{feedbackMessage}</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setFeedbackMessage(null)}
              className="text-stone-400 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {isListening && (
            <p className="text-[11px] text-stone-300 italic">
              {exampleText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
