import React from 'react';
import {
  SchemeInfo,
} from '../../types';
import {
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  FileText,
  Users,
  Award,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';

interface SchemeCardProps {
  scheme: SchemeInfo;
  onOpenDetails: (scheme: SchemeInfo) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  onOpenDetails,
}) => {
  const { language } = useLanguage();

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

  const eligibilitySummary =
    language === 'hi'
      ? scheme.eligibility.summaryHindi || scheme.eligibility.summary
      : language === 'or'
      ? scheme.eligibility.summaryOdia || scheme.eligibility.summary
      : scheme.eligibility.summary;

  const mandatoryDocsCount = scheme.documents.filter((d) => d.isMandatory).length;

  return (
    <div
      id={`scheme-card-${scheme.id}`}
      className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden hover:border-emerald-300 group"
    >
      {/* Top Card Header */}
      <div className="p-5 sm:p-6 pb-4">
        {/* Badges and Level */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              {scheme.shortCode}
            </span>
            {scheme.badgeLabel && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                {scheme.badgeLabel}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-stone-500 capitalize flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-stone-400" />
              {scheme.level === 'central' ? 'Central Scheme' : scheme.level === 'joint' ? 'Joint Central & State' : 'State Scheme'}
            </span>
            <ListenButton
              id={`listen-scheme-card-${scheme.id}`}
              text={{
                hi: `${scheme.nameHindi} (${scheme.shortCode}): ${scheme.subtitleHindi}। ${scheme.descriptionHindi}। मुख्य लाभ: ${scheme.benefits.slice(0, 2).map((b) => b.titleHindi).join(', ')}।`,
                or: `${scheme.nameOdia} (${scheme.shortCode}): ${scheme.subtitleOdia}। ${scheme.descriptionOdia}।`,
                en: `${scheme.name} (${scheme.shortCode}): ${scheme.subtitle}. ${scheme.description}. Key benefits include: ${scheme.benefits.slice(0, 2).map((b) => b.title).join(', ')}.`,
              }}
              variant="chip"
              size="xs"
            />
          </div>
        </div>

        {/* 1. Scheme Name */}
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug group-hover:text-emerald-950 transition-colors">
          {title}
        </h2>
        <p className="text-xs text-emerald-800 font-semibold mt-1 line-clamp-1">
          {subtitle}
        </p>

        <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
          <span className="truncate">{ministry}</span>
        </p>

        {/* 2. Description */}
        <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* 3. Key Benefits Highlights */}
        <div className="mt-4 pt-3.5 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 mb-2">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Key Scheme Benefits:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scheme.benefits.slice(0, 2).map((benefit, idx) => {
              const bTitle =
                language === 'hi'
                  ? benefit.titleHindi || benefit.title
                  : language === 'or'
                  ? benefit.titleOdia || benefit.title
                  : benefit.title;

              return (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    {benefit.amountOrMetric && (
                      <span className="block text-xs font-black text-emerald-900">
                        {benefit.amountOrMetric}
                      </span>
                    )}
                    <span className="text-xs text-stone-700 leading-tight">
                      {bTitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Basic Eligibility */}
        <div className="mt-3.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-800" />
            <span>Basic Eligibility:</span>
          </div>
          <p className="text-stone-700 leading-relaxed line-clamp-2">
            {eligibilitySummary}
          </p>
        </div>

        {/* 5. Documents & 6. How to Apply Teaser */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span>
              <strong>{mandatoryDocsCount}</strong> mandatory documents required
            </span>
          </div>
          <div className="flex items-center gap-1 font-medium text-emerald-800">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {scheme.howToApply.length}-step application roadmap
            </span>
          </div>
        </div>
      </div>

      {/* 7. Official Source & Footer Action Buttons */}
      <div className="p-4 sm:p-5 pt-3 bg-stone-50/90 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Official Source Link */}
        <a
          id={`link-official-source-${scheme.id}`}
          href={scheme.officialSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-800 transition-colors font-medium cursor-pointer"
          title={`Open official portal: ${scheme.officialSource.portalName}`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate max-w-[200px] sm:max-w-[240px]">
            {scheme.officialSource.portalName}
          </span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </a>

        {/* View Full Guide / Roadmap Button */}
        <button
          id={`btn-open-scheme-details-${scheme.id}`}
          onClick={() => onOpenDetails(scheme)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span>
            {language === 'hi'
              ? 'पूरा विवरण व दस्तावेज देखें'
              : language === 'or'
              ? 'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ'
              : 'Full Guide & Apply Steps'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
