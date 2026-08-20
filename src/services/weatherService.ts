import { WeatherData, HourlyForecastItem, DailyForecastItem, WeatherAlertItem } from '../types';

export interface WeatherFetchOptions {
  district?: string;
  state?: string;
  village?: string;
  forceError?: boolean;
  latitude?: number;
  longitude?: number;
}

// Preset micro-climate database for popular agricultural districts
const DISTRICT_CLIMATE_PRESETS: Record<string, {
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  condition: string;
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
  alert?: WeatherAlertItem;
}> = {
  indore: {
    temp: 29,
    tempMin: 22,
    tempMax: 32,
    feelsLike: 31,
    condition: 'Partly Cloudy • Rain Expected',
    conditionCode: 'thunderstorm',
    rainProbability: 75,
    rainfallMm: 18.5,
    humidity: 68,
    windSpeed: 14,
    windDirection: 'WNW',
    windGusts: 28,
    pressureHpa: 1008,
    uvIndex: 6,
    dewPoint: 22,
    visibilityKm: 8,
    cloudCover: 72,
    spraySuitability: 'unfavorable',
    sprayWindowNote: 'Heavy showers predicted this afternoon. Delay pesticide/fertilizer spraying until tomorrow morning.',
    soilMoistureLevel: 'High (76% - Saturated)',
    alert: {
      id: 'alert-indore-1',
      severity: 'warning',
      title: 'Thunderstorm & Heavy Rain Alert (Yellow Warning)',
      description: 'IMD predicts moderate to heavy thunderstorm activity (40-60mm) with gusty winds up to 35 km/h across Malwa plateau in next 36 hours.',
      issuedAt: 'Today, 06:00 AM',
      validUntil: 'Tomorrow, 08:00 PM',
      source: 'IMD Agromet Advisory Service (RMC Bhopal)',
    },
  },
  ujjain: {
    temp: 30,
    tempMin: 23,
    tempMax: 33,
    feelsLike: 33,
    condition: 'Overcast with Intermittent Drizzle',
    conditionCode: 'rain',
    rainProbability: 60,
    rainfallMm: 12.0,
    humidity: 72,
    windSpeed: 16,
    windDirection: 'SW',
    windGusts: 26,
    pressureHpa: 1007,
    uvIndex: 5,
    dewPoint: 23,
    visibilityKm: 7,
    cloudCover: 85,
    spraySuitability: 'moderate',
    sprayWindowNote: 'Spray permitted strictly before 11:30 AM before clouds condense.',
    soilMoistureLevel: 'Optimal (68%)',
  },
  bhopal: {
    temp: 28,
    tempMin: 21,
    tempMax: 31,
    feelsLike: 30,
    condition: 'Cloudy with Light Showers',
    conditionCode: 'drizzle',
    rainProbability: 45,
    rainfallMm: 6.5,
    humidity: 65,
    windSpeed: 11,
    windDirection: 'W',
    windGusts: 20,
    pressureHpa: 1010,
    uvIndex: 6,
    dewPoint: 20,
    visibilityKm: 9,
    cloudCover: 60,
    spraySuitability: 'optimal',
    sprayWindowNote: 'Favorable spray window between 6:30 AM and 11:00 AM.',
    soilMoistureLevel: 'Adequate (62%)',
  },
  sambalpur: {
    temp: 31,
    tempMin: 24,
    tempMax: 34,
    feelsLike: 36,
    condition: 'Warm & Humid with Evening Thunderheads',
    conditionCode: 'partly_cloudy',
    rainProbability: 55,
    rainfallMm: 14.2,
    humidity: 78,
    windSpeed: 10,
    windDirection: 'SE',
    windGusts: 22,
    pressureHpa: 1005,
    uvIndex: 7,
    dewPoint: 25,
    visibilityKm: 8,
    cloudCover: 65,
    spraySuitability: 'moderate',
    sprayWindowNote: 'High morning humidity. Early morning spray (6-9 AM) recommended for paddy blast control.',
    soilMoistureLevel: 'High (82% - Waterlogged)',
    alert: {
      id: 'alert-sambalpur-1',
      severity: 'advisory',
      title: 'High Humidity & Pest Outbreak Advisory',
      description: 'Elevated night temperatures and >75% humidity favor Brown Plant Hopper (BPH) multiplication in Hirakud command area.',
      issuedAt: 'Today, 07:30 AM',
      validUntil: 'Friday, 06:00 PM',
      source: 'OUAT Agrometeorology Field Unit',
    },
  },
  cuttack: {
    temp: 32,
    tempMin: 25,
    tempMax: 35,
    feelsLike: 38,
    condition: 'Scattered Clouds • Coastal Humidity',
    conditionCode: 'partly_cloudy',
    rainProbability: 40,
    rainfallMm: 4.8,
    humidity: 80,
    windSpeed: 15,
    windDirection: 'S',
    windGusts: 25,
    pressureHpa: 1006,
    uvIndex: 8,
    dewPoint: 26,
    visibilityKm: 10,
    cloudCover: 50,
    spraySuitability: 'optimal',
    sprayWindowNote: 'Morning spray safe until 10:00 AM.',
    soilMoistureLevel: 'Optimal (70%)',
  },
};

