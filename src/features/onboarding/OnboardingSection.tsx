import React, { useState } from 'react';
import { AppSection, UserProfile } from '../../types';
import {
  Compass,
  MapPin,
  Sprout,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Languages,
  User,
  Phone,
  Sparkles,
  Check,
  LocateFixed,
  Layers,
  FileCheck2,
} from 'lucide-react';
import { Button } from '../../components/shared/Button';
import { Card } from '../../components/shared/Card';
import { Badge } from '../../components/shared/Badge';
import { Alert } from '../../components/shared/Alert';
import { LanguageSelector } from '../../components/shared/LanguageSelector';
import { useLanguage } from '../../i18n/LanguageContext';
import { authService, DEMO_USER } from '../../services/authService';

interface OnboardingSectionProps {
  onNavigate: (section: AppSection) => void;
  currentUser?: UserProfile | null;
  onCompleteOnboarding?: (user: UserProfile) => void;
}

interface CropOption {
  id: string;
  nameEn: string;
  nameHi: string;
  nameOr: string;
  emoji: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual';
}

const COMMON_CROPS: CropOption[] = [
  { id: 'Soybean', nameEn: 'Soybean', nameHi: 'सोयाबीन', nameOr: 'ସୋୟାବିନ୍', emoji: '🌱', season: 'Kharif' },
  { id: 'Wheat', nameEn: 'Wheat', nameHi: 'गेहूं', nameOr: 'ଗହମ', emoji: '🌾', season: 'Rabi' },
  { id: 'Rice', nameEn: 'Paddy / Rice', nameHi: 'धान (चावल)', nameOr: 'ଧାନ', emoji: '🌾', season: 'Kharif' },
  { id: 'Cotton', nameEn: 'Cotton', nameHi: 'कपास', nameOr: 'କପା', emoji: '☁️', season: 'Kharif' },
  { id: 'Gram', nameEn: 'Gram / Chana', nameHi: 'चना', nameOr: 'ଚଣା', emoji: '🫘', season: 'Rabi' },
  { id: 'Mustard', nameEn: 'Mustard', nameHi: 'सरसों', nameOr: 'ସୋରିଷ', emoji: '🌼', season: 'Rabi' },
  { id: 'Sugarcane', nameEn: 'Sugarcane', nameHi: 'गन्ना', nameOr: 'ଆଖୁ', emoji: '🎋', season: 'Annual' },
  { id: 'Maize', nameEn: 'Maize / Corn', nameHi: 'मक्का', nameOr: 'ମକା', emoji: '🌽', season: 'Kharif' },
  { id: 'Potato', nameEn: 'Potato', nameHi: 'आलू', nameOr: 'ଆଳୁ', emoji: '🥔', season: 'Rabi' },
  { id: 'Tomato', nameEn: 'Tomato', nameHi: 'टमाटर', nameOr: 'ଟମାଟୋ', emoji: '🍅', season: 'Zaid' },
  { id: 'Onion', nameEn: 'Onion', nameHi: 'प्याज', nameOr: 'ପିଆଜ', emoji: '🧅', season: 'Rabi' },
  { id: 'Groundnut', nameEn: 'Groundnut', nameHi: 'मूंगफली', nameOr: 'ଚିନାବାଦାମ', emoji: '🥜', season: 'Kharif' },
];

const POPULAR_STATES = [
  'Madhya Pradesh',
  'Odisha',
  'Uttar Pradesh',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Bihar',
  'Gujarat',
  'Karnataka',
  'Haryana',
  'Andhra Pradesh',
  'Telangana',
];

