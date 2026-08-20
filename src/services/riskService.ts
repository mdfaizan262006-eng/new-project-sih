import {
  AgriculturalRiskScore,
  RiskCategoryLevel,
  RiskFactorItem,
  PaymentDueInfo,
} from '../types';

export function getRiskCategory(score: number): {
  category: RiskCategoryLevel;
  categoryRange: string;
  badgeColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
} {
  const rounded = Math.round(score);
  if (rounded <= 25) {
    return {
      category: 'Low',
      categoryRange: '0–25',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    };
  } else if (rounded <= 50) {
    return {
      category: 'Moderate',
      categoryRange: '26–50',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    };
  } else if (rounded <= 75) {
    return {
      category: 'High',
      categoryRange: '51–75',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    };
  } else {
    return {
      category: 'Critical',
      categoryRange: '76–100',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      textColor: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    };
  }
}

export function calculateAgriculturalRiskScore(params: {
  rainfallScore: number; // 0 to 100
  cropWeatherScore: number; // 0 to 100
  marketScore: number; // 0 to 100
  paymentDueScore: number; // 0 to 100
  cropName?: string;
  district?: string;
  state?: string;
  rainfallDataPoint?: string;
  cropWeatherDataPoint?: string;
  marketDataPoint?: string;
  paymentInfo?: PaymentDueInfo;
}): AgriculturalRiskScore {
  const {
    rainfallScore,
    cropWeatherScore,
    marketScore,
    paymentDueScore,
    cropName = 'Soybean (JS 335)',
    district = 'Ujjain',
    state = 'Madhya Pradesh',
    rainfallDataPoint,
    cropWeatherDataPoint,
    marketDataPoint,
    paymentInfo = {
      hasActiveLoan: true,
      loanType: 'KCC (Kisan Credit Card)',
      dueDate: '2026-09-15',
      daysRemaining: 26,
      dueAmount: 42000,
      isOverdue: false,
      statusNote: 'KCC annual interest subvention renewal due in 26 days',
    },
  } = params;

  // Exact formula from user requirements:
  // Rainfall risk: 30%
  // Crop/weather risk: 25%
  // Market risk: 25%
  // Payment due risk: 20%
  const rainfallWeighted = Number(((rainfallScore * 30) / 100).toFixed(2));
  const cropWeatherWeighted = Number(((cropWeatherScore * 25) / 100).toFixed(2));
  const marketWeighted = Number(((marketScore * 25) / 100).toFixed(2));
  const paymentDueWeighted = Number(((paymentDueScore * 20) / 100).toFixed(2));

  const rawTotal = rainfallWeighted + cropWeatherWeighted + marketWeighted + paymentDueWeighted;
  const totalScore = Math.min(100, Math.max(0, Math.round(rawTotal)));
  const { category, categoryRange } = getRiskCategory(totalScore);

  // Rainfall factor descriptor
  const rainfallFactor: RiskFactorItem = {
    id: 'rainfall',
    name: 'Rainfall Risk',
    nameHindi: 'वर्षा जोखिम',
    nameOdia: 'ବର୍ଷା ବିପଦ',
    weightPercent: 30,
    score: rainfallScore,
    weightedContribution: rainfallWeighted,
    status: getRiskCategory(rainfallScore).category,
    reason: getRainfallReason(rainfallScore),
    reasonHindi: getRainfallReasonHindi(rainfallScore),
    reasonOdia: getRainfallReasonOdia(rainfallScore),
    dataPoint: rainfallDataPoint || getRainfallDataPoint(rainfallScore),
  };

  // Crop / Weather factor descriptor
  const cropWeatherFactor: RiskFactorItem = {
    id: 'cropWeather',
    name: 'Crop & Weather Risk',
    nameHindi: 'फसल एवं मौसम जोखिम',
    nameOdia: 'ଫସଲ ଏବଂ ପାଣିପାଗ ବିପଦ',
    weightPercent: 25,
    score: cropWeatherScore,
    weightedContribution: cropWeatherWeighted,
    status: getRiskCategory(cropWeatherScore).category,
    reason: getCropWeatherReason(cropWeatherScore, cropName),
    reasonHindi: getCropWeatherReasonHindi(cropWeatherScore, cropName),
    reasonOdia: getCropWeatherReasonOdia(cropWeatherScore, cropName),
    dataPoint: cropWeatherDataPoint || getCropWeatherDataPoint(cropWeatherScore),
  };

  // Market factor descriptor
  const marketFactor: RiskFactorItem = {
    id: 'market',
    name: 'Market Price Risk',
    nameHindi: 'बाजार मूल्य जोखिम',
    nameOdia: 'ବଜାର ଦର ବିପଦ',
    weightPercent: 25,
    score: marketScore,
    weightedContribution: marketWeighted,
    status: getRiskCategory(marketScore).category,
    reason: getMarketReason(marketScore),
    reasonHindi: getMarketReasonHindi(marketScore),
    reasonOdia: getMarketReasonOdia(marketScore),
    dataPoint: marketDataPoint || getMarketDataPoint(marketScore),
  };

  // Payment due factor descriptor
  const paymentFactor: RiskFactorItem = {
    id: 'paymentDue',
    name: 'Payment Due Risk',
    nameHindi: 'भुगतान देयता जोखिम',
    nameOdia: 'ଦେୟ ପରିଶୋଧ ବିପଦ',
    weightPercent: 20,
    score: paymentDueScore,
    weightedContribution: paymentDueWeighted,
    status: getRiskCategory(paymentDueScore).category,
    reason: getPaymentReason(paymentDueScore, paymentInfo),
    reasonHindi: getPaymentReasonHindi(paymentDueScore, paymentInfo),
    reasonOdia: getPaymentReasonOdia(paymentDueScore, paymentInfo),
    dataPoint: paymentInfo.hasActiveLoan
      ? `${paymentInfo.loanType || 'Loan'}: ${paymentInfo.statusNote} (${paymentInfo.dueAmount ? `₹${paymentInfo.dueAmount.toLocaleString('en-IN')}` : 'Amount pending'})`
      : 'No active credit due reported / Self-financed',
  };

  // Aggregate drivers and mitigating factors
  const { keyDrivers, mitigatingFactors } = generateReasonsSummary(
    rainfallFactor,
    cropWeatherFactor,
    marketFactor,
    paymentFactor
  );

  // Recommended agricultural and financial actions
  const recommendedActions = generateRecommendedActions(
    category,
    rainfallFactor,
    cropWeatherFactor,
    marketFactor,
    paymentFactor,
    cropName
  );

  let scoreDescription = '';
  if (category === 'Low') {
    scoreDescription = 'Favorable agro-climatic conditions, stable market realizations, and manageable credit timelines indicate stable farming operations.';
  } else if (category === 'Moderate') {
    scoreDescription = 'Moderate risk requiring routine preventive agronomic surveillance, weed/drainage management, and planned cash-flow preparation for upcoming dues.';
  } else if (category === 'High') {
    scoreDescription = 'Elevated operational and economic risks. Immediate field water drainage or pest intervention required alongside strategic APMC market timing to meet credit deadlines.';
  } else {
    scoreDescription = 'Critical risk threshold breached. Multiple severe stress vectors active: field waterlogging/pest surge, depressed mandi prices, and imminent payment liability. Urgent mitigation and PMFBY intimation advised.';
  }

  return {
    totalScore,
    category,
    categoryRange,
    scoreDescription,
    assessmentDate: '20 Aug 2026',
    cropName,
    district,
    state,
    factors: {
      rainfall: rainfallFactor,
      cropWeather: cropWeatherFactor,
      market: marketFactor,
      paymentDue: paymentFactor,
    },
    reasons: {
      keyDrivers,
      mitigatingFactors,
    },
    recommendedActions,
    paymentInfo,
  };
}

