import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Volume2, VolumeX, AlertCircle, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { speechService, SpeechState } from '../../services/speechService';
import { LanguageCode } from '../../i18n/translations';

export type MultilingualText =
  | string
  | {
      en?: string;
      hi?: string;
      or?: string;
    };

export interface ListenButtonProps {
  /**
   * The text or multilingual map to be spoken aloud.
   * Can also be a function evaluated lazily on click.
   */
  text: MultilingualText | (() => MultilingualText);

  /**
   * Button visual variant
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'chip'
    | 'amber'
    | 'rose'
    | 'emerald'
    | 'icon-only'
    | 'subtle';

  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Custom label when idle (if omitted, uses localized default "Listen / आवाज सुनें / ଶୁଣନ୍ତୁ")
   */
  label?: React.ReactNode;

  /**
   * Custom label when playing (if omitted, uses localized default "Stop / रोकें / ବନ୍ଦ କରନ୍ତୁ")
   */
  stopLabel?: React.ReactNode;

  /**
   * Show animated equalizer bars when speaking
   */
  showWaveAnimation?: boolean;

  /**
   * Optional custom class names
   */
  className?: string;

  /**
   * Unique ID attribute
   */
  id?: string;

  /**
   * Optional title / tooltip
   */
  title?: string;

  /**
   * Accessible aria-label
   */
  ariaLabel?: string;

  /**
   * Callback when speech starts
   */
  onStart?: () => void;

  /**
   * Callback when speech ends or stops
   */
  onEnd?: () => void;

  /**
   * Callback on speech error
   */
  onError?: (error: Error) => void;

  /**
   * Specific language override (defaults to current app language)
   */
  lang?: LanguageCode;
}

