import React, { useState, useEffect } from 'react';
import { AppSection, UserProfile } from '../../types';
import { Card } from '../../components/shared/Card';
import { Badge } from '../../components/shared/Badge';
import { Button } from '../../components/shared/Button';
import { Section } from '../../components/shared/Section';
import { Alert } from '../../components/shared/Alert';
import { ListenButton } from '../../components/shared/ListenButton';
import { useLanguage } from '../../i18n/LanguageContext';
import { authService, DEMO_USER } from '../../services/authService';
import {
  LayoutDashboard,
  CloudSun,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Circle,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Sprout,
  ArrowRight,
  ShieldAlert,
  CalendarCheck,
  Volume2,
  Compass,
  UserCheck,
  Clock,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface DashboardSectionProps {
  onNavigate: (section: AppSection) => void;
  currentUser?: UserProfile | null;
}

interface FarmActionItem {
  id: string;
  textKey: string;
  category: 'inspection' | 'spray' | 'drainage' | 'market';
  defaultDone: boolean;
  timeEstimate: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ onNavigate, currentUser }) => {
  const { t, language } = useLanguage();
  const user = currentUser || authService.getCurrentUser() || DEMO_USER;

  const farmerName = user.name || 'Ramesh Patel';
  const primaryCrop = user.primaryCrops && user.primaryCrops.length > 0 ? user.primaryCrops[0] : 'Soybean';
  const primaryCropsStr = user.primaryCrops && user.primaryCrops.length > 0
    ? user.primaryCrops.join(' & ')
    : 'Soybean & Wheat';
  const locationStr = `${user.village || 'Sanwer'}, ${user.district || 'Indore'}, ${user.state || 'Madhya Pradesh'}`;
  const landSizeStr = `${user.landSizeAcres || 4.5} Acres`;

  // Interactive Farm Actions state persisted in localStorage
  const actionItemsList: FarmActionItem[] = [
    {
      id: 'action-1',
      textKey: 'dashboard.action1',
      category: 'drainage',
      defaultDone: true,
      timeEstimate: 'Morning • 20 min',
    },
    {
      id: 'action-2',
      textKey: 'dashboard.action2',
      category: 'inspection',
      defaultDone: true,
      timeEstimate: 'Morning • 30 min',
    },
    {
      id: 'action-3',
      textKey: 'dashboard.action3',
      category: 'spray',
      defaultDone: false,
      timeEstimate: 'Afternoon • 45 min',
    },
    {
      id: 'action-4',
      textKey: 'dashboard.action4',
      category: 'market',
      defaultDone: false,
      timeEstimate: 'Evening • 10 min',
    },
  ];

  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('krishidrishti_today_actions');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      'action-1': true,
      'action-2': true,
      'action-3': false,
      'action-4': false,
    };
  });

  const [alertDismissed, setAlertDismissed] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('krishidrishti_today_actions', JSON.stringify(completedActions));
    } catch {
      // ignore
    }
  }, [completedActions]);

  const toggleAction = (id: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(completedActions).filter(Boolean).length;
  const totalCount = actionItemsList.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const getDashboardSpeechText = () => {
    return {
      hi: `${farmerName} जी, कृषि दृष्टि में आपका स्वागत है। आज का महत्वपूर्ण अलर्ट: अगले 24 घंटों में 75% बारिश की संभावना है। जल निकासी चैनल साफ करें। आज की अनुशंसित कृषि सलाह: शाम 4 बजे से पहले खेत की मेड़ दुरुस्त करें।`,
      or: `ନମସ୍କାର ${farmerName}। କୃଷି ଦୃଷ୍ଟି ଡ୍ୟାସବୋର୍ଡ: ଆଗାମୀ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ୭୫% ବର୍ଷା ସମ୍ଭାବନା। ଉପଯୁକ୍ତ ଜଳ ନିଷ୍କାସନ ବ୍ୟବସ୍ଥା କରନ୍ତୁ।`,
      en: `Welcome ${farmerName}. Important weather alert: 75% probability of moderate to heavy rain within the next 24 hours. Recommended action: Ensure drainage channels are clear and delay chemical spraying until weather settles.`,
    };
  };

  return (
    <Section
      id="section-dashboard"
      title={t('dashboard.title')}
      description={t('dashboard.farmerSubtitle')}
      icon={<LayoutDashboard className="w-6 h-6 text-emerald-800" />}
      badge={<Badge variant="emerald">{t('dashboard.badge')}</Badge>}
      action={
        <div className="flex items-center gap-2 flex-wrap">
          <ListenButton
            id="dashboard-audio-summary-btn"
            text={getDashboardSpeechText()}
            variant="outline"
            size="md"
            label="Audio Summary"
            stopLabel="Stop Audio"
          />
          <Button
            size="md"
            variant="outline"
            onClick={() => onNavigate('onboarding')}
            icon={<Compass className="w-4 h-4" />}
          >
            {t('btn.farmSetup')}
          </Button>
          <Button
            size="md"
            variant="primary"
            onClick={() => onNavigate('profile')}
            icon={<UserCheck className="w-4 h-4" />}
          >
            {t('btn.farmerProfile')}
          </Button>
        </div>
      }
    >
      {/* 1. Farmer Name & Location Bar */}
      <Card className="bg-white border-stone-200" bodyClassName="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-lg border border-emerald-200 shrink-0">
              {farmerName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                  {t('dashboard.greeting', { name: farmerName })}
                </h2>
                <Badge variant="emerald">{t('dashboard.kharifActive')}</Badge>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locationStr}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate('onboarding')}
            >
              {t('onboarding.editDetails')}
            </Button>
          </div>
        </div>

        {/* Quick specs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-3 pt-1">
          <div className="p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200/80">
            <div className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              {t('dashboard.primaryCrops')}
            </div>
            <div className="text-sm sm:text-base font-bold text-stone-900 mt-1 truncate">{primaryCropsStr}</div>
          </div>

          <div className="p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200/80">
            <div className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              {t('dashboard.localWeather')}
            </div>
            <div className="text-sm sm:text-base font-bold text-stone-900 mt-1">29°C • Humid</div>
          </div>

          <div className="p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200/80">
            <div className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-stone-600 shrink-0" />
              {t('dashboard.landHolding')}
            </div>
            <div className="text-sm sm:text-base font-bold text-stone-900 mt-1">{landSizeStr}</div>
          </div>

          <div className="p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200/80">
            <div className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              {t('dashboard.appHealth')}
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-800 mt-1">{t('dashboard.healthVal')}</div>
          </div>
        </div>
      </Card>

      {/* 2. Important Alert (Prominent weather & advisory warning) */}
      {!alertDismissed && (
        <Alert
          type="warning"
          title={t('dashboard.importantAlertTitle')}
          message={t('dashboard.importantAlertText')}
          icon={<Zap className="w-5 h-5 text-amber-700" />}
          enableListen={true}
          listenText={{
            hi: `महत्वपूर्ण कृषि चेतावनी: ${t('dashboard.importantAlertTitle')}। ${t('dashboard.importantAlertText')}`,
            or: `ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସତର୍କତା: ${t('dashboard.importantAlertTitle')}। ${t('dashboard.importantAlertText')}`,
            en: `Important Alert: ${t('dashboard.importantAlertTitle')}. ${t('dashboard.importantAlertText')}`,
          }}
          action={{
            label: t('dashboard.viewFullAdvisory'),
            onClick: () => onNavigate('advisory'),
          }}
          onClose={() => setAlertDismissed(true)}
        />
      )}

      {/* Mobile-First 2-Column Responsive Grid for Core Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 3. Weather Card */}
        <Card
          id="dashboard-weather-card"
          className="bg-white border-stone-200 flex flex-col justify-between"
          bodyClassName="p-4 sm:p-5 flex flex-col h-full justify-between gap-4"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-700">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {t('dashboard.weatherCardTitle')}
                  </h3>
                  <p className="text-xs text-stone-500">{user.district || 'Indore'} District • Live Radar</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                Rain Alert
              </span>
            </div>

            {/* Main Temperature & Condition Display */}
            <div className="flex items-center justify-between mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
              <div className="flex items-center gap-3">
                <div className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                  29°C
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800">
                    {t('dashboard.weatherCondition')}
                  </div>
                  <div className="text-[11px] text-stone-500">Feels like 31°C • UV Moderate</div>
                </div>
              </div>
              <CloudRain className="w-8 h-8 text-blue-600" />
            </div>

            {/* Weather Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                <div className="text-[11px] text-stone-500 font-medium flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-600" />
                  {t('dashboard.humidity')}
                </div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">68%</div>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                <div className="text-[11px] text-stone-500 font-medium flex items-center justify-center gap-1">
                  <CloudRain className="w-3 h-3 text-blue-600" />
                  {t('dashboard.rainProbability')}
                </div>
                <div className="text-sm font-bold text-blue-700 mt-0.5">75%</div>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                <div className="text-[11px] text-stone-500 font-medium flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3 text-stone-600" />
                  {t('dashboard.windSpeed')}
                </div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">12 km/h</div>
              </div>
            </div>

            {/* Spray Window Advisory */}
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
                <span className="font-semibold text-emerald-950">
                  {t('dashboard.sprayWindow')}: <span className="font-normal text-emerald-900">{t('dashboard.sprayWindowVal')}</span>
                </span>
              </div>
            </div>

            {/* 3-day forecast micro preview */}
            <div className="mt-3">
              <div className="text-xs font-bold text-stone-700 mb-1.5">{t('dashboard.forecast3Day')}</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                  <div className="font-bold text-stone-800">Today</div>
                  <div className="text-stone-500 text-[11px]">29° / 22°</div>
                  <div className="text-blue-600 font-semibold text-[11px] mt-0.5">Rain 75%</div>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                  <div className="font-bold text-stone-800">Tomorrow</div>
                  <div className="text-stone-500 text-[11px]">26° / 21°</div>
                  <div className="text-blue-600 font-semibold text-[11px] mt-0.5">Rain 85%</div>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                  <div className="font-bold text-stone-800">Fri</div>
                  <div className="text-stone-500 text-[11px]">30° / 23°</div>
                  <div className="text-emerald-700 font-semibold text-[11px] mt-0.5">Clear 20%</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('weather')}
            className="w-full pt-3 mt-1 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-emerald-800 font-bold hover:text-emerald-950 cursor-pointer"
          >
            <span>{t('weather.title')} & Radar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* 4. Crop Advisory Card */}
        <Card
          id="dashboard-crop-advisory-card"
          className="bg-white border-stone-200 flex flex-col justify-between"
          bodyClassName="p-4 sm:p-5 flex flex-col h-full justify-between gap-4"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {t('dashboard.cropAdvisoryTitle')}
                  </h3>
                  <p className="text-xs text-stone-500">{primaryCrop} (JS-9560) • Kharif</p>
                </div>
              </div>
              <Badge variant="emerald">{t('dashboard.badgeActionable')}</Badge>
            </div>

            {/* Current Stage Indicator */}
            <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
              <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Current Phenological Stage
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-900 mt-0.5">
                {t('dashboard.cropStage')}
              </div>
              <div className="w-full bg-stone-200 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Recommended Action Box */}
            <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-emerald-950">
                    Recommended Nutrient Action
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 mt-1 leading-relaxed">
                    {t('dashboard.advisoryAction')}
                  </p>
                </div>
              </div>
            </div>

            {/* Soil Moisture */}
            <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">{t('dashboard.soilMoisture')}:</span>
              <span className="font-bold text-stone-900">{t('dashboard.soilMoistureVal')}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('advisory')}
            className="w-full pt-3 mt-1 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-emerald-800 font-bold hover:text-emerald-950 cursor-pointer"
          >
            <span>{t('dashboard.viewFullAdvisory')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* 5. Risk Card (Agricultural Risk Score Index) */}
        <Card
          id="dashboard-risk-card"
          className="bg-white border-stone-200 flex flex-col justify-between"
          bodyClassName="p-4 sm:p-5 flex flex-col h-full justify-between gap-4"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-800">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    Agricultural Risk Score
                  </h3>
                  <p className="text-xs text-stone-500">Agro-Financial Decision Index</p>
                </div>
              </div>
              <Badge variant="amber">Moderate (38/100)</Badge>
            </div>

            {/* Risk Index Summary Banner */}
            <div className="mt-3 p-3 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="font-bold text-sm text-amber-950">
                    Composite Risk: 38 / 100
                  </span>
                </div>
                <p className="text-xs text-amber-900 mt-1 font-medium">
                  Moderate Category (26–50) • Active Field & Market Tracking
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-amber-950 block">Rainfall: 30%</span>
                <span className="text-[10px] text-amber-800 font-mono">Crop:25% | Mkt:25% | Pay:20%</span>
              </div>
            </div>

            {/* Preventative Protocol */}
            <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
              <div className="text-xs font-bold text-stone-800">
                Primary Recommended Mitigation
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Clear field drainage trenches before forecasted showers; schedule crop sales to high-payout APMC mandi to preserve KCC interest subvention.
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Evaluated for Soybean & Paddy • All 4 categories testable</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('risk')}
            className="w-full pt-3 mt-1 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-emerald-800 font-bold hover:text-emerald-950 cursor-pointer"
          >
            <span>Open Full Agricultural Risk Score & Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* 6. Market Price Card */}
        <Card
          id="dashboard-market-price-card"
          className="bg-white border-stone-200 flex flex-col justify-between"
          bodyClassName="p-4 sm:p-5 flex flex-col h-full justify-between gap-4"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-800">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {t('dashboard.marketCardTitle')}
                  </h3>
                  <p className="text-xs text-stone-500">{t('dashboard.mandiLocation')}</p>
                </div>
              </div>
              <Badge variant="blue">{t('dashboard.badgeLiveRates')}</Badge>
            </div>

            {/* Primary Crop Price Display */}
            <div className="mt-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-600">{t('dashboard.marketCrop')}</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-0.5">
                    {t('dashboard.marketPrice')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {t('dashboard.marketTrend')}
                  </span>
                  <div className="text-[11px] text-stone-500 mt-1">Arrivals: 4,200 bags</div>
                </div>
              </div>

              {/* MSP Comparison Bar */}
              <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
                <span>{t('dashboard.marketMsp')}</span>
                <span className="text-emerald-700 font-bold">99.1% of MSP</span>
              </div>
            </div>

            {/* Secondary Crop Price */}
            <div className="mt-3 p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
              <span className="font-medium text-stone-700">{t('dashboard.secondaryCropPrice')}</span>
              <span className="text-stone-500">Sanwer APMC</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('market')}
            className="w-full pt-3 mt-1 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-emerald-800 font-bold hover:text-emerald-950 cursor-pointer"
          >
            <span>{t('dashboard.viewAllRates')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Card>
      </div>

      {/* 7. Today's Action (Interactive Farmer Task Checklist) */}
      <Card
        id="dashboard-today-actions"
        className="bg-white border-stone-200"
        bodyClassName="p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-800" />
              <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                {t('dashboard.todayActionsTitle')}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              {t('dashboard.todayActionsSub')}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t('dashboard.actionProgress', { count: completedCount, total: totalCount })}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 rounded-full h-2 mt-3">
          <div
            className="bg-emerald-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* All done congratulatory alert */}
        {completedCount === totalCount && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t('dashboard.actionAllDone')}</span>
          </div>
        )}

        {/* Checklist items */}
        <div className="mt-4 space-y-2.5">
          {actionItemsList.map((item) => {
            const isDone = !!completedActions[item.id];
            return (
              <div
                key={item.id}
                id={`action-item-${item.id}`}
                onClick={() => toggleAction(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200/80 text-stone-700'
                    : 'bg-stone-50/80 border-stone-200/80 hover:bg-stone-100/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-emerald-700">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-400" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-semibold leading-snug ${
                        isDone ? 'line-through text-stone-500' : 'text-stone-900'
                      }`}
                    >
                      {t(item.textKey)}
                    </p>
                    <span className="text-[11px] text-stone-500 mt-1 inline-block font-medium">
                      {item.timeEstimate}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-stone-200/70 text-stone-700 border-stone-300'
                  }`}
                >
                  {isDone ? t('dashboard.quickActionCompleted') : t('dashboard.quickActionPending')}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Navigation to Other Sections */}
      <div className="pt-2">
        <div className="flex items-center justify-between px-1 mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
            {t('dashboard.modulesTitle')}
          </h4>
          <span className="text-xs text-stone-500">{t('dashboard.modulesSub')}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          <button
            onClick={() => onNavigate('weather')}
            className="p-3 bg-white rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col justify-between h-24"
          >
            <div className="flex items-center justify-between w-full">
              <CloudSun className="w-4 h-4 text-emerald-700" />
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">{t('nav.weather')}</div>
              <div className="text-[11px] text-stone-500 truncate">{t('weather.badge')}</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('advisory')}
            className="p-3 bg-white rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col justify-between h-24"
          >
            <div className="flex items-center justify-between w-full">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">{t('nav.advisory')}</div>
              <div className="text-[11px] text-stone-500 truncate">{t('dashboard.badgeActionable')}</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('market')}
            className="p-3 bg-white rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col justify-between h-24"
          >
            <div className="flex items-center justify-between w-full">
              <TrendingUp className="w-4 h-4 text-blue-700" />
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">{t('nav.market')}</div>
              <div className="text-[11px] text-stone-500 truncate">{t('dashboard.badgeLiveRates')}</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('risk')}
            className="p-3 bg-white rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col justify-between h-24"
          >
            <div className="flex items-center justify-between w-full">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">{t('nav.risk')}</div>
              <div className="text-[11px] text-stone-500 truncate">{t('dashboard.badgeEarlyWarning')}</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('schemes')}
            className="p-3 bg-white rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col justify-between h-24"
          >
            <div className="flex items-center justify-between w-full">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">{t('nav.schemes')}</div>
              <div className="text-[11px] text-stone-500 truncate">{t('dashboard.badgeSubsidies')}</div>
            </div>
          </button>
        </div>
      </div>
    </Section>
  );
};