// -------------------------------------------------------------
// REASONS GENERATORS
// -------------------------------------------------------------

function getRainfallReason(score: number): string {
  if (score <= 25) {
    return 'Optimal cumulative monsoon rainfall (15–25 mm forecast), ideal root-zone soil moisture with zero waterlogging threat.';
  } else if (score <= 50) {
    return 'Moderate shower activity (35–50 mm) forecasted over the next 48 hours; field moisture slightly elevated but drainage remains functional.';
  } else if (score <= 75) {
    return 'Heavy localized rainfall warning (75–100 mm) with strong surface runoff risk; potential standing water in low-lying crop patches.';
  } else {
    return 'Extreme cloudburst & waterlogging alert (>120 mm in 24h); high risk of root hypoxia, nutrient leaching, and physical lodging.';
  }
}

function getRainfallReasonHindi(score: number): string {
  if (score <= 25) {
    return 'अनुकूल वर्षा (15-25 मिमी), मिट्टी में उचित नमी और जलभराव का शून्य जोखिम।';
  } else if (score <= 50) {
    return 'अगले 48 घंटों में मध्यम बारिश (35-50 मिमी) की संभावना; नमी थोड़ी अधिक पर नियंत्रण में है।';
  } else if (score <= 75) {
    return 'भारी बारिश की चेतावनी (75-100 मिमी); निचले खेतों में जलभराव और जड़ों के सड़ने का खतरा।';
  } else {
    return 'अत्यधिक बारिश व बाढ़ का अलर्ट (>120 मिमी); फसल के डूबने, जड़ों में सड़न और भारी नुकसान की गंभीर आशंका।';
  }
}

