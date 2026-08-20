import React, { useState, useMemo } from 'react';
import { AppSection, AgriculturalRiskScore } from '../../types';
import {
  riskService,
  RiskTestPreset,
  calculateAgriculturalRiskScore,
} from '../../services/riskService';
import { RiskHeader } from './RiskHeader';
import { RiskCategoryTester } from './RiskCategoryTester';
import { RiskScoreGauge } from './RiskScoreGauge';
import { RiskFactorsBreakdown } from './RiskFactorsBreakdown';
import { RiskReasonsCard } from './RiskReasonsCard';
import { RiskRecommendedActions } from './RiskRecommendedActions';
import { RiskCustomSimulator } from './RiskCustomSimulator';
import { useLanguage } from '../../i18n/LanguageContext';

interface RiskSectionProps {
  onNavigate: (section: AppSection) => void;
}

export const RiskSection: React.FC<RiskSectionProps> = () => {
  const { language } = useLanguage();
  const presets = useMemo(() => riskService.getTestPresets(), []);

  // Selected preset or custom
  const [activePresetId, setActivePresetId] = useState<string>('preset-moderate');
  const [showCustomSimulator, setShowCustomSimulator] = useState<boolean>(false);

  // Custom Simulator State (initialized to Moderate preset)
  const [customParams, setCustomParams] = useState({
    rainfall: 40,
    cropWeather: 42,
    market: 36,
    paymentDue: 35,
    hasLoan: true,
    loanDueDays: 36,
    loanAmount: 48000,
    cropName: 'Paddy / Rice (Swarna)',
    district: 'Sambalpur, Odisha',
  });

  // Calculate current risk score object
  const activeRiskData: AgriculturalRiskScore = useMemo(() => {
    if (activePresetId === 'custom') {
      return calculateAgriculturalRiskScore({
        rainfallScore: customParams.rainfall,
        cropWeatherScore: customParams.cropWeather,
        marketScore: customParams.market,
        paymentDueScore: customParams.hasLoan ? customParams.paymentDue : 0,
        cropName: customParams.cropName,
        district: customParams.district,
        paymentInfo: {
          hasActiveLoan: customParams.hasLoan,
          loanType: 'KCC (Kisan Credit Card)',
          dueDate: '2026-09-25',
          daysRemaining: customParams.loanDueDays,
          dueAmount: customParams.loanAmount,
          isOverdue: customParams.loanDueDays < 0,
          statusNote: customParams.hasLoan
            ? customParams.loanDueDays < 0
              ? 'Payment OVERDUE by 2 days'
              : `Payment due in ${customParams.loanDueDays} days`
            : 'No active credit obligation reported',
        },
      });
    }

    const matchedPreset =
      presets.find((p) => p.id === activePresetId) || presets[1] || presets[0];

    return calculateAgriculturalRiskScore({
      rainfallScore: matchedPreset.rainfallScore,
      cropWeatherScore: matchedPreset.cropWeatherScore,
      marketScore: matchedPreset.marketScore,
      paymentDueScore: matchedPreset.paymentDueScore,
      cropName: matchedPreset.cropName,
      district: matchedPreset.district,
      paymentInfo: matchedPreset.paymentInfo,
    });
  }, [activePresetId, presets, customParams]);

  // Handle preset selection
  const handleSelectPreset = (preset: RiskTestPreset) => {
    setActivePresetId(preset.id);
    setCustomParams({
      rainfall: preset.rainfallScore,
      cropWeather: preset.cropWeatherScore,
      market: preset.marketScore,
      paymentDue: preset.paymentDueScore,
      hasLoan: preset.paymentInfo.hasActiveLoan,
      loanDueDays: preset.paymentInfo.daysRemaining ?? 30,
      loanAmount: preset.paymentInfo.dueAmount ?? 45000,
      cropName: preset.cropName,
      district: preset.district,
    });
  };

  return (
    <div id="section-risk" className="min-h-screen bg-stone-50/50 pb-20">
      {/* Header with Disclaimer & Audio Briefing */}
      <RiskHeader
        cropName={activeRiskData.cropName}
        district={activeRiskData.district}
        assessmentDate={activeRiskData.assessmentDate}
        riskData={activeRiskData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tester Presets Bar (Low, Moderate, High, Critical) */}
        <RiskCategoryTester
          presets={presets}
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
          onEnableCustomMode={() => {
            setActivePresetId('custom');
            setShowCustomSimulator(true);
          }}
        />

        {/* Custom Simulator Sliders (if open or in custom mode) */}
        {(showCustomSimulator || activePresetId === 'custom') && (
          <RiskCustomSimulator
            rainfall={customParams.rainfall}
            cropWeather={customParams.cropWeather}
            market={customParams.market}
            paymentDue={customParams.paymentDue}
            hasLoan={customParams.hasLoan}
            loanDueDays={customParams.loanDueDays}
            loanAmount={customParams.loanAmount}
            onUpdateValues={(vals) => {
              setActivePresetId('custom');
              setCustomParams({
                ...customParams,
                ...vals,
              });
            }}
            onReset={() => {
              const defaultPreset = presets[1]; // Moderate
              handleSelectPreset(defaultPreset);
            }}
            onClose={() => {
              setShowCustomSimulator(false);
              if (activePresetId === 'custom') {
                setActivePresetId(presets[1].id);
              }
            }}
          />
        )}

        {/* 1. Score & Category Gauge Overview */}
        <RiskScoreGauge riskData={activeRiskData} />

        {/* 2. Factors Breakdown (Rainfall 30%, Crop/Weather 25%, Market 25%, Payment Due 20%) */}
        <RiskFactorsBreakdown riskData={activeRiskData} />

        {/* 3. Reasons (Key Risk Drivers & Mitigating Factors) */}
        <RiskReasonsCard riskData={activeRiskData} />

        {/* 4. Recommended Actions (Agricultural, Financial & PMFBY Insurance) */}
        <RiskRecommendedActions riskData={activeRiskData} />
      </div>
    </div>
  );
};
