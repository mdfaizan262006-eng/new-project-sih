import React, { useState, useEffect, useMemo } from 'react';
import { AppSection, CropMarketData, MandiRecord } from '../../types';
import { marketService, DEMO_CROP_MARKET_DATA } from '../../services/marketService';
import { MarketHeader } from './MarketHeader';
import { CropSelectorBar } from './CropSelectorBar';
import { CropOverviewCard } from './CropOverviewCard';
import { MandiComparisonMatrix } from './MandiComparisonMatrix';
import { MandiPriceTable } from './MandiPriceTable';
import { PriceAlertModal } from './PriceAlertModal';
import { useLanguage } from '../../i18n/LanguageContext';
import { RefreshCw } from 'lucide-react';

interface MarketSectionProps {
  onNavigate: (section: AppSection) => void;
}

export const MarketSection: React.FC<MarketSectionProps> = () => {
  const { language } = useLanguage();
  const [crops, setCrops] = useState<CropMarketData[]>(DEMO_CROP_MARKET_DATA);
  const [selectedCropId, setSelectedCropId] = useState<string>('soybean');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await marketService.getAllCropMarketData();
        setCrops(data);
      } catch (err) {
        console.error('Failed to load market data', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Current selected crop object
  const activeCropData = useMemo(() => {
    return crops.find((c) => c.cropId === selectedCropId) || crops[0] || DEMO_CROP_MARKET_DATA[0];
  }, [crops, selectedCropId]);

  // Filtered mandi records across active crop or all mandis based on search and region
  const filteredMandiRecords = useMemo(() => {
    let list: MandiRecord[] = [];

    // If there's a search query or a specific state filter, search across all commodities or current crop
    if (searchQuery.trim()) {
      crops.forEach((c) => {
        list.push(...c.mandis);
      });
    } else {
      list = [...activeCropData.mandis];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.mandiName.toLowerCase().includes(q) ||
          m.cropName.toLowerCase().includes(q) ||
          m.district.toLowerCase().includes(q) ||
          m.variety.toLowerCase().includes(q)
      );
    }

    if (selectedState !== 'All') {
      list = list.filter((m) =>
        m.state.toLowerCase().includes(selectedState.toLowerCase())
      );
    }

    return list;
  }, [crops, activeCropData, searchQuery, selectedState]);

  const marketSpeechText = useMemo(() => {
    const crop = activeCropData;
    return {
      hi: `आज का मंडी भाव: ${crop.cropHindi} का मॉडल भाव ₹${crop.avgModalPrice} प्रति क्विंटल है। उच्चतम भाव ₹${crop.highestPrice} और न्यूनतम भाव ₹${crop.lowestPrice} रहा। बेचने के लिए सर्वोत्तम मंडी ${crop.bestMandiName} है, जहां शुद्ध भाव ₹${crop.bestMandiNetPayout} प्रति क्विंटल मिल रहा है।`,
      or: `ଆଜିର ମଣ୍ଡି ଦର: ${crop.cropOdia} ର ହାରାହାରି ଦର ₹${crop.avgModalPrice} ପ୍ରତି କ୍ୱିଣ୍ଟାଲ। ସର୍ବାଧିକ ଦର ₹${crop.highestPrice} ଏବଂ ସର୍ବନିମ୍ନ ଦର ₹${crop.lowestPrice}। ସର୍ବୋତ୍ତମ ମଣ୍ଡି ହେଉଛି ${crop.bestMandiName}।`,
      en: `Today's market rates for ${crop.cropName}: Average modal price is ₹${crop.avgModalPrice} per quintal. Highest price is ₹${crop.highestPrice} and lowest is ₹${crop.lowestPrice}. Top recommended mandi to sell is ${crop.bestMandiName} with a net payout of ₹${crop.bestMandiNetPayout} per quintal.`,
    };
  }, [activeCropData]);

  // Handle voice speech-to-text search input
  const handleVoiceSearch = (transcript: string, cleanQuery: string) => {
    const queryToSearch = cleanQuery || transcript;
    setSearchQuery(queryToSearch);

    // Auto-detect crop mentioned in the voice query to switch the crop overview
    const lower = (transcript + ' ' + cleanQuery).toLowerCase();
    const matchedCrop = crops.find((c) => {
      const idMatch = lower.includes(c.cropId.toLowerCase());
      const enMatch = lower.includes(c.cropName.toLowerCase().split(/[\s(/)]+/)[0]);
      const hiMatch = lower.includes(c.cropHindi.toLowerCase().split(/[\s(/)]+/)[0]);
      const orMatch = lower.includes(c.cropOdia.toLowerCase().split(/[\s(/)]+/)[0]);
      return idMatch || enMatch || hiMatch || orMatch;
    });

    if (matchedCrop) {
      setSelectedCropId(matchedCrop.cropId);
    }
  };

  return (
    <div id="section-market" className="min-h-screen bg-stone-50/50 pb-16">
      {/* Header */}
      <MarketHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onVoiceSearch={handleVoiceSearch}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        speechText={marketSpeechText}
        lastUpdated="20 Aug 2026, 11:30 AM"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-500">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-700 mb-3" />
            <p className="text-sm font-semibold">Loading Live Mandi Feed...</p>
          </div>
        ) : (
          <>
            {/* Commodity Selector Pills Bar */}
            <CropSelectorBar
              crops={crops}
              selectedCropId={selectedCropId}
              onSelectCrop={(id) => {
                setSelectedCropId(id);
                setSearchQuery('');
              }}
            />

            {/* Selected Crop Overview (Crop, Mandi, Price/qtl, Date, High, Low, Best Mandi, Trend) */}
            <CropOverviewCard
              cropData={activeCropData}
              onOpenAlertModal={() => setIsAlertModalOpen(true)}
            />

            {/* Simple Comparison Cards & Lot Profit Calculator */}
            <MandiComparisonMatrix cropData={activeCropData} />

            {/* Full Regional Mandi Rates Table */}
            <MandiPriceTable records={filteredMandiRecords} />
          </>
        )}
      </div>

      {/* Price Alert Modal */}
      <PriceAlertModal
        cropData={activeCropData}
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />
    </div>
  );
};