function getRainfallReasonOdia(score: number): string {
  if (score <= 25) {
    return 'ଅନୁକୂଳ ବର୍ଷା, ମାଟିରେ ଉପଯୁକ୍ତ ଆର୍ଦ୍ରତା ଏବଂ ଜଳବନ୍ଦୀର କୌଣସି ଆଶଙ୍କା ନାହିଁ।';
  } else if (score <= 50) {
    return 'ମଧ୍ୟମ ଧରଣର ବର୍ଷା ସମ୍ଭାବନା; ନିଷ୍କାସନ ବ୍ୟବସ୍ଥା ଠିକ ରଖିବା ଆବଶ୍ୟକ।';
  } else if (score <= 75) {
    return 'ପ୍ରବଳ ବର୍ଷା ଚେତାବନୀ; ତଳିଆ ଜମିରେ ପାଣି ଜମି ରହିବା ଯୋଗୁଁ ଫସଲ କ୍ଷତିର ଆଶଙ୍କା।';
  } else {
    return 'ଅତ୍ୟଧିକ ବର୍ଷା ଓ ଜଳବନ୍ଦୀ ବିପଦ; ଫସଲ ନଷ୍ଟ ହେବାର ଗୁରୁତର ଆଶଙ୍କା।';
  }
}

function getRainfallDataPoint(score: number): string {
  if (score <= 25) return 'Forecast: 18 mm / 48h (Normal monsoon)';
  if (score <= 50) return 'Forecast: 42 mm / 48h (Scattered heavy)';
  if (score <= 75) return 'Alert: 85 mm / 48h (Orange Alert - Heavy downpour)';
  return 'Alert: 135 mm / 24h (Red Alert - Severe Cloudburst)';
}

function getCropWeatherReason(score: number, cropName: string): string {
  if (score <= 25) {
    return `Canopy vigor is optimal; ambient temperature (28–32°C) and RH (65%) are favorable for ${cropName} vegetative growth with no major pest vectors.`;
  } else if (score <= 50) {
    return `Humid micro-climate (>80% RH) creating mild favorable conditions for sucking pests (whitefly/aphids); early scouting recommended.`;
  } else if (score <= 75) {
    return `High pest & disease index: Girdle beetle and anthracnose fungal spore germination conditions active due to persistent cloud cover and thermal stress.`;
  } else {
    return `Critical crop hazard: Severe pod borer / stem fly infestation detected concurrent with high thermal-humidity shock threatening over 35% yield reduction.`;
  }
}

function getCropWeatherReasonHindi(score: number, cropName: string): string {
  if (score <= 25) {
    return `${cropName} की फसल स्वस्थ है; तापमान और आर्द्रता सामान्य हैं तथा कीटों का कोई प्रकोप नहीं है।`;
  } else if (score <= 50) {
    return `हवा में नमी अधिक होने से रस चूसक कीटों (सफेद मक्खी/माहू) का हल्का खतरा; नियमित निगरानी आवश्यक है।`;
  } else if (score <= 75) {
    return `गर्डल बीटल और फफूंद जनित रोगों का बढ़ा हुआ प्रकोप; पत्तों पर धब्बे व तना छेदक के लक्षण सक्रिय।`;
  } else {
    return `गंभीर फसल संकट: तना मक्खी, फली छेदक कीट का भारी हमला और अनुकूल मौसमी बीमारी से 35% से अधिक उपज क्षति का खतरा।`;
  }
}

function getCropWeatherReasonOdia(score: number, cropName: string): string {
  if (score <= 25) {
    return `${cropName} ଫସଲ ସୁସ୍ଥ ରହିଛି ଏବଂ ପାଣିପାଗ ଅନୁକୂଳ ଅଛି।`;
  } else if (score <= 50) {
    return `ଆର୍ଦ୍ରତା ଅଧିକ ଥିବାରୁ ପୋକ ଲାଗିବାର ସାମାନ୍ୟ ଆଶଙ୍କା ରହିଛି।`;
  } else if (score <= 75) {
    return `ପୋକ ଏବଂ ଫିମ୍ପି ରୋଗର ପ୍ରକୋପ ବୃଦ୍ଧି ପାଉଛି।`;
  } else {
    return `ଗୁରୁତର ଫସଲ ସଙ୍କଟ: ରୋଗ ପୋକ ଆକ୍ରମଣ ଯୋଗୁଁ ଅମଳ ହ୍ରାସ ହେବାର ବିପଦ।`;
  }
}

