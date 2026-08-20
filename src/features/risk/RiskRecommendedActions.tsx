import React from 'react';
import { AgriculturalRiskScore } from '../../types';
import { ShieldAlert, Sprout, DollarSign, Shield, ArrowUpRight, Clock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ListenButton } from '../../components/shared/ListenButton';

interface RiskRecommendedActionsProps {
  riskData: AgriculturalRiskScore;
}

export const RiskRecommendedActions: React.FC<RiskRecommendedActionsProps> = ({ riskData }) => {
  const { language, t } = useLanguage();
  const { recommendedActions } = riskData;

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'agricultural':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'financial':
        return <DollarSign className="w-5 h-5 text-amber-600" />;
      case 'insurance':
        return <Shield className="w-5 h-5 text-rose-600" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-stone-600" />;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'immediate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
            <Clock className="w-3 h-3" />
            Immediate (0–12h)
          </span>
        );
      case 'within_48h':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3" />
            Within 48 Hours
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300">
            Standard Practice
          </span>
        );
    }
  };

  const getAllActionsSpeechText = () => {
    return {
      hi: `अनुशंसित जोखिम निवारण कार्य: ${recommendedActions.map((a, i) => `${i + 1}. ${a.titleHindi}: ${a.actionHindi}`).join('। ')}`,
      or: `ସୁପାରିଶ କରାଯାଇଥିବା ପଦକ୍ଷେପ: ${recommendedActions.map((a, i) => `${i + 1}. ${a.titleOdia}: ${a.actionOdia}`).join('। ')}`,
      en: `Prescriptive Risk Mitigation Protocols: ${recommendedActions.map((a, i) => `${i + 1}. ${a.title}: ${a.action}`).join('. ')}`,
    };
  };

  return (
    <div id="risk-recommended-actions-card" className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800 border border-emerald-200">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {t('risk.actionsHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Prescriptive mitigation protocols based on your calculated {riskData.totalScore}/100 risk profile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ListenButton
            id="btn-listen-all-actions"
            text={getAllActionsSpeechText()}
            variant="chip"
            size="sm"
          />
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            {recommendedActions.length} Protocols Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedActions.map((action) => {
          const actionTitle =
            language === 'hi'
              ? action.titleHindi
              : language === 'or'
              ? action.titleOdia
              : action.title;

          const actionBody =
            language === 'hi'
              ? action.actionHindi
              : language === 'or'
              ? action.actionOdia
              : action.action;

          return (
            <div
              key={action.id}
              id={`action-item-${action.id}`}
              className="bg-stone-50/70 hover:bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-3xs">
                      {getActionIcon(action.type)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
                        {action.type === 'agricultural' && t('risk.actionAgri')}
                        {action.type === 'financial' && t('risk.actionFin')}
                        {action.type === 'insurance' && t('risk.actionIns')}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug mt-0.5">
                        {actionTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <ListenButton
                      id={`listen-action-item-${action.id}`}
                      text={{
                        hi: `${action.titleHindi}: ${action.actionHindi}। लाभ: ${action.benefit}`,
                        or: `${action.titleOdia}: ${action.actionOdia}`,
                        en: `${action.title}: ${action.action}. Benefit: ${action.benefit}`,
                      }}
                      variant="chip"
                      size="xs"
                    />
                    {getUrgencyBadge(action.urgency)}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                  {actionBody}
                </p>
              </div>

              {/* Economic / Agronomic Benefit Banner */}
              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="line-clamp-1">{action.benefit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
