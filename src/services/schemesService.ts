import {
  SchemeInfo,
  SchemeCategory,
} from '../types';

export const SCHEMES_DATABASE: SchemeInfo[] = [
  {
    id: 'scheme-pm-kisan',
    shortCode: 'PM-KISAN',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    nameOdia: 'ପ୍ରଧାନମନ୍ତ୍ରୀ କିଷାନ ସମ୍ମାନ ନିଧି ଯୋଜନା',
    subtitle: 'Direct Income Support of ₹6,000 / year to all landholding farmer families',
    subtitleHindi: 'सभी भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता',
    subtitleOdia: 'ସମସ୍ତ ଜମିମାଲିକ କୃଷକ ପରିବାରକୁ ବାର୍ଷିକ ₹୬,୦୦୦ ପ୍ରତ୍ୟକ୍ଷ ଆର୍ଥିକ ସହାୟତା',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    ministryOdia: 'କୃଷି ଓ କୃଷକ କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    category: 'income_support',
    level: 'central',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Uttar Pradesh', 'Maharashtra', 'Bihar', 'Rajasthan', 'Punjab'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    badgeLabel: '100% Central DBT',
    description:
      'PM-KISAN is a flagship Central Sector scheme launched to augment the income of all landholding farmer families across the country. The scheme provides financial assistance to procure farm inputs, seeds, fertilizers, and meet domestic needs during each agricultural crop cycle.',
    descriptionHindi:
      'पीएम-किसान देश के सभी भूमिधारक किसान परिवारों की आय में वृद्धि के लिए एक प्रमुख केंद्रीय योजना है। इसके तहत किसानों को कृषि आदानों, बीजों, खादों की खरीद एवं घरेलू आवश्यकताओं को पूरा करने हेतु वित्तीय सहायता सीधे बैंक खाते में दी जाती है।',
    descriptionOdia:
      'ପିଏମ-କିଷାନ ଦେଶର ସମସ୍ତ ଜମିମାଲିକ ଚାଷୀ ପରିବାରର ଆୟ ବୃଦ୍ଧି ପାଇଁ କେନ୍ଦ୍ର ସରକାରଙ୍କ ଏକ ପ୍ରମୁଖ ଯୋଜନା। ଏହା ଚାଷ କାର୍ଯ୍ୟ ପାଇଁ ବିହନ, ସାର ଏବଂ ଅନ୍ୟାନ୍ୟ ଆବଶ୍ୟକତା ପୂରଣ କରିବାରେ ସାହାଯ୍ୟ କରେ।',
    benefits: [
      {
        title: 'Assured Financial Payout',
        titleHindi: 'सुनिश्चित आर्थिक सहायता',
        titleOdia: 'ନିଶ୍ଚିତ ଆର୍ଥିକ ସହାୟତା',
        description: '₹6,000 per financial year transferred directly to bank account via DBT.',
        descriptionHindi: '₹6,000 प्रति वित्तीय वर्ष सीधे डीबीटी के माध्यम से बैंक खाते में हस्तांतरित।',
        descriptionOdia: 'ପ୍ରତି ଆର୍ଥିକ ବର୍ଷରେ ₹୬,୦୦୦ ଡିବିଟି ମାଧ୍ୟମରେ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟକୁ ପ୍ରଦାନ।',
        amountOrMetric: '₹6,000 / Year',
        isKeyHighlight: true,
      },
      {
        title: '3 Equal Installments',
        titleHindi: '3 समान किश्तें',
        titleOdia: '୩ଟି ସମାନ କିସ୍ତି',
        description: 'Disbursed in three 4-monthly cycles of ₹2,000 each (Apr-Jul, Aug-Nov, Dec-Mar).',
        descriptionHindi: 'प्रत्येक 4 माह में ₹2,000 की तीन किस्तों में (अप्रैल-जुलाई, अगस्त-नवंबर, दिसंबर-मार्च)।',
        amountOrMetric: '₹2,000 / 4-Months',
      },
      {
        title: 'Aadhaar-Seeded DBT Transfer',
        titleHindi: 'आधार-सीडेड डीबीटी भुगतान',
        titleOdia: 'ଆଧାର ସଂଯୋଗିତ ଡିବିଟି',
        description: 'Direct zero-leakage transfer directly into NPCI Aadhaar-linked savings account.',
        descriptionHindi: 'एनपीसीआई आधार-लिंक्ड बचत खाते में सीधे बिना किसी बिचौलिए के पारदर्शी ट्रांसफर।',
        amountOrMetric: 'Zero Leakage',
      },
    ],
    eligibility: {
      summary: 'All landholding farmer families having cultivable landholding registered in their names.',
      summaryHindi: 'वे सभी किसान परिवार जिनके नाम पर कृषि योग्य भूमि का मालिकाना हक सरकारी राजस्व अभिलेखों में दर्ज है।',
      summaryOdia: 'ସମସ୍ତ ଚାଷୀ ପରିବାର ଯାହାଙ୍କ ନାମରେ ଚାଷଜମି ପଞ୍ଜୀକୃତ ହୋଇଛି।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'all'],
      keyInclusions: [
        'Small, marginal, and large farmers with cultivable land ownership records',
        'Husband, wife, and minor children constitute one farmer family unit',
        'State-verified digitized land records (Khasra-Khatauni / RoR)',
      ],
      keyInclusionsHindi: [
        'कृषि योग्य भूमि के मालिकाना हक वाले छोटे, सीमांत व बड़े किसान',
        'पति, पत्नी और नाबालिग बच्चे एक किसान परिवार इकाई माने जाते हैं',
        'राजस्व विभाग द्वारा सत्यापित भू-अभिलेख (खसरा-खतौनी / जमाबंदी)',
      ],
      keyExclusions: [
        'Institutional landholders and government enterprise holdings',
        'Constitutional post holders, former/present Ministers, MPs, MLAs, Mayors',
        'Serving or retired officers/employees of Central/State Govts (excluding Class IV/Group D)',
        'Individuals who paid Income Tax in the last assessment year',
        'Professionals (Doctors, Engineers, Lawyers, Chartered Accountants, Architects)',
        'Pensioners drawing monthly pension of ₹10,000 or more (excluding Group D)',
      ],
      keyExclusionsHindi: [
        'संस्थागत भूमिधारक (कंपनियां, ट्रस्ट, सरकारी विभाग)',
        'संवैधानिक पदधारक, पूर्व/वर्तमान सांसद, विधायक, महापौर',
        'सरकारी विभागों में सेवारत या सेवानिवृत्त कर्मचारी (ग्रुप डी को छोड़कर)',
        'पिछले मूल्यांकन वर्ष में आयकर (Income Tax) का भुगतान करने वाले व्यक्ति',
        'पेशेवर डॉक्टर, इंजीनियर, वकील, सीए और आर्किटेक्ट',
        '₹10,000 या अधिक की मासिक पेंशन पाने वाले सेवानिवृत्त व्यक्ति (ग्रुप डी छोड़कर)',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        nameOdia: 'ଆଧାର କାର୍ଡ',
        description: 'Mandatory Aadhaar number with active mobile number linkage for OTP e-KYC.',
        isMandatory: true,
        issuingAuthority: 'UIDAI',
      },
      {
        id: 'doc-land',
        name: 'Land Record / Khasra-Khatauni (RoR)',
        nameHindi: 'भू-अभिलेख / खसरा-खतौनी',
        nameOdia: 'ଜମି ପଟ୍ଟା (RoR)',
        description: 'Valid digitized land revenue record demonstrating operational agricultural land title.',
        isMandatory: true,
        issuingAuthority: 'State Revenue Department / Bhulekh Portal',
      },
      {
        id: 'doc-bank',
        name: 'NPCI Aadhaar-Seeded Bank Passbook',
        nameHindi: 'आधार-सीडेड बैंक पासबुक',
        nameOdia: 'ବ୍ୟାଙ୍କ ପାସବୁକ',
        description: 'Bank Account Number & IFSC code with active NPCI Aadhaar payment bridge linkage.',
        isMandatory: true,
        issuingAuthority: 'Scheduled Commercial / Regional Rural Bank',
      },
      {
        id: 'doc-mobile',
        name: 'Aadhaar-Linked Active Mobile Number',
        nameHindi: 'आधार लिंक्ड मोबाइल नंबर',
        nameOdia: 'ଆଧାର ସଂଯୋଗିତ ମୋବାଇଲ',
        description: 'For OTP verification and installment disbursement SMS notifications.',
        isMandatory: true,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Online Self-Registration / CSC Visit',
        titleHindi: 'ऑनलाइन स्व-पंजीकरण या सीएससी केंद्र पर जाएं',
        description: 'Visit the official PM-KISAN portal (pmkisan.gov.in) -> "Farmers Corner" -> "New Farmer Registration" or visit your nearest Common Service Center (CSC).',
        descriptionHindi: 'आधिकारिक पोर्टल (pmkisan.gov.in) पर "फार्मर्स कॉर्नर" में "नया किसान पंजीकरण" चुनें या नजदीकी कॉमन सर्विस सेंटर (CSC) पर जाएं।',
        mode: 'both',
        linkOrLocation: 'https://pmkisan.gov.in',
      },
      {
        stepNumber: 2,
        title: 'Aadhaar Authentication & Land Entry',
        titleHindi: 'आधार प्रमाणीकरण एवं भूमि विवरण दर्ज करें',
        description: 'Enter your 12-digit Aadhaar number, state, district, sub-district, village, and fill Khasra / Khata / Dag number and land area in hectares.',
        descriptionHindi: '12 अंकों का आधार नंबर दर्ज कर ओटीपी सत्यापित करें। राज्य, जिला, ब्लॉक चुनकर खसरा/खाता संख्या और भूमि का रकबा भरें।',
        mode: 'online',
      },
      {
        stepNumber: 3,
        title: 'Complete Mandatory Face/OTP e-KYC',
        titleHindi: 'अनिवार्य e-KYC प्रक्रिया पूर्ण करें',
        description: 'Complete OTP-based e-KYC on the portal or biometric/face authentication using the PM-KISAN mobile app.',
        descriptionHindi: 'पोर्टल पर आधार ओटीपी आधारित e-KYC करें या पीएम-किसान मोबाइल ऐप से फेस ऑथेंटिकेशन पूरा करें।',
        mode: 'both',
      },
      {
        stepNumber: 4,
        title: 'State Patwari / Nodal Officer Verification',
        titleHindi: 'पटवारी / नोडल अधिकारी द्वारा भूमि सत्यापन',
        description: 'The local revenue patwari and district agriculture nodal officer verify land title and approve entry on the central PFMS portal.',
        descriptionHindi: 'स्थानीय पटवारी और जिला कृषि नोडल अधिकारी भूमि अभिलेखों का सत्यापन कर पोर्टल पर अनुमोदन करेंगे।',
        mode: 'offline',
      },
    ],
    officialSource: {
      portalName: 'PM-KISAN Official Government Portal',
      url: 'https://pmkisan.gov.in',
      helplinePhone: '155261 / 011-24300606',
      tollFree: '1800-115-526',
      ministryDepartment: 'Department of Agriculture & Farmers Welfare, GoI',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-15',
    nextDisbursementCycle: '18th Installment (Aug-Nov 2026 Cycle)',
  },
  {
    id: 'scheme-pmfby',
    shortCode: 'PMFBY',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
    nameOdia: 'ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା ଯୋଜନା',
    subtitle: 'Comprehensive crop loss insurance with heavily subsidized farmer premiums (1.5% - 2%)',
    subtitleHindi: 'अत्यधिक रियायती प्रीमियम (1.5% - 2%) पर व्यापक फसल हानि बीमा सुरक्षा',
    subtitleOdia: 'ଅତ୍ୟନ୍ତ କମ ପ୍ରିମିୟମରେ (୧.୫% - ୨%) ସମସ୍ତ ଫସଲ କ୍ଷତିପୂରଣ ବୀମା ସୁରକ୍ଷା',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    ministryOdia: 'କୃଷି ଓ କୃଷକ କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    category: 'insurance',
    level: 'joint',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Maharashtra', 'Uttar Pradesh', 'Rajasthan', 'Haryana', 'Tamil Nadu'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    badgeLabel: 'Crop Risk Shield',
    description:
      'PMFBY provides comprehensive insurance coverage against non-preventable natural risks (drought, flood, unseasonal cyclone, hailstorm, pest epidemics, and localized calamities). Farmers pay only a flat nominal premium (2% for Kharif, 1.5% for Rabi, 5% for annual commercial/horticultural crops) while the remaining actuarial premium is shared by Central and State Governments.',
    descriptionHindi:
      'पीएमएफबीवाई प्राकृतिक आपदाओं (सूखा, बाढ़, ओलावृष्टि, कीट प्रकोप, बेमौसम बारिश) से फसल के नुकसान पर व्यापक बीमा कवर देती है। किसानों को केवल 2% (खरीफ), 1.5% (रबी) या 5% (बागवानी) का नाममात्र प्रीमियम देना होता है, बाकी सब्सिडी सरकार वहन करती है।',
    descriptionOdia:
      'ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ ଯଥା ବନ୍ୟା, ମରୁଡ଼ି, ପୋକ ଲାଗିବା କାରଣରୁ ଫସଲ ନଷ୍ଟ ହେଲେ ଏହି ଯୋଜନାରେ ବୀମା କ୍ଷତିପୂରଣ ମିଳିଥାଏ। ଚାଷୀଙ୍କୁ ମାତ୍ର ୨% (ଖରିଫ) ଏବଂ ୧.୫% (ରବି) ପ୍ରିମିୟମ ଦେବାକୁ ପଡ଼େ।',
    benefits: [
      {
        title: 'Heavily Subsidized Farmer Premium',
        titleHindi: 'अत्यंत कम किसान प्रीमियम दर',
        titleOdia: 'ସ୍ୱଳ୍ପ ପ୍ରିମିୟମ ହାର',
        description: 'Only 2.0% for Kharif crops (Soybean, Paddy), 1.5% for Rabi (Wheat, Mustard), and 5.0% for Horticultural crops.',
        descriptionHindi: 'खरीफ हेतु केवल 2%, रबी हेतु 1.5% और बागवानी/वाणिज्यिक फसलों हेतु केवल 5% प्रीमियम।',
        amountOrMetric: '1.5% - 2% Premium',
        isKeyHighlight: true,
      },
      {
        title: 'Full Sowing-to-Harvest & Post-Harvest Cover',
        titleHindi: 'बुवाई से कटाई व कटाई उपरांत संपूर्ण कवर',
        titleOdia: 'ସମ୍ପୂର୍ଣ୍ଣ ବୀମା ସୁରକ୍ଷା',
        description: 'Covers prevented sowing, mid-season adversity, localized hailstorm/landslide, and post-harvest drying crop damage up to 14 days.',
        descriptionHindi: 'रोकी गई बुवाई, मध्य सत्र प्रतिकूलता, ओलावृष्टि/जलभराव और कटाई के 14 दिनों तक खेत में रखी फसल की क्षति का पूरा मुआवजा।',
        amountOrMetric: '100% Sum Insured',
        isKeyHighlight: true,
      },
      {
        title: '72-Hour Direct Claim Intimation',
        titleHindi: '72 घंटे में दावा सूचना सुविधा',
        titleOdia: '୭୨ ଘଣ୍ଟା ମଧ୍ୟରେ ଅଭିଯୋଗ',
        description: 'Report localized crop damage within 72 hours via Crop Insurance App or toll-free 14447 for on-field drone/survey assessment.',
        descriptionHindi: 'फसल नुकसान होने पर 72 घंटे के अंदर क्रॉप इंश्योरेंस ऐप या टोल-फ्री 14447 पर सीधे सूचना दर्ज कराएं।',
        amountOrMetric: '72-Hour Window',
      },
    ],
    eligibility: {
      summary: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.',
      summaryHindi: 'अधिसूचित क्षेत्रों में अधिसूचित फसल उगाने वाले सभी किसान (भू-स्वामी, बटाईदार एवं पट्टेदार किसान सहित)।',
      summaryOdia: 'ଅଧିସୂଚିତ ଅଞ୍ଚଳରେ ଫସଲ ଚାଷ କରୁଥିବା ସମସ୍ତ ଚାଷୀ (ଭାଗଚାଷୀଙ୍କ ସମେତ)।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'tenant', 'sharecropper', 'all'],
      keyInclusions: [
        'Loanee farmers with active KCC loans (auto-enrolled unless opted out in writing)',
        'Non-loanee farmers enrolling via CSC, bank branch, or national portal',
        'Sharecroppers and tenant farmers with signed self-declaration or tenancy certificate',
      ],
      keyInclusionsHindi: [
        'सक्रिय केसीसी ऋण वाले ऋणी किसान (स्वतः नामांकित, जब तक लिखित रूप में बाहर न हों)',
        'गैर-ऋणी किसान जो सीएससी, बैंक या राष्ट्रीय पोर्टल से आवेदन करते हैं',
        'बटाईदार एवं पट्टेदार किसान (अनुबंध/घोषणा पत्र सहित)',
      ],
      keyExclusions: [
        'Non-notified crop varieties or cultivation outside designated revenue insurance units',
        'War, nuclear risks, malicious damage, or grazing by domestic animals',
        'Crop damage reported after the 72-hour statutory intimation window for localized risks',
      ],
      keyExclusionsHindi: [
        'गैर-अधिसूचित फसलें या गैर-अधिसूचित क्षेत्र में की गई खेती',
        'घरेलू मवेशियों द्वारा चराई या मानवीय दुर्भावना से हुआ नुकसान',
        'स्थानिक आपदाओं में 72 घंटे की तय समयसीमा बीत जाने के बाद दी गई सूचना',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        nameOdia: 'ଆଧାର କାର୍ଡ',
        description: 'Government photo identification of the applicant farmer.',
        isMandatory: true,
        issuingAuthority: 'UIDAI',
      },
      {
        id: 'doc-khasra',
        name: 'Land Possession Record / Khasra-Khatauni (RoR)',
        nameHindi: 'भू-स्वामित्व अभिलेख / खसरा-खतौनी',
        nameOdia: 'ଜମି ପଟ୍ଟା',
        description: 'Official revenue document showing survey number and operational holding.',
        isMandatory: true,
        issuingAuthority: 'Tehsildar / Revenue Department',
      },
      {
        id: 'doc-sowing-cert',
        name: 'Sowing Certificate / Patwari Panchnama',
        nameHindi: 'बुवाई प्रमाण पत्र / पटवारी पंचनामा',
        nameOdia: 'ବିହନ ବୁଣା ପ୍ରମାଣପତ୍ର',
        description: 'Self-declaration or certificate issued by Patwari/Gram Sevak confirming the specific crop sown.',
        isMandatory: true,
        issuingAuthority: 'Village Revenue Officer / Agriculture Extension Officer',
      },
      {
        id: 'doc-bank-passbook',
        name: 'Bank Passbook / Cancelled Cheque',
        nameHindi: 'बैंक पासबुक / निरस्त चेक',
        nameOdia: 'ବ୍ୟାଙ୍କ ପାସବୁକ',
        description: 'Active savings account passbook showing Name, Account Number, and IFSC code.',
        isMandatory: true,
      },
      {
        id: 'doc-tenancy',
        name: 'Tenancy Agreement (For Tenant / Sharecropper Farmers)',
        nameHindi: 'बटाईदार / पट्टा अनुबंध पत्र',
        nameOdia: 'ଭାଗଚାଷ ଚୁକ୍ତିପତ୍ର',
        description: 'Signed tenancy agreement or village panchayat consent form.',
        isMandatory: false,
        issuingAuthority: 'Gram Panchayat / Land Owner',
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Check Cut-Off Dates & Notified Crop List',
        titleHindi: 'अंतिम तिथि एवं अधिसूचित फसलों की जांच करें',
        description: 'Check state notification cut-off dates (usually July 31 for Kharif and December 31 for Rabi) on the National Crop Insurance Portal (pmfby.gov.in).',
        descriptionHindi: 'राष्ट्रीय फसल बीमा पोर्टल पर खरीफ (31 जुलाई) व रबी (31 दिसंबर) की अंतिम तिथि देखें।',
        mode: 'both',
        linkOrLocation: 'https://pmfby.gov.in',
      },
      {
        stepNumber: 2,
        title: 'Apply Online via NCIP or Nearest CSC',
        titleHindi: 'एनसीआईपी पोर्टल या सीएससी से आवेदन करें',
        description: 'Log in to pmfby.gov.in -> "Farmer Corner" or visit your nearest CSC / Bank Branch with land and sowing documents.',
        descriptionHindi: 'pmfby.gov.in पर "फार्मर कॉर्नर" में जाएं या निकटतम सीएससी/बैंक शाखा में दस्तावेज जमा करें।',
        mode: 'both',
      },
      {
        stepNumber: 3,
        title: 'Pay Subsidized Farmer Premium',
        titleHindi: 'रियायती प्रीमियम राशि का भुगतान करें',
        description: 'Pay the subsidized premium fee (e.g. ₹500 - ₹900 per hectare depending on crop sum insured) and collect the digital insurance policy receipt.',
        descriptionHindi: 'ऑनलाइन या सीएससी पर निर्धारित मामूली प्रीमियम जमा कर डिजिटल पॉलिसी रसीद प्राप्त करें।',
        mode: 'both',
      },
      {
        stepNumber: 4,
        title: 'In Case of Damage: Intimate within 72 Hours',
        titleHindi: 'फसल नुकसान होने पर 72 घंटे में सूचना दें',
        description: 'If crop damage occurs due to hail, flood, or cyclone, submit claim photos via the "Crop Insurance App" or dial national helpline 14447.',
        descriptionHindi: 'प्राकृतिक आपदा से नुकसान होने पर तुरंत "क्रॉप इंश्योरेंस ऐप" या 14447 पर 72 घंटे के अंदर सूचना दें।',
        mode: 'both',
      },
    ],
    officialSource: {
      portalName: 'National Crop Insurance Portal (PMFBY)',
      url: 'https://pmfby.gov.in',
      helplinePhone: '14447 (National Toll Free Kisan Call Line)',
      tollFree: '1800-180-1551',
      ministryDepartment: 'Ministry of Agriculture & Farmers Welfare, GoI',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-10',
    nextDisbursementCycle: 'Kharif 2026 Insurance Cutoff Active',
  },
  {
    id: 'scheme-kcc',
    shortCode: 'KCC',
    name: 'Kisan Credit Card & Interest Subvention Scheme (ISS)',
    nameHindi: 'किसान क्रेडिट कार्ड एवं ब्याज अनुदान योजना',
    nameOdia: 'କିଷାନ କ୍ରେଡିଟ କାର୍ଡ ଯୋଜନା',
    subtitle: 'Concessional working capital loans up to ₹3,00,000 at an effective 4% annual interest rate',
    subtitleHindi: '₹3,00,000 तक का रियायती कृषि कार्यशील ऋण मात्र 4% की प्रभावी वार्षिक ब्याज दर पर',
    subtitleOdia: 'ମାତ୍ର ୪% ସୁଧ ହାରରେ ₹୩,୦୦,୦୦୦ ପର୍ଯ୍ୟନ୍ତ କୃଷି ଋଣ ସୁବିଧା',
    ministry: 'Ministry of Finance & Ministry of Agriculture & Farmers Welfare, GoI',
    ministryHindi: 'वित्त मंत्रालय एवं कृषि मंत्रालय, भारत सरकार',
    ministryOdia: 'ଅର୍ଥ ମନ୍ତ୍ରଣାଳୟ ଏବଂ କୃଷି ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    category: 'credit',
    level: 'central',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Uttar Pradesh', 'Punjab', 'Maharashtra', 'Gujarat', 'Karnataka'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    badgeLabel: 'Effective 4% Interest',
    description:
      'The Kisan Credit Card (KCC) provides farmers with timely, flexible, and affordable credit to meet the cultivation expenses of crops, post-harvest expenses, produce marketing, consumption requirements of farmer households, and working capital for maintenance of farm assets, animal husbandry, and fisheries.',
    descriptionHindi:
      'किसान क्रेडिट कार्ड (केसीसी) किसानों को फसल की बुवाई, खाद-बीज खरीद, कटाई उपरांत खर्चों, कृषि यंत्र रखरखाव, पशुपालन और मत्स्य पालन हेतु अत्यंत सस्ती ब्याज दर पर त्वरित और लचीला ऋण उपलब्ध कराता है।',
    descriptionOdia:
      'କିଷାନ କ୍ରେଡିଟ କାର୍ଡ (KCC) ଚାଷୀମାନଙ୍କୁ ବିହନ, ସାର କିଣିବା, ଚାଷ ଖର୍ଚ୍ଚ ଏବଂ ପଶୁପାଳନ ପାଇଁ ଖୁବ କମ ସୁଧରେ ବ୍ୟାଙ୍କ ଋଣ ପ୍ରଦାନ କରେ।',
    benefits: [
      {
        title: 'Effective 4% p.a. Concessional Interest Rate',
        titleHindi: 'मात्र 4% प्रभावी वार्षिक ब्याज दर',
        titleOdia: 'ମାତ୍ର ୪% ବାର୍ଷିକ ସୁଧ',
        description: 'Base lending rate 7.0% minus 3.0% Prompt Repayment Incentive (PRI) = 4.0% net rate up to ₹3,00,000.',
        descriptionHindi: 'सामान्य ब्याज 7% में से समय पर भुगतान करने पर 3% की छूट, जिससे प्रभावी ब्याज मात्र 4% रह जाता है।',
        amountOrMetric: '4.0% Net Interest',
        isKeyHighlight: true,
      },
      {
        title: 'Collateral-Free Loan up to ₹1.60 Lakh',
        titleHindi: '₹1.60 लाख तक बिना किसी बंधक (गारंटी) के ऋण',
        titleOdia: '₹୧.୬୦ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ ବିନା ବନ୍ଧକରେ ଋଣ',
        description: 'No land mortgage or third-party guarantee required for limits up to ₹1,60,000 (extended to ₹3,00,000 for tie-up arrangements).',
        descriptionHindi: '₹1.60 लाख तक के ऋण हेतु जमीन बंधक रखने या किसी गारंटर की आवश्यकता नहीं होती।',
        amountOrMetric: '₹1.60 Lakh Collateral-Free',
        isKeyHighlight: true,
      },
      {
        title: 'ATM-Enabled RuPay Kisan Card',
        titleHindi: 'एटीएम सक्षम रुपे किसान कार्ड',
        titleOdia: 'ରୁପେ କିଷାନ କାର୍ଡ',
        description: 'Withdraw cash anytime from any bank ATM or purchase inputs via PoS terminals at fertilizer/seed dealers.',
        descriptionHindi: 'किसी भी बैंक एटीएम से नकदी निकालें या खाद-बीज दुकानों पर पीओएस मशीन से सीधे भुगतान करें।',
        amountOrMetric: 'RuPay Debit Card',
      },
      {
        title: 'Animal Husbandry & Fisheries Sub-limit',
        titleHindi: 'पशुपालन एवं मत्स्य पालन उप-सीमा',
        titleOdia: 'ପଶୁପାଳନ ଋଣ',
        description: 'Working capital credit up to ₹2,00,000 for dairy, poultry, goat farming, and fisheries included at 4% interest.',
        descriptionHindi: 'डेयरी, बकरी पालन, पोल्ट्री व मछली पालन हेतु ₹2 लाख तक का ऋण भी 4% ब्याज दर पर उपलब्ध।',
        amountOrMetric: 'Up to ₹2 Lakh for Dairy',
      },
    ],
    eligibility: {
      summary: 'All individual farmers, joint borrowers, tenant farmers, oral lessees, and Self Help Groups (SHGs).',
      summaryHindi: 'सभी व्यक्तिगत किसान, संयुक्त खाताधारक, काश्तकार, मौखिक पट्टेदार, बटाईदार और स्वयं सहायता समूह (SHG)।',
      summaryOdia: 'ସମସ୍ତ ବ୍ୟକ୍ତିଗତ କୃଷକ, ଭାଗଚାଷୀ, ଏବଂ ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ (SHG)।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'tenant', 'sharecropper', 'all'],
      keyInclusions: [
        'Individual / Joint owner cultivators',
        'Tenant farmers, sharecroppers, and oral lessees cultivating land',
        'Self-Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers',
        'Dairy farmers, cattle rearers, fish farmers, and poultry producers',
      ],
      keyInclusionsHindi: [
        'व्यक्तिगत या संयुक्त रूप से खेती करने वाले भू-स्वामी किसान',
        'बटाईदार, काश्तकार एवं पट्टेदार किसान',
        'किसानों के स्वयं सहायता समूह (SHG) या संयुक्त देयता समूह (JLG)',
        'डेयरी, पशुपालक और मत्स्य पालक किसान',
      ],
      keyExclusions: [
        'Defaulters on existing institutional bank loans with active willful default records',
        'Minors without legal adult co-borrower',
      ],
      keyExclusionsHindi: [
        'बैंकों के पूर्व डिफाल्टर जिनके नाम पर एनपीए या कानूनी वसूली नोटिस दर्ज हो',
        'नाबालिग आवेदक (यदि कोई वयस्क अभिभावक सह-आवेदक न हो)',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card & PAN Card',
        nameHindi: 'आधार कार्ड एवं पैन कार्ड',
        nameOdia: 'ଆଧାର ଓ ପାନ କାର୍ଡ',
        description: 'Identity proof and tax identification for KYC compliance.',
        isMandatory: true,
      },
      {
        id: 'doc-land-kcc',
        name: 'Land Revenue Record (Khasra, Khatauni, B1 / Patta)',
        nameHindi: 'भू-अभिलेख (खसरा, खतौनी, बी-1 नकल)',
        nameOdia: 'ଜମି ପଟ୍ଟା',
        description: 'Certified copy of land record showing clear title and cultivation rights.',
        isMandatory: true,
        issuingAuthority: 'Tehsildar / Revenue Department',
      },
      {
        id: 'doc-crop-plan',
        name: 'Cropping Pattern & Scale of Finance Form',
        nameHindi: 'फसल चक्र एवं ऋण आवश्यकता घोषणा पत्र',
        nameOdia: 'ଫସଲ ବିବରଣୀ ଫର୍ମ',
        description: 'Simple 1-page application detailing crops sown per season (Kharif, Rabi, Zaid).',
        isMandatory: true,
      },
      {
        id: 'doc-no-dues',
        name: 'Self-Declaration / No Dues Certificate',
        nameHindi: 'स्व-घोषणा / अदेय प्रमाण पत्र',
        nameOdia: 'ବ୍ୟାଙ୍କ ଋଣମୁକ୍ତ ପ୍ରମାଣପତ୍ର',
        description: 'Self-declaration confirming no other outstanding KCC loan from other bank branches.',
        isMandatory: true,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Obtain 1-Page KCC Simplified Application Form',
        titleHindi: '1-पेज का सरल केसीसी फॉर्म प्राप्त करें',
        description: 'Download the simplified 1-page KCC form from pmkisan.gov.in or collect from any commercial / rural / cooperative bank branch.',
        descriptionHindi: 'pmkisan.gov.in से 1-पेज का केसीसी फॉर्म डाउनलोड करें या नजदीकी बैंक शाखा से प्राप्त करें।',
        mode: 'both',
        linkOrLocation: 'https://pmkisan.gov.in',
      },
      {
        stepNumber: 2,
        title: 'Submit with Land Record & Aadhaar at Bank',
        titleHindi: 'जमीन की खतौनी व आधार के साथ बैंक में जमा करें',
        description: 'Fill in basic personal details, land holding size, crops grown, and attach Aadhaar + Khasra copy.',
        descriptionHindi: 'फार्म में नाम, जमीन का रकबा, बोई जाने वाली फसलें भरकर आधार व खतौनी की प्रति संलग्न करें।',
        mode: 'offline',
      },
      {
        stepNumber: 3,
        title: 'Mandatory 14-Day Bank Issuance Protocol',
        titleHindi: '14 दिनों के भीतर बैंक द्वारा कार्ड जारी करने का नियम',
        description: 'As per RBI & Govt mandates, banks must process and issue the KCC card within 14 days of complete application receipt.',
        descriptionHindi: 'आरबीआई और सरकार के निर्देशों के तहत बैंक को 14 दिनों के भीतर केसीसी जारी करना अनिवार्य है।',
        mode: 'offline',
      },
      {
        stepNumber: 4,
        title: 'Collect RuPay Kisan Card & Activate Limit',
        titleHindi: 'रुपे किसान कार्ड प्राप्त करें व सीमा सक्रिय करें',
        description: 'Activate your RuPay debit card at any ATM to withdraw funds as needed for seeds, fertilizer, and diesel.',
        descriptionHindi: 'एटीएम से अपना पिन सेट करें और जरूरत के अनुसार खाद, बीज, डीजल आदि के लिए राशि का उपयोग करें।',
        mode: 'both',
      },
    ],
    officialSource: {
      portalName: 'Reserve Bank of India & NABARD KCC Guidelines',
      url: 'https://www.nabard.org/content.aspx?id=591',
      helplinePhone: '1800-22-9090 (NABARD)',
      tollFree: '1800-180-1551',
      ministryDepartment: 'Department of Financial Services & MoA&FW',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-01',
    nextDisbursementCycle: 'Year-Round Active Credit Facility',
  },
  {
    id: 'scheme-pm-kusum',
    shortCode: 'PM-KUSUM',
    name: 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan',
    nameHindi: 'पीएम-कुसुम योजना (सोलर कृषि पंप सब्सिडी)',
    nameOdia: 'ପିଏମ-କୁସୁମ ସୌର ପମ୍ପ ଯୋଜନା',
    subtitle: 'Up to 90% combined subsidy for Standalone Off-Grid Solar Pumps & Grid-Connected Solarization',
    subtitleHindi: 'स्टैंडअलोन सोलर पंप और ग्रिड-कनेक्टेड सोलराइजेशन पर 90% तक की भारी सब्सिडी',
    subtitleOdia: 'ସୌର କୃଷି ପମ୍ପ ସ୍ଥାପନ ପାଇଁ ୯୦% ପର୍ଯ୍ୟନ୍ତ ସରକାରୀ ସବସିଡି',
    ministry: 'Ministry of New and Renewable Energy (MNRE), Govt. of India',
    ministryHindi: 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय, भारत सरकार',
    ministryOdia: 'ନୂତନ ଓ ଅକ୍ଷୟ ଶକ୍ତି ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    category: 'solar_energy',
    level: 'joint',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Rajasthan', 'Maharashtra', 'Gujarat', 'Haryana', 'Uttar Pradesh'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    badgeLabel: 'Up to 90% Subsidy',
    description:
      'PM-KUSUM provides clean, reliable, and free daytime solar power for agricultural irrigation. Component-B provides capital subsidies for standalone off-grid solar water pumps (3 HP, 5 HP, 7.5 HP) in non-electrified areas, while Component-C enables solarization of existing grid-connected electric pump sets with net-metering income from surplus power sales.',
    descriptionHindi:
      'पीएम-कुसुम योजना किसानों को सिंचाई के लिए दिन के समय मुफ्त एवं स्वच्छ सौर ऊर्जा उपलब्ध कराती है। इसके तहत 3 एचपी, 5 एचपी और 7.5 एचपी के सोलर पंप लगाने पर केंद्र व राज्य सरकार मिलाकर 60% से 90% तक का अनुदान देती हैं। किसान अतिरिक्त बिजली ग्रिड को बेचकर कमाई भी कर सकते हैं।',
    descriptionOdia:
      'ଏହି ଯୋଜନାରେ କୃଷକମାନଙ୍କୁ ବିଲରେ ସୌର ପମ୍ପ ବସାଇବା ପାଇଁ ୬୦% ରୁ ୯୦% ପର୍ଯ୍ୟନ୍ତ ରିହାତି ମିଳେ। ଦିନରେ ବିନା ବିଜୁଳି ଖର୍ଚ୍ଚରେ ଜଳସେଚନ କରିବା ସହ ବଳକା ବିଜୁଳି ବିକ୍ରୟ କରି ଅତିରିକ୍ତ ରୋଜଗାର ମଧ୍ୟ କରିପାରିବେ।',
    benefits: [
      {
        title: 'Huge 60% to 90% Capital Subsidy',
        titleHindi: '60% से 90% तक पूंजीगत अनुदान',
        titleOdia: '୬୦% ରୁ ୯୦% ସବସିଡି',
        description: '30% Central Financial Assistance + 30% to 50% State Subsidy. Farmer pays only 10% to 40% upfront.',
        descriptionHindi: '30% केंद्र सरकार + 30% से 50% राज्य सरकार सब्सिडी। किसान को केवल 10% से 40% का अंशदान देना होता है।',
        amountOrMetric: '60% - 90% Subsidy',
        isKeyHighlight: true,
      },
      {
        title: 'Zero Electricity & Diesel Bill for 25 Years',
        titleHindi: '25 वर्षों तक शून्य बिजली व डीजल खर्च',
        titleOdia: '୨୫ ବର୍ଷ ପର୍ଯ୍ୟନ୍ତ ମାଗଣା ବିଜୁଳି',
        description: 'Solar PV modules come with a 25-year performance warranty and 5-year comprehensive system maintenance.',
        descriptionHindi: 'सोलर पैनल पर 25 साल की वारंटी और 5 साल तक कंपनी द्वारा निशुल्क मेंटेनेंस सेवा।',
        amountOrMetric: '25-Year Life',
        isKeyHighlight: true,
      },
      {
        title: 'Sell Surplus Power & Earn Guaranteed Income',
        titleHindi: 'अतिरिक्त सौर बिजली बेचकर आय अर्जित करें',
        titleOdia: 'ଅତିରିକ୍ତ ବିଜୁଳି ବିକ୍ରୟ ସୁବିଧା',
        description: 'Under Component-C, surplus solar power produced during non-irrigation hours is sold back to DISCOM at state feed-in tariffs.',
        descriptionHindi: 'जब सिंचाई न हो रही हो, तब अतिरिक्त बिजली बिजली वितरण कंपनी को बेचकर हर महीने तय आमदनी पाएं।',
        amountOrMetric: 'Feed-in Tariff Income',
      },
    ],
    eligibility: {
      summary: 'Farmers, farmer groups, water user associations, and FPOs having an existing borewell / open well with valid water source.',
      summaryHindi: 'किसान, किसान समूह, जल उपभोक्ता संस्थाएं एवं एफपीओ जिनके पास चालू बोरवेल, कुआं या जल स्रोत उपलब्ध है।',
      summaryOdia: 'ଚାଷୀ, ଏଫପିଓ ଏବଂ ଚାଷୀ ଗୋଷ୍ଠୀ ଯାହାଙ୍କ ପାଖରେ କୂଅ କିମ୍ବା ବୋରୱେଲ ରହିଛି।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'fpo', 'all'],
      keyInclusions: [
        'Farmers with viable groundwater / surface water source (borewell, open dug well, pond)',
        'Farmers in off-grid or diesel-pump reliant areas given priority in Component-B',
        'Farmers with existing grid pump connections eligible for Component-C solarization',
      ],
      keyInclusionsHindi: [
        'जिन किसानों के पास स्वयं का बोरवेल, कुआं या स्थायी जल स्रोत उपलब्ध है',
        'डीजल पंप पर निर्भर किसानों को प्राथमिकता दी जाती है',
        'ग्रिड बिजली कनेक्शन वाले किसान कंपोनेंट-सी के तहत पात्र हैं',
      ],
      keyExclusions: [
        'Farmers in over-exploited dark zones (unless micro-irrigation drip/sprinkler is mandatorily installed)',
        'Commercial industrial properties or non-agricultural borewells',
      ],
      keyExclusionsHindi: [
        'भूजल दृष्टि से डार्क जोन घोषित क्षेत्र (जब तक कि ड्रिप/स्प्रिंकलर लगाना अनिवार्य न किया जाए)',
        'गैर-कृषि व्यावसायिक परिसर',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card of Applicant',
        nameHindi: 'आवेदक का आधार कार्ड',
        nameOdia: 'ଆଧାର କାର୍ଡ',
        description: 'Identification of the farmer.',
        isMandatory: true,
      },
      {
        id: 'doc-land',
        name: 'Khasra / Land Record (RoR)',
        nameHindi: 'खसरा / भू-अभिलेख की नकल',
        nameOdia: 'ଜମି ପଟ୍ଟା',
        description: 'Proof of agricultural land ownership where solar pump will be erected.',
        isMandatory: true,
      },
      {
        id: 'doc-water-source',
        name: 'Water Source & Borewell Certificate / Declaration',
        nameHindi: 'जल स्रोत एवं बोरवेल स्व-घोषणा पत्र',
        nameOdia: 'ଜଳ ଉତ୍ସ ପ୍ରମାଣପତ୍ର',
        description: 'Confirmation that functional borewell/well with sufficient water depth exists.',
        isMandatory: true,
      },
      {
        id: 'doc-bank',
        name: 'Bank Passbook Copy',
        nameHindi: 'बैंक पासबुक की प्रति',
        nameOdia: 'ବ୍ୟାଙ୍କ ପାସବୁକ',
        description: 'For applicant share transaction and subsidy accounting.',
        isMandatory: true,
      },
      {
        id: 'doc-electricity-bill',
        name: 'Electricity Bill (Only for Component-C Grid Solarization)',
        nameHindi: 'बिजली बिल (केवल ग्रिड सोलराइजेशन हेतु)',
        nameOdia: 'ବିଜୁଳି ବିଲ',
        description: 'Latest electricity connection bill showing agriculture feeder consumer number.',
        isMandatory: false,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Apply on State Renewable Energy Development Portal',
        titleHindi: 'राज्य अक्षय ऊर्जा पोर्टल पर ऑनलाइन आवेदन करें',
        description: 'Apply via State Nodal Agency (e.g. Urja Vikas Nigam, OREDA in Odisha, MPUVN in MP, REDA in Rajasthan, etc.) or pmkusum.mnre.gov.in.',
        descriptionHindi: 'राज्य अक्षय ऊर्जा एजेंसी (जैसे एमपी में MPUVN, ओडिशा में OREDA) या pmkusum.mnre.gov.in पर पंजीकरण करें।',
        mode: 'online',
        linkOrLocation: 'https://pmkusum.mnre.gov.in',
      },
      {
        stepNumber: 2,
        title: 'Select Pump Capacity & Vendor',
        titleHindi: 'पंप क्षमता (3HP / 5HP / 7.5HP) एवं कंपनी चुनें',
        description: 'Choose required capacity (Surface vs Submersible) and select from MNRE-empanelled vendor manufacturers.',
        descriptionHindi: 'आवश्यकतानुसार 3, 5 या 7.5 एचपी (सबमर्सिबल/सरफेस) पंप और अधिकृत कंपनी का चयन करें।',
        mode: 'online',
      },
      {
        stepNumber: 3,
        title: 'Pay Farmer Beneficiary Contribution (10% to 40%)',
        titleHindi: 'किसान अंशदान (10% से 40%) जमा करें',
        description: 'Pay the non-subsidized portion directly via online payment gateway or demand draft. Agricultural bank loans are available for the farmer share.',
        descriptionHindi: 'सब्सिडी काटकर शेष किसान अंशदान ऑनलाइन जमा करें या बैंक ऋण के माध्यम से वित्तपोषित कराएं।',
        mode: 'both',
      },
      {
        stepNumber: 4,
        title: 'Site Survey, Installation & Commissioning',
        titleHindi: 'स्थल निरीक्षण, पंप स्थापना एवं चालू करना',
        description: 'Empanelled vendor installs panels, motor, and controller within 60-90 days, verified by the District Agriculture/Renewable Officer.',
        descriptionHindi: 'अधिकृत वेंडर द्वारा 60 से 90 दिनों में खेत पर सोलर पैनल, पंप व कंट्रोलर स्थापित कर चालू कर दिया जाएगा।',
        mode: 'offline',
      },
    ],
    officialSource: {
      portalName: 'PM-KUSUM National MNRE Portal',
      url: 'https://pmkusum.mnre.gov.in',
      helplinePhone: '1800-180-3333',
      tollFree: '011-2436-0707',
      ministryDepartment: 'Ministry of New and Renewable Energy, Govt. of India',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-12',
    nextDisbursementCycle: 'FY 2026-27 State Quota Allocations Active',
  },
  {
    id: 'scheme-smam',
    shortCode: 'SMAM / DBT Krishi Yantra',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    nameHindi: 'कृषि यंत्रीकरण उप-मिशन (डीबीटी कृषि यंत्र अनुदान योजना)',
    nameOdia: 'କୃଷି ଯନ୍ତ୍ରପାତି ରିହାତି ଯୋଜନା (SMAM)',
    subtitle: '40% to 50% capital subsidy on Tractors, Rotavators, Harvesters, Power Tillers, and Laser Land Levelers',
    subtitleHindi: 'ट्रैक्टर, रोटावेटर, कल्टीवेटर, लेजर लैंड लेवलर और रीपर पर 40% से 50% तक सरकारी अनुदान',
    subtitleOdia: 'ଟ୍ରାକ୍ଟର, ରୋଟାଭେଟର, ଏବଂ ଅନ୍ୟାନ୍ୟ କୃଷି ଯନ୍ତ୍ରପାତି କିଣିବା ପାଇଁ ୪୦% ରୁ ୫୦% ସବସିଡି',
    ministry: 'Department of Agriculture & Farmers Welfare, Govt. of India & State Agriculture Depts',
    ministryHindi: 'कृषि एवं किसान कल्याण विभाग, भारत सरकार एवं राज्य कृषि विभाग',
    ministryOdia: 'କୃଷି ବିଭାଗ, ଭାରତ ସରକାର ଏବଂ ରାଜ୍ୟ କୃଷି ବିଭାଗ',
    category: 'machinery',
    level: 'joint',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Maharashtra', 'Punjab'],
    status: 'active',
    isPopular: true,
    isFeatured: false,
    badgeLabel: '40% - 50% Machinery Grant',
    description:
      'SMAM promotes farm mechanization among small, marginal, and women farmers. It provides heavy financial subsidies to purchase modern farm machinery and implements (rotavators, seed drills, multi-crop threshers, happy seeders, power tillers, drone sprayers) and supports the establishment of Custom Hiring Centers (CHCs) with up to 40% project subsidies.',
    descriptionHindi:
      'एसएमएएम योजना के तहत छोटे, सीमांत एवं महिला किसानों को आधुनिक कृषि यंत्र (जैसे रोटावेटर, सीड ड्रिल, थ्रेशर, कल्टीवेटर, सुपर सीडर, ड्रोन) खरीदने पर 40% से 50% तक की भारी सब्सिडी दी जाती है। इसके साथ ही कस्टम हायरिंग सेंटर (CHC) स्थापित करने के लिए भी 40% तक का अनुदान मिलता है।',
    descriptionOdia:
      'ଏହି ଯୋଜନା ମାଧ୍ୟମରେ କୃଷକମାନଙ୍କୁ ଆଧୁନିକ ଯନ୍ତ୍ରପାତି ଯଥା ରୋଟାଭେଟର, ଟ୍ରାକ୍ଟର, ବିହନ ବୁଣା ଯନ୍ତ୍ର କିଣିବା ପାଇଁ ୫୦% ପର୍ଯ୍ୟନ୍ତ ସବସିଡି ପ୍ରଦାନ କରାଯାଏ।',
    benefits: [
      {
        title: '40% to 50% Capital Subsidy on Farm Implements',
        titleHindi: 'कृषि यंत्रों पर 40% से 50% तक सीधा अनुदान',
        titleOdia: '୪୦% ରୁ ୫୦% ସିଧାସଳଖ ରିହାତି',
        description: 'Up to 50% for SC/ST/Small/Marginal/Women farmers and 40% for other category farmers.',
        descriptionHindi: 'एससी/एसटी/सीमांत/महिला किसानों को 50% तक तथा अन्य सामान्य किसानों को 40% तक का अनुदान।',
        amountOrMetric: '40% - 50% Grant',
        isKeyHighlight: true,
      },
      {
        title: 'Subsidy on Wide Range of Machinery',
        titleHindi: 'विविध आधुनिक कृषि यंत्रों पर उपलब्ध',
        titleOdia: 'ବିଭିନ୍ନ ଯନ୍ତ୍ରପାତି ଉପଲବ୍ଧ',
        description: 'Rotavator (up to ₹45,000), Laser Land Leveler (up to ₹1,50,000), Multi-Crop Thresher, Power Tiller, Reaper Binder, and Kisan Drones.',
        descriptionHindi: 'रोटावेटर, लेजर लेवलर, थ्रेशर, पावर टिलर, सीड कम फर्टिलाइजर ड्रिल और किसान ड्रोन पर तय सीमा तक सब्सिडी।',
        amountOrMetric: 'Up to ₹1.50 Lakh',
      },
      {
        title: 'Custom Hiring Centers (CHC) Setup Grant',
        titleHindi: 'कस्टम हायरिंग सेंटर (CHC) स्थापना अनुदान',
        titleOdia: 'କଷ୍ଟମ ହାୟାରିଂ ସେଣ୍ଟର ସହାୟତା',
        description: 'Up to ₹10 Lakh to ₹25 Lakh project cost subsidy (40%) to establish village machinery hiring hubs for youth and FPOs.',
        descriptionHindi: 'गांव में कृषि यंत्र किराए पर देने वाले केंद्र (CHC) स्थापित करने के लिए 40% तक (₹10 लाख तक) का अनुदान।',
        amountOrMetric: 'Up to ₹10 Lakh for CHC',
      },
    ],
    eligibility: {
      summary: 'All landholding farmers, registered Custom Hiring Centers, FPOs, and rural youth with valid land records.',
      summaryHindi: 'सभी भूमिधारक किसान, पंजीकृत कस्टम हायरिंग सेंटर, एफपीओ और ग्रामीण युवा।',
      summaryOdia: 'ସମସ୍ତ ଚାଷୀ, ଏଫପିଓ ଏବଂ ଗ୍ରାମୀଣ ଯୁବକ ଯାହାଙ୍କ ନାମରେ ଜମି ଅଛି।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'fpo', 'all'],
      keyInclusions: [
        'Small, marginal, SC/ST, and female farmers receive highest 50% subsidy bracket',
        'Farmers who have not availed subsidy for the same equipment in the last 3-5 years',
        'Registered FPOs and Cooperative Societies eligible for CHC high-power hubs',
      ],
      keyInclusionsHindi: [
        'छोटे, सीमांत, महिला एवं अनुसूचित जाति/जनजाति के किसानों को 50% की उच्चतम सब्सिडी',
        'जिन्होंने पिछले 3 से 5 वर्षों में उसी यंत्र पर पूर्व में सरकारी सब्सिडी न ली हो',
        'पंजीकृत एफपीओ और सहकारी समितियां',
      ],
      keyExclusions: [
        'Purchases made from unauthorized, non-empanelled manufacturers/dealers',
        'Applicants without valid land records in the family',
      ],
      keyExclusionsHindi: [
        'अनाधिकृत या गैर-पंजीकृत डीलरों से की गई सीधी खरीद',
        'जिनके नाम पर कोई कृषि भूमि अभिलेख उपलब्ध न हो',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        nameOdia: 'ଆଧାର କାର୍ଡ',
        description: 'Identity proof of farmer.',
        isMandatory: true,
      },
      {
        id: 'doc-land',
        name: 'Khasra-Khatauni (B1 copy)',
        nameHindi: 'खसरा-खतौनी (बी-1 नकल)',
        nameOdia: 'ଜମି ପଟ୍ଟା',
        description: 'Revenue land ownership record.',
        isMandatory: true,
      },
      {
        id: 'doc-caste',
        name: 'Caste Certificate (For SC/ST 50% Subsidy Bracket)',
        nameHindi: 'जाति प्रमाण पत्र (एससी/एसटी 50% सब्सिडी हेतु)',
        nameOdia: 'ଜାତିଗତ ପ୍ରମାଣପତ୍ର',
        description: 'Required for availing special category higher subsidy percentage.',
        isMandatory: false,
      },
      {
        id: 'doc-bank',
        name: 'Bank Passbook & Cancelled Cheque',
        nameHindi: 'बैंक पासबुक एवं निरस्त चेक',
        nameOdia: 'ବ୍ୟାଙ୍କ ପାସବୁକ',
        description: 'For direct DBT transfer of subsidy post inspection.',
        isMandatory: true,
      },
      {
        id: 'doc-dealer-quote',
        name: 'Dealer Quotation & Serial Invoice',
        nameHindi: 'डीलर कोटेशन एवं बिल',
        nameOdia: 'ଡିଲର ବିଲ୍',
        description: 'Quotation from authorized registered manufacturer dealer showing GSTIN.',
        isMandatory: true,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Register on State DBT Agriculture Portal',
        titleHindi: 'राज्य डीबीटी कृषि यंत्र पोर्टल पर ऑनलाइन आवेदन करें',
        description: 'Visit your state DBT agriculture portal (e.g. dbt.mpdage.org in MP, agrisnetodisha.ori.nic.in in Odisha, agricoop.nic.in) during active lottery/application windows.',
        descriptionHindi: 'राज्य के डीबीटी कृषि यंत्र पोर्टल पर आवेदन विंडो खुलने पर आधार से ऑनलाइन पंजीयन करें।',
        mode: 'online',
        linkOrLocation: 'https://agrimachinery.nic.in',
      },
      {
        stepNumber: 2,
        title: 'Select Desired Machine & Submit Target Token',
        titleHindi: 'उपकरण चुनें एवं धरोहर राशि/टोकन जमा करें',
        description: 'Choose your preferred implement (e.g. Rotavator) and dealer. In many states, a small refundable security deposit/token is paid online.',
        descriptionHindi: 'वांछित यंत्र (जैसे रोटावेटर) चुनें और पोर्टल पर आवश्यक टोकन राशि जमा करें।',
        mode: 'online',
      },
      {
        stepNumber: 3,
        title: 'Lottery Selection & Purchase from Empanelled Dealer',
        titleHindi: 'लॉटरी चयन एवं अधिकृत डीलर से खरीद',
        description: 'Once selected in the transparent digital lottery, purchase the implement from any authorized dealer within 20 days.',
        descriptionHindi: 'डिजिटल लॉटरी में चयन होने पर 20 दिनों के भीतर अधिकृत डीलर से यंत्र खरीदें और पक्का जीएसटी बिल अपलोड करें।',
        mode: 'both',
      },
      {
        stepNumber: 4,
        title: 'Physical Verification & Direct DBT Subsidy Credit',
        titleHindi: 'भौतिक सत्यापन एवं बैंक खाते में सब्सिडी क्रेडिट',
        description: 'Assistant Agricultural Engineer conducts physical geo-tagged inspection of the machine serial number. Subsidy is transferred directly to your bank account.',
        descriptionHindi: 'कृषि यंत्रीकरण अधिकारी द्वारा यंत्र का भौतिक व जियो-टैग्ड सत्यापन करने के बाद सब्सिडी सीधे बैंक खाते में आ जाती है।',
        mode: 'both',
      },
    ],
    officialSource: {
      portalName: 'Direct Benefit Transfer in Agriculture Mechanization (FARMS/SMAM)',
      url: 'https://agrimachinery.nic.in',
      helplinePhone: '011-23382012',
      tollFree: '1800-180-1551',
      ministryDepartment: 'Mechanization & Technology Division, MoA&FW',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-05',
    nextDisbursementCycle: '2026 Equipment Lottery Window Active',
  },
  {
    id: 'scheme-pmksy-per-drop',
    shortCode: 'PMKSY - Per Drop More Crop',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PDMC / Micro Irrigation)',
    nameHindi: 'प्रधानमंत्री कृषि सिंचाई योजना (प्रति बूंद अधिक फसल - ड्रिप व स्प्रिंकलर)',
    nameOdia: 'ପ୍ରଧାନମନ୍ତ୍ରୀ କୃଷି ସିଞ୍ଚାଇ ଯୋଜନା (ବିନ୍ଦୁ ଜଳସେଚନ)',
    subtitle: '45% to 55% financial subsidy on Drip and Sprinkler Micro-Irrigation systems',
    subtitleHindi: 'ड्रिप (टपक) और स्प्रिंकलर (फव्वारा) सिंचाई प्रणाली पर 45% से 55% तक का सरकारी अनुदान',
    subtitleOdia: 'ଡ୍ରିପ ଏବଂ ସ୍ପ୍ରିଙ୍କଲର ଜଳସେଚନ ପାଇଁ ୫୫% ପର୍ଯ୍ୟନ୍ତ ସରକାରୀ ସହାୟତା',
    ministry: 'Department of Agriculture & Farmers Welfare, Govt. of India',
    ministryHindi: 'कृषि एवं किसान कल्याण विभाग, भारत सरकार',
    ministryOdia: 'କୃଷି ବିଭାଗ, ଭାରତ ସରକାର',
    category: 'soil_water',
    level: 'joint',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Andhra Pradesh', 'Tamil Nadu'],
    status: 'active',
    isPopular: false,
    isFeatured: false,
    badgeLabel: '45% - 55% Drip/Sprinkler',
    description:
      'Per Drop More Crop (PDMC) under PMKSY focuses on enhancing water use efficiency at the farm level through micro-irrigation technologies (Drip & Sprinkler). Drip irrigation saves up to 40-50% water, reduces fertilizer expenditure via fertigation, minimizes weed growth, and increases crop yields by 25-35%.',
    descriptionHindi:
      'पीएमकेएसवाई का "प्रति बूंद अधिक फसल" घटक खेतों में पानी की दक्षता बढ़ाने हेतु ड्रिप एवं स्प्रिंकलर सिस्टम लगाने पर 45% से 55% सब्सिडी प्रदान करता है। इससे 40-50% पानी की बचत होती है, खाद का खर्च कम होता है और पैदावार में 25-35% तक की वृद्धि होती है।',
    descriptionOdia:
      'ଏହି ଯୋଜନାରେ ବିନ୍ଦୁ ଜଳସେଚନ (ଡ୍ରିପ) ଓ ଫୁଆରା ସିଞ୍ଚନ (ସ୍ପ୍ରିଙ୍କଲର) ବସାଇବା ପାଇଁ ୫୫% ପର୍ଯ୍ୟନ୍ତ ସବସିଡି ପ୍ରଦାନ କରାଯାଏ। ଏହା ଜଳ ଅପଚୟ ରୋକି ଅମଳ ବୃଦ୍ଧି କରେ।',
    benefits: [
      {
        title: '55% Subsidy for Small & Marginal Farmers',
        titleHindi: 'छोटे व सीमांत किसानों को 55% सब्सिडी',
        titleOdia: 'କ୍ଷୁଦ୍ର ଚାଷୀଙ୍କୁ ୫୫% ସହାୟତା',
        description: 'Small and marginal farmers receive 55% subsidy, while other farmers receive 45% subsidy on indicative benchmark unit costs.',
        descriptionHindi: 'छोटे व सीमांत किसानों को 55% तथा अन्य बड़े किसानों को 45% तक का अनुदान मिलता है।',
        amountOrMetric: '55% Subsidy',
        isKeyHighlight: true,
      },
      {
        title: 'Save up to 50% Water & 30% Fertilizer',
        titleHindi: '50% पानी व 30% खाद की बचत',
        titleOdia: '୫୦% ପାଣି ଓ ୩୦% ସାର ସଞ୍ଚୟ',
        description: 'Direct root-zone fertigation delivers nutrients straight to crop root zones, saving labor, electricity, and weeding costs.',
        descriptionHindi: 'सीधे पौधों की जड़ों में पानी और घुलनशील खाद देने से बिजली, मजदूरी और खाद में भारी बचत होती है।',
        amountOrMetric: '50% Water Saved',
      },
      {
        title: '25% - 35% Higher Crop Yields',
        titleHindi: '25% से 35% अधिक फसल उत्पादन',
        titleOdia: '୩୫% ଅଧିକ ଅମଳ',
        description: 'Eliminates water stress, preventing soil compaction and flower/fruit drop during sensitive growth stages.',
        descriptionHindi: 'फसल में फूल और फल आने के समय नमी का संतुलित स्तर बनाए रखकर अधिकतम पैदावार सुनिश्चित करता है।',
        amountOrMetric: '+30% Yield Boost',
      },
    ],
    eligibility: {
      summary: 'All landholding farmers cultivating horticultural or field crops with an assured irrigation water source.',
      summaryHindi: 'वे सभी भूमिधारक किसान जिनके पास बागवानी या खाद्यान्न फसलों की खेती हेतु सिंचाई का सुनिश्चित स्रोत है।',
      summaryOdia: 'ସମସ୍ତ କୃଷକ ଯାହାଙ୍କ ପାଖରେ ଜଳସେଚନ ସୁବିଧା ଅଛି।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'tenant', 'all'],
      keyInclusions: [
        'Farmers with minimum 0.2 hectare up to maximum 5 hectares eligible for subsidy',
        'Cooperative societies, SHGs, and Farmer Producer Organizations (FPOs)',
        'Tenant farmers with long-term registered lease agreements (minimum 7-10 years)',
      ],
      keyInclusionsHindi: [
        'न्यूनतम 0.2 हेक्टेयर से अधिकतम 5 हेक्टेयर तक भूमि वाले किसान',
        'सहकारी समितियां, एफपीओ और किसान समूह',
        'दीर्घकालिक पंजीकृत पट्टा धारक किसान',
      ],
      keyExclusions: [
        'Farmers who already availed micro-irrigation subsidy on the same land parcel in the last 7 years',
        'Farms without any functional water source (well, tubewell, canal outlet)',
      ],
      keyExclusionsHindi: [
        'जिन्होंने पिछले 7 वर्षों में उसी भूमि पर ड्रिप/स्प्रिंकलर की सब्सिडी ली हो',
        'जिनके पास कोई भी पानी का स्रोत उपलब्ध न हो',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        nameOdia: 'ଆଧାର କାର୍ଡ',
        description: 'Identification of farmer.',
        isMandatory: true,
      },
      {
        id: 'doc-land',
        name: 'Khasra-Khatauni & Land Map (Naksha)',
        nameHindi: 'खसरा-खतौनी एवं खेत का नक्शा',
        nameOdia: 'ଜମି ପଟ୍ଟା ଓ ନକ୍ସା',
        description: 'To calculate pipe lateral layout and water flow hydraulics.',
        isMandatory: true,
      },
      {
        id: 'doc-water-cert',
        name: 'Water Source Certificate / Electricity Bill',
        nameHindi: 'जल स्रोत प्रमाण / बिजली बिल',
        nameOdia: 'ଜଳ ଉତ୍ସ ବିବରଣୀ',
        description: 'Proof of functional tubewell, open well, or farm pond with pump.',
        isMandatory: true,
      },
      {
        id: 'doc-bank',
        name: 'Bank Passbook Copy',
        nameHindi: 'बैंक पासबुक की प्रति',
        nameOdia: 'ବ୍ୟାଙ୍କ ପାସବୁକ',
        description: 'For direct DBT subsidy credit.',
        isMandatory: true,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Apply on State Micro-Irrigation (MIP) Portal',
        titleHindi: 'राज्य सूक्ष्म सिंचाई पोर्टल पर ऑनलाइन आवेदन करें',
        description: 'Submit an application through your state horticulture/agriculture portal (e.g. MP Udyaniki, Odisha Horticulture, or e-MIP).',
        descriptionHindi: 'राज्य के उद्यानिकी/सूक्ष्म सिंचाई पोर्टल पर ऑनलाइन आवेदन पत्र भरें।',
        mode: 'online',
        linkOrLocation: 'https://pmksy.gov.in',
      },
      {
        stepNumber: 2,
        title: 'Select Micro-Irrigation Company & Field Survey',
        titleHindi: 'अधिकृत ड्रिप कंपनी का चयन एवं खेत सर्वेक्षण',
        description: 'Select an authorized BIS-certified micro-irrigation manufacturer. Their engineers visit your field to survey acreage and design pipe layout.',
        descriptionHindi: 'अधिकृत कंपनी चुनें। कंपनी के इंजीनियर खेत पर आकर पाइपलाइन और ड्रिप लेआउट का नक्शा बनाएंगे।',
        mode: 'both',
      },
      {
        stepNumber: 3,
        title: 'Administrative Approval & Farmer Share Deposit',
        titleHindi: 'प्रशासकीय स्वीकृति एवं किसान अंशदान जमा',
        description: 'Horticulture Department issues work order. Farmer deposits beneficiary share (45% to 55%) with the company or department escrow.',
        descriptionHindi: 'विभाग द्वारा स्वीकृति आदेश जारी होने पर शेष किसान अंशदान जमा किया जाता है।',
        mode: 'both',
      },
      {
        stepNumber: 4,
        title: 'Installation, Pressure Test & Subsidy Release',
        titleHindi: 'सिस्टम स्थापना, प्रेशर टेस्ट व सब्सिडी भुगतान',
        description: 'The company installs the system with filters, mainline, and drippers. Department conducts physical GPS verification and releases subsidy via DBT.',
        descriptionHindi: 'खेत पर ड्रिप/स्प्रिंकलर लगने के बाद अधिकारी निरीक्षण कर सब्सिडी सीधे ट्रांसफर कर देते हैं।',
        mode: 'both',
      },
    ],
    officialSource: {
      portalName: 'PMKSY - Per Drop More Crop Official Portal',
      url: 'https://pmksy.gov.in',
      helplinePhone: '011-23382537',
      tollFree: '1800-180-1551',
      ministryDepartment: 'Horticulture & Micro-Irrigation Division, MoA&FW',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-01',
    nextDisbursementCycle: '2026 Micro Irrigation Work Orders Open',
  },
  {
    id: 'scheme-shc',
    shortCode: 'Soil Health Card',
    name: 'Soil Health Card Scheme (SHC)',
    nameHindi: 'मृदा स्वास्थ्य कार्ड योजना',
    nameOdia: 'ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ଯୋଜନା',
    subtitle: 'Free comprehensive 12-parameter soil testing & customized crop nutrient advisory every 2 years',
    subtitleHindi: 'हर 2 साल में 12 मापदंडों पर निःशुल्क मिट्टी परीक्षण एवं फसल अनुसार संतुलित खाद परामर्श',
    subtitleOdia: 'ପ୍ରତି ୨ ବର୍ଷରେ ମାଗଣାରେ ମାଟି ପରୀକ୍ଷା ଓ ଉପଯୁକ୍ତ ସାର ପ୍ରୟୋଗ ପରାମର୍ଶ',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    ministryOdia: 'କୃଷି ଓ କୃଷକ କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    category: 'soil_water',
    level: 'central',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Uttar Pradesh', 'Maharashtra', 'Punjab', 'Haryana', 'Bihar'],
    status: 'active',
    isPopular: false,
    isFeatured: false,
    badgeLabel: '100% Free Soil Test',
    description:
      'The Soil Health Card Scheme provides every farmer with a report card on the nutrient status of their agricultural soil across 12 parameters: Macro-nutrients (N, P, K), Secondary-nutrient (S), Micronutrients (Zn, Fe, Cu, Mn, Bo), and Physical parameters (pH, EC, Organic Carbon). It gives exact dosage recommendations for fertilizers to reduce urea overuse and save money.',
    descriptionHindi:
      'मृदा स्वास्थ्य कार्ड योजना किसानों को उनकी मिट्टी में मौजूद 12 पोषक तत्वों (नाइट्रोजन, फास्फोरस, पोटाश, सल्फर, जिंक, आयरन, कॉपर, मैंगनीज, बोरॉन, पीएच, ईसी और जैविक कार्बन) की सटीक जांच रिपोर्ट देती है। इससे यूरिया और डीएपी की फिजूलखर्ची रुकती है और मिट्टी की उपजाऊ क्षमता बढ़ती है।',
    descriptionOdia:
      'ଏହି ଯୋଜନା ମାଧ୍ୟମରେ ଚାଷୀ ନିଜ ବିଲର ମାଟି ପରୀକ୍ଷା କରାଇ ମାଗଣା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ପାଇପାରିବେ। ଏହା ଜମିରେ କେଉଁ ସାର କେତେ ପରିମାଣରେ ଦେବାକୁ ହେବ ତାହାର ସଠିକ ପରାମର୍ଶ ଦିଏ।',
    benefits: [
      {
        title: '100% Free 12-Parameter Lab Testing',
        titleHindi: '12 पोषक तत्वों की 100% निःशुल्क जांच',
        titleOdia: '୧୨ଟି ମାନଦଣ୍ଡରେ ମାଗଣା ପରୀକ୍ଷା',
        description: 'Comprehensive analysis of N, P, K, Sulphur, Zinc, Boron, Iron, Organic Carbon, pH, and Electrical Conductivity.',
        descriptionHindi: 'नाइट्रोजन, फास्फोरस, पोटाश, सल्फर, जिंक, बोरॉन, लोहा, पीएच और जैविक कार्बन की पूरी जांच।',
        amountOrMetric: '12 Parameters Tested',
        isKeyHighlight: true,
      },
      {
        title: 'Save ₹2,000 - ₹3,500/Acre on Chemical Fertilizers',
        titleHindi: 'रासायनिक खादों पर ₹2,000 से ₹3,500/एकड़ की बचत',
        titleOdia: 'ରାସାୟନିକ ସାର ଖର୍ଚ୍ଚ କମାଏ',
        description: 'Stops wasteful excess urea/DAP application, correcting micro-nutrient deficiencies that stunt crop growth.',
        descriptionHindi: 'अत्यधिक यूरिया के नुकसान से बचाता है और केवल जरूरी पोषक तत्व देने की सलाह देकर लागत घटाता है।',
        amountOrMetric: 'Save ₹3,000/Acre',
        isKeyHighlight: true,
      },
      {
        title: 'Customized Crop-Specific Dosage Guidance',
        titleHindi: 'फसल-वार खाद की संतुलित मात्रा की तालिका',
        titleOdia: 'ଫସଲ ଅନୁସାରେ ସାର ପରାମର୍ଶ',
        description: 'Provides precise fertilizer charts for Soybean, Wheat, Paddy, Cotton, Mustard, and Vegetables based on target yields.',
        descriptionHindi: 'आपकी चुनी हुई फसल (सोयाबीन, गेहूं, धान आदि) के लिए सटीक खाद व जैविक खाद की मात्रा बताता है।',
        amountOrMetric: 'Personalized Dosage',
      },
    ],
    eligibility: {
      summary: 'All farming landowners and operational cultivators across India.',
      summaryHindi: 'देश के सभी भूमिधारक किसान एवं सक्रिय काश्तकार।',
      summaryOdia: 'ସମସ୍ତ ଚାଷୀ ଓ ଜମିମାଲିକ।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'tenant', 'all'],
      keyInclusions: [
        'All agricultural land parcels sampled in grid pattern (2.5 ha irrigated / 10 ha rainfed)',
        'Individual farmers requesting personalized soil sample collection via KVK / Block office',
      ],
      keyInclusionsHindi: [
        'सभी कृषि योग्य भूमि वाले किसान',
        'कृषि विज्ञान केंद्र (KVK) या ग्राम सेवक के माध्यम से व्यक्तिगत नमूना देने वाले किसान',
      ],
      keyExclusions: [
        'Non-agricultural or contaminated industrial land',
      ],
      keyExclusionsHindi: [
        'गैर-कृषि औद्योगिक भूमि',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        nameOdia: 'ଆଧାର କାର୍ଡ',
        description: 'For registering the soil test report to farmer profile.',
        isMandatory: true,
      },
      {
        id: 'doc-khasra',
        name: 'Khasra Number / Field Location Details',
        nameHindi: 'खसरा नंबर / खेत का स्थान विवरण',
        nameOdia: 'ଖସରା ନମ୍ବର',
        description: 'Identifies the precise field plot from which sample is taken.',
        isMandatory: true,
      },
      {
        id: 'doc-sample',
        name: '500g Soil Sample (V-Shape Cut 15cm Depth)',
        nameHindi: '500 ग्राम मिट्टी का नमूना (15 सेमी गहराई से)',
        nameOdia: 'ମାଟି ନମୁନା',
        description: 'Clean composite soil sample collected from 8-10 spots across the plot.',
        isMandatory: true,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Collect Composite Soil Sample from Field',
        titleHindi: 'खेत से सही तरीके से मिट्टी का नमूना लें',
        description: 'Scrape upper debris, dig V-shaped 15cm pits in 8 spots, collect 1 inch slice, mix thoroughly, dry in shade, and pack 500g in clean bag.',
        descriptionHindi: 'खेत के 8 स्थानों से 15 सेमी गहरा V-आकार का गड्ढा खोदकर आधा किलो साफ मिट्टी का नमूना तैयार करें।',
        mode: 'offline',
      },
      {
        stepNumber: 2,
        title: 'Submit at Village KVK / Agriculture Extension Office',
        titleHindi: 'नजदीकी केवीके या कृषि कार्यालय में जमा करें',
        description: 'Hand over sample along with Khasra number and Aadhaar to your local Gram Sevak or nearest Krishi Vigyan Kendra (KVK).',
        descriptionHindi: 'नमूने को अपने खसरा नंबर और आधार के साथ ग्राम सेवक या कृषि विज्ञान केंद्र में जमा कराएं।',
        mode: 'offline',
      },
      {
        stepNumber: 3,
        title: 'Track Sample & Download Card Online',
        titleHindi: 'ऑनलाइन मृदा स्वास्थ्य कार्ड डाउनलोड करें',
        description: 'Visit soilhealth.dac.gov.in -> "Print Your Soil Health Card" -> Select State, District, and enter Farmer Name or Khasra Number.',
        descriptionHindi: 'soilhealth.dac.gov.in पर जाकर अपना राज्य, जिला और खसरा नंबर डालकर डिजिटल कार्ड डाउनलोड करें।',
        mode: 'online',
        linkOrLocation: 'https://soilhealth.dac.gov.in',
      },
    ],
    officialSource: {
      portalName: 'National Soil Health Card Portal',
      url: 'https://soilhealth.dac.gov.in',
      helplinePhone: '011-24305948',
      tollFree: '1800-180-1551',
      ministryDepartment: 'Integrated Nutrient Management (INM) Division, MoA&FW',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-08',
    nextDisbursementCycle: 'Soil Testing Cycle 2026-27 Active',
  },
  {
    id: 'scheme-pm-kmy',
    shortCode: 'PM-KMY',
    name: 'Pradhan Mantri Kisan Maandhan Yojana',
    nameHindi: 'प्रधानमंत्री किसान मानधन योजना (किसान पेंशन योजना)',
    nameOdia: 'ପ୍ରଧାନମନ୍ତ୍ରୀ କିଷାନ ମାନଧନ ପେନସନ ଯୋଜନା',
    subtitle: 'Guaranteed old-age monthly pension of ₹3,000 to small and marginal farmers after age 60',
    subtitleHindi: '60 वर्ष की आयु के बाद छोटे एवं सीमांत किसानों को ₹3,000 प्रतिमाह की सुनिश्चित वृद्धावस्था पेंशन',
    subtitleOdia: '୬୦ ବର୍ଷ ବୟସ ପରେ କ୍ଷୁଦ୍ର ଓ ନାମମାତ୍ର ଚାଷୀଙ୍କୁ ପ୍ରତି ମାସରେ ₹୩,୦୦୦ ସୁନିଶ୍ଚିତ ପେନସନ',
    ministry: 'Ministry of Agriculture & Farmers Welfare & Life Insurance Corporation of India (LIC)',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय एवं भारतीय जीवन बीमा निगम (LIC)',
    ministryOdia: 'କୃଷି ମନ୍ତ୍ରଣାଳୟ ଓ ଭାରତୀୟ ଜୀବନ ବୀମା ନିଗମ (LIC)',
    category: 'pension',
    level: 'central',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Maharashtra', 'West Bengal'],
    status: 'active',
    isPopular: false,
    isFeatured: false,
    badgeLabel: '₹3,000 / Month Pension',
    description:
      'PM-KMY is a voluntary and contributory pension scheme for small and marginal farmers (entry age 18 to 40 years). Beneficiaries contribute a modest monthly amount of ₹55 to ₹200 (matched 1:1 with an equal 50% contribution by the Central Government). Upon reaching age 60, the farmer receives an assured lifelong monthly pension of ₹3,000.',
    descriptionHindi:
      'पीएम-केएमवाई 18 से 40 वर्ष के छोटे और सीमांत किसानों के लिए एक स्वैच्छिक पेंशन योजना है। किसान को उम्र के अनुसार ₹55 से ₹200 प्रतिमाह जमा करना होता है, उतनी ही 50% राशि केंद्र सरकार मिलाती है। 60 वर्ष की आयु पूरी होने पर किसान को आजीवन ₹3,000 मासिक पेंशन मिलती है।',
    descriptionOdia:
      'ଏହି ଯୋଜନାରେ ୧୮ ରୁ ୪୦ ବର୍ଷ ବୟସର ଚାଷୀମାନେ ମାସିକ ₹୫୫ ରୁ ₹୨୦୦ ଜମା କରି ୬୦ ବର୍ଷ ବୟସ ପରେ ପ୍ରତି ମାସରେ ₹୩,୦୦୦ ପେନସନ ପାଇପାରିବେ।',
    benefits: [
      {
        title: 'Lifelong Assured Pension of ₹3,000 / Month',
        titleHindi: 'आजीवन ₹3,000 प्रतिमाह सुनिश्चित पेंशन',
        titleOdia: 'ଆଜୀବନ ₹୩,୦୦୦ ମାସିକ ପେନସନ',
        description: 'Direct credit into pensioner savings bank account every month after completing 60 years.',
        descriptionHindi: '60 वर्ष की आयु पूर्ण होने पर हर महीने सीधे बैंक खाते में ₹3,000 की पेंशन।',
        amountOrMetric: '₹36,000 / Year',
        isKeyHighlight: true,
      },
      {
        title: '50% Matching Contribution by Central Government',
        titleHindi: '50% बराबर अंशदान केंद्र सरकार द्वारा',
        titleOdia: '୫୦% ଅଂଶଦାନ କେନ୍ଦ୍ର ସରକାରଙ୍କ ଦ୍ୱାରା',
        description: 'Equal matching deposit put in the pension fund by Govt of India (e.g. if farmer pays ₹100, Govt pays ₹100).',
        descriptionHindi: 'जितना अंशदान किसान देता है, उतनी ही 50% राशि सरकार द्वारा पेंशन खाते में जमा की जाती है।',
        amountOrMetric: '1:1 Govt Match',
        isKeyHighlight: true,
      },
      {
        title: 'Auto-Debit Option from PM-KISAN Installments',
        titleHindi: 'पीएम-किसान की किस्तों से सीधे कटवाने का विकल्प',
        titleOdia: 'ପିଏମ-କିଷାନରୁ ସିଧାସଳଖ କଟିବା ସୁବିଧା',
        description: 'Farmers receiving PM-KISAN can opt to have their monthly contribution directly deducted with zero out-of-pocket hassle.',
        descriptionHindi: 'पीएम-किसान की मिलने वाली ₹2000 की किस्तों में से ही मासिक अंशदान कटवाने की आसान सुविधा।',
        amountOrMetric: 'Hassle-Free Auto-Debit',
      },
      {
        title: 'Family Pension for Surviving Spouse (50%)',
        titleHindi: 'पति/पत्नी हेतु 50% पारिवारिक पेंशन',
        titleOdia: 'ସ୍ୱାମୀ/ସ୍ତ୍ରୀ ପାଇଁ ୫୦% ପେନସନ',
        description: 'In the event of pensioner death, the surviving spouse receives 50% family pension (₹1,500/month).',
        descriptionHindi: 'किसान की मृत्यु होने पर पत्नी/पति को ₹1,500 प्रतिमाह (50%) पारिवारिक पेंशन का प्रावधान।',
        amountOrMetric: '₹1,500/Month Spouse Cover',
      },
    ],
    eligibility: {
      summary: 'Small and marginal farmers owning cultivable land up to 2 hectares (5 acres) between the entry age of 18 to 40 years.',
      summaryHindi: 'वे छोटे और सीमांत किसान जिनके पास 2 हेक्टेयर (5 एकड़) तक कृषि योग्य भूमि है और जिनकी आयु 18 से 40 वर्ष के बीच है।',
      summaryOdia: '୧୮ ରୁ ୪୦ ବର୍ଷ ବୟସର ଚାଷୀ ଯାହାଙ୍କ ପାଖରେ ୫ ଏକର ପର୍ଯ୍ୟନ୍ତ ଜମି ଅଛି।',
      landHoldingSize: 'small_marginal',
      farmerType: ['owner', 'all'],
      keyInclusions: [
        'Age between 18 and 40 years on date of enrollment',
        'Landholding up to 2.0 hectares (5.0 acres) in official land revenue records',
        'Savings bank account linked with Aadhaar',
      ],
      keyInclusionsHindi: [
        'पंजीकरण की तिथि पर 18 से 40 वर्ष की आयु',
        'सरकारी भू-अभिलेखों में 2 हेक्टेयर तक की कुल कृषि भूमि',
        'आधार से लिंक बैंक बचत खाता',
      ],
      keyExclusions: [
        'Farmers covered under other statutory social security schemes (NPS, ESIC, EPFO, PM-SYM)',
        'Institutional landholders and income tax payers',
      ],
      keyExclusionsHindi: [
        'ईपीएफओ, ईएसआईसी, एनपीएस या अन्य सामाजिक सुरक्षा पेंशन से आच्छादित व्यक्ति',
        'आयकर दाता एवं संस्थागत भूमिधारक',
      ],
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        nameOdia: 'ଆଧାର କାର୍ଡ',
        description: 'Mandatory identification proof.',
        isMandatory: true,
      },
      {
        id: 'doc-land',
        name: 'Khasra / Land Holding Record (RoR)',
        nameHindi: 'खसरा / भू-स्वामित्व प्रमाण पत्र',
        nameOdia: 'ଜମି ପଟ୍ଟା',
        description: 'Demonstrates cultivable land holding under 2 hectares.',
        isMandatory: true,
      },
      {
        id: 'doc-bank',
        name: 'Bank Passbook & Auto-Debit Mandate',
        nameHindi: 'बैंक पासबुक एवं ऑटो-डेबिट सहमति',
        nameOdia: 'ବ୍ୟାଙ୍କ ପାସବୁକ',
        description: 'For monthly auto-debit of subscription fee.',
        isMandatory: true,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Visit Nearest Common Service Center (CSC)',
        titleHindi: 'निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं',
        description: 'Visit your local Village Level Entrepreneur (VLE) at the CSC with Aadhaar, Bank Passbook, and Khasra copy.',
        descriptionHindi: 'आधार कार्ड, बैंक पासबुक और खसरा नकल लेकर नजदीकी सीएससी केंद्र पर जाएं।',
        mode: 'offline',
        linkOrLocation: 'https://maandhan.in',
      },
      {
        stepNumber: 2,
        title: 'Online Biometric Registration on Maandhan Portal',
        titleHindi: 'मानधन पोर्टल पर बायोमेट्रिक प्रमाणीकरण',
        description: 'VLE registers your details on maandhan.in and verifies Aadhaar through biometric fingerprint scanner.',
        descriptionHindi: 'सीएससी संचालक maandhan.in पोर्टल पर आपका विवरण भरकर फिंगरप्रिंट से सत्यापन करेगा।',
        mode: 'both',
      },
      {
        stepNumber: 3,
        title: 'Pay First Monthly Contribution in Cash at CSC',
        titleHindi: 'प्रथम माह का अंशदान सीएससी पर नकद जमा करें',
        description: 'Pay the initial monthly fee in cash (e.g. ₹100 for age 29). Subsequent monthly payments are automatically debited from your bank account.',
        descriptionHindi: 'पहली किश्त नकद जमा करें, आगे की किस्तों के लिए बैंक ऑटो-डेबिट मैंडेट सक्रिय हो जाएगा।',
        mode: 'both',
      },
      {
        stepNumber: 4,
        title: 'Receive Kisan Pension Card with Unique KMY-ID',
        titleHindi: 'विशिष्ट KMY नंबर वाला किसान पेंशन कार्ड प्राप्त करें',
        description: 'The system instantly generates your laminated Kisan Pension Card with your unique 12-digit pension account number.',
        descriptionHindi: 'आपको तुरंत अपना डिजिटल किसान पेंशन कार्ड प्राप्त हो जाएगा जिस पर आपका पेंशन खाता नंबर दर्ज होगा।',
        mode: 'both',
      },
    ],
    officialSource: {
      portalName: 'National Maandhan Pension Portal (LIC & MoA&FW)',
      url: 'https://maandhan.in',
      helplinePhone: '1800-267-6888',
      tollFree: '14434',
      ministryDepartment: 'Joint Administration: MoA&FW and Life Insurance Corporation of India',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-07-28',
    nextDisbursementCycle: 'Continuous Lifelong Pension Enrollments',
  },
  {
    id: 'scheme-aif',
    shortCode: 'AIF',
    name: 'Agriculture Infrastructure Fund',
    nameHindi: 'कृषि अवसंरचना कोष (एआईएफ योजना)',
    nameOdia: 'କୃଷି ଭିତ୍ତିଭୂମି ପାଣ୍ଠି ଯୋଜନା',
    subtitle: '3% interest subvention on long-term loans up to ₹2 Crores for Warehouses, Cold Storage & Processing',
    subtitleHindi: 'गोदाम, कोल्ड स्टोरेज, ग्रेडिंग-पैकिंग व प्राथमिक प्रसंस्करण हेतु ₹2 करोड़ तक के ऋण पर 3% ब्याज छूट',
    subtitleOdia: 'ଗୋଦାମ, କୋଲ୍ଡ ଷ୍ଟୋରେଜ ଏବଂ ପ୍ରକ୍ରିୟାକରଣ ପାଇଁ ୩% ସୁଧ ଛାଡ଼ ସହ ₹୨ କୋଟି ପର୍ଯ୍ୟନ୍ତ ଋଣ',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    ministryOdia: 'କୃଷି ଓ କୃଷକ କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    category: 'infrastructure',
    level: 'central',
    applicableStates: ['All India', 'Madhya Pradesh', 'Odisha', 'Maharashtra', 'Gujarat', 'Uttar Pradesh', 'Karnataka', 'Telangana'],
    status: 'active',
    isPopular: false,
    isFeatured: false,
    badgeLabel: '3% Interest Subvention up to ₹2 Cr',
    description:
      'AIF is a medium-to-long-term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets. It provides 3% annual interest subvention for loans up to ₹2 Crores for up to 7 years along with Credit Guarantee coverage under CGTMSE.',
    descriptionHindi:
      'एआईएफ फसल कटाई उपरांत भंडारण और प्रसंस्करण संरचना (जैसे गोदाम, साइलो, कोल्ड स्टोरेज, क्लीनिंग-ग्रेडिंग यूनिट, सौर कृषि उपकरण) लगाने हेतु ₹2 करोड़ तक के बैंक ऋण पर 7 वर्षों तक 3% की ब्याज छूट प्रदान करता है। साथ ही सरकार द्वारा सीजीटीएमएसई गारंटी भी दी जाती है।',
    descriptionOdia:
      'ଚାଷୀ, ଏଫପିଓ ଏବଂ ଉଦ୍ୟୋଗୀମାନଙ୍କୁ ଫସଲ ସାଇତିବା ପାଇଁ ଗୋଦାମ, ଶୀତଳ ଭଣ୍ଡାର ତିଆରି କରିବା ପାଇଁ ୩% କମ ସୁଧରେ ବ୍ୟାଙ୍କ ଋଣ ପ୍ରଦାନ କରେ।',
    benefits: [
      {
        title: '3% Annual Interest Subvention up to ₹2 Crore',
        titleHindi: '₹2 करोड़ तक के ऋण पर 3% वार्षिक ब्याज छूट',
        titleOdia: '୩% ବାର୍ଷିକ ସୁଧ ଛାଡ଼',
        description: 'Available for up to 7 years, lowering effective commercial loan interest rates significantly.',
        descriptionHindi: '7 वर्षों तक 3% की ब्याज छूट, जिससे बैंक ब्याज दर घटकर काफी सस्ती हो जाती है।',
        amountOrMetric: '3% Subvention',
        isKeyHighlight: true,
      },
      {
        title: 'CGTMSE Credit Guarantee Coverage by Govt',
        titleHindi: 'सरकार द्वारा सीजीटीएमएसई क्रेडिट गारंटी',
        titleOdia: 'ବିନା ବନ୍ଧକରେ କ୍ରେଡିଟ ଗ୍ୟାରେଣ୍ଟି',
        description: 'Government pays credit guarantee fee for loans up to ₹2 Crore, reducing collateral pressure on FPOs and farmers.',
        descriptionHindi: '₹2 करोड़ तक के ऋण पर बैंक को सरकारी गारंटी कवर मिलता है, जिससे जमानत की बाधा दूर होती है।',
        amountOrMetric: 'Govt Credit Guarantee',
        isKeyHighlight: true,
      },
      {
        title: 'Eligible for Post-Harvest Assets',
        titleHindi: 'विविध भंडारण व प्रसंस्करण परियोजनाओं हेतु',
        titleOdia: 'ବିଭିନ୍ନ ଗୋଦାମ ଓ କୃଷି ପ୍ରକଳ୍ପ',
        description: 'Warehouses, Silos, Pack-houses, Ripening Chambers, Assay labs, Sorting/Grading units, Cold Chains, and Bio-stimulant plants.',
        descriptionHindi: 'गोदाम, कोल्ड स्टोरेज, पैक हाउस, ग्रेडिंग यूनिट, कस्टम हायरिंग और प्राथमिक प्रसंस्करण उपकरण।',
        amountOrMetric: 'Post-Harvest Hubs',
      },
    ],
    eligibility: {
      summary: 'Individual farmers, Agri-entrepreneurs, FPOs, PACS (Primary Agricultural Credit Societies), and SHGs.',
      summaryHindi: 'व्यक्तिगत किसान, कृषि उद्यमी, किसान उत्पादक संगठन (FPO), पैक्स (PACS) और स्वयं सहायता समूह।',
      summaryOdia: 'ଚାଷୀ, କୃଷି ଉଦ୍ୟୋଗୀ, ଏଫପିଓ, ଏବଂ ପ୍ୟାକ୍ସ (PACS)।',
      landHoldingSize: 'all',
      farmerType: ['owner', 'fpo', 'all'],
      keyInclusions: [
        'Farmers investing in on-farm storage, solar dryers, or sorting machinery',
        'FPOs setting up common aggregation centers and primary processing hubs',
        'PACS and Agri-startups establishing custom hiring or warehousing facilities',
      ],
      keyInclusionsHindi: [
        'खेत पर गोदाम, सोलर ड्रायर या ग्रेडिंग मशीन लगाने वाले किसान',
        'एफपीओ जो सामूहिक एकत्रीकरण और प्रसंस्करण केंद्र स्थापित कर रहे हैं',
        'पैक्स और कृषि स्टार्टअप',
      ],
      keyExclusions: [
        'Non-agricultural commercial real estate development',
      ],
      keyExclusionsHindi: [
        'गैर-कृषि व्यावसायिक रियल एस्टेट',
      ],
    },
    documents: [
      {
        id: 'doc-dpr',
        name: 'Detailed Project Report (DPR)',
        nameHindi: 'विस्तृत परियोजना रिपोर्ट (DPR)',
        nameOdia: 'ପ୍ରକଳ୍ପ ରିପୋର୍ଟ (DPR)',
        description: 'Project financial viability, machinery costs, and civil construction estimates.',
        isMandatory: true,
      },
      {
        id: 'doc-land',
        name: 'Land Ownership / Long Lease Deed',
        nameHindi: 'भूमि स्वामित्व या दीर्घकालिक लीज डीड',
        nameOdia: 'ଜମି ପଟ୍ଟା',
        description: 'Proof of land where infrastructure structure will be constructed.',
        isMandatory: true,
      },
      {
        id: 'doc-kyc',
        name: 'KYC Documents & Bank Statements',
        nameHindi: 'केवाईसी दस्तावेज एवं 1 वर्ष का बैंक स्टेटमेंट',
        nameOdia: 'କେୱାଇସି ଓ ବ୍ୟାଙ୍କ ଷ୍ଟେଟମେଣ୍ଟ',
        description: 'Aadhaar, PAN, and banking track record.',
        isMandatory: true,
      },
    ],
    howToApply: [
      {
        stepNumber: 1,
        title: 'Register on National AIF Portal (agriinfra.dac.gov.in)',
        titleHindi: 'राष्ट्रीय एआईएफ पोर्टल पर ऑनलाइन आवेदन करें',
        description: 'Create an account on the central AIF portal, select project category and desired commercial / rural lending bank.',
        descriptionHindi: 'agriinfra.dac.gov.in पर खाता बनाकर अपनी परियोजना श्रेणी व बैंक शाखा चुनें।',
        mode: 'online',
        linkOrLocation: 'https://agriinfra.dac.gov.in',
      },
      {
        stepNumber: 2,
        title: 'Upload Project Report & Quotations',
        titleHindi: 'परियोजना रिपोर्ट व कोटेशन अपलोड करें',
        description: 'Upload your DPR, civil estimates, and machinery quotations. Ministry PMU evaluates feasibility within 7-10 days.',
        descriptionHindi: 'अपनी डीपीआर और कोटेशन अपलोड करें। मंत्रालय द्वारा 7-10 दिनों में ऑनलाइन स्वीकृति दी जाती है।',
        mode: 'online',
      },
      {
        stepNumber: 3,
        title: 'Bank Loan Sanction & In-Principle Approval',
        titleHindi: 'बैंक द्वारा ऋण स्वीकृति',
        description: 'Selected lending bank sanctions the term loan and uploads approval on the portal.',
        descriptionHindi: 'चुना हुआ बैंक ऋण स्वीकृत कर पोर्टल पर मंजूरी दर्ज करता है।',
        mode: 'both',
      },
      {
        stepNumber: 4,
        title: 'Disbursement & Automatic Interest Subvention Credit',
        titleHindi: 'ऋण वितरण एवं 3% ब्याज छूट का सीधा समायोजन',
        description: '3% interest subvention is automatically credited directly to your loan account by the Govt every quarter.',
        descriptionHindi: 'सरकार द्वारा हर तिमाही 3% ब्याज छूट की राशि सीधे आपके ऋण खाते में क्रेडिट कर दी जाती है।',
        mode: 'both',
      },
    ],
    officialSource: {
      portalName: 'National Agriculture Infrastructure Fund Portal',
      url: 'https://agriinfra.dac.gov.in',
      helplinePhone: '011-23381012',
      tollFree: '1800-180-1551',
      ministryDepartment: 'Project Monitoring Unit (PMU), MoA&FW, Govt. of India',
      sourceVerificationStatus: 'verified_official',
    },
    lastUpdatedDate: '2026-08-02',
    nextDisbursementCycle: 'Active Nationwide Infrastructure Financing Window',
  },
];

export interface SchemeFilterOptions {
  category?: SchemeCategory;
  searchQuery?: string;
  state?: string;
  farmerType?: 'all' | 'owner' | 'tenant' | 'small_marginal';
}

export const schemesService = {
  // Get all schemes or filtered schemes
  getAllSchemes(filters?: SchemeFilterOptions): SchemeInfo[] {
    let result = [...SCHEMES_DATABASE];

    if (!filters) return result;

    if (filters.category && filters.category !== 'all') {
      result = result.filter((s) => s.category === filters.category);
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.nameHindi.toLowerCase().includes(q) ||
          s.nameOdia.toLowerCase().includes(q) ||
          s.shortCode.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.subtitle.toLowerCase().includes(q) ||
          s.benefits.some(
            (b) =>
              b.title.toLowerCase().includes(q) ||
              b.description.toLowerCase().includes(q) ||
              (b.amountOrMetric && b.amountOrMetric.toLowerCase().includes(q))
          )
      );
    }

    if (filters.state && filters.state !== 'All India') {
      result = result.filter(
        (s) =>
          !s.applicableStates ||
          s.applicableStates.includes('All India') ||
          s.applicableStates.includes(filters.state!)
      );
    }

    if (filters.farmerType && filters.farmerType !== 'all') {
      if (filters.farmerType === 'small_marginal') {
        result = result.filter(
          (s) =>
            s.eligibility.landHoldingSize === 'small_marginal' ||
            s.eligibility.landHoldingSize === 'all'
        );
      } else if (filters.farmerType === 'tenant') {
        result = result.filter(
          (s) =>
            s.eligibility.farmerType.includes('tenant') ||
            s.eligibility.farmerType.includes('sharecropper') ||
            s.eligibility.farmerType.includes('all')
        );
      }
    }

    return result;
  },

  // Get single scheme by ID
  getSchemeById(id: string): SchemeInfo | undefined {
    return SCHEMES_DATABASE.find((s) => s.id === id);
  },

  // Interactive instant eligibility evaluator based on farmer profile
  evaluateEligibility(
    scheme: SchemeInfo,
    farmerProfile: {
      landAcres: number;
      landOwnership: 'owner' | 'tenant' | 'sharecropper' | 'other';
      hasAadhaar: boolean;
      hasBankPassbook: boolean;
      hasKhasraRoR: boolean;
    }
  ): {
    status: 'eligible' | 'likely_eligible' | 'action_needed' | 'ineligible';
    matchScorePercent: number;
    reasons: string[];
    missingDocs: string[];
  } {
    const reasons: string[] = [];
    const missingDocs: string[] = [];
    let score = 100;

    // Check land holding ceiling for small/marginal schemes (<= 2 ha = ~5 acres)
    if (scheme.eligibility.landHoldingSize === 'small_marginal') {
      if (farmerProfile.landAcres > 5.0) {
        score -= 50;
        reasons.push(
          `Land size exceeds 5.0 Acres (2 Hectares) maximum limit for small/marginal farmer schemes.`
        );
      } else {
        reasons.push(`Land size within 5.0 Acres ceiling for small/marginal farmer eligibility.`);
      }
    }

    // Check ownership status
    const allowedTypes = scheme.eligibility.farmerType;
    if (
      !allowedTypes.includes('all') &&
      !allowedTypes.includes(farmerProfile.landOwnership as any)
    ) {
      score -= 35;
      reasons.push(
        `Scheme strictly targets land-owning cultivators, but farmer profile indicates ${farmerProfile.landOwnership}.`
      );
    } else {
      reasons.push(`Farmer category (${farmerProfile.landOwnership}) is permitted under scheme guidelines.`);
    }

    // Document checks
    if (!farmerProfile.hasAadhaar) {
      score -= 20;
      missingDocs.push('Aadhaar Card with mobile link');
    }
    if (!farmerProfile.hasBankPassbook) {
      score -= 20;
      missingDocs.push('Aadhaar-seeded Bank Passbook');
    }
    if (!farmerProfile.hasKhasraRoR && farmerProfile.landOwnership === 'owner') {
      score -= 20;
      missingDocs.push('Khasra-Khatauni / Land Record (RoR)');
    }

    let status: 'eligible' | 'likely_eligible' | 'action_needed' | 'ineligible' =
      'eligible';
    if (score >= 90 && missingDocs.length === 0) {
      status = 'eligible';
    } else if (score >= 70) {
      status = 'likely_eligible';
    } else if (score >= 40) {
      status = 'action_needed';
    } else {
      status = 'ineligible';
    }

    return {
      status,
      matchScorePercent: Math.max(0, Math.min(100, score)),
      reasons,
      missingDocs,
    };
  },

  // Quick categories
  getCategories(): { id: SchemeCategory; label: string; labelHindi: string; labelOdia: string; count: number }[] {
    const counts: Record<string, number> = {};
    SCHEMES_DATABASE.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });

    return [
      { id: 'all', label: 'All Schemes', labelHindi: 'सभी योजनाएं', labelOdia: 'ସମସ୍ତ ଯୋଜନା', count: SCHEMES_DATABASE.length },
      { id: 'income_support', label: 'Direct Income (DBT)', labelHindi: 'प्रत्यक्ष आय सहायता', labelOdia: 'ପ୍ରତ୍ୟକ୍ଷ ଆୟ ସହାୟତା', count: counts['income_support'] || 0 },
      { id: 'insurance', label: 'Crop Insurance', labelHindi: 'फसल बीमा', labelOdia: 'ଫସଲ ବୀମା', count: counts['insurance'] || 0 },
      { id: 'credit', label: 'Low-Interest Credit (KCC)', labelHindi: 'सस्ता कृषि ऋण', labelOdia: 'କୃଷି ଋଣ', count: counts['credit'] || 0 },
      { id: 'solar_energy', label: 'Solar Pumps & Energy', labelHindi: 'सोलर पंप व ऊर्जा', labelOdia: 'ସୌର ପମ୍ପ', count: counts['solar_energy'] || 0 },
      { id: 'machinery', label: 'Machinery Subsidy', labelHindi: 'कृषि यंत्र अनुदान', labelOdia: 'ଯନ୍ତ୍ରପାତି ରିହାତି', count: counts['machinery'] || 0 },
      { id: 'soil_water', label: 'Irrigation & Soil', labelHindi: 'सिंचाई एवं मिट्टी', labelOdia: 'ଜଳସେଚନ ଓ ମୃତ୍ତିକା', count: counts['soil_water'] || 0 },
      { id: 'pension', label: 'Farmer Pension', labelHindi: 'किसान पेंशन', labelOdia: 'କିଷାନ ପେନସନ', count: counts['pension'] || 0 },
      { id: 'infrastructure', label: 'Agri Infrastructure', labelHindi: 'कृषि अवसंरचना', labelOdia: 'ଭିତ୍ତିଭୂମି', count: counts['infrastructure'] || 0 },
    ];
  },
};