function getCropWeatherDataPoint(score: number): string {
  if (score <= 25) return 'Temp: 31°C | RH: 62% | Pest ETL: < 2% (Safe)';
  if (score <= 50) return 'Temp: 29°C | RH: 82% | Sucking Pest ETL: 5% (Moderate)';
  if (score <= 75) return 'Temp: 33°C | RH: 88% | Girdle Beetle ETL: 12% (Threshold)';
  return 'Temp: 34°C | RH: 92% | Pod Borer ETL: 24% (Severe Outbreak)';
}

function getMarketReason(score: number): string {
  if (score <= 25) {
    return 'Regional mandi rates trading 8–12% above Govt MSP with strong miller demand and robust liquidity in APMC yards.';
  } else if (score <= 50) {
    return 'Mandi modal prices hovering near Govt MSP (±2%); price volatility moderate due to steady arrivals.';
  } else if (score <= 75) {
    return 'Mandi prices depressed 6–10% below MSP due to temporary arrival glut and weak spot buyer inquiries.';
  } else {
    return 'Severe price crash: Mandi realizations plunging 18–25% below production cost driven by import parity and distressed spot dumping.';
  }
}

function getMarketReasonHindi(score: number): string {
  if (score <= 25) {
    return 'मंडी भाव सरकारी एमएसपी से 8-12% ऊपर चल रहे हैं; व्यापारियों की अच्छी मांग और तुरंत नकद भुगतान।';
  } else if (score <= 50) {
    return 'मंडी भाव एमएसपी के लगभग बराबर (±2%) हैं; आवक सामान्य रहने से भाव स्थिर हैं।';
  } else if (score <= 75) {
    return 'मंडी भाव एमएसपी से 6-10% नीचे गिरे हैं; अधिक आवक और कम खरीददारों के कारण मंदी।';
  } else {
    return 'भारी बाजार मंदी: मंडी भाव उत्पादन लागत से 18-25% नीचे टूटे; संकटग्रस्त बिक्री की स्थिति।';
  }
}

function getMarketReasonOdia(score: number): string {
  if (score <= 25) {
    return 'ମଣ୍ଡି ଦର ସରକାରୀ ଏମଏସପି ଠାରୁ ୮-୧୨% ଅଧିକ ରହିଛି।';
  } else if (score <= 50) {
    return 'ମଣ୍ଡି ଦର ଏମଏସପି ସହ ପ୍ରାୟ ସମାନ ରହିଛି।';
  } else if (score <= 75) {
    return 'ମଣ୍ଡିରେ ଆମଦାନୀ ବୃଦ୍ଧି ଯୋଗୁଁ ଦର ୬-୧୦% ହ୍ରାସ ପାଇଛି।';
  } else {
    return 'ଗୁରୁତର ବଜାର ମାନ୍ଦାବସ୍ଥା: ଦର ଉତ୍ପାଦନ ଖର୍ଚ୍ଚ ଠାରୁ କମ ରହିଛି।';
  }
}

function getMarketDataPoint(score: number): string {
  if (score <= 25) return 'Spot: ₹4,890 / qtl (MSP: ₹4,600 | +6.3% Premium)';
  if (score <= 50) return 'Spot: ₹4,580 / qtl (MSP: ₹4,600 | -0.4% Parity)';
  if (score <= 75) return 'Spot: ₹4,210 / qtl (MSP: ₹4,600 | -8.5% Deficit)';
  return 'Spot: ₹3,680 / qtl (MSP: ₹4,600 | -20.0% Crash)';
}

function getPaymentReason(score: number, paymentInfo: PaymentDueInfo): string {
  if (!paymentInfo.hasActiveLoan) {
    return 'No active loan or dealer credit obligations reported. Nil immediate debt repayment liquidity stress.';
  }

  if (score <= 25) {
    return `Credit timeline safe: ${paymentInfo.loanType} renewal due in ${paymentInfo.daysRemaining ?? '60+'} days with healthy estimated liquidity cushion.`;
  } else if (score <= 50) {
    return `Manageable timeline: ${paymentInfo.loanType} payment window due in ${paymentInfo.daysRemaining ?? '30'} days. Planned harvest sale recommended to avoid interest penalty.`;
  } else if (score <= 75) {
    return `Imminent payment pressure: ${paymentInfo.loanType} due date in ${paymentInfo.daysRemaining ?? '10'} days (${paymentInfo.dueAmount ? `₹${paymentInfo.dueAmount.toLocaleString('en-IN')}` : 'Principal+Interest'}); cash flow strain if crop dispatch delayed.`;
  } else {
    return `Severe credit risk: ${paymentInfo.loanType} ${paymentInfo.isOverdue ? 'OVERDUE' : `due within ${paymentInfo.daysRemaining ?? '3'} days`}; default triggers loss of 3% interest subvention and penal interest (12%+).`;
  }
}

