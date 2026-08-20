import React, { useState } from 'react';
import { AppSection } from '../../types';
import { SectionPlaceholder } from '../../components/shared/SectionPlaceholder';
import { Card } from '../../components/shared/Card';
import { Badge } from '../../components/shared/Badge';
import { Button } from '../../components/shared/Button';
import { Alert } from '../../components/shared/Alert';
import { LanguageSelector } from '../../components/shared/LanguageSelector';
import { useLanguage } from '../../i18n/LanguageContext';
import { authService, DEMO_USER } from '../../services/authService';
import { UserCheck, Languages, Save, CheckCircle2, User, Phone, MapPin, Sprout, Edit } from 'lucide-react';

interface ProfileSectionProps {
  onNavigate: (section: AppSection) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ onNavigate }) => {
  const { t, currentLanguageInfo } = useLanguage();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const user = authService.getCurrentUser() || DEMO_USER;

  const subModules = [
    {
      name: 'Farmer Bio & Contact Info',
      desc: 'Name, mobile contact, language preference, and identity verification status.',
    },
    {
      name: 'Land & Parcel Directory',
      desc: 'Survey numbers, acreage, GPS boundaries, and soil health records.',
    },
    {
      name: 'Farm Equipment Inventory',
      desc: 'Tractors, seed drills, sprayers, and irrigation equipment registered.',
    },
    {
      name: 'Crop History & Yield Archive',
      desc: 'Historical yield performance, past harvest revenues, and input cost logs.',
    },
  ];

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div id="section-profile" className="space-y-6">
      {/* Interactive Language & Regional Preferences Card (Settings Area) */}
      <Card
        id="profile-language-settings-card"
        className="bg-white border-stone-200 shadow-xs"
        bodyClassName="p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 shrink-0">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                {t('profile.languageSettingsTitle')}
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                {t('profile.languageSettingsSub')}
              </p>
            </div>
          </div>
          <Badge variant="emerald">{t('lang.selected')}: {currentLanguageInfo.nativeName}</Badge>
        </div>

        {savedSuccess && (
          <Alert
            type="success"
            title={t('profile.preferencesSaved')}
            message={t('profile.preferencesSavedSub')}
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            onClose={() => setSavedSuccess(false)}
          />
        )}

        {/* Visual Language Selection Cards */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
            {t('profile.chooseAppLanguage')}
          </label>
          <LanguageSelector variant="cards" />
        </div>

        {/* Farmer Bio Quick Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
            <div className="text-stone-500 font-medium flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5 text-emerald-700" />
              {t('profile.farmerName')}
            </div>
            <div className="font-bold text-stone-900">{user.name || 'Ramesh Patel'}</div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
            <div className="text-stone-500 font-medium flex items-center gap-1.5 mb-1">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              {t('profile.phone')}
            </div>
            <div className="font-bold text-stone-900">+91 {user.phone || '98765 43210'}</div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
            <div className="text-stone-500 font-medium flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              {t('profile.location')}
            </div>
            <div className="font-bold text-stone-900">
              {user.village ? `${user.village}, ` : ''}{user.district || 'Indore'} ({user.state || 'MP'})
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-stone-100 flex-wrap gap-2">
          <Button
            size="md"
            variant="outline"
            onClick={() => onNavigate('onboarding')}
            icon={<Edit className="w-4 h-4" />}
          >
            {t('onboarding.title')} ({t('onboarding.editDetails')})
          </Button>

          <Button
            size="md"
            variant="primary"
            onClick={handleSaveSettings}
            icon={<Save className="w-4 h-4" />}
          >
            {t('profile.savePreferences')}
          </Button>
        </div>
      </Card>

      {/* Main Profile Spec & Submodules Placeholder */}
      <SectionPlaceholder
        id="profile-module-spec"
        title={t('profile.title')}
        tagline={t('profile.subtitle')}
        sectionKey="profile"
        icon={<UserCheck className="w-6 h-6" />}
        subModules={subModules}
        onNavigate={onNavigate}
      />
    </div>
  );
};