const POPULAR_DISTRICTS: Record<string, string[]> = {
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Ujjain', 'Dhar', 'Dewas', 'Jabalpur', 'Gwalior', 'Sehore'],
  'Odisha': ['Cuttack', 'Bhubaneswar', 'Puri', 'Sambalpur', 'Balasore', 'Bhadrak', 'Ganjam', 'Mayurbhanj'],
  'Uttar Pradesh': ['Varanasi', 'Lucknow', 'Kanpur', 'Prayagraj', 'Agra', 'Meerut', 'Gorakhpur', 'Aligarh'],
  'Maharashtra': ['Nashik', 'Pune', 'Nagpur', 'Aurangabad', 'Amravati', 'Kolhapur', 'Satara', 'Solapur'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Sangrur', 'Firozpur'],
};

export const OnboardingSection: React.FC<OnboardingSectionProps> = ({
  onNavigate,
  currentUser,
  onCompleteOnboarding,
}) => {
  const { t, language, setLanguage, currentLanguageInfo } = useLanguage();

  // Active step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [gpsDetected, setGpsDetected] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initial values from existing user or demo defaults
  const initialUser = currentUser || authService.getCurrentUser() || DEMO_USER;

  // Form State
  // Step 1: Identity & Language
  const [farmerName, setFarmerName] = useState<string>(initialUser.name || '');
  const [phone, setPhone] = useState<string>(initialUser.phone || '');

  // Step 2: Location
  const [state, setState] = useState<string>(initialUser.state || 'Madhya Pradesh');
  const [district, setDistrict] = useState<string>(initialUser.district || 'Indore');
  const [village, setVillage] = useState<string>(initialUser.village || 'Sanwer');

  // Step 3: Main Crop & Farm Size
  const [mainCrop, setMainCrop] = useState<string>(
    initialUser.primaryCrops?.[0] || 'Soybean'
  );
  const [secondaryCrop, setSecondaryCrop] = useState<string>(
    initialUser.primaryCrops?.[1] || 'Wheat'
  );
  const [customCrop, setCustomCrop] = useState<string>('');
  const [farmSizePreset, setFarmSizePreset] = useState<string>('2-5');
  const [customLandSize, setCustomLandSize] = useState<string>(
    initialUser.landSizeAcres ? String(initialUser.landSizeAcres) : '4.5'
  );
  const [soilType, setSoilType] = useState<string>(
    initialUser.soilType || 'Black Clay Loam'
  );

  // Auto-detect GPS simulation
  const handleAutoDetectGPS = () => {
    setGpsDetected(true);
    if (language === 'or') {
      setState('Odisha');
      setDistrict('Cuttack');
      setVillage('Athagarh');
      setSoilType('Alluvial Loam');
    } else {
      setState('Madhya Pradesh');
      setDistrict('Indore');
      setVillage('Sanwer');
      setSoilType('Black Clay Loam');
    }
    setTimeout(() => {
      setGpsDetected(false);
    }, 4000);
  };

  // Step navigation validations
  const handleNextToStep2 = () => {
    if (!farmerName.trim()) {
      setErrorMessage(t('onboarding.farmerNameLabel') + ' is required');
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  const handleNextToStep3 = () => {
    if (!district.trim()) {
      setErrorMessage(t('onboarding.districtLabel') + ' is required');
      return;
    }
    setErrorMessage('');
    setCurrentStep(3);
  };

  const handleNextToStep4 = () => {
    const selectedCrop = customCrop.trim() || mainCrop;
    if (!selectedCrop) {
      setErrorMessage(t('onboarding.mainCropLabel') + ' is required');
      return;
    }
    setErrorMessage('');
    setCurrentStep(4);
  };

  // Final submit handler
  const handleFinishOnboarding = () => {
    setIsSaving(true);

    const activeCrop = customCrop.trim() || mainCrop;
    const finalPrimaryCrops = [activeCrop];
    if (secondaryCrop && secondaryCrop !== activeCrop) {
      finalPrimaryCrops.push(secondaryCrop);
    }

    const parsedLandSize = parseFloat(customLandSize);
    const finalLandSize = !isNaN(parsedLandSize) && parsedLandSize > 0
      ? parsedLandSize
      : farmSizePreset === '<2'
      ? 1.5
      : farmSizePreset === '2-5'
      ? 4.5
      : farmSizePreset === '5-10'
      ? 7.5
      : 12.0;

    const profileData: Partial<UserProfile> = {
      name: farmerName.trim(),
      phone: phone.trim() || '9876543210',
      state: state.trim() || 'Madhya Pradesh',
      district: district.trim() || 'Indore',
      village: village.trim() || 'Sanwer',
      primaryCrops: finalPrimaryCrops,
      landSizeAcres: finalLandSize,
      soilType: soilType || 'Black Clay Loam',
      preferredLanguage: language,
    };

    // Save to local storage via authService
    const savedUser = authService.saveOnboardingProfile(profileData);

    if (onCompleteOnboarding) {
      onCompleteOnboarding(savedUser);
    }

    setTimeout(() => {
      setIsSaving(false);
      // Navigate directly to Dashboard
      onNavigate('dashboard');
    }, 600);
  };

  const getCropDisplayName = (crop: CropOption) => {
    if (language === 'hi') return `${crop.nameHi} (${crop.nameEn})`;
    if (language === 'or') return `${crop.nameOr} (${crop.nameEn})`;
    return crop.nameEn;
  };

  return (
    <div id="section-onboarding" className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-100 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>{t('onboarding.title')}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              {t('onboarding.wizardTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              {t('onboarding.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-900/80 p-2.5 rounded-2xl border border-emerald-700/50 shrink-0">
            <Languages className="w-5 h-5 text-emerald-300" />
            <div className="text-xs">
              <div className="text-emerald-300 font-semibold">{t('lang.selected')}</div>
              <div className="font-bold text-white">{currentLanguageInfo.nativeName} ({currentLanguageInfo.name})</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stepper Card */}
      <Card
        id="onboarding-flow-stepper-card"
        className="bg-white border-stone-200 shadow-sm"
        bodyClassName="p-5 sm:p-8 space-y-6"
      >
        {/* Progress Indicator Header */}
        <div className="space-y-3 border-b border-stone-100 pb-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {t('onboarding.stepIndicator', { current: currentStep, total: 4 })}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {currentStep === 1 && t('onboarding.step1Title')}
                {currentStep === 2 && t('onboarding.step2Title')}
                {currentStep === 3 && t('onboarding.step3Title')}
                {currentStep === 4 && t('onboarding.step4Title')}
              </h2>
            </div>

            {/* Stepper pills */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  currentStep === 1
                    ? 'bg-emerald-700 text-white'
                    : currentStep > 1
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {currentStep > 1 ? <Check className="w-3 h-3" /> : '1.'}
                <span className="hidden sm:inline">{t('onboarding.step1Label')}</span>
              </button>

              <button
                type="button"
                onClick={() => farmerName.trim() && setCurrentStep(2)}
                disabled={!farmerName.trim()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  currentStep === 2
                    ? 'bg-emerald-700 text-white'
                    : currentStep > 2
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {currentStep > 2 ? <Check className="w-3 h-3" /> : '2.'}
                <span className="hidden sm:inline">{t('onboarding.step2Label')}</span>
              </button>

              <button
                type="button"
                onClick={() => farmerName.trim() && district.trim() && setCurrentStep(3)}
                disabled={!farmerName.trim() || !district.trim()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  currentStep === 3
                    ? 'bg-emerald-700 text-white'
                    : currentStep > 3
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {currentStep > 3 ? <Check className="w-3 h-3" /> : '3.'}
                <span className="hidden sm:inline">{t('onboarding.step3Label')}</span>
              </button>

              <button
                type="button"
                onClick={() => farmerName.trim() && district.trim() && setCurrentStep(4)}
                disabled={!farmerName.trim() || !district.trim()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  currentStep === 4
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                <span>4.</span>
                <span className="hidden sm:inline">{t('onboarding.step4Label')}</span>
              </button>
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-700 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Error notice if validation fails */}
        {errorMessage && (
          <Alert
            type="error"
            title={errorMessage}
            onClose={() => setErrorMessage('')}
          />
        )}

        {/* ================= STEP 1: IDENTITY & LANGUAGE ================= */}
        {currentStep === 1 && (
          <div className="space-y-6" id="onboarding-step-1">
            <p className="text-xs sm:text-sm text-stone-600">
              {t('onboarding.step1Sub')}
            </p>

            {/* Language Selection Card */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-emerald-700" />
                {t('onboarding.preferredLangLabel')}
              </label>
              <LanguageSelector variant="cards" />
            </div>

            {/* Farmer Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-700" />
                {t('onboarding.farmerNameLabel')} <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="onboarding-farmer-name-input"
                  type="text"
                  value={farmerName}
                  onChange={(e) => {
                    setFarmerName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder={t('onboarding.farmerNamePlaceholder')}
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 text-sm sm:text-base font-medium transition-colors"
                />
                {farmerName.trim().length > 1 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-700" />
                {t('onboarding.phoneLabel')}
              </label>
              <div className="flex rounded-xl border-2 border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-200 overflow-hidden">
                <span className="inline-flex items-center px-3.5 bg-stone-100 text-stone-600 text-sm font-semibold border-r border-stone-200">
                  +91
                </span>
                <input
                  id="onboarding-farmer-phone-input"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder={t('onboarding.phonePlaceholder')}
                  className="w-full min-h-[48px] px-3.5 py-2.5 outline-none text-stone-900 text-sm sm:text-base font-medium"
                />
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="text-xs text-stone-500">
                <span className="font-semibold text-emerald-700">*</span> Required to personalize advisory
              </div>
              <Button
                id="onboarding-step1-next-btn"
                size="lg"
                variant="primary"
                onClick={handleNextToStep2}
                disabled={!farmerName.trim()}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {t('btn.next')}
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: LOCATION ================= */}
        {currentStep === 2 && (
          <div className="space-y-6" id="onboarding-step-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-stone-600">
                {t('onboarding.step2Sub')}
              </p>

              {/* GPS Auto-Detect Button */}
              <button
                type="button"
                id="onboarding-gps-detect-btn"
                onClick={handleAutoDetectGPS}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                <LocateFixed className="w-4 h-4 text-emerald-700" />
                <span>{t('onboarding.gpsButton')}</span>
              </button>
            </div>

            {gpsDetected && (
              <Alert
                type="success"
                title={t('onboarding.gpsDetected')}
                icon={<CheckCircle className="w-4 h-4 text-emerald-700" />}
              />
            )}

            {/* State Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                {t('onboarding.stateLabel')} <span className="text-rose-600">*</span>
              </label>
              <select
                id="onboarding-state-select"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  const suggestedDistricts = POPULAR_DISTRICTS[e.target.value];
                  if (suggestedDistricts && suggestedDistricts.length > 0) {
                    setDistrict(suggestedDistricts[0]);
                  }
                }}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 text-sm sm:text-base font-medium bg-white"
              >
                {POPULAR_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* District Input & Quick District Suggestions */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                {t('onboarding.districtLabel')} <span className="text-rose-600">*</span>
              </label>
              <input
                id="onboarding-district-input"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder={t('onboarding.districtPlaceholder')}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 text-sm sm:text-base font-medium"
              />

              {/* Quick district suggestions */}
              {POPULAR_DISTRICTS[state] && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] font-semibold text-stone-500">Popular:</span>
                  {POPULAR_DISTRICTS[state].map((dist) => (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => setDistrict(dist)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        district.toLowerCase() === dist.toLowerCase()
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {dist}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Village / Tehsil */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                {t('onboarding.villageLabel')}
              </label>
              <input
                id="onboarding-village-input"
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder={t('onboarding.villagePlaceholder')}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 text-sm sm:text-base font-medium"
              />
            </div>

            {/* Step 2 Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <Button
                id="onboarding-step2-back-btn"
                size="lg"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                {t('btn.back')}
              </Button>
              <Button
                id="onboarding-step2-next-btn"
                size="lg"
                variant="primary"
                onClick={handleNextToStep3}
                disabled={!district.trim()}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {t('btn.next')}
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: MAIN CROP & FARM SIZE ================= */}
        {currentStep === 3 && (
          <div className="space-y-6" id="onboarding-step-3">
            <p className="text-xs sm:text-sm text-stone-600">
              {t('onboarding.step3Sub')}
            </p>

            {/* Crop Selection Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-700" />
                {t('onboarding.mainCropLabel')} <span className="text-rose-600">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {COMMON_CROPS.map((crop) => {
                  const isSelected = mainCrop === crop.id && !customCrop.trim();
                  return (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => {
                        setMainCrop(crop.id);
                        setCustomCrop('');
                      }}
                      className={`flex flex-col items-start p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/80 shadow-xs'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/70 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-2xl">{crop.emoji}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        {getCropDisplayName(crop)}
                      </span>
                      <span className="text-[10px] text-stone-500 font-medium mt-0.5">
                        {crop.season}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Crop Input */}
              <div className="pt-2">
                <label className="text-[11px] font-bold text-stone-600 mb-1 block">
                  {t('onboarding.otherCropLabel')}
                </label>
                <input
                  id="onboarding-custom-crop-input"
                  type="text"
                  value={customCrop}
                  onChange={(e) => setCustomCrop(e.target.value)}
                  placeholder={t('onboarding.otherCropPlaceholder')}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 text-xs sm:text-sm font-medium"
                />
              </div>
            </div>

            {/* Farm Land Size (Optional) */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  {t('onboarding.farmSizeLabel')}
                </label>
                <span className="text-xs text-stone-500 font-medium">
                  {t('onboarding.farmSizeOptional')}
                </span>
              </div>

              {/* Size preset pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '<2', label: t('onboarding.sizePresetSmall'), defaultAcres: '1.5' },
                  { id: '2-5', label: t('onboarding.sizePresetMedium'), defaultAcres: '4.5' },
                  { id: '5-10', label: t('onboarding.sizePresetSemiMedium'), defaultAcres: '7.5' },
                  { id: '10+', label: t('onboarding.sizePresetLarge'), defaultAcres: '15' },
                ].map((preset) => {
                  const isSelected = farmSizePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setFarmSizePreset(preset.id);
                        setCustomLandSize(preset.defaultAcres);
                      }}
                      className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-center ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-950'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Exact Acreage input */}
              <div className="flex items-center gap-3">
                <div className="w-full sm:w-1/2">
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {t('onboarding.customSizeLabel')}
                  </label>
                  <input
                    id="onboarding-land-size-input"
                    type="number"
                    step="0.5"
                    min="0"
                    value={customLandSize}
                    onChange={(e) => setCustomLandSize(e.target.value)}
                    placeholder={t('onboarding.customSizePlaceholder')}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 text-sm font-medium"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {t('onboarding.soilTypeLabel')}
                  </label>
                  <select
                    id="onboarding-soil-type-select"
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 text-sm font-medium bg-white"
                  >
                    <option value="Black Clay Loam">{t('onboarding.soilBlack')}</option>
                    <option value="Alluvial Loam">{t('onboarding.soilAlluvial')}</option>
                    <option value="Red Loamy Soil">{t('onboarding.soilRed')}</option>
                    <option value="Clay Soil">{t('onboarding.soilClay')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3 Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <Button
                id="onboarding-step3-back-btn"
                size="lg"
                variant="outline"
                onClick={() => setCurrentStep(2)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                {t('btn.back')}
              </Button>
              <Button
                id="onboarding-step3-next-btn"
                size="lg"
                variant="primary"
                onClick={handleNextToStep4}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {t('btn.next')}
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: REVIEW & CONFIRM ================= */}
        {currentStep === 4 && (
          <div className="space-y-6" id="onboarding-step-4">
            <p className="text-xs sm:text-sm text-stone-600">
              {t('onboarding.step4Sub')}
            </p>

            {/* Summary Review Card */}
            <div className="p-5 bg-stone-50 rounded-2xl border-2 border-stone-200/90 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg">
                    {farmerName.charAt(0).toUpperCase() || 'K'}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                      {farmerName || 'Farmer'}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {phone ? `+91 ${phone}` : 'Registered Kisan Profile'}
                    </p>
                  </div>
                </div>

                <Badge variant="emerald">
                  {currentLanguageInfo.nativeName}
                </Badge>
              </div>

              {/* Structured Key-Value Review Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    {t('onboarding.summaryLocation')}
                  </div>
                  <div className="font-bold text-stone-900">
                    {village ? `${village}, ` : ''}{district}, {state}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-semibold flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                    {t('onboarding.summaryCrop')}
                  </div>
                  <div className="font-bold text-stone-900">
                    {customCrop.trim() || mainCrop}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-700" />
                    {t('onboarding.summaryLand')}
                  </div>
                  <div className="font-bold text-stone-900">
                    {customLandSize ? `${customLandSize} Acres` : 'Standard Holding'} • {soilType}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-semibold flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-emerald-700" />
                    {t('onboarding.summaryLang')}
                  </div>
                  <div className="font-bold text-stone-900">
                    {currentLanguageInfo.nativeName} ({currentLanguageInfo.name})
                  </div>
                </div>
              </div>
            </div>

            {/* Quick edit links */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-stone-500">
              <span>{t('onboarding.editDetails')}:</span>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-emerald-700 font-semibold hover:underline"
              >
                1. {t('onboarding.step1Label')}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-emerald-700 font-semibold hover:underline"
              >
                2. {t('onboarding.step2Label')}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="text-emerald-700 font-semibold hover:underline"
              >
                3. {t('onboarding.step3Label')}
              </button>
            </div>

            {/* Step 4 Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 flex-wrap">
              <Button
                id="onboarding-step4-back-btn"
                size="lg"
                variant="outline"
                onClick={() => setCurrentStep(3)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                {t('btn.back')}
              </Button>

              <Button
                id="onboarding-finish-and-open-dashboard-btn"
                size="xl"
                variant="primary"
                onClick={handleFinishOnboarding}
                loading={isSaving}
                icon={<CheckCircle className="w-5 h-5" />}
                iconPosition="right"
                className="shadow-md"
              >
                {t('onboarding.finishAndOpenDashboard')}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
