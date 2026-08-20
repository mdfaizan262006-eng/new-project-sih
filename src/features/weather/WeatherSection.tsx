import React, { useState, useEffect, useCallback } from 'react';
import { AppSection, WeatherData, UserProfile } from '../../types';
import { Card } from '../../components/shared/Card';
import { Badge } from '../../components/shared/Badge';
import { Button } from '../../components/shared/Button';
import { Section } from '../../components/shared/Section';
import { Alert } from '../../components/shared/Alert';
import { ListenButton } from '../../components/shared/ListenButton';
import { useLanguage } from '../../i18n/LanguageContext';
import { authService, DEMO_USER } from '../../services/authService';
import { weatherService } from '../../services/weatherService';
import {
  CloudSun,
  CloudRain,
  Sun,
  CloudLightning,
  Cloud,
  CloudDrizzle,
  Droplets,
  Wind,
  Compass,
  AlertTriangle,
  RefreshCw,
  Volume2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Gauge,
  Eye,
  Umbrella,
  Thermometer,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

interface WeatherSectionProps {
  onNavigate: (section: AppSection) => void;
  currentUser?: UserProfile | null;
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({ onNavigate, currentUser }) => {
  const { t, language } = useLanguage();
  const user = currentUser || authService.getCurrentUser() || DEMO_USER;

  // Selected district state
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => user.district || 'Indore');
  const [selectedState, setSelectedState] = useState<string>(() => user.state || 'Madhya Pradesh');

  // Weather data, loading, and error states
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSimulatingError, setIsSimulatingError] = useState<boolean>(false);
  const [forecastTab, setForecastTab] = useState<'hourly' | 'daily'>('hourly');

  const fetchWeather = useCallback(async (district: string, state: string, forceErr = false) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await weatherService.getWeatherData({
        district,
        state,
        village: user.village || 'Sanwer',
        forceError: forceErr,
      });
      setWeatherData(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to weather satellite station.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user.village]);

  useEffect(() => {
    fetchWeather(selectedDistrict, selectedState, isSimulatingError);
  }, [selectedDistrict, selectedState, isSimulatingError, fetchWeather]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchWeather(selectedDistrict, selectedState, isSimulatingError);
  };

  const handleToggleSimulateError = () => {
    const nextVal = !isSimulatingError;
    setIsSimulatingError(nextVal);
    fetchWeather(selectedDistrict, selectedState, nextVal);
  };

  const handleDistrictChange = (newDistrict: string) => {
    setSelectedDistrict(newDistrict);
    if (newDistrict.toLowerCase() === 'sambalpur' || newDistrict.toLowerCase() === 'cuttack') {
      setSelectedState('Odisha');
    } else {
      setSelectedState('Madhya Pradesh');
    }
  };

  const handleResetToProfileLocation = () => {
    const dist = user.district || 'Indore';
    const st = user.state || 'Madhya Pradesh';
    setSelectedDistrict(dist);
    setSelectedState(st);
  };

  const getWeatherSpeechText = () => {
    if (!weatherData) return '';
    const curr = weatherData.current;
    return {
      hi: `${weatherData.location.district} मौसम बुलेटिन: वर्तमान तापमान ${curr.temperature} डिग्री सेल्सियस है और मौसम ${curr.condition} है। बारिश की संभावना ${curr.rainProbability} प्रतिशत और संभावित वर्षा ${curr.rainfallMm} मिलीमीटर है। हवा की गति ${curr.windSpeed} किलोमीटर प्रति घंटा और आर्द्रता ${curr.humidity} प्रतिशत है। कीटनाशक छिड़काव खिड़की: ${curr.spraySuitability}। ${curr.sprayWindowNote}`,
      or: `${weatherData.location.district} ପାଣିପାଗ ରିପୋର୍ଟ: ବର୍ତ୍ତମାନ ତାପମାତ୍ରା ${curr.temperature} ଡିଗ୍ରୀ। ବର୍ଷା ସମ୍ଭାବନା ${curr.rainProbability}%। କୀଟନାଶକ ସ୍ପ୍ରେ ସ୍ଥିତି: ${curr.spraySuitability}। ${curr.sprayWindowNote}`,
      en: `${weatherData.location.district} district weather report: Current temperature is ${curr.temperature} degrees celsius with ${curr.condition}. Rain probability is ${curr.rainProbability} percent with ${curr.rainfallMm} millimeters expected rainfall. Humidity is ${curr.humidity} percent, wind speed is ${curr.windSpeed} kilometers per hour. Agromet spraying window status: ${curr.spraySuitability}. ${curr.sprayWindowNote}`,
    };
  };

  const getWeatherIcon = (code: string, className = 'w-6 h-6') => {
    switch (code) {
      case 'sunny':
        return <Sun className={`${className} text-amber-500`} />;
      case 'partly_cloudy':
        return <CloudSun className={`${className} text-amber-500`} />;
      case 'cloudy':
        return <Cloud className={`${className} text-stone-500`} />;
      case 'rain':
        return <CloudRain className={`${className} text-blue-600`} />;
      case 'heavy_rain':
        return <CloudRain className={`${className} text-blue-700`} />;
      case 'thunderstorm':
        return <CloudLightning className={`${className} text-amber-600`} />;
      case 'drizzle':
        return <CloudDrizzle className={`${className} text-blue-400`} />;
      default:
        return <CloudSun className={`${className} text-amber-500`} />;
    }
  };

  return (
    <Section
      id="section-weather"
      title={t('weather.title')}
      description={t('weather.subtitle')}
      icon={<CloudSun className="w-6 h-6 text-emerald-800" />}
      badge={<Badge variant="emerald">{t('weather.badge')}</Badge>}
      action={
        <div className="flex items-center gap-2 flex-wrap">
          <ListenButton
            id="weather-voice-btn"
            text={getWeatherSpeechText()}
            variant="outline"
            size="md"
            label={t('weather.audioForecast')}
            stopLabel={t('weather.stopAudio')}
          />
          <Button
            size="md"
            variant={isRefreshing ? 'ghost' : 'outline'}
            onClick={handleRefresh}
            disabled={isLoading}
            icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />}
          >
            {isRefreshing ? t('weather.refreshing') : t('weather.refresh')}
          </Button>
          <Button
            size="md"
            variant={isSimulatingError ? 'danger' : 'outline'}
            onClick={handleToggleSimulateError}
            icon={isSimulatingError ? <RotateCcw className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4 text-amber-700" />}
          >
            {isSimulatingError ? t('weather.testSuccessBtn') : t('weather.testErrorBtn')}
          </Button>
        </div>
      }
    >
      {/* 1. Location & Station Filter Bar */}
      <Card className="bg-white border-stone-200" bodyClassName="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100/70 border border-emerald-200 text-emerald-900 shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                  {selectedDistrict}, {selectedState}
                </h3>
                <Badge variant="stone">
                  {user.village ? `${user.village} • ${t('weather.station')}` : t('weather.station')}
                </Badge>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{t('weather.lastUpdated')}: {weatherData?.location.lastUpdated || 'Synchronizing...'}</span>
              </p>
            </div>
          </div>

          {/* District selector pill buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-stone-500 hidden sm:inline">
              {t('weather.changeDistrict')}:
            </span>
            {['Indore', 'Ujjain', 'Bhopal', 'Sambalpur', 'Cuttack'].map((dist) => {
              const isSelected = selectedDistrict.toLowerCase() === dist.toLowerCase();
              return (
                <button
                  key={dist}
                  id={`btn-district-${dist.toLowerCase()}`}
                  onClick={() => handleDistrictChange(dist)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {dist}
                </button>
              );
            })}
            <button
              onClick={handleResetToProfileLocation}
              title={t('weather.autoGps')}
              className="p-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-600 hover:text-emerald-800 border border-stone-200 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('weather.autoGps')}</span>
            </button>
          </div>
        </div>
      </Card>

      {/* 2. Error State View */}
      {errorMessage && (
        <Card className="bg-amber-50/50 border-amber-300" bodyClassName="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-100 border border-amber-200 text-amber-900 shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-amber-950">
                  {t('weather.errorTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                  {errorMessage}
                </p>
                <div className="text-xs text-amber-800/80 mt-2 font-medium">
                  Possible causes: Radar telemetry timeout or simulated connection test.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Button
                size="md"
                variant="primary"
                onClick={() => {
                  setIsSimulatingError(false);
                  fetchWeather(selectedDistrict, selectedState, false);
                }}
                icon={<RefreshCw className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {t('weather.errorRetry')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 3. Loading State Skeleton View */}
      {isLoading && !weatherData && (
        <div id="weather-loading-state" className="space-y-4">
          <Card className="bg-white border-stone-200 animate-pulse" bodyClassName="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="h-6 w-48 bg-stone-200 rounded-lg"></div>
                <div className="h-12 w-36 bg-stone-300 rounded-xl"></div>
                <div className="h-4 w-64 bg-stone-200 rounded-md"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-20 w-28 bg-stone-100 rounded-xl border border-stone-200"></div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-stone-500 text-sm">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
              <span>{t('weather.loadingTitle')}</span>
            </div>
          </Card>
        </div>
      )}

      {/* 4. Active Weather Alert Banner (if any) */}
      {weatherData && weatherData.alerts.length > 0 && (
        <div className="space-y-2">
          {weatherData.alerts.map((alert) => (
            <Alert
              key={alert.id}
              type="warning"
              title={alert.title}
              message={`${alert.description} (Source: ${alert.source} • Valid until: ${alert.validUntil})`}
              icon={<ShieldAlert className="w-5 h-5 text-amber-700" />}
              enableListen={true}
              listenText={{
                hi: `मौसम चेतावनी: ${alert.title}। ${alert.description}। वैधता: ${alert.validUntil}। स्रोत: ${alert.source}।`,
                or: `ପାଣିପାଗ ସତର୍କତା: ${alert.title}। ${alert.description}। ବୈଧତା: ${alert.validUntil}।`,
                en: `Weather Alert: ${alert.title}. ${alert.description}. Valid until: ${alert.validUntil}. Source: ${alert.source}.`,
              }}
              action={{
                label: t('weather.viewInRisk'),
                onClick: () => onNavigate('risk'),
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Main Weather Dashboard (When data is ready) */}
      {weatherData && !isLoading && (
        <>
          {/* Top Primary Hero Weather Card */}
          <Card
            id="weather-hero-card"
            className="bg-white border-stone-200 overflow-hidden"
            bodyClassName="p-5 sm:p-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Big Temperature & Condition */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 pb-5 lg:pb-0 lg:border-r lg:border-stone-100 lg:pr-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {t('weather.currentCondition')}
                    </span>
                    <Badge variant="emerald">Live Micro-Climate</Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-amber-600">
                      {getWeatherIcon(weatherData.current.conditionCode, 'w-12 h-12')}
                    </div>
                    <div>
                      <div className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
                        {weatherData.current.temperature}°C
                      </div>
                      <div className="text-sm font-bold text-stone-800 mt-0.5">
                        {weatherData.current.condition}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-stone-500 font-medium mt-3">
                    <span>
                      {t('weather.feelsLike')}: <strong className="text-stone-800 font-bold">{weatherData.current.feelsLike}°C</strong>
                    </span>
                    <span>•</span>
                    <span>
                      {t('weather.highLow')}: <strong className="text-stone-800 font-bold">{weatherData.current.tempMax}° / {weatherData.current.tempMin}°</strong>
                    </span>
                  </div>
                </div>

                {/* Agromet Spray Window Status Box */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    weatherData.current.spraySuitability === 'optimal'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : weatherData.current.spraySuitability === 'moderate'
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : 'bg-red-50 border-red-200 text-red-950'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
                    <div className="flex items-center gap-2">
                      {weatherData.current.spraySuitability === 'optimal' ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {t('weather.sprayTitle')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ListenButton
                        id="btn-listen-spray-window"
                        text={{
                          hi: `कीटनाशक छिड़काव खिड़की स्थिति: ${weatherData.current.spraySuitability === 'optimal' ? 'अनुकूल' : 'सावधानी'}। ${weatherData.current.sprayWindowNote}`,
                          or: `କୀଟନାଶକ ସ୍ପ୍ରେ ସୁପାରିଶ: ${weatherData.current.sprayWindowNote}`,
                          en: `Agromet Spray Window Status: ${weatherData.current.spraySuitability}. ${weatherData.current.sprayWindowNote}`,
                        }}
                        variant="chip"
                        size="xs"
                      />
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-white/80 border border-current/20">
                        {weatherData.current.spraySuitability === 'optimal'
                          ? t('weather.sprayOptimal')
                          : weatherData.current.spraySuitability === 'moderate'
                          ? t('weather.sprayModerate')
                          : t('weather.sprayUnfavorable')}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs mt-2 leading-relaxed">
                    {weatherData.current.sprayWindowNote}
                  </p>
                </div>
              </div>

              {/* Right Column: 6 Core Meteorological Spec Tiles */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  
                  {/* 1. Rain Probability */}
                  <div id="tile-rain-prob" className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                      <span>{t('weather.rainProb')}</span>
                      <CloudRain className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-extrabold text-blue-700">
                        {weatherData.current.rainProbability}%
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${weatherData.current.rainProbability}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">High precipitation risk</span>
                  </div>

                  {/* 2. Rainfall Amount (mm) */}
                  <div id="tile-rainfall-mm" className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                      <span>{t('weather.rainfall')}</span>
                      <Droplets className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-extrabold text-stone-900">
                        {weatherData.current.rainfallMm} <span className="text-sm font-semibold text-stone-500">mm</span>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-700 mt-1 inline-block">
                        Expected next 24h
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">24h Cum: 34.0 mm</span>
                  </div>

                  {/* 3. Humidity */}
                  <div id="tile-humidity" className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                      <span>{t('weather.humidity')}</span>
                      <Gauge className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-extrabold text-stone-900">
                        {weatherData.current.humidity}%
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 mt-1 inline-block">
                        Dew Point: {weatherData.current.dewPoint}°C
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">Comfort: Humid</span>
                  </div>

                  {/* 4. Wind Speed & Direction */}
                  <div id="tile-wind" className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                      <span>{t('weather.wind')}</span>
                      <Wind className="w-4 h-4 text-stone-600" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-extrabold text-stone-900">
                        {weatherData.current.windSpeed} <span className="text-sm font-semibold text-stone-500">km/h</span>
                      </div>
                      <span className="text-[11px] font-semibold text-stone-700 mt-1 inline-block">
                        {weatherData.current.windDirection} • Gusts {weatherData.current.windGusts} km/h
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">Safe for light work</span>
                  </div>

                  {/* 5. Soil Moisture Index */}
                  <div id="tile-soil-moisture" className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                      <span>{t('weather.soilMoisture')}</span>
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="mt-2">
                      <div className="text-base font-bold text-stone-900 truncate">
                        {weatherData.current.soilMoistureLevel}
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 mt-1 inline-block">
                        Root-zone 0-30 cm
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">No irrigation required</span>
                  </div>

                  {/* 6. Atmospheric Pressure & UV */}
                  <div id="tile-pressure-uv" className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                      <span>{t('weather.pressure')}</span>
                      <Info className="w-4 h-4 text-stone-500" />
                    </div>
                    <div className="mt-2">
                      <div className="text-xl font-bold text-stone-900">
                        {weatherData.current.pressureHpa} <span className="text-xs font-normal text-stone-500">hPa</span>
                      </div>
                      <span className="text-[11px] font-semibold text-stone-700 mt-1 inline-block">
                        UV: {weatherData.current.uvIndex} (Moderate)
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">Cloud Cover: {weatherData.current.cloudCover}%</span>
                  </div>

                </div>

                {/* Direct Action Link to Crop Advisory */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <span className="font-medium">
                    Integrated Agromet Model connected to your {user.primaryCrops?.[0] || 'Soybean'} crop stage.
                  </span>
                  <button
                    onClick={() => onNavigate('advisory')}
                    className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Crop Advisory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* 6. Forecast Section (Hourly & 7-Day Daily Tabbed Layout) */}
          <Card className="bg-white border-stone-200" bodyClassName="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-800" />
                  <span>{forecastTab === 'hourly' ? t('weather.hourlyTitle') : t('weather.dailyTitle')}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Micro-climate simulation computed for {selectedDistrict} agricultural cluster
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/80 self-start sm:self-center">
                <button
                  id="tab-hourly-forecast"
                  onClick={() => setForecastTab('hourly')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    forecastTab === 'hourly'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t('weather.tabHourly')}
                </button>
                <button
                  id="tab-daily-forecast"
                  onClick={() => setForecastTab('daily')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    forecastTab === 'daily'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t('weather.tabDaily')}
                </button>
              </div>
            </div>

            {/* View A: 24-Hour Progression (Hourly Horizontal Scroll) */}
            {forecastTab === 'hourly' && (
              <div className="mt-4 overflow-x-auto pb-2">
                <div className="flex items-stretch gap-3 min-w-max">
                  {weatherData.hourly.map((h, idx) => {
                    const isNow = idx === 0;
                    return (
                      <div
                        key={idx}
                        id={`hourly-item-${idx}`}
                        className={`p-3.5 rounded-2xl border flex flex-col items-center justify-between text-center w-28 transition-all ${
                          isNow
                            ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300'
                            : 'bg-stone-50 border-stone-200/80 hover:bg-stone-100/80'
                        }`}
                      >
                        <div className="text-xs font-bold text-stone-700">
                          {isNow ? 'Now' : h.time}
                        </div>

                        <div className="my-2.5">
                          {getWeatherIcon(h.conditionCode, 'w-8 h-8')}
                        </div>

                        <div className="text-base font-extrabold text-stone-900">
                          {h.temperature}°C
                        </div>

                        <div className="w-full mt-2 pt-2 border-t border-stone-200/60 space-y-1">
                          <div className="text-[11px] font-bold text-blue-700 flex items-center justify-center gap-1">
                            <Umbrella className="w-3 h-3" />
                            <span>{h.rainProbability}%</span>
                          </div>
                          {h.rainfallMm > 0 && (
                            <div className="text-[10px] text-blue-600 font-medium">
                              {h.rainfallMm} mm
                            </div>
                          )}
                          <div className="text-[10px] text-stone-500">
                            {h.windSpeed} km/h
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View B: 7-Day Extended Daily Forecast Cards */}
            {forecastTab === 'daily' && (
              <div className="mt-4 space-y-2.5">
                {weatherData.daily.map((d, idx) => {
                  const isToday = idx === 0;
                  return (
                    <div
                      key={idx}
                      id={`daily-item-${idx}`}
                      className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                        isToday
                          ? 'bg-emerald-50/40 border-emerald-300'
                          : 'bg-stone-50 border-stone-200/80 hover:bg-stone-100/70'
                      }`}
                    >
                      {/* Day Label & Condition */}
                      <div className="flex items-center gap-3.5 min-w-[200px]">
                        <div className="p-2 rounded-xl bg-white border border-stone-200 shrink-0">
                          {getWeatherIcon(d.conditionCode, 'w-6 h-6')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900">{d.dayName}</span>
                            <span className="text-xs text-stone-500 font-medium">{d.date}</span>
                          </div>
                          <span className="text-xs text-stone-600">{d.condition}</span>
                        </div>
                      </div>

                      {/* Temperature Range Bar */}
                      <div className="flex items-center gap-3 min-w-[170px]">
                        <span className="text-xs font-semibold text-stone-500 w-8">{d.tempMin}°</span>
                        <div className="flex-1 bg-stone-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-linear-to-r from-blue-400 to-amber-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, Math.max(30, (d.tempMax / 40) * 100))}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-stone-900 w-8 text-right">{d.tempMax}°</span>
                      </div>

                      {/* Rain Probability & Rainfall mm */}
                      <div className="flex items-center gap-4 text-xs min-w-[140px]">
                        <div className="flex items-center gap-1 font-bold text-blue-700">
                          <CloudRain className="w-4 h-4" />
                          <span>{d.rainProbability}%</span>
                        </div>
                        <div className="text-stone-600 font-medium">
                          {d.rainfallMm > 0 ? `${d.rainfallMm} mm` : '0.0 mm'}
                        </div>
                      </div>

                      {/* Agromet Recommendation Chip */}
                      <div className="md:text-right max-w-xs text-xs text-stone-600 border-t md:border-t-0 pt-2 md:pt-0 border-stone-200/60">
                        <span className="font-semibold text-stone-900 block">{d.sprayRecommendation}</span>
                        <span className="text-[11px] text-stone-500">Wind: {d.windSpeed} km/h • Humidity: {d.humidity}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </>
      )}
    </Section>
  );
};
