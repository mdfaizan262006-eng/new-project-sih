import React, { useState } from 'react';
import { AppSection, UserProfile } from './types';
import { Header, Sidebar, BottomNav } from './components/shared';
import { authService, DEMO_USER } from './services/authService';
import { useLanguage } from './i18n/LanguageContext';
import {
  AuthSection,
  OnboardingSection,
  DashboardSection,
  WeatherSection,
  AdvisorySection,
  MarketSection,
  RiskSection,
  SchemesSection,
  ProfileSection,
} from './features';
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
} from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<AppSection>('auth');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => authService.getCurrentUser() || DEMO_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authService.isAuthenticated() || false);
  const { t } = useLanguage();

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentSection('dashboard');
  };

  const handleOnboardingComplete = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentSection('dashboard');
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setCurrentSection('auth');
  };

  const sectionsList: { id: AppSection; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', labelKey: 'nav.dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'weather', labelKey: 'nav.weather', icon: <CloudSun className="w-4 h-4" /> },
    { id: 'advisory', labelKey: 'nav.advisory', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'market', labelKey: 'nav.market', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'risk', labelKey: 'nav.risk', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'schemes', labelKey: 'nav.schemes', icon: <Landmark className="w-4 h-4" /> },
    { id: 'profile', labelKey: 'nav.profile', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'onboarding', labelKey: 'nav.onboarding', icon: <Compass className="w-4 h-4" /> },
    { id: 'auth', labelKey: 'nav.auth', icon: <KeyRound className="w-4 h-4" /> },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'auth':
        return (
          <AuthSection
            onNavigate={setCurrentSection}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'onboarding':
        return (
          <OnboardingSection
            onNavigate={setCurrentSection}
            currentUser={currentUser}
            onCompleteOnboarding={handleOnboardingComplete}
          />
        );
      case 'dashboard':
        return (
          <DashboardSection
            onNavigate={setCurrentSection}
            currentUser={currentUser}
          />
        );
      case 'weather':
        return (
          <WeatherSection
            onNavigate={setCurrentSection}
            currentUser={currentUser}
          />
        );
      case 'advisory':
        return (
          <AdvisorySection
            onNavigate={setCurrentSection}
            currentUser={currentUser}
          />
        );
      case 'market':
        return <MarketSection onNavigate={setCurrentSection} />;
      case 'risk':
        return <RiskSection onNavigate={setCurrentSection} />;
      case 'schemes':
        return <SchemesSection onNavigate={setCurrentSection} />;
      case 'profile':
        return <ProfileSection onNavigate={setCurrentSection} />;
      default:
        return (
          <DashboardSection
            onNavigate={setCurrentSection}
            currentUser={currentUser}
          />
        );
    }
  };

  return (
    <div
      id="krishi-drishti-app"
      className="min-h-screen bg-[#F8F6F0] flex flex-col font-sans text-stone-900 antialiased selection:bg-emerald-200"
    >
      {/* Top Application Header */}
      <Header
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Main Application Sidebar for Desktop / Drawer */}
        <Sidebar
          currentSection={currentSection}
          onNavigate={setCurrentSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Section Content Area */}
        <main className="flex-1 min-w-0 p-3.5 sm:p-6 lg:p-8 flex flex-col space-y-4 sm:space-y-6 pb-24 lg:pb-8">
          {/* Quick Section Switcher Bar */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-1.5 shadow-xs overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-max">
              <span className="text-[11px] font-bold uppercase text-stone-500 px-2 py-1 select-none">
                {t('app.title')}:
              </span>
              {sectionsList.map((sec) => {
                const isActive = currentSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    id={`quick-tab-${sec.id}`}
                    onClick={() => setCurrentSection(sec.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-emerald-700'}>
                      {sec.icon}
                    </span>
                    <span>{t(sec.labelKey)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Area View Container */}
          <div className="flex-1">
            {renderSection()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

