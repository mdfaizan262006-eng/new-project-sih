import React from 'react';
import { AppSection } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  LayoutDashboard,
  CloudSun,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Landmark,
  UserCheck,
  Compass,
  KeyRound,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavGroupItem {
  id: AppSection;
  labelKey: string;
  subLabelKey?: string;
  icon: React.ReactNode;
  tag?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();

  const mainNavItems: NavGroupItem[] = [
    {
      id: 'dashboard',
      labelKey: 'nav.dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'weather',
      labelKey: 'nav.weather',
      icon: <CloudSun className="w-4 h-4" />,
      tag: 'Live',
    },
    {
      id: 'advisory',
      labelKey: 'nav.advisory',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'market',
      labelKey: 'nav.market',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'risk',
      labelKey: 'nav.risk',
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: 'schemes',
      labelKey: 'nav.schemes',
      icon: <Landmark className="w-4 h-4" />,
    },
    {
      id: 'profile',
      labelKey: 'nav.profile',
      icon: <UserCheck className="w-4 h-4" />,
    },
  ];

  const setupNavItems: NavGroupItem[] = [
    {
      id: 'onboarding',
      labelKey: 'nav.onboarding',
      icon: <Compass className="w-4 h-4" />,
      tag: 'Flow',
    },
    {
      id: 'auth',
      labelKey: 'nav.auth',
      icon: <KeyRound className="w-4 h-4" />,
      tag: 'Access',
    },
  ];

  const renderNavList = (items: NavGroupItem[]) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = currentSection === item.id;
        const label = t(item.labelKey);
        return (
          <li key={item.id}>
            <button
              id={`nav-link-${item.id}`}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`${
                    isActive
                      ? 'text-white'
                      : 'text-stone-500 group-hover:text-emerald-700'
                  }`}
                >
                  {item.icon}
                </span>
                <div className="flex flex-col text-left truncate">
                  <span className="truncate font-semibold">{label}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.tag && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-emerald-800 text-emerald-100'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive
                      ? 'text-emerald-200'
                      : 'text-stone-400 group-hover:translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-stone-200 flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header Inside Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 lg:hidden">
          <div className="font-bold text-stone-900 text-sm">{t('nav.menuTitle')}</div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:bg-stone-100 cursor-pointer"
            aria-label={t('btn.dismiss')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Core Modules */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              {t('nav.coreAreas')}
            </div>
            {renderNavList(mainNavItems)}
          </div>

          {/* Access & User Journey */}
          <div className="pt-2 border-t border-stone-100">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              {t('nav.flowsSetup')}
            </div>
            {renderNavList(setupNavItems)}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/50">
          <div className="bg-white border border-stone-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-stone-900">{t('app.name')}</div>
            <div className="text-stone-500 text-[11px] mt-0.5">
              {t('app.footerSubtitle')}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
