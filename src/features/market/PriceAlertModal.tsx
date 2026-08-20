import React, { useState } from 'react';
import { CropMarketData } from '../../types';
import { X, Bell, Check, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface PriceAlertModalProps {
  cropData: CropMarketData;
  isOpen: boolean;
  onClose: () => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  cropData,
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();
  const [targetPrice, setTargetPrice] = useState<number>(
    Math.round((cropData.highestPrice + 100) / 50) * 50
  );
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');
  const [channel, setChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1800);
  };

  const cropName =
    language === 'hi'
      ? cropData.cropHindi
      : language === 'or'
      ? cropData.cropOdia
      : cropData.cropName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        id="price-alert-modal"
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-stone-900">
              {t('market.priceAlert')}
            </h3>
            <p className="text-xs text-stone-500">
              Instant alerts when {cropName} price reaches your target.
            </p>
          </div>
        </div>

        {isSaved ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-stone-900">
              Price Alert Activated!
            </h4>
            <p className="text-xs text-stone-600 mt-1">
              You will receive an alert on <strong>{mobileNumber}</strong> when{' '}
              {cropName} exceeds ₹{targetPrice}/qtl.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs">
              <div className="flex justify-between text-stone-600 mb-1">
                <span>Current Modal Price:</span>
                <span className="font-bold text-stone-900">₹{cropData.avgModalPrice}/qtl</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Today's Highest Mandi Price:</span>
                <span className="font-bold text-emerald-800">₹{cropData.highestPrice}/qtl</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Alert me when price rises above (₹ / Quintal):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-stone-500">
                  ₹
                </span>
                <input
                  type="number"
                  step="20"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-16 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 font-black text-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400">
                  / qtl
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Mobile Number for Notification:
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Preferred Notification Channel:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setChannel('whatsapp')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    channel === 'whatsapp'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                      : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  🟢 WhatsApp Message
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('sms')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    channel === 'sms'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                      : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  📱 SMS Alert
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Activate Rate Alert (Simulated)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
