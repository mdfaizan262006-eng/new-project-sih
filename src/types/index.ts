export type AppSection = 
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'weather'
  | 'advisory'
  | 'market'
  | 'risk'
  | 'schemes'
  | 'profile';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  state: string;
  district: string;
  village: string;
  landSizeAcres: number;
  primaryCrops: string[];
  soilType: string;
  irrigationSource: string;
  preferredLanguage: string;
}

export interface WeatherCurrent {
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  condition: string;
  conditionDescription: string;
  conditionCode: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rain' | 'heavy_rain' | 'thunderstorm' | 'drizzle';
  rainProbability: number;
  rainfallMm: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  windGusts: number;
  pressureHpa: number;
  uvIndex: number;
  dewPoint: number;
  visibilityKm: number;
  cloudCover: number;
  spraySuitability: 'optimal' | 'moderate' | 'unfavorable';
  sprayWindowNote: string;
  soilMoistureLevel: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  condition: string;
  conditionCode: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rain' | 'heavy_rain' | 'thunderstorm' | 'drizzle';
  rainProbability: number;
  rainfallMm: number;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  conditionCode: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rain' | 'heavy_rain' | 'thunderstorm' | 'drizzle';
  rainProbability: number;
  rainfallMm: number;
  humidity: number;
  windSpeed: number;
  sprayRecommendation: string;
  sunrise: string;
  sunset: string;
}

export interface WeatherAlertItem {
  id: string;
  severity: 'warning' | 'advisory' | 'critical';
  title: string;
  description: string;
  issuedAt: string;
  validUntil: string;
  source: string;
}

export interface WeatherData {
  location: {
    village?: string;
    district: string;
    state: string;
    latitude: number;
    longitude: number;
    elevationMeters: number;
    stationName: string;
    lastUpdated: string;
  };
  current: WeatherCurrent;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  alerts: WeatherAlertItem[];
}

export interface NavItem {
  id: AppSection;
  label: string;
  hindiLabel?: string;
  iconName: string;
  description: string;
  isPublic?: boolean;
}

export interface AdvisoryWarning {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  shortWarning: string;
  whyExplanation: string;
  impactIfIgnored: string;
  actionRequired: string;
  tag: string;
}

export interface AdvisoryAction {
  id: string;
  title: string;
  description: string;
  category: 'irrigation' | 'spray' | 'fertilizer' | 'field_work' | 'pest_control';
  priority: 'urgent' | 'high' | 'medium' | 'normal';
  dueWindow: string;
  completed?: boolean;
}

export interface CropStageDetail {
  id: string;
  name: string;
  localName: string;
  daysRange: string;
  waterNeed: 'Low' | 'Moderate' | 'High' | 'Critical';
  keyRisk: string;
}

export interface CropAdvisoryReport {
  id: string;
  cropId: string;
  cropName: string;
  cropLocalName: string;
  iconName: string;
  variety: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  currentStage: string;
  stageName: string;
  stageDescription: string;
  daysSinceSowing: number;
  expectedHarvestInDays: number;
  soilType: string;
  soilMoisture: {
    percentage: number;
    levelDescription: string;
    status: 'dry' | 'optimal' | 'excess';
  };
  weatherSummary: {
    condition: string;
    conditionCode: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    rainProbability: number;
    rainfallExpectedMm: number;
    windSpeed: number;
    rainfallStatus: string;
    rainfallStatusBadge: 'heavy_rain' | 'moderate_rain' | 'dry_spell' | 'scattered_showers';
    sprayWindowStatus: 'optimal' | 'moderate' | 'unfavorable';
    sprayWindowNote: string;
  };
  irrigationAdvice: {
    status: 'hold' | 'irrigate' | 'drain' | 'critical_irrigate';
    badgeLabel: string;
    headline: string;
    detailedAdvice: string;
    farmerInstruction: string;
    nextReviewDate: string;
  };
  cropAdvice: {
    headline: string;
    nutrientGuidance: string;
    pestProtectionGuidance: string;
    fieldManagement: string;
    organicTip?: string;
  };
  warnings: AdvisoryWarning[];
  recommendedActions: AdvisoryAction[];
  agronomistNotes: string;
  lastUpdated: string;
}

export interface AdvisoryItem {
  id: string;
  crop: string;
  stage: string;
  title: string;
  urgency: 'low' | 'medium' | 'high';
  date: string;
  recommendation: string;
}

export interface MandiRecord {
  id: string;
  mandiName: string;
  district: string;
  state: string;
  distanceKm: number;
  cropId: string;
  cropName: string;
  variety: string;
  date: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  previousPrice: number;
  priceChange: number;
  priceChangePercent: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  arrivalVolumeTonnes: number;
  isBestMandi?: boolean;
  transportCostPerQtl: number;
  netPayoutPerQtl: number;
  grade: string;
}

export interface CropMarketData {
  cropId: string;
  cropName: string;
  cropHindi: string;
  cropOdia: string;
  icon: string;
  category: 'Oilseeds' | 'Cereals' | 'Pulses' | 'Cash Crops' | 'Vegetables';
  msp: number;
  currentDate: string;
  avgModalPrice: number;
  highestPrice: number;
  lowestPrice: number;
  bestMandiName: string;
  bestMandiPrice: number;
  bestMandiNetPayout: number;
  overallTrend: 'increasing' | 'stable' | 'decreasing';
  priceChangePercent: number;
  totalArrivalTonnes: number;
  mandis: MandiRecord[];
  history7d: {
    date: string;
    avgPrice: number;
    highestPrice: number;
    lowestPrice: number;
    arrivalTonnes: number;
  }[];
}

