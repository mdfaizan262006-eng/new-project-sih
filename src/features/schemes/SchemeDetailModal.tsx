import React, { useState } from 'react';
import {
  SchemeInfo,
} from '../../types';
import {
  X,
  ShieldCheck,
  ExternalLink,
  Award,
  Users,
  FileText,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Info,
  Building2,
  Calendar,
  Sparkles,
  Printer,
  HelpCircle,
  ChevronRight,
  Download,
  Share2,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';

interface SchemeDetailModalProps {
  scheme: SchemeInfo | null;
  onClose: () => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
}) => {
  const { language } = useLanguage();

  // State to track checked documents for farmer readiness
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'doc-aadhaar': true,
    'doc-bank': true,
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'how_to_apply'>('overview');

  if (!scheme) return null;

  const title =
    language === 'hi'
      ? scheme.nameHindi
      : language === 'or'
      ? scheme.nameOdia
      : scheme.name;

  const subtitle =
    language === 'hi'
      ? scheme.subtitleHindi
      : language === 'or'
      ? scheme.subtitleOdia
      : scheme.subtitle;

  const description =
    language === 'hi'
      ? scheme.descriptionHindi
      : language === 'or'
      ? scheme.descriptionOdia
      : scheme.description;

  const ministry =
    language === 'hi'
      ? scheme.ministryHindi
      : language === 'or'
      ? scheme.ministryOdia
      : scheme.ministry;

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalMandatoryDocs = scheme.documents.filter((d) => d.isMandatory).length;
  const checkedMandatoryDocs = scheme.documents.filter(
    (d) => d.isMandatory && checkedDocs[d.id]
  ).length;

  const readinessPercent = Math.round(
    (checkedMandatoryDocs / Math.max(1, totalMandatoryDocs)) * 100
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="scheme-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id={`scheme-modal-${scheme.id}`}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white relative shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-400 text-emerald-950">
                  {scheme.shortCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                  {scheme.level === 'central'
                    ? 'Central Sector Scheme'
                    : 'Joint Central & State Program'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Govt Scheme
                </span>
              </div>

              {/* 1. Name */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">
                {subtitle}
              </p>
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                <span>{ministry}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <ListenButton
                id={`listen-scheme-modal-btn-${scheme.id}`}
                text={{
                  hi: `${scheme.nameHindi}: ${scheme.descriptionHindi}। मुख्य लाभ: ${scheme.benefits.map((b) => b.titleHindi).join('. ')}। पात्रता: ${scheme.eligibility.summaryHindi || scheme.eligibility.summary}।`,
                  or: `${scheme.nameOdia}: ${scheme.descriptionOdia}। ଲାଭ: ${scheme.benefits.map((b) => b.titleOdia || b.title).join('. ')}।`,
                  en: `${scheme.name}: ${scheme.description}. Key benefits include: ${scheme.benefits.map((b) => b.title).join('. ')}. Eligibility: ${scheme.eligibility.summary}.`,
                }}
                variant="outline"
                size="sm"
                label="Listen Guide"
              />
              <button
                id="btn-close-scheme-modal"
                onClick={onClose}
                className="p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer shrink-0"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-stone-800 pt-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: '1. Overview & Benefits', icon: Award },
              { id: 'eligibility', label: '2. Eligibility & Exclusions', icon: Users },
              { id: 'documents', label: '3. Required Documents', icon: FileText },
              { id: 'how_to_apply', label: '4. How to Apply', icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-stone-50/50">
          {/* TAB 1: OVERVIEW & BENEFITS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Official Source Disclaimer Notice */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <p className="font-bold text-amber-950 mb-0.5">
                    Official Source & Application Advisory
                  </p>
                  <p className="text-stone-700">
                    This detailed overview is compiled from official notifications released by{' '}
                    <strong>{scheme.ministry}</strong>. All grant sanctions, biometrics, and DBT disbursements are processed solely on the official government portal{' '}
                    <a
                      href={scheme.officialSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 underline font-semibold hover:text-emerald-950"
                    >
                      {scheme.officialSource.portalName}
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* 2. Scheme Description */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>Scheme Purpose & Scope</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* 3. Comprehensive Benefits Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-800" />
                    <span>Entitlements & Financial Benefits</span>
                  </h3>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Direct Benefit Transfer (DBT)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scheme.benefits.map((benefit, idx) => {
                    const bTitle =
                      language === 'hi'
                        ? benefit.titleHindi || benefit.title
                        : language === 'or'
                        ? benefit.titleOdia || benefit.title
                        : benefit.title;

                    const bDesc =
                      language === 'hi'
                        ? benefit.descriptionHindi || benefit.description
                        : language === 'or'
                        ? benefit.descriptionOdia || benefit.description
                        : benefit.description;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                          benefit.isKeyHighlight
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-stone-50 border-stone-200/80'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs sm:text-sm text-stone-900">
                              {bTitle}
                            </span>
                            {benefit.amountOrMetric && (
                              <span className="px-2 py-0.5 rounded-md text-xs font-black bg-emerald-700 text-white">
                                {benefit.amountOrMetric}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                            {bDesc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Official Portal Link Box */}
              <div className="bg-emerald-950 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">
                    Official Government Channel
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white block mt-0.5">
                    {scheme.officialSource.portalName}
                  </span>
                  <span className="text-xs text-stone-300 mt-1 block">
                    Toll-Free Helpline: <strong>{scheme.officialSource.tollFree || scheme.officialSource.helplinePhone}</strong>
                  </span>
                </div>
                <a
                  href={scheme.officialSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  <span>Visit Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY & EXCLUSIONS */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-800" />
                  <span>Target Farmer Profile & Land Holding Rules</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {language === 'hi'
                    ? scheme.eligibility.summaryHindi || scheme.eligibility.summary
                    : language === 'or'
                    ? scheme.eligibility.summaryOdia || scheme.eligibility.summary
                    : scheme.eligibility.summary}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-100 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-500 font-medium block">Land Holding Size:</span>
                    <span className="font-bold text-stone-900 capitalize block mt-0.5">
                      {scheme.eligibility.landHoldingSize === 'all'
                        ? 'All Landholding Brackets (Small, Marginal, Large)'
                        : scheme.eligibility.landHoldingSize === 'small_marginal'
                        ? 'Small & Marginal Farmers (Up to 2 Hectares / 5 Acres)'
                        : 'Specific Category'}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-500 font-medium block">Permitted Cultivator Type:</span>
                    <span className="font-bold text-stone-900 capitalize block mt-0.5">
                      {scheme.eligibility.farmerType.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Inclusions */}
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Who IS Eligible (Key Inclusions):</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {scheme.eligibility.keyInclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strict Statutory Exclusions */}
              <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200">
                <h4 className="text-xs sm:text-sm font-bold text-rose-950 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  <span>Who is NOT Eligible (Statutory Exclusions):</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-900">
                  {scheme.eligibility.keyExclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS & CHECKLIST */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Document Readiness Meter */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-800" />
                      <span>Interactive Document Readiness Checklist</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Check the documents you currently have to confirm readiness before visiting CSC or uploading online.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-emerald-900 block">
                      {readinessPercent}%
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {checkedMandatoryDocs} of {totalMandatoryDocs} Ready
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                    style={{ width: `${readinessPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                {scheme.documents.map((doc) => {
                  const isChecked = !!checkedDocs[doc.id];
                  const docName =
                    language === 'hi'
                      ? doc.nameHindi || doc.name
                      : language === 'or'
                      ? doc.nameOdia || doc.name
                      : doc.name;

                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDoc(doc.id)}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300 shadow-2xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 mt-1 rounded text-emerald-700 focus:ring-emerald-700 border-stone-300 shrink-0 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-xs sm:text-sm text-stone-900">
                            {docName}
                          </span>
                          {doc.isMandatory ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                              Mandatory
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-600">
                              Optional / If Applicable
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {doc.description}
                        </p>
                        {doc.issuingAuthority && (
                          <span className="inline-block text-[11px] text-stone-400 mt-1.5">
                            Issuing Authority: {doc.issuingAuthority}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Print / Save Checklist Button */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span>Print Document Checklist</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: HOW TO APPLY (STEP-BY-STEP ROADMAP) */}
          {activeTab === 'how_to_apply' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <span>Step-by-Step Application & Verification Process</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Follow these verified chronological stages to register, submit documents, and track DBT approval.
                </p>
              </div>

              {/* Steps Chronology */}
              <div className="space-y-4">
                {scheme.howToApply.map((step) => {
                  const stepTitle =
                    language === 'hi'
                      ? step.titleHindi || step.title
                      : language === 'or'
                      ? step.titleOdia || step.title
                      : step.title;

                  const stepDesc =
                    language === 'hi'
                      ? step.descriptionHindi || step.description
                      : language === 'or'
                      ? step.descriptionOdia || step.description
                      : step.description;

                  return (
                    <div
                      key={step.stepNumber}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 flex items-start gap-4 shadow-2xs relative"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                            {stepTitle}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 capitalize border border-stone-200">
                            {step.mode === 'both' ? 'Online / CSC' : step.mode === 'online' ? 'Online Portal' : 'Offline / Field Visit'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                          {stepDesc}
                        </p>
                        {step.linkOrLocation && (
                          <div className="mt-2.5">
                            <a
                              href={step.linkOrLocation}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold hover:underline"
                            >
                              <span>Open Application URL ({step.linkOrLocation})</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct Link to Official Portal */}
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-stone-900">
                    Official Portal: {scheme.officialSource.portalName}
                  </span>
                </div>
                <a
                  href={scheme.officialSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Apply on Official Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Fixed Footer with Helplines & Links */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              National Helpline:{' '}
              <strong className="text-stone-900">
                {scheme.officialSource.tollFree || scheme.officialSource.helplinePhone}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={scheme.officialSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Visit Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
