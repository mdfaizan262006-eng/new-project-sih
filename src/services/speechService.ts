/**
 * KrishiDrishti Speech Synthesis Service
 * Provides robust, multilingual Text-To-Speech (TTS) audio readout for farmers.
 * Supports English, Hindi, and Odia with graceful fallbacks and error handling.
 */

import { LanguageCode } from '../i18n/translations';

export interface SpeakOptions {
  text: string;
  lang?: LanguageCode | string;
  rate?: number; // default 0.92 for natural, clear cadence
  pitch?: number; // default 1.0
  volume?: number; // default 1.0
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export type SpeechState = 'idle' | 'speaking' | 'paused' | 'unavailable' | 'error';

type SpeechListener = (state: SpeechState, activeText: string | null) => void;

class SpeechService {
  private currentState: SpeechState = 'idle';
  private activeText: string | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded: boolean = false;
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (this.isSupported()) {
      this.initVoices();
    } else {
      this.currentState = 'unavailable';
    }
  }

  /**
   * Check if speech synthesis is supported in the current environment
   */
  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      try {
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          this.voices = available;
          this.voicesLoaded = true;
        }
      } catch {
        // Safe catch
      }
    };

    loadVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Subscribe to global speech state changes
   */
  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    // Initial emit
    listener(this.currentState, this.activeText);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentState, this.activeText);
      } catch (err) {
        console.error('Speech listener error:', err);
      }
    });
  }

  /**
   * Strip HTML tags and markdown symbols to create natural speech
   */
  public sanitizeText(raw: string): string {
    if (!raw) return '';
    return raw
      .replace(/<[^>]*>/g, ' ') // Strip HTML tags
      .replace(/[*_~`#]/g, '') // Strip markdown formatting
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract link text
      .replace(/₹\s*([0-9,]+)/g, '$1 Rupees ') // Pronounce rupee values nicely
      .replace(/(\d+)\s*%/g, '$1 percent') // Pronounce percentage
      .replace(/(\d+)\s*°C/g, '$1 degrees Celsius') // Pronounce temperature
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Find the best voice matching language
   */
  private findBestVoice(langCode: string): SpeechSynthesisVoice | null {
    if (!this.voices || this.voices.length === 0) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        this.voices = window.speechSynthesis.getVoices();
      }
    }

    if (!this.voices || this.voices.length === 0) return null;

    const target = langCode.toLowerCase().replace('_', '-');

    // 1. Exact match (e.g., 'hi-in' or 'en-in')
    const exact = this.voices.find((v) => v.lang.toLowerCase().replace('_', '-') === target);
    if (exact) return exact;

    // 2. Prefix match (e.g., 'hi' matches 'hi-IN')
    const primary = target.split('-')[0];
    const prefix = this.voices.find((v) => v.lang.toLowerCase().startsWith(primary));
    if (prefix) return prefix;

    // 3. Indian English fallback if searching for 'en'
    if (primary === 'en') {
      const enIn = this.voices.find((v) => v.lang.toLowerCase().includes('en-in'));
      if (enIn) return enIn;
    }

    return null;
  }

  /**
   * Resolve BCP 47 language code from app language
   */
  public resolveLangCode(lang?: LanguageCode | string): string {
    if (!lang) return 'en-IN';
    if (lang === 'hi' || lang.startsWith('hi')) return 'hi-IN';
    if (lang === 'or' || lang.startsWith('or')) return 'or-IN';
    if (lang === 'en' || lang.startsWith('en')) return 'en-IN';
    return lang;
  }

  /**
   * Speak the requested text
   */
  public speak(options: SpeakOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        const error = new Error('Speech synthesis is not supported in this browser.');
        this.currentState = 'unavailable';
        this.notifyListeners();
        options.onError?.(error);
        reject(error);
        return;
      }

      try {
        // Stop any current utterance first
        this.stop();

        const cleanText = this.sanitizeText(options.text);
        if (!cleanText) {
          resolve();
          return;
        }

        const bcp47Lang = this.resolveLangCode(options.lang);
        const utterance = new SpeechSynthesisUtterance(cleanText);

        utterance.lang = bcp47Lang;
        utterance.rate = options.rate ?? 0.92;
        utterance.pitch = options.pitch ?? 1.0;
        utterance.volume = options.volume ?? 1.0;

        // Try selecting matching voice if available
        const matchedVoice = this.findBestVoice(bcp47Lang);
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        this.activeUtterance = utterance;
        this.activeText = cleanText;

        utterance.onstart = () => {
          this.currentState = 'speaking';
          this.notifyListeners();
          options.onStart?.();
        };

        const cleanup = () => {
          if (this.watchdogTimer) {
            clearTimeout(this.watchdogTimer);
            this.watchdogTimer = null;
          }
          this.currentState = 'idle';
          this.activeText = null;
          this.activeUtterance = null;
          this.notifyListeners();
        };

        utterance.onend = () => {
          cleanup();
          options.onEnd?.();
          resolve();
        };

        utterance.onerror = (e) => {
          // If canceled deliberately by stop(), don't report as critical failure
          if (e.error === 'canceled' || e.error === 'interrupted') {
            cleanup();
            resolve();
            return;
          }

          console.warn('Speech synthesis utterance error:', e.error);
          cleanup();
          const err = new Error(`Speech synthesis error: ${e.error || 'unknown'}`);
          options.onError?.(err);
          resolve(); // Resolve to avoid breaking caller chains
        };

        // Safety watchdog: Chrome has a known bug where speech pauses after 15s
        // Resume synthesis periodically if still marked speaking
        const startWatchdog = () => {
          if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
          this.watchdogTimer = setTimeout(() => {
            if (this.currentState === 'speaking' && window.speechSynthesis.speaking) {
              window.speechSynthesis.pause();
              window.speechSynthesis.resume();
              startWatchdog();
            }
          }, 10000);
        };

        window.speechSynthesis.speak(utterance);
        startWatchdog();
      } catch (err) {
        console.error('Speech synthesis execution failure:', err);
        this.currentState = 'error';
        this.activeText = null;
        this.notifyListeners();
        const error = err instanceof Error ? err : new Error('Failed to play speech audio.');
        options.onError?.(error);
        resolve(); // Don't throw unhandled promise rejection
      }
    });
  }

  /**
   * Stop active speech synthesis
   */
  public stop() {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }

    if (this.isSupported() && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore cancel errors
      }
    }

    this.currentState = 'idle';
    this.activeText = null;
    this.activeUtterance = null;
    this.notifyListeners();
  }

  /**
   * Current speech state
   */
  public getState(): SpeechState {
    return this.currentState;
  }

  /**
   * Current speaking text
   */
  public getActiveText(): string | null {
    return this.activeText;
  }

  /**
   * Is currently speaking
   */
  public isSpeaking(): boolean {
    return this.currentState === 'speaking';
  }
}

export const speechService = new SpeechService();
