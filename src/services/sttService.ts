// KrishiDrishti Speech-to-Text (STT) Voice Recognition Service
// Uses Web Speech Recognition API with multilingual support (Hindi, Odia, English) and intelligent agricultural intent extraction

// Type definitions for Web Speech API
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: {
    readonly length: number;
    [index: number]: SpeechRecognitionResultItem;
    isFinal?: boolean;
  };
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export interface STTListenOptions {
  language?: 'en' | 'hi' | 'or';
  onResult: (transcript: string, cleanQuery: string) => void;
  onError?: (errorMessage: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

class STTService {
  private recognition: SpeechRecognitionInstance | null = null;
  private isListeningState: boolean = false;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  public isListening(): boolean {
    return this.isListeningState;
  }

  /**
   * Helper to clean up conversational filler phrases from agricultural voice queries.
   * e.g. "What is today's wheat price?" -> "wheat"
   * e.g. "What is the price of soybean in Indore?" -> "soybean Indore"
   * e.g. "गेहूं का आज का भाव क्या है?" -> "गेहूं"
   */
  public cleanAgriQuery(rawText: string): string {
    if (!rawText) return '';
    let text = rawText.trim();

    // Common English search filler phrases
    const englishFillers = [
      /^what is the price of\s+/i,
      /^what is today's\s+/i,
      /^what is todays\s+/i,
      /^what is\s+/i,
      /^tell me the price of\s+/i,
      /^price of\s+/i,
      /^rate of\s+/i,
      /^mandi rate of\s+/i,
      /^mandi price of\s+/i,
      /^today's rate of\s+/i,
      /^show me\s+/i,
      /\s+today's price$/i,
      /\s+todays price$/i,
      /\s+price today$/i,
      /\s+rate today$/i,
      /\s+today$/i,
      /\s+bhav$/i,
      /\s+price$/i,
      /\s+rate$/i,
    ];

    // Common Hindi search filler patterns
    const hindiFillers = [
      /आज\s+का\s+/g,
      /का\s+भाव\s+क्या\s+है\??/g,
      /का\s+रेट\s+क्या\s+है\??/g,
      /का\s+मंडी\s+भाव\s+बताओ/g,
      /का\s+भाव\s+बताइए/g,
      /का\s+भाव/g,
      /का\s+दाम/g,
      /बताओ/g,
      /दिखाओ/g,
    ];

    // Common Odia search filler patterns
    const odiaFillers = [
      /ଆଜିର\s+/g,
      /ଦର\s+କେତେ\??/g,
      /ମଣ୍ଡି\s+ଦର/g,
      /ଦେଖାନ୍ତୁ/g,
    ];

    let cleaned = text;

    for (const pattern of englishFillers) {
      cleaned = cleaned.replace(pattern, '').trim();
    }
    for (const pattern of hindiFillers) {
      cleaned = cleaned.replace(pattern, '').trim();
    }
    for (const pattern of odiaFillers) {
      cleaned = cleaned.replace(pattern, '').trim();
    }

    // Strip trailing punctuation
    cleaned = cleaned.replace(/[?.!;,]+$/, '').trim();

    return cleaned || text;
  }

  public startListening(options: STTListenOptions): boolean {
    if (!this.isSupported()) {
      options.onError?.('Speech recognition is not supported in this browser. Please type your search.');
      return false;
    }

    try {
      this.stopListening();

      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionClass) return false;

      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      // Select BCP 47 language tag based on user selection
      if (options.language === 'hi') {
        this.recognition.lang = 'hi-IN';
      } else if (options.language === 'or') {
        // Many browsers support hi-IN or en-IN for Indian context; fallback for Odia
        this.recognition.lang = 'or-IN';
      } else {
        this.recognition.lang = 'en-IN';
      }

      this.recognition.onstart = () => {
        this.isListeningState = true;
        options.onStart?.();
      };

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        if (event.results && event.results.length > 0) {
          const transcript = event.results[0][0].transcript.trim();
          const cleanQuery = this.cleanAgriQuery(transcript);
          options.onResult(transcript, cleanQuery);
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.isListeningState = false;
        let msg = 'Microphone input failed. Please use regular text input.';
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          msg = 'Microphone permission was denied. Please allow mic access or type your search.';
        } else if (event.error === 'no-speech') {
          msg = 'No speech was detected. Please try speaking again.';
        } else if (event.error === 'network') {
          msg = 'Network connection issue with speech service. Please type your search.';
        }
        options.onError?.(msg);
      };

      this.recognition.onend = () => {
        this.isListeningState = false;
        options.onEnd?.();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.warn('STT start exception:', err);
      this.isListeningState = false;
      options.onError?.('Could not activate microphone. Please type your query.');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Ignore
      }
      this.recognition = null;
    }
    this.isListeningState = false;
  }
}

export const sttService = new STTService();
