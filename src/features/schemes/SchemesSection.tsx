import React, { useState, useMemo } from 'react';
import { AppSection, SchemeCategory, SchemeInfo } from '../../types';
import { schemesService } from '../../services/schemesService';
import { SchemesHeader } from './SchemesHeader';
import { SchemeCard } from './SchemeCard';
import { SchemeDetailModal } from './SchemeDetailModal';
import { SchemeEligibilityChecker } from './SchemeEligibilityChecker';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Search,
  RotateCcw,
  Sparkles,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Building2,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface SchemesSectionProps {
  onNavigate: (section: AppSection) => void;
}

export const SchemesSection: React.FC<SchemesSectionProps> = () => {
  const { language } = useLanguage();

  // Categories list
  const categories = useMemo(() => schemesService.getCategories(), []);

  // Filter states
  const [activeCategory, setActiveCategory] = useState<SchemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [showEligibilityTool, setShowEligibilityTool] = useState<boolean>(false);

  // Selected scheme for detail modal
  const [selectedScheme, setSelectedScheme] = useState<SchemeInfo | null>(null);

  // Filtered schemes list
  const filteredSchemes = useMemo(() => {
    return schemesService.getAllSchemes({
      category: activeCategory,
      searchQuery,
      state: selectedState,
    });
  }, [activeCategory, searchQuery, selectedState]);

  const schemesSpeechText = useMemo(() => {
    return {
      hi: `सरकारी कृषि कल्याण योजनाएं: प्रधानमंत्री किसान सम्मान निधि योजना के तहत प्रति वर्ष 6000 रुपये की प्रत्यक्ष आय सहायता 3 किस्तों में मिलती है। प्रधानमंत्री फसल बीमा योजना में केवल 1.5 से 2 प्रतिशत रियायती प्रीमियम पर व्यापक फसल बीमा उपलब्ध है। किसान क्रेडिट कार्ड पर मात्र 4 प्रतिशत वार्षिक ब्याज दर पर 3 लाख तक का सस्ता कृषि ऋण मिलता है। इसके अलावा सोलर पंप पर पीएम-कुसुम योजना के तहत 60 से 90 प्रतिशत तक का सरकारी अनुदान उपलब्ध है। सभी योजनाओं के लिए नजदीकी सीएससी केंद्र या आधिकारिक सरकारी पोर्टल पर आवेदन करें।`,
      or: `ସରକାରୀ କୃଷି ଯୋଜନା ବିବରଣୀ: ପିଏମ-କିଷାନ ଯୋଜନାରେ ବାର୍ଷିକ ୬୦୦୦ ଟଙ୍କା ସିଧାସଳଖ ଆର୍ଥିକ ସହାୟତା ମିଳେ। ଫସଲ ବୀମା ଯୋଜନାରେ ମାତ୍ର ୨ ପ୍ରତିଶତ ପ୍ରିମିୟମରେ କ୍ଷତିପୂରଣ ଏବଂ କେସିସି ରେ ମାତ୍ର ୪ ପ୍ରତିଶତ ସୁଧରେ କୃଷି ଋଣ ସୁବିଧା ଉପଲବ୍ଧ। ସମସ୍ତ ସରକାରୀ ପୋର୍ଟାଲରେ ଆବେଦନ କରନ୍ତୁ।`,
      en: `Government Agriculture Welfare Schemes Overview: Under PM-KISAN, farmers receive 6000 rupees per year in 3 equal direct benefit installments. PM Fasal Bima Yojana offers comprehensive crop loss protection at 1.5 to 2 percent subsidized premium. Kisan Credit Card provides low-interest working capital at an effective 4 percent rate up to 3 Lakh rupees, and PM-KUSUM offers up to 90 percent capital subsidy on solar irrigation pumps. Apply on official government portals or at your nearest Common Service Center.`,
    };
  }, []);

  return (
    <div id="section-schemes" className="min-h-screen bg-stone-50/50 pb-20">
      {/* Header, Search, Disclaimer Banner & Categories */}
      <SchemesHeader
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        speechText={schemesSpeechText}
        showEligibilityTool={showEligibilityTool}
        onToggleEligibilityTool={() => setShowEligibilityTool(!showEligibilityTool)}
      />

      {/* Main Schemes Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Interactive Eligibility Checker Scanner (if toggled) */}
        {showEligibilityTool && (
          <SchemeEligibilityChecker
            schemes={schemesService.getAllSchemes()}
            onSelectScheme={(scheme) => setSelectedScheme(scheme)}
            onClose={() => setShowEligibilityTool(false)}
          />
        )}

        {/* Results Header Count & Active Filter Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              {activeCategory === 'all'
                ? 'All Central & State Schemes'
                : categories.find((c) => c.id === activeCategory)?.label || 'Schemes'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-stone-200 text-stone-800">
              {filteredSchemes.length} Available
            </span>
          </div>

          {(searchQuery || activeCategory !== 'all' || selectedState !== 'All India') && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedState('All India');
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Schemes Cards Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onOpenDetails={(s) => setSelectedScheme(s)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-2xs my-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              No matching schemes found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
              No government welfare programs matched your search query "{searchQuery}" or selected category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedState('All India');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Bottom Help Desk & Common Service Center (CSC) Advisory Card */}
        <div className="mt-10 p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Need Help with Scheme Registration or Land Record Verification?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Visit your local <strong>Gram Panchayat</strong>, <strong>Krishi Vigyan Kendra (KVK)</strong>, or nearest <strong>Common Service Center (CSC)</strong> for biometric e-KYC, land mutation updates, and Aadhaar-NPCI bank seeding assistance.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
            <a
              href="tel:18001801551"
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>Kisan Call Center: 1800-180-1551</span>
            </a>
          </div>
        </div>
      </div>

      {/* Full Detailed Scheme Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  );
};
