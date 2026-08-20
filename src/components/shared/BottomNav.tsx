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
  KeyRound,
} from 'lucide-react';

interface BottomNavProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
  isAuthenticated?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentSection,
  onNavigate,
  isAuthenticated = true,
}) => {
  const { t } = useLanguage();

  const navItems: { id: AppSection; labelKey: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      labelKey: 'nav.dashboard.short',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'weather',
      labelKey: 'nav.weather.short',
      icon: <CloudSun className="w-5 h-5" />,
    },
    {
      id: 'advisory',
      labelKey: 'nav.advisory.short',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'market',
      labelKey: 'nav.market.short',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: 'risk',
      labelKey: 'nav.risk.short',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      id: 'schemes',
      labelKey: 'nav.schemes.short',
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      id: isAuthenticated ? 'profile' : 'auth',
      labelKey: isAuthenticated ? 'nav.profile.short' : 'nav.login',
      icon: isAuthenticated ? <UserCheck className="w-5 h-5" /> : <KeyRound className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 lg:hidden"
    >
      <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-tab-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-150 active:scale-90 cursor-pointer ${
                isActive
                  ? 'text-emerald-800 font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? 'bg-emerald-100 text-emerald-800' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[11px] tracking-tight leading-tight mt-0.5 font-semibold">
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