function getPaymentReasonHindi(score: number, paymentInfo: PaymentDueInfo): string {
  if (!paymentInfo.hasActiveLoan) {
    return 'कोई ऋण या बकाया नहीं है। ऋण चुकौती का कोई वित्तीय दबाव नहीं है।';
  }
  if (score <= 25) {
    return `केसीसी ऋण नवीनीकरण में ${paymentInfo.daysRemaining ?? '60+'} दिन शेष; वित्तीय स्थिति सुरक्षित है।`;
  } else if (score <= 50) {
    return `ऋण भुगतान में ${paymentInfo.daysRemaining ?? '30'} दिन शेष; समय पर फसल बेचकर ब्याज से बचने की योजना बनाएं।`;
  } else if (score <= 75) {
    return `भुगतान की तारीख नजदीक (${paymentInfo.daysRemaining ?? '10'} दिन शेष); यदि फसल बिक्री में देरी हुई तो नकदी का संकट हो सकता है।`;
  } else {
    return `अत्यधिक वित्तीय जोखिम: ऋण ${paymentInfo.isOverdue ? 'अतिदेय (Overdue)' : `${paymentInfo.daysRemaining ?? '3'} दिन में देय`} है; चूकने पर 3% ब्याज छूट समाप्त होगी।`;
  }
}

function getPaymentReasonOdia(score: number, paymentInfo: PaymentDueInfo): string {
  if (!paymentInfo.hasActiveLoan) {
    return 'କୌଣସି ଋଣ ବକେୟା ନାହିଁ। ଆର୍ଥିକ ସ୍ଥିତି ସୁରକ୍ଷିତ।';
  }
  if (score <= 25) {
    return `କେସିସି ଋଣ ପରିଶୋଧ ପାଇଁ ଯଥେଷ୍ଟ ସମୟ ରହିଛି।`;
  } else if (score <= 50) {
    return `ଋଣ ପରିଶୋଧ ସମୟ ପାଖେଇ ଆସୁଛି; ଯୋଜନାବଦ୍ଧ ଭାବେ ବିକ୍ରି କରନ୍ତୁ।`;
  } else if (score <= 75) {
    return `ଦେୟ ତାରିଖ ନିକଟବର୍ତ୍ତୀ; ତୁରନ୍ତ ଅର୍ଥ ବ୍ୟବସ୍ଥା ଆବଶ୍ୟକ।`;
  } else {
    return `ଗୁରୁତର ଆର୍ଥିକ ବିପଦ: ଋଣ ଅତିଦେୟ କିମ୍ବା ଖୁବ ଶୀଘ୍ର ଦେୟ।`;
  }
}

function generateReasonsSummary(
  rf: RiskFactorItem,
  cw: RiskFactorItem,
  m: RiskFactorItem,
  p: RiskFactorItem
): { keyDrivers: string[]; mitigatingFactors: string[] } {
  const all = [rf, cw, m, p];
  const highItems = all.filter((i) => i.score > 50).sort((a, b) => b.score - a.score);
  const lowItems = all.filter((i) => i.score <= 50).sort((a, b) => a.score - b.score);

  const keyDrivers =
    highItems.length > 0
      ? highItems.map((item) => `${item.name} (${item.score}/100, Weight ${item.weightPercent}%): ${item.reason}`)
      : ['All 4 agricultural risk parameters are operating within standard safe baselines with negligible agronomic or financial stress.'];

  const mitigatingFactors =
    lowItems.length > 0
      ? lowItems.map((item) => `${item.name} (${item.score}/100, Weight ${item.weightPercent}%): ${item.reason}`)
      : ['No primary mitigating factors identified. Simultaneous multi-factor stress active across rainfall, crop, market, and credit obligations.'];

  return { keyDrivers, mitigatingFactors };
}