class WeatherService {
  private cache: Map<string, { data: WeatherData; timestamp: number }> = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes cache

  /**
   * Fetches full micro-climate weather data for a given district & state
   */
  public async getWeatherData(options: WeatherFetchOptions = {}): Promise<WeatherData> {
    const districtKey = (options.district || 'indore').toLowerCase().trim();
    const state = options.state || 'Madhya Pradesh';
    const village = options.village || 'Sanwer';

    // Simulate realistic asynchronous network call
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Force error if requested (for UI error testing)
    if (options.forceError) {
      throw new Error('Weather Station Telemetry Error: Failed to connect to Indian Meteorological Department (IMD) radar server. Please verify your network.');
    }

    const preset = DISTRICT_CLIMATE_PRESETS[districtKey] || DISTRICT_CLIMATE_PRESETS.indore;
    const now = new Date();

    // Generate realistic 24-hour hourly forecast
    const hourly: HourlyForecastItem[] = [];
    for (let i = 0; i < 24; i += 2) {
      const forecastHour = (now.getHours() + i) % 24;
      const hourStr = `${forecastHour.toString().padStart(2, '0')}:00`;
      
      let tempVariance = Math.round(Math.sin((forecastHour - 6) / 12 * Math.PI) * 4);
      let rainChance = Math.min(95, Math.max(10, preset.rainProbability + (forecastHour >= 14 && forecastHour <= 20 ? 20 : -15)));
      let rainAmount = rainChance > 60 ? Number(((rainChance / 100) * 5.2).toFixed(1)) : 0;
      
      let hourConditionCode: HourlyForecastItem['conditionCode'] = 'partly_cloudy';
      let hourCondition = 'Partly Cloudy';

      if (rainChance > 70) {
        hourConditionCode = 'heavy_rain';
        hourCondition = 'Heavy Showers';
      } else if (rainChance > 50) {
        hourConditionCode = 'rain';
        hourCondition = 'Scattered Rain';
      } else if (forecastHour >= 11 && forecastHour <= 16) {
        hourConditionCode = 'sunny';
        hourCondition = 'Sunny / Warm';
      } else {
        hourConditionCode = 'cloudy';
        hourCondition = 'Cloudy';
      }

      hourly.push({
        time: hourStr,
        temperature: Math.round(preset.temp + tempVariance),
        condition: hourCondition,
        conditionCode: hourConditionCode,
        rainProbability: rainChance,
        rainfallMm: rainAmount,
        humidity: Math.min(98, Math.max(40, preset.humidity + (forecastHour < 8 ? 10 : -8))),
        windSpeed: Math.round(preset.windSpeed + (i % 3)),
      });
    }

    // Generate realistic 7-day daily forecast
    const dayNames = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daily: DailyForecastItem[] = [];

    for (let d = 0; d < 7; d++) {
      const targetDate = new Date();
      targetDate.setDate(now.getDate() + d);
      const dayLabel = d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : weekdayNames[targetDate.getDay()];
      const dateFormatted = targetDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

      let dayRainProb = d === 0 ? preset.rainProbability : d === 1 ? 85 : d === 2 ? 65 : d === 3 ? 30 : d === 4 ? 20 : 15;
      let dayRainMm = d === 0 ? preset.rainfallMm : d === 1 ? 28.4 : d === 2 ? 14.0 : d === 3 ? 2.5 : 0;
      let dayMax = d === 1 ? preset.tempMax - 2 : preset.tempMax + (d > 3 ? 2 : 0);
      let dayMin = preset.tempMin + (d % 2);

      let dayCode: DailyForecastItem['conditionCode'] = 'partly_cloudy';
      let dayCondText = 'Partly Cloudy';
      let sprayRec = 'Favorable for morning spraying.';

      if (dayRainProb > 70) {
        dayCode = 'thunderstorm';
        dayCondText = 'Thunderstorms & Rain';
        sprayRec = 'Do NOT spray. High runoff risk.';
      } else if (dayRainProb > 50) {
        dayCode = 'rain';
        dayCondText = 'Moderate Rain Showers';
        sprayRec = 'Delay spraying. Spray with sticker adjuvant if urgent.';
      } else if (dayRainProb > 25) {
        dayCode = 'cloudy';
        dayCondText = 'Cloudy Intervals';
        sprayRec = 'Good for spray between 7 AM - 11 AM.';
      } else {
        dayCode = 'sunny';
        dayCondText = 'Clear & Sunny';
        sprayRec = 'Optimal conditions for fertilization & foliar spray.';
      }

      daily.push({
        date: dateFormatted,
        dayName: dayLabel,
        tempMax: dayMax,
        tempMin: dayMin,
        condition: dayCondText,
        conditionCode: dayCode,
        rainProbability: dayRainProb,
        rainfallMm: dayRainMm,
        humidity: Math.round(preset.humidity + (d === 1 ? 12 : d > 3 ? -10 : 0)),
        windSpeed: Math.round(preset.windSpeed + (d % 2)),
        sprayRecommendation: sprayRec,
        sunrise: '05:54 AM',
        sunset: '06:52 PM',
      });
    }

    const alerts: WeatherAlertItem[] = [];
    if (preset.alert) {
      alerts.push(preset.alert);
    }

    const weatherData: WeatherData = {
      location: {
        village,
        district: options.district || (districtKey.charAt(0).toUpperCase() + districtKey.slice(1)),
        state,
        latitude: options.latitude || 22.7196,
        longitude: options.longitude || 75.8577,
        elevationMeters: 553,
        stationName: `IMD AWS - ${options.district || 'Indore'} Agri Observatory`,
        lastUpdated: 'Just now (Live Telemetry)',
      },
      current: {
        temperature: preset.temp,
        feelsLike: preset.feelsLike,
        tempMin: preset.tempMin,
        tempMax: preset.tempMax,
        condition: preset.condition,
        conditionDescription: `${preset.condition} with winds from ${preset.windDirection} at ${preset.windSpeed} km/h`,
        conditionCode: preset.conditionCode,
        rainProbability: preset.rainProbability,
        rainfallMm: preset.rainfallMm,
        humidity: preset.humidity,
        windSpeed: preset.windSpeed,
        windDirection: preset.windDirection,
        windGusts: preset.windGusts,
        pressureHpa: preset.pressureHpa,
        uvIndex: preset.uvIndex,
        dewPoint: preset.dewPoint,
        visibilityKm: preset.visibilityKm,
        cloudCover: preset.cloudCover,
        spraySuitability: preset.spraySuitability,
        sprayWindowNote: preset.sprayWindowNote,
        soilMoistureLevel: preset.soilMoistureLevel,
      },
      hourly,
      daily,
      alerts,
    };

    return weatherData;
  }

  /**
   * Future Real-API integration hook
   * E.g. Open-Meteo or OpenWeather API connection wrapper
   */
  public async fetchRealApiWeather(lat: number, lng: number): Promise<WeatherData | null> {
    try {
      // Plug in real Open-Meteo or IMD endpoint here in future
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) return null;
      // return parsed real data...
      return null;
    } catch {
      return null;
    }
  }
}

export const weatherService = new WeatherService();
