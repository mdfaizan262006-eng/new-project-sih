import React from 'react';
import { AppSection, UserProfile } from '../../types';
import { Sprout, Menu, Bell, User, ShieldCheck, LogOut, LogIn } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../../i18n/LanguageContext';

interface HeaderProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
  onToggleSidebar: () => void;
  isSidebarOpen?: boolean;
  currentUser?: UserProfile | null;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  onToggleSidebar,
  currentUser,
  isAuthenticated = true,
  onLogout,
}) => {
  const { t, currentLanguageInfo } = useLanguage();

  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              id="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              aria-label={t('nav.menuTitle')}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-800 transition-colors">
                <Sprout className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-stone-900 text-lg leading-tight tracking-tight">
                    {t('app.name')}
                  </span>
                  <span className="text-[10px] font-semibold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200/50">
                    {currentLanguageInfo.nativeName}
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-medium leading-none hidden sm:inline">
                  {t('app.tagline')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Status and Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reusable Language Selector Dropdown in Header */}
            <LanguageSelector variant="dropdown" />

            {/* Active Node Badge */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('app.activeNode')}</span>
            </div>

            {/* Notifications Bell */}
            <button
              id="notification-bell-btn"
              onClick={() => onNavigate('risk')}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl relative transition-colors cursor-pointer"
              title={t('nav.risk')}
              aria-label={t('nav.risk')}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
            </button>

            {/* Profile or Login Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <button
                  id="header-profile-btn"
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    currentSection === 'profile'
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="hidden md:inline truncate max-w-[100px]">
                    {currentUser?.name || 'Ramesh Patel'}
                  </span>
                </button>

                {onLogout && (
                  <button
                    id="header-logout-btn"
                    onClick={onLogout}
                    title={t('nav.logout')}
                    className="p-2 text-stone-500 hover:text-rose-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                    aria-label={t('nav.logout')}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => onNavigate('auth')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('nav.login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
