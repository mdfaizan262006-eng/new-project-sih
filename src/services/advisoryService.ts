import { CropAdvisoryReport, AdvisoryWarning, AdvisoryAction, CropStageDetail, WeatherData } from '../types';
import { weatherService } from './weatherService';

export interface SupportedCrop {
  id: string;
  name: string;
  hindiName: string;
  odiaName: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  icon: string;
  defaultVariety: string;
  durationDays: number;
  stages: CropStageDetail[];
}

export const SUPPORTED_CROPS: SupportedCrop[] = [
  {
    id: 'soybean',
    name: 'Soybean',
    hindiName: 'सोयाबीन',
    odiaName: 'ସୋୟାବିନ୍',
    season: 'Kharif',
    icon: '🌱',
    defaultVariety: 'JS 20-34 / JS 95-60',
    durationDays: 95,
    stages: [
      { id: 'sowing', name: 'Germination & Seedling', localName: 'अंकुरण व प्रारंभिक अवस्था', daysRange: '0–15 Days', waterNeed: 'Moderate', keyRisk: 'Damping off & stem fly' },
      { id: 'vegetative', name: 'Vegetative Canopy Growth', localName: 'वानस्पतिक वृद्धि', daysRange: '16–35 Days', waterNeed: 'Moderate', keyRisk: 'Weed competition & defoliators' },
      { id: 'flowering', name: 'Flowering & Early Pod', localName: 'फूल आने की अवस्था', daysRange: '36–50 Days', waterNeed: 'Critical', keyRisk: 'Flower drop & heat stress' },
      { id: 'pod_filling', name: 'Pod Filling & Grain Weight', localName: 'दाने भराव व फली विकास', daysRange: '51–75 Days', waterNeed: 'High', keyRisk: 'Girdle beetle & pod borer' },
      { id: 'maturity', name: 'Maturity & Harvesting', localName: 'परिपक्वता व कटाई', daysRange: '76–95 Days', waterNeed: 'Low', keyRisk: 'Pod shattering & sudden rains' },
    ],
  },
  {
    id: 'wheat',
    name: 'Wheat',
    hindiName: 'गेहूं',
    odiaName: 'ଗହମ',
    season: 'Rabi',
    icon: '🌾',
    defaultVariety: 'GW 322 / Lokwan / Sharbati',
    durationDays: 120,
    stages: [
      { id: 'cri', name: 'Crown Root Initiation (CRI)', localName: 'ताज जड़ अवस्था (CRI)', daysRange: '18–25 Days', waterNeed: 'Critical', keyRisk: 'Moisture deficit halts tillering' },
      { id: 'tillering', name: 'Tillering & Jointing', localName: 'कल्ले फूटने की अवस्था', daysRange: '26–45 Days', waterNeed: 'High', keyRisk: 'Weed growth & Nitrogen hunger' },
      { id: 'flowering', name: 'Heading & Flowering', localName: 'बाली व फूल आने की अवस्था', daysRange: '46–70 Days', waterNeed: 'Critical', keyRisk: 'Yellow rust & aphid attack' },
      { id: 'grain_filling', name: 'Milking & Dough Stage', localName: 'दुग्ध व दाना भराव अवस्था', daysRange: '71–95 Days', waterNeed: 'High', keyRisk: 'Terminal heat & lodging' },
      { id: 'maturity', name: 'Ripening & Golden Harvest', localName: 'पकने व कटाई की अवस्था', daysRange: '96–120 Days', waterNeed: 'Low', keyRisk: 'Grain shriveling' },
    ],
  },
  {
    id: 'paddy',
    name: 'Paddy (Rice)',
    hindiName: 'धान',
    odiaName: 'ଧାନ',
    season: 'Kharif',
    icon: '🌾',
    defaultVariety: 'MTU 1010 / Pooja / Swarna',
    durationDays: 135,
    stages: [
      { id: 'nursery', name: 'Nursery & Transplanting', localName: 'नर्सरी व रोपाई अवस्था', daysRange: '0–25 Days', waterNeed: 'High', keyRisk: 'Root shock & seedling blast' },
      { id: 'tillering', name: 'Active Tillering', localName: 'कल्ले निकलने की अवस्था', daysRange: '26–50 Days', waterNeed: 'High', keyRisk: 'Stem borer & leaf folder' },
      { id: 'panicle', name: 'Panicle Initiation & Booting', localName: 'गभोट व बाली निर्माण', daysRange: '51–75 Days', waterNeed: 'Critical', keyRisk: 'Bacterial leaf blight (BLB)' },
      { id: 'flowering', name: 'Flowering & Pollination', localName: 'फूल व परागण अवस्था', daysRange: '76–90 Days', waterNeed: 'Critical', keyRisk: 'Brown plant hopper (BPH)' },
      { id: 'grain_filling', name: 'Grain Hardening & Harvest', localName: 'दाना पकना व कटाई', daysRange: '91–135 Days', waterNeed: 'Moderate', keyRisk: 'False smut & lodging' },
    ],
  },
  {
    id: 'cotton',
    name: 'Cotton',
    hindiName: 'कपास',
    odiaName: 'କପା',
    season: 'Kharif',
    icon: '☁️',
    defaultVariety: 'Bt-Cotton Hybrid / Bunny',
    durationDays: 160,
    stages: [
      { id: 'seedling', name: 'Seedling & Early Branching', localName: 'अंकुरण व शाखा विकास', daysRange: '0–30 Days', waterNeed: 'Moderate', keyRisk: 'Sucking pests (thrips, aphids)' },
      { id: 'squaring', name: 'Square (Bud) Formation', localName: 'कली / डोडी निर्माण', daysRange: '31–60 Days', waterNeed: 'High', keyRisk: 'Pink bollworm & square shedding' },
      { id: 'flowering', name: 'Flowering & Boll Setting', localName: 'फूल व टिंडा निर्माण', daysRange: '61–95 Days', waterNeed: 'Critical', keyRisk: 'Water stress causes boll drop' },
      { id: 'boll_burst', name: 'Boll Bursting & Picking', localName: 'टिंडा खिलना व चुनाई', daysRange: '96–160 Days', waterNeed: 'Low', keyRisk: 'Lint staining from rain' },
    ],
  },
  {
    id: 'mustard',
    name: 'Mustard',
    hindiName: 'सरसों',
    odiaName: 'ସୋରିଷ',
    season: 'Rabi',
    icon: '🌼',
    defaultVariety: 'Pusa Bold / NRCHB 101',
    durationDays: 110,
    stages: [
      { id: 'seedling', name: 'Seedling & Rosette Stage', localName: 'अंकुरण व पत्ती अवस्था', daysRange: '0–25 Days', waterNeed: 'Moderate', keyRisk: 'Sawfly & flea beetle' },
      { id: 'flowering', name: 'Flowering & Branching', localName: 'फूल व शाखा अवस्था', daysRange: '26–55 Days', waterNeed: 'Critical', keyRisk: 'Mustard aphid (Mahu) infestation' },
      { id: 'pod_formation', name: 'Siliqua (Pod) Development', localName: 'फली निर्माण व दाना भराव', daysRange: '56–85 Days', waterNeed: 'High', keyRisk: 'White rust & Alternaria blight' },
      { id: 'maturity', name: 'Pod Drying & Harvest', localName: 'फली पकना व कटाई', daysRange: '86–110 Days', waterNeed: 'Low', keyRisk: 'Over-drying pod shattering' },
    ],
  },
  {
    id: 'chickpea',
    name: 'Gram (Chana / Chickpea)',
    hindiName: 'चना',
    odiaName: 'ବୁଟ',
    season: 'Rabi',
    icon: '🟤',
    defaultVariety: 'JG 11 / JG 14 / JAKI 9218',
    durationDays: 105,
    stages: [
      { id: 'seedling', name: 'Early Vegetative & Branching', localName: 'शाखा विकास अवस्था', daysRange: '0–30 Days', waterNeed: 'Moderate', keyRisk: 'Fusarium wilt & cutworm' },
      { id: 'flowering', name: 'Flowering Stage', localName: 'फूल आने की अवस्था', daysRange: '31–60 Days', waterNeed: 'Critical', keyRisk: 'DO NOT over-irrigate during bloom' },
      { id: 'pod_filling', name: 'Pod Formation & Grain Boldness', localName: 'घांटी व दाना भराव', daysRange: '61–85 Days', waterNeed: 'Moderate', keyRisk: 'Gram Pod Borer (Helicoverpa)' },
      { id: 'maturity', name: 'Maturity & Desiccation', localName: 'परिपक्वता व कटाई', daysRange: '86–105 Days', waterNeed: 'Low', keyRisk: 'Pre-harvest moisture' },
    ],
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    hindiName: 'मक्का',
    odiaName: 'ମକା',
    season: 'Kharif',
    icon: '🌽',
    defaultVariety: 'DKC 9108 / Pioneer Hybrid',
    durationDays: 100,
    stages: [
      { id: 'knee_high', name: 'Knee-High Vegetative', localName: 'घुटने तक ऊंचाई अवस्था', daysRange: '0–30 Days', waterNeed: 'Moderate', keyRisk: 'Fall Armyworm (FAW) whorl damage' },
      { id: 'tasseling', name: 'Tasseling & Silking', localName: 'नर मंजरी व भुट्टा निकलने की अवस्था', daysRange: '31–55 Days', waterNeed: 'Critical', keyRisk: 'Pollen desiccation & water stress' },
      { id: 'grain_filling', name: 'Cob Filling & Milking', localName: 'दाना भराव अवस्था', daysRange: '56–80 Days', waterNeed: 'High', keyRisk: 'Cob rot & stalk rot' },
      { id: 'maturity', name: 'Black Layer & Harvest', localName: 'भुट्टा पकना व कटाई', daysRange: '81–100 Days', waterNeed: 'Low', keyRisk: 'Bird damage & moisture in cob' },
    ],
  },
  {
    id: 'tomato',
    name: 'Tomato',
    hindiName: 'टमाटर',
    odiaName: 'ବିଲାତି ବାଇଗଣ',
    season: 'Rabi',
    icon: '🍅',
    defaultVariety: 'Abhinav / US 440 / Arka Rakshak',
    durationDays: 130,
    stages: [
      { id: 'vegetative', name: 'Transplanting & Staking', localName: 'रोपाई व बंधाई अवस्था', daysRange: '0–30 Days', waterNeed: 'Moderate', keyRisk: 'Damping off & early blight' },
      { id: 'flowering', name: 'Continuous Flowering', localName: 'फूल आने की अवस्था', daysRange: '31–60 Days', waterNeed: 'High', keyRisk: 'Blossom end rot & leaf curl virus' },
      { id: 'fruiting', name: 'Fruit Development & Ripening', localName: 'फल विकास व तुड़ाई', daysRange: '61–130 Days', waterNeed: 'High', keyRisk: 'Fruit borer & fruit cracking' },
    ],
  },
];