function generateRecommendedActions(
  category: RiskCategoryLevel,
  rf: RiskFactorItem,
  cw: RiskFactorItem,
  m: RiskFactorItem,
  p: RiskFactorItem,
  cropName: string
): AgriculturalRiskScore['recommendedActions'] {
  const actions: AgriculturalRiskScore['recommendedActions'] = [];

  // Rainfall / Drainage actions
  if (rf.score > 50) {
    actions.push({
      id: 'act-drainage',
      type: 'agricultural',
      urgency: rf.score > 75 ? 'immediate' : 'within_48h',
      title: 'Clear Field Drainage & Prevent Waterlogging',
      titleHindi: 'खेत की जल निकासी नालियां साफ करें',
      titleOdia: 'ଜମିରୁ ଅତିରିକ୍ତ ପାଣି ନିଷ୍କାସନ କରନ୍ତୁ',
      action: `Open peripheral trench drains at 15–20m intervals to flush standing water from the ${cropName} field within 6–12 hours to prevent root rot (Phytophthora) and wilting.`,
      actionHindi: `जड़ों को गलने से बचाने के लिए 6-12 घंटे के भीतर खेत से अतिरिक्त पानी निकालने हेतु जल निकासी नालियां खोलें।`,
      actionOdia: `ଚେର ପଚା ରୋଗରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ତୁରନ୍ତ ଜମିରୁ ପାଣି ନିଷ୍କାସନ ନାଳି ଖୋଲନ୍ତୁ।`,
      benefit: 'Protects 20–30% root biomass from hypoxic dieback.',
    });
  } else {
    actions.push({
      id: 'act-moisture',
      type: 'agricultural',
      urgency: 'regular',
      title: 'Maintain Standard Field Bunds & Moisture Conservation',
      titleHindi: 'खेत की मेड़बंदी और नमी संरक्षण बनाए रखें',
      titleOdia: 'ମାଟିର ଆର୍ଦ୍ରତା ସଂରକ୍ଷଣ ବଜାୟ ରଖନ୍ତୁ',
      action: `Soil moisture balance is ideal. Maintain clean contour bunds to store incoming showers without soil erosion.`,
      actionHindi: `मिट्टी में नमी का स्तर सही है। वर्षा जल संचयन हेतु मेड़ों को दुरुस्त रखें।`,
      actionOdia: `ମାଟିରେ ଆର୍ଦ୍ରତା ଅନୁକୂଳ ଅଛି। ବନ୍ଧ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।`,
      benefit: 'Sustains uninterrupted crop growth and flowering.',
    });
  }

  // Crop / Pest actions
  if (cw.score > 50) {
    actions.push({
      id: 'act-pest',
      type: 'agricultural',
      urgency: cw.score > 75 ? 'immediate' : 'within_48h',
      title: 'Targeted Bio/Chemical Pest & Fungal Intervention',
      titleHindi: 'लक्षित कीटनाशक या फफूंदनाशक का छिड़काव',
      titleOdia: 'ରୋଗ ପୋକ ନିୟନ୍ତ୍ରଣ ପାଇଁ ଔଷଧ ସିଞ୍ଚନ',
      action: `Apply systemic fungicide (Tebuconazole 25.9% EC @ 250ml/acre) or spray Chlorantraniliprole 18.5% SC @ 60ml/acre during clear weather window (10 AM - 3 PM).`,
      actionHindi: `मौसम साफ होने पर टेबुकोनाज़ोल 25.9% EC या क्लोरेंट्रानिलिप्रोल का निर्धारित मात्रा में छिड़काव करें।`,
      actionOdia: `ପାଗ ସଫା ଥିବା ସମୟରେ ଉପଯୁକ୍ତ କୀଟନାଶକ ସିଞ୍ଚନ କରନ୍ତୁ।`,
      benefit: 'Arrests infestation below Economic Threshold Level (ETL).',
    });
  }

  // Market actions
  if (m.score > 50) {
    actions.push({
      id: 'act-market',
      type: 'financial',
      urgency: 'within_48h',
      title: 'Avoid Distress Sale — Utilize e-NAM / e-NWR Warehousing',
      titleHindi: 'मंदी में तुरंत बिक्री से बचें — ई-नाम / वेयरहाउस रसीद का उपयोग करें',
      titleOdia: 'ତରବରିଆ ବିକ୍ରିରୁ ନିବୃତ୍ତ ରୁହନ୍ତୁ — ୱେୟାରହାଉସିଂ ବ୍ୟବସ୍ଥା ବ୍ୟବହାର କରନ୍ତୁ',
      action: `Local mandi prices are depressed. Store dried produce in accredited WDRA warehouse to receive 70% pledge loan at 7% interest instead of distress selling below MSP.`,
      actionHindi: `मंडी भाव कम होने के कारण फसल को वेयरहाउस में रखकर 70% ऋण सुविधा का लाभ लें, कम दाम पर न बेचें।`,
      actionOdia: `ଦର କମ ଥିବାରୁ ୱେୟାରହାଉସରେ ଫସଲ ରଖି ଋଣ ସୁବିଧା ନିଅନ୍ତୁ।`,
      benefit: 'Gains ₹350–₹500 / quintal price recovery when arrivals stabilize.',
    });
  } else {
    actions.push({
      id: 'act-market-good',
      type: 'financial',
      urgency: 'regular',
      title: 'Staggered Market Dispatch to High-Payout APMC Mandi',
      titleHindi: 'अधिक भाव वाली नजदीकी मंडी में चरणबद्ध बिक्री',
      titleOdia: 'ଉତ୍ତମ ଦର ଥିବା ମଣ୍ଡିରେ ବିକ୍ରି କରନ୍ତୁ',
      action: `Favorable mandi pricing (+₹290 over MSP). Schedule harvest dispatches to the top regional mandi (e.g., Ujjain Sanwer APMC) to capture peak realization.`,
      actionHindi: `मंडी भाव अच्छे हैं। अधिकतम लाभ के लिए सर्वोत्तम मंडी में फसल की चरणबद्ध बिक्री करें।`,
      actionOdia: `ଅଧିକ ଦର ଥିବା ମଣ୍ଡିରେ ପର୍ଯ୍ୟାୟକ୍ରମେ ବିକ୍ରି କରନ୍ତୁ।`,
      benefit: 'Secures estimated ₹4,890/qtl net modal payout.',
    });
  }

  // Payment due actions
  if (p.score > 50) {
    actions.push({
      id: 'act-credit',
      type: 'financial',
      urgency: p.score > 75 ? 'immediate' : 'within_48h',
      title: 'KCC Interest Subvention Renewal / Debt Rollover Protocol',
      titleHindi: 'केसीसी ब्याज छूट नवीनीकरण / शाखा में संपर्क',
      titleOdia: 'କେସିସି ଋଣ ନବୀକରଣ ବ୍ୟବସ୍ଥା',
      action: `Deposit or roll over due KCC amount before due date at primary branch to preserve 3% prompt repayment incentive (effective 4% p.a. rate) and prevent compound penalty.`,
      actionHindi: `3% ब्याज छूट का लाभ बनाए रखने के लिए अंतिम तिथि से पहले बैंक शाखा में केसीसी नवीनीकरण कराएं।`,
      actionOdia: `ରିହାତି ସୁଧ ହାର ବଜାୟ ରଖିବା ପାଇଁ ତାରିଖ ପୂର୍ବରୁ ବ୍ୟାଙ୍କରେ ଋଣ ନବୀକରଣ କରନ୍ତୁ।`,
      benefit: 'Saves 3% annual interest penalty and protects CIBIL score.',
    });
  }

  // PMFBY Insurance action for High or Critical
  if (category === 'High' || category === 'Critical') {
    actions.push({
      id: 'act-pmfby',
      type: 'insurance',
      urgency: 'within_48h',
      title: 'PMFBY Localized Inundation / Loss Intimation (Within 72 Hours)',
      titleHindi: 'पीएमएफबीवाई फसल नुकसान सूचना (72 घंटे के भीतर दर्ज करें)',
      titleOdia: 'ପିଏମଏଫବିୱାଇ ବୀମା କ୍ଷତିପୂରଣ ସୂଚନା (୭୨ ଘଣ୍ଟା ମଧ୍ୟରେ)',
      action: `In case of localized standing crop damage from heavy rain or pest attack, lodge individual claim on Crop Insurance App or toll-free 14447 within 72 hours with geotagged farm photos.`,
      actionHindi: `भारी बारिश या कीट से नुकसान होने पर 72 घंटे के अंदर क्रॉप इंश्योरेंस ऐप या 14447 पर जिओटैग फोटो सहित दावा दर्ज करें।`,
      actionOdia: `ଫସଲ କ୍ଷତି ହେଲେ ୭୨ ଘଣ୍ଟା ମଧ୍ୟରେ ଟୋଲ ଫ୍ରି ୧୪୪୪୭ କିମ୍ବା ଆପ ମାଧ୍ୟମରେ ସୂଚନା ଦିଅନ୍ତୁ।`,
      benefit: 'Guarantees up to 100% sum insured claim eligibility under PMFBY guidelines.',
    });
  }

  return actions;
}

