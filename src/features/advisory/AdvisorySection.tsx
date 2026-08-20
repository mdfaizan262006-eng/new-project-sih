import React, { useState, useEffect } from 'react';
import { AppSection, UserProfile, CropAdvisoryReport, AdvisoryWarning, AdvisoryAction } from '../../types';
import { Card, Badge, Alert, Button, ListenButton, VoiceSearchButton } from '../../components/shared';
import { advisoryService, SupportedCrop } from '../../services/advisoryService';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Sparkles,
  Droplets,
  CloudRain,
  Sun,
  CloudSun,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Circle,
  RefreshCw,
  MapPin,
  Calendar,
  Layers,
  Sprout,
  ShieldAlert,
  Send,
  X,
  ArrowRight,
  Info,
  Clock,
  Wind,
  Thermometer,
  Search,
} from 'lucide-react';

interface AdvisorySectionProps {
  onNavigate: (section: AppSection) => void;
  currentUser?: UserProfile | null;
}

export const AdvisorySection: React.FC<AdvisorySectionProps> = ({ onNavigate, currentUser }) => {
  const { t, language } = useLanguage();

  const supportedCrops = advisoryService.getAllSupportedCrops();
  const [selectedCropId, setSelectedCropId] = useState<string>(() => {
    if (currentUser?.primaryCrops && currentUser.primaryCrops.length > 0) {
      const match = supportedCrops.find(c =>
        currentUser.primaryCrops.some(pc => pc.toLowerCase().includes(c.id.toLowerCase()) || pc.toLowerCase().includes(c.name.toLowerCase()))
      );
      if (match) return match.id;
    }
    return 'soybean';
  });

  const [selectedStageId, setSelectedStageId] = useState<string>('flowering');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(currentUser?.district || 'Indore');
  const [advisoryReport, setAdvisoryReport] = useState<CropAdvisoryReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // "Why?" Explanation Modal State
  const [activeWhyWarning, setActiveWhyWarning] = useState<AdvisoryWarning | null>(null);

  // Ask Agronomist State
  const [farmerQuestion, setFarmerQuestion] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [expertAnswers, setExpertAnswers] = useState<{ question: string; answer: string; time: string }[]>([]);

  // Track Action items completed locally
  const [actionsList, setActionsList] = useState<AdvisoryAction[]>([]);

  // Crop search state (text and voice)
  const [cropSearchQuery, setCropSearchQuery] = useState<string>('');

  const districts = ['Indore', 'Ujjain', 'Bhopal', 'Sambalpur', 'Cuttack', 'Bhubaneswar', 'Khordha'];

  // Filter crops based on search query
  const filteredCrops = supportedCrops.filter((crop) => {
    if (!cropSearchQuery.trim()) return true;
    const q = cropSearchQuery.toLowerCase();
    return (
      crop.name.toLowerCase().includes(q) ||
      crop.hindiName.toLowerCase().includes(q) ||
      crop.odiaName.toLowerCase().includes(q) ||
      crop.id.toLowerCase().includes(q) ||
      crop.season.toLowerCase().includes(q)
    );
  });

  const handleCropVoiceSearch = (transcript: string, cleanQuery: string) => {
    const query = cleanQuery || transcript;
    setCropSearchQuery(query);

    const lower = (transcript + ' ' + cleanQuery).toLowerCase();
    const matchedCrop = supportedCrops.find((c) => {
      return (
        lower.includes(c.id.toLowerCase()) ||
        lower.includes(c.name.toLowerCase().split(' ')[0]) ||
        lower.includes(c.hindiName.toLowerCase().split(' ')[0]) ||
        lower.includes(c.odiaName.toLowerCase().split(' ')[0])
      );
    });

    if (matchedCrop) {
      handleCropChange(matchedCrop.id);
    }
  };

  const currentCrop = supportedCrops.find(c => c.id === selectedCropId) || supportedCrops[0];

  // Fetch Advisory Report
  const loadAdvisory = async (cropId: string, stageId?: string, district?: string) => {
    setLoading(true);
    setError(null);
    try {
      const report = await advisoryService.generateAdvisoryReport({
        cropId,
        stageId,
        district: district || selectedDistrict,
        soilType: currentUser?.soilType || 'Black Clay Loam',
      });
      setAdvisoryReport(report);
      setActionsList(report.recommendedActions);
    } catch (err) {
      console.error('Error generating advisory report:', err);
      setError('Unable to load advisory guidelines. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAdvisory(selectedCropId, selectedStageId, selectedDistrict);
  }, [selectedCropId, selectedStageId, selectedDistrict]);

  const handleCropChange = (newCropId: string) => {
    setSelectedCropId(newCropId);
    const newCrop = supportedCrops.find(c => c.id === newCropId);
    if (newCrop && newCrop.stages.length > 0) {
      // Pick middle stage (e.g. flowering or vegetative)
      const defaultStage = newCrop.stages[1]?.id || newCrop.stages[0].id;
      setSelectedStageId(defaultStage);
    }
  };

  const handleToggleAction = (actionId: string) => {
    setActionsList(prev => {
      const updated = prev.map(act => {
        if (act.id === actionId) {
          const nextState = !act.completed;
          advisoryService.toggleActionCompleted(actionId, nextState);
          return { ...act, completed: nextState };
        }
        return act;
      });
      return updated;
    });
  };

  const getAdvisorySpeechText = () => {
    if (!advisoryReport) return '';
    const report = advisoryReport;
    return {
      hi: `${report.cropLocalName} फसल सलाह: वर्तमान अवस्था ${report.stageName} है। मौसम: तापमान ${report.weatherSummary.temperature} डिग्री सेल्सियस। सिंचाई सलाह: ${report.irrigationAdvice.headline}. ${report.irrigationAdvice.farmerInstruction}. मुख्य सलाह: ${report.cropAdvice.headline}. पोषण प्रबंधन: ${report.cropAdvice.nutrientGuidance}.`,
      or: `${report.cropLocalName} ଫସଲ ପରାମର୍ଶ: ପର୍ଯ୍ୟାୟ ${report.stageName}। ତାପମାତ୍ରା ${report.weatherSummary.temperature} ଡିଗ୍ରୀ। ଜଳସେଚନ ପରାମର୍ଶ: ${report.irrigationAdvice.headline}। ${report.irrigationAdvice.farmerInstruction}। ମୁଖ୍ୟ ପରାମର୍ଶ: ${report.cropAdvice.headline}।`,
      en: `${report.cropName} Advisory for ${report.stageName} stage in ${selectedDistrict}. Temperature is ${report.weatherSummary.temperature} degrees Celsius with ${report.weatherSummary.condition}. Irrigation directive: ${report.irrigationAdvice.headline}. Action: ${report.irrigationAdvice.farmerInstruction}. Crop care guidance: ${report.cropAdvice.headline}. Nutrient advice: ${report.cropAdvice.nutrientGuidance}.`,
    };
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerQuestion.trim() || isAsking) return;

    setIsAsking(true);
    try {
      const answer = await advisoryService.askExpertQuestion(currentCrop.name, farmerQuestion.trim());
      setExpertAnswers(prev => [
        {
          question: farmerQuestion.trim(),
          answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
      setFarmerQuestion('');
    } catch {
      // Fallback
    } finally {
      setIsAsking(false);
    }
  };

  const getSeverityBadgeColor = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getIrrigationTheme = (status: 'hold' | 'irrigate' | 'drain' | 'critical_irrigate') => {
    switch (status) {
      case 'hold':
        return {
          cardBg: 'bg-amber-50/80 border-amber-200',
          badgeClass: 'bg-amber-700 text-white',
          titleColor: 'text-amber-950',
          iconColor: 'text-amber-700',
        };
      case 'drain':
        return {
          cardBg: 'bg-red-50/80 border-red-200',
          badgeClass: 'bg-red-700 text-white',
          titleColor: 'text-red-950',
          iconColor: 'text-red-700',
        };
      case 'critical_irrigate':
        return {
          cardBg: 'bg-blue-50/90 border-blue-300',
          badgeClass: 'bg-blue-800 text-white animate-pulse',
          titleColor: 'text-blue-950',
          iconColor: 'text-blue-700',
        };
      default:
        return {
          cardBg: 'bg-emerald-50/80 border-emerald-200',
          badgeClass: 'bg-emerald-700 text-white',
          titleColor: 'text-emerald-950',
          iconColor: 'text-emerald-700',
        };
    }
  };

  return (
    <div id="section-crop-advisory" className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t('advisory.title')}
            </h1>
            <Badge variant="success" size="sm" className="hidden sm:inline-flex">
              ICAR-KVK Rule Engine
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            {t('advisory.tagline')}
          </p>
        </div>

        {/* Action Controls: District & Voice */}
        <div className="flex items-center flex-wrap gap-2">
          {/* District Picker */}
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-700">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <select
              id="advisory-district-select"
              value={selectedDistrict}
              aria-label="Select Farm District"
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent font-bold text-stone-900 focus:outline-hidden cursor-pointer"
            >
              {districts.map(d => (
                <option key={d} value={d}>
                  {d} District
                </option>
              ))}
            </select>
          </div>

          {/* Reusable Voice Audio Readout Button */}
          <ListenButton
            id="advisory-voice-readout-btn"
            text={getAdvisorySpeechText()}
            variant="emerald"
            size="md"
            label={t('advisory.listenVoice')}
            stopLabel={t('advisory.stopVoice')}
          />

          {/* Re-calculate Advisory */}
          <button
            id="advisory-refresh-btn"
            onClick={() => {
              setIsRefreshing(true);
              loadAdvisory(selectedCropId, selectedStageId, selectedDistrict);
            }}
            disabled={isRefreshing}
            className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-all cursor-pointer"
            title="Refresh rules with latest weather"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />
          </button>
        </div>
      </div>

      {/* Primary Crop Selection Ribbon */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {t('advisory.selectCrop')} ({supportedCrops.length} Registered)
            </span>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Active Season: {currentCrop.season}
            </span>
          </div>

          {/* Quick Voice / Text Crop Advisory Search */}
          <div className="relative flex items-center w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              type="text"
              id="advisory-crop-search-input"
              value={cropSearchQuery}
              onChange={(e) => setCropSearchQuery(e.target.value)}
              placeholder="Search or speak crop..."
              className="w-full pl-8 pr-16 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            {cropSearchQuery && (
              <button
                type="button"
                id="advisory-crop-clear-btn"
                onClick={() => setCropSearchQuery('')}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600 rounded"
                title="Clear"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <div className="absolute right-1 top-1/2 -translate-y-1/2">
              <VoiceSearchButton
                id="advisory-crop-mic-btn"
                onTranscript={handleCropVoiceSearch}
                variant="embedded"
                size="sm"
                placeholderExample='Try: "Wheat advisory"'
              />
            </div>
          </div>
        </div>

        {/* Horizontal Crop Selection Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => {
              const isSelected = crop.id === selectedCropId;
              return (
                <button
                  key={crop.id}
                  id={`crop-select-${crop.id}`}
                  onClick={() => handleCropChange(crop.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-200'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                  }`}
                >
                  <span className="text-lg">{crop.icon}</span>
                  <div>
                    <div className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                      {crop.name}
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                      {language === 'hi' ? crop.hindiName : language === 'or' ? crop.odiaName : crop.defaultVariety.split('/')[0]}
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-xs text-stone-500 py-2 italic">
              No crops found matching &ldquo;{cropSearchQuery}&rdquo;. Showing all crops above.
            </div>
          )}
        </div>

        {/* Growth Stage Selector Pills */}
        <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-bold text-stone-600 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            {t('advisory.currentGrowthStage')}:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {currentCrop.stages.map((stg) => {
              const isStageActive = stg.id === selectedStageId;
              return (
                <button
                  key={stg.id}
                  id={`stage-pill-${stg.id}`}
                  onClick={() => setSelectedStageId(stg.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isStageActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>{stg.name}</span>
                  <span className="ml-1.5 opacity-70 text-[10px]">({stg.daysRange})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="p-8 bg-white rounded-2xl border border-stone-200 text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-700 mx-auto" />
          <p className="text-sm font-bold text-stone-700">{t('advisory.loading')}</p>
        </div>
      )}

      {/* Error Fallback */}
      {error && !loading && (
        <Alert
          id="advisory-error-alert"
          type="error"
          title="Advisory Error"
          message={error}
          action={
            <Button size="sm" onClick={() => loadAdvisory(selectedCropId, selectedStageId, selectedDistrict)}>
              Retry
            </Button>
          }
        />
      )}

      {/* Main Advisory Content Grid */}
      {!loading && advisoryReport && (
        <div className="space-y-6">
          {/* Quick Metrics Bar: Stage, Days, Soil Moisture */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-stone-500 uppercase">{t('advisory.daysSown')}</div>
                <div className="text-base font-extrabold text-stone-900">
                  Day {advisoryReport.daysSinceSowing}
                </div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-stone-500 uppercase">{t('advisory.soilMoisture')}</div>
                <div className="text-base font-extrabold text-stone-900">
                  {advisoryReport.soilMoisture.percentage}%
                  <span className="text-[11px] font-medium text-stone-500 ml-1">
                    ({advisoryReport.soilMoisture.levelDescription.split('/')[0]})
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-stone-500 uppercase">{t('advisory.harvestWindow')}</div>
                <div className="text-base font-extrabold text-stone-900">
                  ~{advisoryReport.expectedHarvestInDays} Days
                </div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-stone-500 uppercase">Crop Variety</div>
                <div className="text-xs font-bold text-stone-900 truncate max-w-[130px]" title={advisoryReport.variety}>
                  {advisoryReport.variety}
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Weather Condition & Rainfall Status Bar */}
          <div className="bg-linear-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-700/80 pb-3">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-400" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-300">
                  {t('advisory.weatherStatus')} • {selectedDistrict}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-700/70 text-emerald-300 border border-stone-600">
                  {advisoryReport.weatherSummary.rainfallStatus}
                </span>
                <button
                  onClick={() => onNavigate('weather')}
                  className="text-xs text-stone-300 hover:text-white flex items-center gap-1 underline decoration-stone-500 cursor-pointer"
                >
                  <span>Radar Forecast</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Weather Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="flex items-center gap-2.5">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-[11px] text-stone-400">Temperature</div>
                  <div className="text-sm font-bold text-white">
                    {advisoryReport.weatherSummary.temperature}°C ({advisoryReport.weatherSummary.condition})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <CloudRain className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-[11px] text-stone-400">Rain Prob. & Accumulation</div>
                  <div className="text-sm font-bold text-white">
                    {advisoryReport.weatherSummary.rainProbability}% ({advisoryReport.weatherSummary.rainfallExpectedMm} mm)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[11px] text-stone-400">Relative Humidity</div>
                  <div className="text-sm font-bold text-white">
                    {advisoryReport.weatherSummary.humidity}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Wind className="w-4 h-4 text-teal-400" />
                <div>
                  <div className="text-[11px] text-stone-400">Wind & Spray Safety</div>
                  <div className="text-sm font-bold text-white">
                    {advisoryReport.weatherSummary.windSpeed} km/h •{' '}
                    <span className={advisoryReport.weatherSummary.sprayWindowStatus === 'optimal' ? 'text-emerald-400' : (advisoryReport.weatherSummary.sprayWindowStatus === 'moderate' ? 'text-amber-400' : 'text-red-400')}>
                      {advisoryReport.weatherSummary.sprayWindowStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Irrigation Advice (Key Requirement) */}
          {(() => {
            const theme = getIrrigationTheme(advisoryReport.irrigationAdvice.status);
            return (
              <Card
                id="card-irrigation-advice"
                className={`border-2 ${theme.cardBg} transition-all`}
                title={
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Droplets className={`w-5 h-5 ${theme.iconColor}`} />
                      <span className="text-base sm:text-lg font-bold text-stone-900">
                        {t('advisory.irrigationAdvice')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ListenButton
                        id="btn-listen-irrigation"
                        text={{
                          hi: `सिंचाई सलाह: ${advisoryReport.irrigationAdvice.headline}। ${advisoryReport.irrigationAdvice.detailedAdvice}। किसान निर्देश: ${advisoryReport.irrigationAdvice.farmerInstruction}।`,
                          or: `ଜଳସେଚନ ପରାମର୍ଶ: ${advisoryReport.irrigationAdvice.headline}। ${advisoryReport.irrigationAdvice.detailedAdvice}। ନିର୍ଦ୍ଦେଶ: ${advisoryReport.irrigationAdvice.farmerInstruction}।`,
                          en: `Irrigation Advice: ${advisoryReport.irrigationAdvice.headline}. ${advisoryReport.irrigationAdvice.detailedAdvice}. Farmer Action Directive: ${advisoryReport.irrigationAdvice.farmerInstruction}.`,
                        }}
                        variant="chip"
                        size="xs"
                      />
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.badgeClass}`}>
                        {advisoryReport.irrigationAdvice.badgeLabel}
                      </span>
                    </div>
                  </div>
                }
              >
                <div className="space-y-3.5">
                  <div>
                    <h3 className={`text-base sm:text-lg font-extrabold ${theme.titleColor} leading-snug`}>
                      {advisoryReport.irrigationAdvice.headline}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                      {advisoryReport.irrigationAdvice.detailedAdvice}
                    </p>
                  </div>

                  <div className="bg-white/90 border border-stone-200/80 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                        Farmer Action Directive:
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                        {advisoryReport.irrigationAdvice.farmerInstruction}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>{advisoryReport.irrigationAdvice.nextReviewDate}</span>
                    <span>Soil Type: {advisoryReport.soilType}</span>
                  </div>
                </div>
              </Card>
            );
          })()}

          {/* Section 3: Crop Care & Agronomic Advice (Key Requirement) */}
          <Card
            id="card-crop-advice"
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-700" />
                  <span className="text-base sm:text-lg font-bold text-stone-900">
                    {t('advisory.cropAdvice')}
                  </span>
                </div>
                <ListenButton
                  id="btn-listen-crop-advice"
                  text={{
                    hi: `फसल सुरक्षा एवं पोषण सलाह: ${advisoryReport.cropAdvice.headline}। पोषण: ${advisoryReport.cropAdvice.nutrientGuidance}। कीट रक्षा: ${advisoryReport.cropAdvice.pestProtectionGuidance}।`,
                    or: `ଫସଲ ଯତ୍ନ ପରାମର୍ଶ: ${advisoryReport.cropAdvice.headline}। ପୋଷକ ତତ୍ତ୍ୱ: ${advisoryReport.cropAdvice.nutrientGuidance}। କୀଟନାଶକ: ${advisoryReport.cropAdvice.pestProtectionGuidance}।`,
                    en: `Crop Agronomic Guidance: ${advisoryReport.cropAdvice.headline}. Nutrition: ${advisoryReport.cropAdvice.nutrientGuidance}. Pest Defense: ${advisoryReport.cropAdvice.pestProtectionGuidance}.`,
                  }}
                  variant="chip"
                  size="xs"
                />
              </div>
            }
          >
            <div className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  {advisoryReport.cropAdvice.headline}
                </h3>
              </div>

              {/* 3 Pillars of Crop Management */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Nutrient Advice */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Fertilizer & Nutrition
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {advisoryReport.cropAdvice.nutrientGuidance}
                  </p>
                </div>

                {/* Pest & Disease Guidance */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    Pest & Disease Defense
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {advisoryReport.cropAdvice.pestProtectionGuidance}
                  </p>
                </div>

                {/* Field Operations */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Intercultural Field Work
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {advisoryReport.cropAdvice.fieldManagement}
                  </p>
                </div>
              </div>

              {/* Organic/Bio Tip if available */}
              {advisoryReport.cropAdvice.organicTip && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-900">
                    <span className="font-bold">Eco-Friendly Bio-Tip: </span>
                    {advisoryReport.cropAdvice.organicTip}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Section 4: Warnings & The "Why?" Explanations (Key Requirement) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  {t('advisory.importantWarnings')}
                </h2>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                Tap <span className="font-bold text-emerald-800">"Why?"</span> for scientific reasoning
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {advisoryReport.warnings.map((warn) => {
                const badgeStyle = getSeverityBadgeColor(warn.severity);
                return (
                  <div
                    key={warn.id}
                    id={`warning-card-${warn.id}`}
                    className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between space-y-3 hover:border-amber-400 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                          {warn.severity.toUpperCase()} • {warn.tag}
                        </span>
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                          Urgent
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{warn.title}</span>
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {warn.shortWarning}
                      </p>
                    </div>

                    {/* The "Why?" Interactive Action Row */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 flex-wrap">
                      <button
                        id={`why-btn-${warn.id}`}
                        onClick={() => setActiveWhyWarning(warn)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs group"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
                        <span>{t('advisory.whyButton')} (Scientific Reason)</span>
                      </button>

                      <ListenButton
                        id={`listen-warn-${warn.id}`}
                        text={{
                          hi: `महत्वपूर्ण चेतावनी: ${warn.title}। ${warn.shortWarning}। आवश्यक कार्रवाई: ${warn.actionRequired}।`,
                          or: `ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସତର୍କତା: ${warn.title}। ${warn.shortWarning}। କାର୍ଯ୍ୟାନୁଷ୍ଠାନ: ${warn.actionRequired}।`,
                          en: `Advisory Alert: ${warn.title}. ${warn.shortWarning}. Required Action: ${warn.actionRequired}.`,
                        }}
                        variant="amber"
                        size="xs"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: Recommended Farmer Actions Checklist (Key Requirement) */}
          <Card
            id="card-recommended-actions"
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span className="text-base sm:text-lg font-bold text-stone-900">
                    {t('advisory.recommendedActions')}
                  </span>
                </div>
                <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
                  {actionsList.filter(a => a.completed).length} / {actionsList.length} {t('advisory.completed')}
                </span>
              </div>
            }
          >
            <div className="space-y-2.5">
              {actionsList.map((action) => {
                const isDone = !!action.completed;
                return (
                  <div
                    key={action.id}
                    id={`action-row-${action.id}`}
                    onClick={() => handleToggleAction(action.id)}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200 text-stone-600'
                        : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 text-stone-900'
                    }`}
                  >
                    <button
                      type="button"
                      id={`checkbox-${action.id}`}
                      className="mt-0.5 text-emerald-700 hover:text-emerald-800 transition-colors"
                      aria-label={`Toggle action: ${action.title}`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-700 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-400" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                          {action.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            action.priority === 'urgent' ? 'bg-red-100 text-red-800' : (action.priority === 'high' ? 'bg-amber-100 text-amber-900' : 'bg-stone-200 text-stone-800')
                          }`}>
                            {action.priority.toUpperCase()}
                          </span>
                          <span className="text-[11px] text-stone-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            {action.dueWindow}
                          </span>
                        </div>
                      </div>

                      <p className={`text-xs mt-1 ${isDone ? 'text-stone-400' : 'text-stone-600'}`}>
                        {action.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Section 6: Ask Krishi Vigyan Kendra (KVK) Agronomist */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  {t('advisory.askAgronomist')}
                </h3>
                <p className="text-xs text-stone-500">
                  Ask any crop symptom or agrochemical dosage question for {currentCrop.name}
                </p>
              </div>
            </div>

            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  id="input-farmer-question"
                  value={farmerQuestion}
                  onChange={(e) => setFarmerQuestion(e.target.value)}
                  placeholder={t('advisory.askPlaceholder')}
                  className="w-full px-3.5 pr-20 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
                {farmerQuestion && (
                  <button
                    type="button"
                    id="btn-clear-farmer-question"
                    onClick={() => setFarmerQuestion('')}
                    className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 rounded-md"
                    title="Clear text"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <VoiceSearchButton
                    id="btn-mic-ask-agronomist"
                    onTranscript={(transcript, cleanQuery) => {
                      setFarmerQuestion(transcript || cleanQuery);
                    }}
                    variant="embedded"
                    size="sm"
                    placeholderExample='Try asking: "What pesticide for yellow leaves?"'
                  />
                </div>
              </div>
              <button
                type="submit"
                id="btn-ask-expert"
                disabled={!farmerQuestion.trim() || isAsking}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                {isAsking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">{t('advisory.askButton')}</span>
              </button>
            </form>

            {/* Render Recent Answers */}
            {expertAnswers.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                {expertAnswers.map((ans, idx) => (
                  <div key={idx} className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
                    <div className="font-bold text-emerald-950 flex items-center justify-between">
                      <span>Q: {ans.question}</span>
                      <span className="text-[10px] text-emerald-700 font-normal">{ans.time}</span>
                    </div>
                    <p className="text-emerald-900 leading-relaxed">
                      💡 {ans.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* "Why?" Interactive Explanation Modal */}
      {activeWhyWarning && (
        <div
          id="modal-why-explanation"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    {t('advisory.whyExplanationTitle')}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">
                    {activeWhyWarning.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ListenButton
                  id="btn-listen-why-modal"
                  text={{
                    hi: `वैज्ञानिक कारण और प्रभाव: ${activeWhyWarning.title}। जैविक कारण: ${activeWhyWarning.whyExplanation}। नजरअंदाज करने पर प्रभाव: ${activeWhyWarning.impactIfIgnored}। अनुशंसित कार्य: ${activeWhyWarning.actionRequired}।`,
                    or: `ବୈଜ୍ଞାନିକ କାରଣ: ${activeWhyWarning.title}। କାରଣ: ${activeWhyWarning.whyExplanation}। ପ୍ରଭାବ: ${activeWhyWarning.impactIfIgnored}। ଆବଶ୍ୟକ ପଦକ୍ଷେପ: ${activeWhyWarning.actionRequired}।`,
                    en: `Scientific Explanation for ${activeWhyWarning.title}. Biological reasoning: ${activeWhyWarning.whyExplanation}. Impact if ignored: ${activeWhyWarning.impactIfIgnored}. Recommended Action: ${activeWhyWarning.actionRequired}.`,
                  }}
                  variant="amber"
                  size="sm"
                />
                <button
                  id="btn-close-why-modal"
                  onClick={() => setActiveWhyWarning(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Core Scientific Explanation in Simple Language */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-700" />
                What is happening biologically?
              </span>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                {activeWhyWarning.whyExplanation}
              </p>
            </div>

            {/* Impact if Ignored */}
            <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 space-y-1.5">
              <span className="text-xs font-bold text-red-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-700" />
                {t('advisory.impactIfIgnored')}
              </span>
              <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                {activeWhyWarning.impactIfIgnored}
              </p>
            </div>

            {/* Recommended Action Required */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                {t('advisory.actionRequired')}
              </span>
              <p className="text-xs sm:text-sm text-emerald-900 font-semibold leading-relaxed">
                {activeWhyWarning.actionRequired}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end">
              <button
                id="btn-close-why-footer"
                onClick={() => setActiveWhyWarning(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
              >
                {t('advisory.closeWhy')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