export const ListenButton: React.FC<ListenButtonProps> = ({
  text,
  variant = 'outline',
  size = 'sm',
  label,
  stopLabel,
  showWaveAnimation = true,
  className = '',
  id,
  title,
  ariaLabel,
  onStart,
  onEnd,
  onError,
  lang,
}) => {
  const { language, t } = useLanguage();
  const activeLang = lang || language;

  const [speechState, setSpeechState] = useState<SpeechState>(speechService.getState());
  const [activeSpeechText, setActiveSpeechText] = useState<string | null>(speechService.getActiveText());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Subscribe to speech service events
  useEffect(() => {
    const unsubscribe = speechService.subscribe((state, text) => {
      setSpeechState(state);
      setActiveSpeechText(text);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Auto-dismiss error banner after 4.5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Resolve current string to speak
  const resolvedText = useMemo(() => {
    const raw = typeof text === 'function' ? text() : text;
    if (typeof raw === 'string') {
      return raw;
    }
    if (raw && typeof raw === 'object') {
      return raw[activeLang] || raw.en || raw.hi || raw.or || '';
    }
    return '';
  }, [text, activeLang]);

  // Is THIS specific button currently speaking?
  const cleanTargetText = useMemo(() => speechService.sanitizeText(resolvedText), [resolvedText]);
  const isThisButtonPlaying = speechState === 'speaking' && activeSpeechText === cleanTargetText;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);

    // If currently playing, stop it
    if (isThisButtonPlaying) {
      speechService.stop();
      onEnd?.();
      return;
    }

    // If speech is not supported in this browser
    if (!speechService.isSupported()) {
      const friendlyMsg =
        activeLang === 'hi'
          ? 'इस ब्राउज़र पर ऑडियो आवाज समर्थित नहीं है। सभी सुविधाएं सामान्य रूप से काम कर रही हैं।'
          : activeLang === 'or'
          ? 'ଏହି ବ୍ରାଉଜରରେ ଅଡିଓ ସୁବିଧା ଉପଲବ୍ଧ ନାହିଁ। ଆପ୍ ସ୍ୱାଭାବିକ ଭାବେ ଚାଲିବ।'
          : 'Voice audio playback is not supported on this browser/device. The app remains fully functional.';
      setErrorMessage(friendlyMsg);
      onError?.(new Error(friendlyMsg));
      return;
    }

    if (!cleanTargetText) {
      return;
    }

    try {
      await speechService.speak({
        text: cleanTargetText,
        lang: activeLang,
        rate: 0.92,
        onStart: () => {
          onStart?.();
        },
        onEnd: () => {
          onEnd?.();
        },
        onError: (err) => {
          const friendlyMsg =
            activeLang === 'hi'
              ? 'ऑडियो प्लेबैक में समस्या आई। कृपया पुनः प्रयास करें।'
              : activeLang === 'or'
              ? 'ଅଡିଓ ଚଲାଇବାରେ ସମସ୍ୟା ହୋଇଛି। ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।'
              : 'Unable to play voice audio. Please check your browser sound settings.';
          setErrorMessage(friendlyMsg);
          onError?.(err);
        },
      });
    } catch {
      // Safe fallback
    }
  };

  // Localized default labels
  const defaultLabel = useMemo(() => {
    if (label) return label;
    if (activeLang === 'hi') return 'आवाज सुनें';
    if (activeLang === 'or') return 'ଶୁଣନ୍ତୁ';
    return 'Listen';
  }, [label, activeLang]);

  const defaultStopLabel = useMemo(() => {
    if (stopLabel) return stopLabel;
    if (activeLang === 'hi') return 'आवाज रोकें';
    if (activeLang === 'or') return 'ବନ୍ଦ କରନ୍ତୁ';
    return 'Stop';
  }, [stopLabel, activeLang]);

  // Size styling
  const sizeStyles = {
    xs: 'px-2 py-1 text-[11px] rounded-lg gap-1',
    sm: 'px-2.5 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-3.5 py-2 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'px-4 py-2.5 text-sm sm:text-base rounded-2xl gap-2.5',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // Variant styling
  const getVariantStyles = () => {
    if (isThisButtonPlaying) {
      return 'bg-amber-600 hover:bg-amber-700 text-white border-amber-700 shadow-xs animate-pulse';
    }

    switch (variant) {
      case 'primary':
      case 'emerald':
        return 'bg-emerald-800 hover:bg-emerald-900 text-white border-emerald-900 shadow-2xs active:scale-95';
      case 'amber':
        return 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-2xs hover:border-amber-400 active:scale-95';
      case 'rose':
        return 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300 shadow-2xs hover:border-rose-400 active:scale-95';
      case 'chip':
        return 'bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border-stone-200 hover:border-emerald-300 shadow-2xs font-semibold';
      case 'subtle':
        return 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 border-stone-200 active:scale-95 font-medium';
      case 'ghost':
        return 'bg-transparent hover:bg-black/5 text-stone-700 border-transparent active:scale-95';
      case 'icon-only':
        return 'bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border-stone-300 hover:border-emerald-400 p-2 rounded-xl shadow-2xs';
      case 'secondary':
      case 'outline':
      default:
        return 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 hover:border-stone-400 shadow-2xs active:scale-95';
    }
  };

  const defaultTitle = isThisButtonPlaying
    ? defaultStopLabel
    : title || (typeof defaultLabel === 'string' ? defaultLabel : 'Listen to voice readout');

  return (
    <div className="relative inline-flex items-center">
      <button
        id={id || `btn-listen-${Math.random().toString(36).substring(2, 7)}`}
        type="button"
        onClick={handleClick}
        title={defaultTitle as string}
        aria-label={ariaLabel || (typeof defaultTitle === 'string' ? defaultTitle : 'Listen')}
        className={`inline-flex items-center justify-center font-semibold border transition-all cursor-pointer select-none shrink-0 ${
          variant === 'icon-only' ? 'p-2 rounded-xl' : sizeStyles[size]
        } ${getVariantStyles()} ${className}`}
      >
        {isThisButtonPlaying ? (
          <>
            <VolumeX className={`${iconSizes[size]} shrink-0`} />
            {variant !== 'icon-only' && (
              <span className="truncate">{defaultStopLabel}</span>
            )}
            {showWaveAnimation && (
              <span className="flex items-center gap-0.5 ml-0.5">
                <span className="w-0.5 h-3 bg-white animate-bounce rounded-full" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-4 bg-white animate-bounce rounded-full" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-2.5 bg-white animate-bounce rounded-full" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </>
        ) : (
          <>
            <Volume2 className={`${iconSizes[size]} ${variant === 'amber' ? 'text-amber-700' : variant === 'rose' ? 'text-rose-700' : 'text-emerald-700'} shrink-0`} />
            {variant !== 'icon-only' && (
              <span className="truncate">{defaultLabel}</span>
            )}
          </>
        )}
      </button>

      {/* Friendly Error Tooltip Popover (If speech is unavailable or fails) */}
      {errorMessage && (
        <div
          role="alert"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-stone-900 text-white text-xs rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 flex items-start gap-2 border border-stone-700"
        >
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11px] leading-tight text-stone-200">
            {errorMessage}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setErrorMessage(null);
            }}
            className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