export interface MarketPrice {
  id: string;
  crop: string;
  mandi: string;
  state: string;
  currentPrice: number;
  modalPrice: number;
  priceChangePercent: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export interface RiskAlert {
  id: string;
  type: 'weather' | 'pest' | 'disease' | 'soil';
  severity: 'warning' | 'critical' | 'advisory';
  cropAffected: string;
  title: string;
  description: string;
  forecastWindow: string;
}

export type RiskCategoryLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface RiskFactorItem {
  id: 'rainfall' | 'cropWeather' | 'market' | 'paymentDue';
  name: string;
  nameHindi: string;
  nameOdia: string;
  weightPercent: number; // e.g. 30, 25, 25, 20
  score: number; // 0 to 100
  weightedContribution: number; // (score * weightPercent) / 100
  status: 'Low' | 'Moderate' | 'High' | 'Critical';
  reason: string;
  reasonHindi: string;
  reasonOdia: string;
  dataPoint: string;
}

export interface PaymentDueInfo {
  hasActiveLoan: boolean;
  loanType?: 'KCC (Kisan Credit Card)' | 'MFI / Microfinance' | 'Input Dealer Credit' | 'None';
  dueDate?: string;
  daysRemaining?: number;
  dueAmount?: number;
  isOverdue?: boolean;
  statusNote: string;
}

export interface AgriculturalRiskScore {
  totalScore: number; // 0 to 100
  category: RiskCategoryLevel;
  categoryRange: string;
  scoreDescription: string;
  assessmentDate: string;
  cropName: string;
  district: string;
  state: string;
  factors: {
    rainfall: RiskFactorItem;
    cropWeather: RiskFactorItem;
    market: RiskFactorItem;
    paymentDue: RiskFactorItem;
  };
  reasons: {
    keyDrivers: string[];
    mitigatingFactors: string[];
  };
  recommendedActions: {
    id: string;
    type: 'agricultural' | 'financial' | 'insurance';
    urgency: 'immediate' | 'within_48h' | 'regular';
    title: string;
    titleHindi: string;
    titleOdia: string;
    action: string;
    actionHindi: string;
    actionOdia: string;
    benefit: string;
  }[];
  paymentInfo: PaymentDueInfo;
}

export type SchemeCategory =
  | 'all'
  | 'income_support'
  | 'insurance'
  | 'credit'
  | 'solar_energy'
  | 'machinery'
  | 'soil_water'
  | 'pension'
  | 'infrastructure';

export interface SchemeBenefitItem {
  title: string;
  titleHindi?: string;
  titleOdia?: string;
  description: string;
  descriptionHindi?: string;
  descriptionOdia?: string;
  amountOrMetric?: string;
  isKeyHighlight?: boolean;
}

export interface SchemeDocumentItem {
  id: string;
  name: string;
  nameHindi?: string;
  nameOdia?: string;
  description: string;
  isMandatory: boolean;
  issuingAuthority?: string;
}

export interface SchemeApplicationStep {
  stepNumber: number;
  title: string;
  titleHindi?: string;
  titleOdia?: string;
  description: string;
  descriptionHindi?: string;
  descriptionOdia?: string;
  mode: 'online' | 'offline' | 'both';
  linkOrLocation?: string;
}

export interface SchemeOfficialSource {
  portalName: string;
  url: string;
  helplinePhone: string;
  tollFree?: string;
  ministryDepartment: string;
  sourceVerificationStatus: 'verified_official' | 'sample_demonstration';
}

export interface SchemeEligibilityCriteria {
  summary: string;
  summaryHindi?: string;
  summaryOdia?: string;
  landHoldingSize: 'all' | 'small_marginal' | 'medium_large' | 'specific';
  farmerType: ('owner' | 'tenant' | 'sharecropper' | 'fpo' | 'all')[];
  keyInclusions: string[];
  keyInclusionsHindi?: string[];
  keyInclusionsOdia?: string[];
  keyExclusions: string[];
  keyExclusionsHindi?: string[];
  keyExclusionsOdia?: string[];
}

export interface SchemeInfo {
  id: string;
  shortCode: string;
  name: string;
  nameHindi: string;
  nameOdia: string;
  subtitle: string;
  subtitleHindi: string;
  subtitleOdia: string;
  ministry: string;
  ministryHindi: string;
  ministryOdia: string;
  category: SchemeCategory;
  level: 'central' | 'state' | 'joint';
  applicableStates?: string[]; // e.g. ['All India', 'Madhya Pradesh', 'Odisha', ...]
  status: 'active' | 'upcoming' | 'closed';
  isPopular?: boolean;
  isFeatured?: boolean;
  isSampleDemonstration?: boolean;
  badgeLabel?: string;
  description: string;
  descriptionHindi: string;
  descriptionOdia: string;
  benefits: SchemeBenefitItem[];
  eligibility: SchemeEligibilityCriteria;
  documents: SchemeDocumentItem[];
  howToApply: SchemeApplicationStep[];
  officialSource: SchemeOfficialSource;
  lastUpdatedDate: string;
  nextDisbursementCycle?: string;
}