// Helper to retrieve completed actions from local storage
const ACTION_STORAGE_PREFIX = 'krishi_action_status_';

export const advisoryService = {
  /**
   * Return all supported crops with stage definitions
   */
  getAllSupportedCrops(): SupportedCrop[] {
    return SUPPORTED_CROPS;
  },

  /**
   * Return a single crop configuration
   */
  getCropById(cropId: string): SupportedCrop {
    const crop = SUPPORTED_CROPS.find(c => c.id.toLowerCase() === cropId.toLowerCase());
    return crop || SUPPORTED_CROPS[0];
  },

  /**
   * Get stages for a given crop
   */
  getStagesForCrop(cropId: string): CropStageDetail[] {
    const crop = this.getCropById(cropId);
    return crop.stages;
  },

  /**
   * Core Rule-Based Crop Advisory Engine
   * Combines crop type, growth stage, current microclimate, and soil conditions
   */
  async generateAdvisoryReport(params: {
    cropId?: string;
    stageId?: string;
    district?: string;
    soilType?: string;
  }): Promise<CropAdvisoryReport> {
    const cropId = params.cropId || 'soybean';
    const crop = this.getCropById(cropId);
    const district = params.district || 'Indore';
    const stageId = params.stageId || crop.stages[2]?.id || crop.stages[0].id;
    const stage = crop.stages.find(s => s.id === stageId) || crop.stages[0];

    // Fetch or mock weather parameters
    let weatherData: WeatherData | null = null;
    try {
      weatherData = await weatherService.getWeatherData({ district });
    } catch {
      weatherData = null;
    }

    const currentTemp = weatherData?.current?.temperature ?? 29;
    const currentHumidity = weatherData?.current?.humidity ?? 68;
    const rainProb = weatherData?.current?.rainProbability ?? 65;
    const rainfallMm = weatherData?.current?.rainfallMm ?? 16;
    const windSpeed = weatherData?.current?.windSpeed ?? 14;
    const condition = weatherData?.current?.condition ?? 'Partly Cloudy';
    const conditionCode = weatherData?.current?.conditionCode ?? 'partly_cloudy';

    // 1. Determine Rainfall Status
    let rainfallStatus = 'Moderate Rain Forecast';
    let rainfallStatusBadge: 'heavy_rain' | 'moderate_rain' | 'dry_spell' | 'scattered_showers' = 'moderate_rain';
    if (rainfallMm >= 25 || rainProb >= 75) {
      rainfallStatus = `Heavy Showers Expected (${rainfallMm}mm, ${rainProb}% Chance)`;
      rainfallStatusBadge = 'heavy_rain';
    } else if (rainfallMm === 0 && rainProb < 25) {
      rainfallStatus = 'Dry Spell (0mm rain expected in next 72 hrs)';
      rainfallStatusBadge = 'dry_spell';
    } else if (rainfallMm > 0 && rainfallMm < 10) {
      rainfallStatus = `Light Scattered Drizzle (${rainfallMm}mm, ${rainProb}% Chance)`;
      rainfallStatusBadge = 'scattered_showers';
    } else {
      rainfallStatus = `Moderate Rain Window (${rainfallMm}mm, ${rainProb}% Chance)`;
      rainfallStatusBadge = 'moderate_rain';
    }

    // 2. Determine Spray Window Status
    let sprayWindowStatus: 'optimal' | 'moderate' | 'unfavorable' = 'moderate';
    let sprayWindowNote = 'Favorable morning window from 6:30 AM to 10:00 AM before wind picks up.';
    if (windSpeed > 18 || rainProb > 60 || rainfallMm > 10) {
      sprayWindowStatus = 'unfavorable';
      sprayWindowNote = `Do NOT spray today. High rain chance (${rainProb}%) and wind (${windSpeed} km/h) will wash chemicals off foliage and cause spray drift.`;
    } else if (windSpeed <= 12 && rainProb <= 30 && currentTemp < 32) {
      sprayWindowStatus = 'optimal';
      sprayWindowNote = 'Excellent spraying conditions throughout the morning with calm winds (<12 km/h) and no rain threat.';
    }

    // 3. Rule Engine: Irrigation Advice
    let irrigationStatus: 'hold' | 'irrigate' | 'drain' | 'critical_irrigate' = 'hold';
    let irrigationBadgeLabel = '🚫 Hold Irrigation';
    let irrigationHeadline = 'Postpone Irrigation — Rain Predicted in Next 24–48 Hours';
    let irrigationAdviceText = `Do not run water pumps today. The forecasted ${rainfallMm}mm rainfall will naturally replenish root zone moisture. Over-watering will lead to waterlogging and nutrient leaching.`;
    let farmerInstruction = 'Inspect field boundaries. Keep drainage outlets clear so rainwater flows naturally without pooling in crop rows.';

    if (rainfallMm >= 30) {
      irrigationStatus = 'drain';
      irrigationBadgeLabel = '⚠️ Drain Standing Water';
      irrigationHeadline = 'Heavy Rain Alert — Prepare Field Drainage Furrows';
      irrigationAdviceText = `Substantial rainfall (${rainfallMm}mm) will saturate the root zone. Standing water for over 24 hours cuts off oxygen to roots and triggers collar rot and yellowing.`;
      farmerInstruction = 'Immediately open drainage channels at the lowest point of your field. Do not let water stagnate around plant collars.';
    } else if (rainfallMm === 0 && rainProb < 25 && currentHumidity < 50) {
      if (stage.waterNeed === 'Critical' || stage.waterNeed === 'High') {
        irrigationStatus = 'critical_irrigate';
        irrigationBadgeLabel = '💧 Critical Irrigation Needed';
        irrigationHeadline = `Water Stress Alert — Crop is at Critical ${stage.name} Stage`;
        irrigationAdviceText = `The weather is dry (${currentTemp}°C, 0mm rain). Moisture stress at this stage will reduce yield by up to 25%. Provide 40–50mm irrigation.`;
        farmerInstruction = 'Run sprinkler or furrow irrigation during evening hours (after 4:30 PM) to minimize evaporation losses.';
      } else {
        irrigationStatus = 'irrigate';
        irrigationBadgeLabel = '💧 Light Irrigation Recommended';
        irrigationHeadline = 'Topsoil Moisture Depleting — Provide Light Irrigation';
        irrigationAdviceText = 'Soil moisture is dropping below 45%. A light watering session will maintain steady vegetative growth and nutrient uptake.';
        farmerInstruction = 'Give light irrigation in alternate furrows or run drip system for 2.5 hours.';
      }
    }

    // 4. Rule Engine: Crop Advice (Nutrient, Pest, Stage Specific)
    let cropAdviceHeadline = `${crop.name} Guidance: ${stage.name}`;
    let nutrientGuidance = 'Apply recommended basal NPK dose.';
    let pestProtectionGuidance = 'Monitor field perimeter for common sucking pests.';
    let fieldManagement = 'Maintain 45 cm row spacing and remove early broadleaf weeds.';
    let organicTip = 'Spray 5% Neem Seed Kernel Extract (NSKE) as eco-friendly preventive.';

    switch (crop.id) {
      case 'soybean':
        if (stage.id === 'sowing') {
          cropAdviceHeadline = 'Soybean Seed Treatment & Sowing Depth';
          nutrientGuidance = 'Apply Single Super Phosphate (SSP) @ 150 kg/acre + DAP @ 40 kg/acre at sowing time.';
          pestProtectionGuidance = 'Treat seeds with Trichoderma viride @ 5g/kg seed to prevent collar rot and damping off.';
          fieldManagement = 'Maintain seed depth at 3–4 cm. Sowing deeper than 5 cm causes poor seedling emergence in heavy black soil.';
          organicTip = 'Inoculate seed with Rhizobium japonicum culture for higher natural nitrogen fixation.';
        } else if (stage.id === 'vegetative') {
          cropAdviceHeadline = 'Vegetative Phase Nutrition & Weed Control';
          nutrientGuidance = 'If crop appears pale green, spray 19:19:19 (NPK) @ 1 kg/acre in 150 liters water on sunny days.';
          pestProtectionGuidance = 'Watch for Stem Fly and Green Semilooper caterpillars. Install 5 pheromone traps per acre.';
          fieldManagement = 'Carry out one mechanical weeding (Dora/Kolpa) between 20–25 days after sowing before canopy closes.';
          organicTip = 'Spray Dashparni Ark @ 250ml per 15L water pump to repel early leaf-eating insects.';
        } else if (stage.id === 'flowering') {
          cropAdviceHeadline = 'Flowering Stage: Boost Flower Retention';
          nutrientGuidance = 'Apply Boron 20% foliar spray @ 1g/liter water + 00:52:34 @ 5g/liter to prevent premature flower drop.';
          pestProtectionGuidance = 'Do not spray broad-spectrum insecticides during peak bee pollination hours (8:00 AM – 11:00 AM).';
          fieldManagement = 'Avoid excessive walking in fields when foliage is wet to prevent spore transfer of Yellow Mosaic Virus.';
          organicTip = 'Install yellow sticky cards (10 per acre) to trap whiteflies that transmit mosaic virus.';
        } else if (stage.id === 'pod_filling') {
          cropAdviceHeadline = 'Pod Filling: Maximize Grain Weight & Oil Content';
          nutrientGuidance = 'Foliar spray of 00:00:50 (Potassium Sulphate) @ 1.5 kg/acre in 150L water to increase pod weight and grain luster.';
          pestProtectionGuidance = 'Inspect lower pods for Girdle Beetle rings and Spodoptera larvae. Apply recommended eco-friendly bio-pesticide if threshold crosses 2 larvae/meter row.';
          fieldManagement = 'Ensure soil stays evenly moist but never stagnant. Avoid drought shock during bean expansion.';
          organicTip = 'Apply Beauveria bassiana bio-fungicide spray @ 5g/L for natural caterpillar control.';
        } else {
          cropAdviceHeadline = 'Maturity Phase: Timely Harvesting';
          nutrientGuidance = 'Stop all fertilizer application. Allow natural senescence of leaves.';
          pestProtectionGuidance = 'Protect drying pods from storage pests and moisture.';
          fieldManagement = 'Harvest when 90% of pods turn golden brown and seeds detach with a rattle. Moisture should be around 14–15%.';
          organicTip = 'Dry harvested pods on clean tarpaulin in shaded sun.';
        }
        break;

      case 'wheat':
        if (stage.id === 'cri') {
          cropAdviceHeadline = 'Crown Root Initiation (CRI) — Most Critical Stage';
          nutrientGuidance = 'Apply first top dressing of Urea @ 30 kg/acre immediately after CRI watering.';
          pestProtectionGuidance = 'Check for termite activity near root zone. Apply Chlorpyrifos with sand if needed.';
          fieldManagement = 'Water within 21–25 days after sowing. Missing water at CRI permanently reduces the number of tillers per plant.';
        } else if (stage.id === 'flowering') {
          cropAdviceHeadline = 'Heading & Anthesis: Yellow Rust Surveillance';
          nutrientGuidance = 'Foliar spray of 13:00:45 (Potassium Nitrate) @ 1 kg/acre to boost spikelet grain count.';
          pestProtectionGuidance = 'Inspect leaf tips for yellow powder stripes (Yellow Rust). If observed, spray Propiconazole 25 EC @ 1ml/L immediately.';
          fieldManagement = 'Avoid light irrigation during high winds (>18 km/h) to prevent crop lodging (falling flat).';
        } else {
          cropAdviceHeadline = 'Wheat Grain Filling & Heat Defense';
          nutrientGuidance = 'Spray Zinc Sulphate 0.5% + Urea 2% solution to counter sudden temperature rises.';
          pestProtectionGuidance = 'Inspect ears for wheat aphid colonies on green glumes.';
          fieldManagement = 'Provide light night irrigation to cool down crop canopy if afternoon temperature crosses 32°C.';
        }
        break;

      case 'paddy':
        cropAdviceHeadline = `${crop.name} Management: ${stage.name}`;
        nutrientGuidance = 'Split application of Nitrogen (Urea @ 25 kg/acre) + MOP @ 15 kg/acre at active tillering.';
        pestProtectionGuidance = 'Check base of rice tillers for Brown Plant Hopper (BPH). Maintain "alleyways" (paisa paths) every 2 meters for air circulation.';
        fieldManagement = 'Maintain 2–3 cm shallow standing water layer during tillering. Drain field for 2 days to encourage deep root anchoring.';
        break;

      default:
        cropAdviceHeadline = `${crop.name} General Advisory for ${stage.name}`;
        nutrientGuidance = 'Apply balanced NPK as per local soil test card recommendations.';
        pestProtectionGuidance = 'Regularly scout field borders and crop leaves for insect eggs and disease patches.';
        fieldManagement = 'Maintain clean field bunds and ensure good drainage.';
        break;
    }

    // 5. Generate Warnings with Deep "Why?" Explanations
    const warnings: AdvisoryWarning[] = [];

    // Warning 1: Rain & Spray Wash-off Warning
    if (rainProb >= 50 || windSpeed >= 16) {
      warnings.push({
        id: 'warn_spray_rain',
        title: 'Postpone Pesticide & Foliar Nutrient Spraying',
        severity: 'critical',
        shortWarning: `High rain probability (${rainProb}%) and wind (${windSpeed} km/h) will wash off chemical sprays and cause wasteful drift.`,
        whyExplanation: `When rain occurs within 2–4 hours after spraying, liquid chemicals get washed off the leaf cuticle before being absorbed into the plant vascular system. High wind (>15 km/h) blows fine droplets away from the target leaves into the atmosphere or neighboring fields. This results in 80% loss of expensive chemical inputs and poor pest control.`,
        impactIfIgnored: 'Wasted chemical investment (~₹800/acre), environmental runoff, and zero pest suppression.',
        actionRequired: 'Wait until weather radar confirms a clear 6-hour dry window with wind speeds under 12 km/h.',
        tag: 'Weather & Inputs',
      });
    }

    // Warning 2: High Humidity Fungal Risk
    if (currentHumidity >= 65) {
      warnings.push({
        id: 'warn_humidity_fungus',
        title: 'Elevated Risk of Foliar Fungal Disease (Rust / Blight)',
        severity: 'warning',
        shortWarning: `Air humidity at ${currentHumidity}% and warm temperatures create optimal breeding conditions for fungal spores.`,
        whyExplanation: `Fungal spores (such as Anthracnose, Cercospora leaf spot, and Rust) require relative humidity above 65% and free surface moisture on leaves for 6 to 8 continuous hours to germinate and penetrate plant stomata. Under overcast skies, leaves stay wet longer because evaporation is slowed down.`,
        impactIfIgnored: 'Rapid spread of brown/black spots on leaves, premature defoliation, and 15–30% yield loss.',
        actionRequired: 'Scout the lower canopy once daily. Keep preventive copper oxychloride or Trichoderma spray ready for when sunshine returns.',
        tag: 'Disease Risk',
      });
    }

    // Warning 3: Waterlogging & Root Nodulation (for legumes like soybean, chickpea)
    if (rainfallMm >= 20 && (crop.id === 'soybean' || crop.id === 'chickpea')) {
      warnings.push({
        id: 'warn_waterlog_nodules',
        title: 'Water Stagnation Danger to Root Nodules',
        severity: 'critical',
        shortWarning: `${crop.name} roots cannot tolerate standing water for more than 24 hours.`,
        whyExplanation: `Legume roots depend on Rhizobium bacteria nodules for fixing atmospheric nitrogen. When water stagnates in the root zone, all air pockets in the soil fill with water, causing root asphyxiation (oxygen starvation). Without oxygen, the nitrogen-fixing bacteria turn white/brown and die, and root rot fungi (Rhizoctonia/Phytophthora) invade the weakened root system, causing sudden yellowing and plant death.`,
        impactIfIgnored: 'Permanent death of root nodules, stunted yellow plants, and severe collar rot outbreak.',
        actionRequired: 'Cut open drainage trenches at the lower corners of the field to clear standing water within 12 hours.',
        tag: 'Soil & Root Health',
      });
    }

    // Warning 4: Heat Stress during Flowering (if hot)
    if (currentTemp >= 33 && (stage.id === 'flowering' || stage.id === 'tasseling')) {
      warnings.push({
        id: 'warn_heat_flowering',
        title: 'High Temperature Stress on Flower Fertilization',
        severity: 'warning',
        shortWarning: `Daytime temperature of ${currentTemp}°C can cause flower drop and unfertilized empty pods.`,
        whyExplanation: `Temperatures exceeding 33°C during the flowering and pollination window desiccate (dry out) pollen grains and dry up the sticky stigma surface on flowers. Pollen tubes fail to grow down to the ovary, preventing seed fertilization. This results in flower abortion and empty shells ('Phokat').`,
        impactIfIgnored: 'Up to 30% reduction in pod setting and harvestable grain count.',
        actionRequired: 'Apply light sprinkler misting in late afternoon to drop crop canopy temperature by 3–4°C.',
        tag: 'Climate Stress',
      });
    }

    // Default fallback warning if weather is mild
    if (warnings.length === 0) {
      warnings.push({
        id: 'warn_routine_scout',
        title: 'Routine Field Scouting Recommended',
        severity: 'info',
        shortWarning: 'Weather is favorable for standard crop growth. Maintain weekly insect surveillance.',
        whyExplanation: `Even during good weather, early insect pest populations (such as whiteflies and aphids) multiply invisibly under lower leaf surfaces. Catching an infestation at the 'Economic Threshold Level' (ETL) allows low-cost biological control rather than expensive chemical rescue sprays later.`,
        impactIfIgnored: 'Undetected pest buildup leading to sudden outbreak.',
        actionRequired: 'Walk through the field in a "W" pattern and inspect 20 random plants on leaf undersides.',
        tag: 'Preventive Care',
      });
    }

    // 6. Recommended Actions Checklist
    const rawActions: AdvisoryAction[] = [
      {
        id: `act_${crop.id}_1`,
        title: irrigationStatus === 'drain' ? 'Open Field Drainage Channels' : (irrigationStatus === 'hold' ? 'Hold Irrigation Pumps for 48 Hours' : 'Schedule Light Evening Irrigation'),
        description: farmerInstruction,
        category: 'irrigation',
        priority: irrigationStatus === 'drain' || irrigationStatus === 'critical_irrigate' ? 'urgent' : 'high',
        dueWindow: 'Today by 5:00 PM',
      },
      {
        id: `act_${crop.id}_2`,
        title: sprayWindowStatus === 'unfavorable' ? 'Postpone Chemical & Foliar Spray' : 'Execute Foliar Nutrient Application',
        description: sprayWindowNote,
        category: 'spray',
        priority: sprayWindowStatus === 'unfavorable' ? 'high' : 'normal',
        dueWindow: 'Next 24 Hours',
      },
      {
        id: `act_${crop.id}_3`,
        title: 'Field Scouting & Lower Canopy Inspection',
        description: pestProtectionGuidance,
        category: 'pest_control',
        priority: 'medium',
        dueWindow: 'Tomorrow Morning',
      },
      {
        id: `act_${crop.id}_4`,
        title: 'Stage-Specific Fertilizer Application',
        description: nutrientGuidance,
        category: 'fertilizer',
        priority: 'normal',
        dueWindow: 'Within 3 Days',
      },
    ];

    // Check localStorage for saved completion statuses
    const recommendedActions = rawActions.map(action => {
      const isSaved = typeof window !== 'undefined' ? localStorage.getItem(`${ACTION_STORAGE_PREFIX}${action.id}`) : null;
      return {
        ...action,
        completed: isSaved === 'true',
      };
    });

    const report: CropAdvisoryReport = {
      id: `adv_${crop.id}_${stage.id}_${Date.now()}`,
      cropId: crop.id,
      cropName: crop.name,
      cropLocalName: crop.hindiName,
      iconName: crop.icon,
      variety: crop.defaultVariety,
      season: crop.season,
      currentStage: stage.id,
      stageName: stage.name,
      stageDescription: stage.localName,
      daysSinceSowing: parseInt(stage.daysRange.split('–')[0]) + 15,
      expectedHarvestInDays: Math.max(10, crop.durationDays - (parseInt(stage.daysRange.split('–')[0]) + 15)),
      soilType: params.soilType || 'Black Clay Loam',
      soilMoisture: {
        percentage: rainfallMm > 20 ? 78 : (rainfallMm > 0 ? 65 : 42),
        levelDescription: rainfallMm > 20 ? 'Excessive / Wet' : (rainfallMm > 0 ? 'Optimal Root Moisture' : 'Depleting / Dry'),
        status: rainfallMm > 20 ? 'excess' : (rainfallMm > 0 ? 'optimal' : 'dry'),
      },
      weatherSummary: {
        condition,
        conditionCode,
        temperature: currentTemp,
        feelsLike: currentTemp + 2,
        humidity: currentHumidity,
        rainProbability: rainProb,
        rainfallExpectedMm: rainfallMm,
        windSpeed,
        rainfallStatus,
        rainfallStatusBadge,
        sprayWindowStatus,
        sprayWindowNote,
      },
      irrigationAdvice: {
        status: irrigationStatus,
        badgeLabel: irrigationBadgeLabel,
        headline: irrigationHeadline,
        detailedAdvice: irrigationAdviceText,
        farmerInstruction,
        nextReviewDate: 'Review after 48 hours or post-rainfall',
      },
      cropAdvice: {
        headline: cropAdviceHeadline,
        nutrientGuidance,
        pestProtectionGuidance,
        fieldManagement,
        organicTip,
      },
      warnings,
      recommendedActions,
      agronomistNotes: `Automated agromet advisory generated by KrishiDrishti Expert Engine in collaboration with ICAR-KVK agricultural research protocols for ${district} district.`,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return report;
  },

  /**
   * Save toggle action completion state
   */
  toggleActionCompleted(actionId: string, completed: boolean): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${ACTION_STORAGE_PREFIX}${actionId}`, completed ? 'true' : 'false');
      } catch (err) {
        console.warn('Unable to persist action state to storage:', err);
      }
    }
  },

  /**
   * Simple AI/Expert Ask question scaffold
   */
  async askExpertQuestion(cropName: string, question: string): Promise<string> {
    // Farmer-friendly response simulation
    await new Promise(resolve => setTimeout(resolve, 800));
    return `KVK Agronomist Advice for ${cropName}: For "${question}", ensure good field drainage and inspect leaf undersides for early sucking pests. If yellowing persists despite dry soil, apply 19:19:19 foliar spray @ 5g/liter.`;
  }
};