// -------------------------------------------------------------
// 4 STANDARD PRESETS TESTING ALL FOUR CATEGORIES
// -------------------------------------------------------------

export interface RiskTestPreset {
  id: string;
  name: string;
  category: RiskCategoryLevel;
  targetScore: number;
  description: string;
  rainfallScore: number;
  cropWeatherScore: number;
  marketScore: number;
  paymentDueScore: number;
  paymentInfo: PaymentDueInfo;
  cropName: string;
  district: string;
}

export const RISK_TEST_PRESETS: RiskTestPreset[] = [
  {
    id: 'preset-low',
    name: '1. Low Risk (0–25)',
    category: 'Low',
    targetScore: 16,
    description: 'Optimal monsoon, healthy crop canopy, mandi rates trading >8% above MSP, and KCC loan due in 90+ days.',
    rainfallScore: 15, // 15 * 0.30 = 4.5
    cropWeatherScore: 18, // 18 * 0.25 = 4.5
    marketScore: 12, // 12 * 0.25 = 3.0
    paymentDueScore: 20, // 20 * 0.20 = 4.0 -> Total = 16.0 (Low)
    paymentInfo: {
      hasActiveLoan: true,
      loanType: 'KCC (Kisan Credit Card)',
      dueDate: '2026-11-30',
      daysRemaining: 102,
      dueAmount: 35000,
      isOverdue: false,
      statusNote: 'KCC annual renewal due in 102 days (Safe)',
    },
    cropName: 'Soybean (JS 335)',
    district: 'Ujjain, Madhya Pradesh',
  },
  {
    id: 'preset-moderate',
    name: '2. Moderate Risk (26–50)',
    category: 'Moderate',
    targetScore: 38,
    description: 'Scattered rain showers during flowering, mild sucking pest presence, mandi price near MSP parity, payment due in 35 days.',
    rainfallScore: 40, // 40 * 0.30 = 12.0
    cropWeatherScore: 42, // 42 * 0.25 = 10.5
    marketScore: 36, // 36 * 0.25 = 9.0
    paymentDueScore: 35, // 35 * 0.20 = 7.0 -> Total = 38.5 ≈ 38 (Moderate)
    paymentInfo: {
      hasActiveLoan: true,
      loanType: 'KCC (Kisan Credit Card)',
      dueDate: '2026-09-25',
      daysRemaining: 36,
      dueAmount: 48000,
      isOverdue: false,
      statusNote: 'KCC renewal window in 36 days',
    },
    cropName: 'Paddy / Rice (Swarna)',
    district: 'Sambalpur, Odisha',
  },
  {
    id: 'preset-high',
    name: '3. High Risk (51–75)',
    category: 'High',
    targetScore: 64,
    description: 'Orange alert heavy downpour (85mm), girdle beetle & fungal rust above ETL, mandi price down -8.5%, loan EMI due in 8 days.',
    rainfallScore: 72, // 72 * 0.30 = 21.6
    cropWeatherScore: 68, // 68 * 0.25 = 17.0
    marketScore: 62, // 62 * 0.25 = 15.5
    paymentDueScore: 50, // 50 * 0.20 = 10.0 -> Total = 64.1 ≈ 64 (High)
    paymentInfo: {
      hasActiveLoan: true,
      loanType: 'KCC (Kisan Credit Card)',
      dueDate: '2026-08-28',
      daysRemaining: 8,
      dueAmount: 62000,
      isOverdue: false,
      statusNote: 'KCC interest subvention cut-off in 8 days',
    },
    cropName: 'Cotton (BT Cotton II)',
    district: 'Dewas, Madhya Pradesh',
  },
  {
    id: 'preset-critical',
    name: '4. Critical Risk (76–100)',
    category: 'Critical',
    targetScore: 86,
    description: 'Severe cloudburst inundation (>130mm), severe pod borer outbreak, mandi price crash (-20% below cost), overdue loan penalty deadline.',
    rainfallScore: 90, // 90 * 0.30 = 27.0
    cropWeatherScore: 86, // 86 * 0.25 = 21.5
    marketScore: 82, // 82 * 0.25 = 20.5
    paymentDueScore: 88, // 88 * 0.20 = 17.6 -> Total = 86.6 ≈ 87 (Critical)
    paymentInfo: {
      hasActiveLoan: true,
      loanType: 'KCC (Kisan Credit Card)',
      dueDate: '2026-08-18',
      daysRemaining: -2,
      dueAmount: 85000,
      isOverdue: true,
      statusNote: 'KCC payment OVERDUE by 2 days; penalty interest accruing',
    },
    cropName: 'Soybean (JS 9560)',
    district: 'Dhar, Madhya Pradesh',
  },
];

export const riskService = {
  calculateAgriculturalRiskScore,
  getRiskCategory,
  getTestPresets: () => RISK_TEST_PRESETS,
  getDefaultScore: () => calculateAgriculturalRiskScore({
    rainfallScore: 35,
    cropWeatherScore: 40,
    marketScore: 30,
    paymentDueScore: 35,
  }),
};
