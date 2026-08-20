import React, { useState } from 'react';
import { AppSection, UserProfile } from '../../types';
import { authService } from '../../services/authService';
import { Card } from '../../components/shared/Card';
import { Button } from '../../components/shared/Button';
import { Alert } from '../../components/shared/Alert';
import {
  Sprout,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  User,
} from 'lucide-react';

interface AuthSectionProps {
  onNavigate: (section: AppSection) => void;
  onLoginSuccess?: (user: UserProfile) => void;
}

type AuthMode = 'login' | 'register' | 'forgot';
type IdentifierType = 'phone' | 'email';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  tagline: string;
  welcome: string;
  subWelcome: string;
  phoneLabel: string;
  emailLabel: string;
  passLabel: string;
  loginBtn: string;
  forgotBtn: string;
  createBtn: string;
  haveAccountBtn: string;
}

const LANGUAGES: Record<string, LanguageOption> = {
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    tagline: 'स्मार्ट कृषि निर्णय व सलाह मंच',
    welcome: 'कृषिदृष्टि में आपका स्वागत है',
    subWelcome: 'फसल सलाह, मंडी भाव और सरकारी योजनाओं के लिए लॉगिन करें',
    phoneLabel: 'मोबाइल नंबर (फ़ोन नंबर)',
    emailLabel: 'ईमेल आईडी',
    passLabel: 'पासवर्ड (गुप्त कोड)',
    loginBtn: 'लॉगिन करें (Dashboard खोलें)',
    forgotBtn: 'पासवर्ड भूल गए?',
    createBtn: 'नया किसान खाता बनाएं (Register)',
    haveAccountBtn: 'पहले से खाता है? लॉगिन करें',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    tagline: 'Smart Agricultural Decision Platform',
    welcome: 'Welcome to KrishiDrishti',
    subWelcome: 'Sign in to access crop advisory, live mandi rates & schemes',
    phoneLabel: 'Mobile Number',
    emailLabel: 'Email Address',
    passLabel: 'Password',
    loginBtn: 'Sign In (Open Dashboard)',
    forgotBtn: 'Forgot Password?',
    createBtn: 'Create New Farmer Account (Register)',
    haveAccountBtn: 'Already have an account? Sign In',
  },
  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    tagline: 'ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਫੈਸਲਾ ਮੰਚ',
    welcome: 'ਕ੍ਰਿਸ਼ੀਦ੍ਰਿਸ਼ਟੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    subWelcome: 'ਫਸਲ ਸਲਾਹ ਅਤੇ ਮੰਡੀ ਦੇ ਭਾਅ ਲਈ ਲੌਗਇਨ ਕਰੋ',
    phoneLabel: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    emailLabel: 'ਈਮੇਲ ਆਈਡੀ',
    passLabel: 'ਪਾਸਵਰਡ',
    loginBtn: 'ਲੌਗਇਨ ਕਰੋ (ਡੈਸ਼ਬੋਰਡ)',
    forgotBtn: 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?',
    createBtn: 'ਨਵਾਂ ਖਾਤਾ ਬਣਾਓ',
    haveAccountBtn: 'ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ? ਲੌਗਇਨ ਕਰੋ',
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    tagline: 'स्मार्ट कृषी निर्णय आणि सल्लागार मंच',
    welcome: 'कृषिदृष्टी मध्ये आपले स्वागत आहे',
    subWelcome: 'पीक सल्ला आणि बाजारभावांसाठी लॉगिन करा',
    phoneLabel: 'मोबाईल क्रमांक',
    emailLabel: 'ईमेल पत्ता',
    passLabel: 'पासवर्ड',
    loginBtn: 'लॉगिन करा (डॅशबोर्ड उघडा)',
    forgotBtn: 'पासवर्ड विसरलात?',
    createBtn: 'नवीन शेतकरी खाते तयार करा',
    haveAccountBtn: 'आधीच खाते आहे? लॉगिन करा',
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    tagline: 'સ્માર્ટ કૃષિ નિર્ણય મંચ',
    welcome: 'કૃષિદ્રષ્ટિ માં સ્વાગત છે',
    subWelcome: 'પાક સલાહ અને મંડી ભાવો માટે સાઇન ઇન કરો',
    phoneLabel: 'મોબાઇલ નંબર',
    emailLabel: 'ઇમેઇલ',
    passLabel: 'પાસવર્ડ',
    loginBtn: 'લૉગિન કરો (ડેશબોર્ડ)',
    forgotBtn: 'પાસવર્ડ ભૂલી ગયા છો?',
    createBtn: 'નવું ખાતું બનાવો',
    haveAccountBtn: 'પહેલેથી ખાતું છે? લૉગિન કરો',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    tagline: 'స్మార్ట్ వ్యవసాయ సలహా వేదిక',
    welcome: 'కృషిదృష్టికి స్వాగతం',
    subWelcome: 'పంట సలహాలు మరియు మార్కెట్ ధరల కోసం లాగిన్ అవ్వండి',
    phoneLabel: 'మొబైల్ నంబర్',
    emailLabel: 'ఈమెయిల్',
    passLabel: 'పాస్‌వర్డ్',
    loginBtn: 'లాగిన్ చేయండి (డాష్‌బోర్డ్)',
    forgotBtn: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    createBtn: 'కొత్త ఖాతా సృష్టించండి',
    haveAccountBtn: 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి',
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    tagline: 'স্মার্ট কৃষি সিদ্ধান্ত ও পরামর্শ মঞ্চ',
    welcome: 'কৃষির্দৃষ্টিতে আপনাকে স্বাগতম',
    subWelcome: 'ফসলের পরামর্শ ও মন্ডি দরের জন্য লগইন করুন',
    phoneLabel: 'মোবাইল নম্বর',
    emailLabel: 'ইমেইল',
    passLabel: 'পাসওয়ার্ড',
    loginBtn: 'লগইন করুন (ড্যাশবোর্ড)',
    forgotBtn: 'পাসওয়ার্ড ভুলে গেছেন?',
    createBtn: 'নতুন অ্যাকাউন্ট তৈরি করুন',
    haveAccountBtn: 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন',
  },
};

export const AuthSection: React.FC<AuthSectionProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [selectedLang, setSelectedLang] = useState<string>('hi');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [inputType, setInputType] = useState<IdentifierType>('phone');

  // Login Form states (unmodified login UI)
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('ramesh.patel@krishidrishti.in');
  const [password, setPassword] = useState('kisan123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration form states
  const [regName, setRegName] = useState('');
  const [regIdentifier, setRegIdentifier] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Field-specific validation errors for Registration
  const [regErrors, setRegErrors] = useState<{
    name?: string;
    identifier?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Forgot password states
  const [forgotInput, setForgotInput] = useState('9876543210');
  const [resetOtpSent, setResetOtpSent] = useState(false);
  const [resetOtpValue, setResetOtpValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  // Status / Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const lang = LANGUAGES[selectedLang] || LANGUAGES.hi;

  // Handle Quick Demo Fill for Login
  const handleQuickDemoFill = () => {
    setInputType('phone');
    setPhone('9876543210');
    setPassword('kisan123');
    setErrorMessage(null);
  };

  // Handle Login Submit (Unmodified)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    const identifier = inputType === 'phone' ? phone : email;

    try {
      const res = await authService.loginWithPassword(identifier, password);
      if (res.success && res.user) {
        setSuccessMessage('Login successful! Redirecting to dashboard...');
        if (onLoginSuccess) {
          onLoginSuccess(res.user);
        }
        setTimeout(() => {
          onNavigate('dashboard');
        }, 400);
      } else {
        setErrorMessage(res.message || 'Login failed. Please check your credentials.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try demo credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Basic Validation for Registration Form
  const validateRegisterForm = (): boolean => {
    const errors: {
      name?: string;
      identifier?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // 1. Name Validation
    const trimmedName = regName.trim();
    if (!trimmedName) {
      errors.name = 'Please enter your full name.';
    } else if (trimmedName.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    // 2. Phone / Email Validation
    const trimmedId = regIdentifier.trim();
    if (!trimmedId) {
      errors.identifier = 'Please enter your phone number or email address.';
    } else {
      const isEmailFormat = trimmedId.includes('@');
      if (isEmailFormat) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedId)) {
          errors.identifier = 'Please enter a valid email address (e.g. name@domain.com).';
        }
      } else {
        const digits = trimmedId.replace(/\D/g, '');
        if (digits.length < 10) {
          errors.identifier = 'Please enter a valid 10-digit mobile number.';
        }
      }
    }

    // 3. Password Validation
    if (!regPassword) {
      errors.password = 'Please enter a password.';
    } else if (regPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    // 4. Confirm Password Validation
    if (!regConfirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match. Please re-check.';
    }

    setRegErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setErrorMessage(firstError);
      return false;
    }

    return true;
  };

  // Handle Registration Submit -> Navigates to Onboarding upon success
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Run client-side validation
    if (!validateRegisterForm()) {
      return;
    }

    setLoading(true);

    try {
      const isEmail = regIdentifier.trim().includes('@');
      const res = await authService.register({
        name: regName.trim(),
        identifier: regIdentifier.trim(),
        phone: isEmail ? undefined : regIdentifier.trim(),
        email: isEmail ? regIdentifier.trim() : undefined,
        password: regPassword,
      });

      if (res.success && res.user) {
        setSuccessMessage('Registration successful! Setting up your farm profile...');
        if (onLoginSuccess) {
          onLoginSuccess(res.user);
        }
        // Navigate directly to onboarding as requested
        setTimeout(() => {
          onNavigate('onboarding');
        }, 500);
      } else {
        setErrorMessage(res.message || 'Registration failed. Please check the entered information.');
      }
    } catch {
      setErrorMessage('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await authService.resetPassword(forgotInput);
      if (res.success) {
        setResetOtpSent(true);
        setResetSuccessMsg(res.message);
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage('Unable to send reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Set New Password after OTP
  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetOtpValue || resetOtpValue.length < 4) {
      setErrorMessage('Please enter the 6-digit OTP code (Demo: 849201).');
      return;
    }
    if (!newPassword || newPassword.length < 4) {
      setErrorMessage('New password must be at least 4 characters.');
      return;
    }
    setSuccessMessage('Password reset successfully! You can now log in.');
    setResetOtpSent(false);
    setAuthMode('login');
    setPassword(newPassword);
  };

  return (
    <div
      id="login-screen-container"
      className="min-h-[85vh] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6"
    >
      {/* Top Utility Bar: Language Selector (Without Dark/Light toggle) */}
      <div className="w-full max-w-lg flex items-center justify-between gap-2 mb-4 px-1">
        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-3 py-1.5 shadow-2xs">
          <Globe className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="text-[11px] font-bold text-stone-500 uppercase">Language:</span>
          <select
            id="auth-language-selector"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer pr-1"
            aria-label="Select Language"
          >
            {Object.values(LANGUAGES).map((item) => (
              <option
                key={item.code}
                value={item.code}
                className="bg-white text-stone-900 py-1"
              >
                {item.nativeName} ({item.name})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span className="hidden sm:inline">Govt. Verified Portal</span>
          <span className="sm:hidden">Verified</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <Card
        id="auth-main-card"
        className="w-full max-w-lg bg-white border-stone-200 shadow-md"
        bodyClassName="p-5 sm:p-7 md:p-8"
      >
        {/* App Logo & Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-700 text-white shadow-xs mb-3 ring-4 ring-emerald-50">
            <Sprout className="w-8 h-8" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              KrishiDrishti
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
              कृषिदृष्टि
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
            {lang.tagline}
          </p>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {authMode === 'register'
              ? 'Create your free farmer profile to begin smart crop monitoring'
              : lang.subWelcome}
          </p>
        </div>

        {/* Global Feedback Banners */}
        {errorMessage && (
          <div className="mb-4">
            <Alert
              type="critical"
              title="Notice"
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
              icon={<AlertCircle className="w-5 h-5 text-rose-700" />}
            />
          </div>
        )}

        {successMessage && (
          <div className="mb-4">
            <Alert
              type="success"
              title="Success"
              message={successMessage}
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-700" />}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* 1. LOGIN MODE (Existing UI Preserved) */}
        {/* ============================================================ */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Input Type Switcher: Phone vs Email */}
            <div className="flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200">
              <button
                type="button"
                id="login-tab-phone"
                onClick={() => {
                  setInputType('phone');
                  setErrorMessage(null);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  inputType === 'phone'
                    ? 'bg-white text-emerald-800 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile (फ़ोन नंबर)</span>
              </button>

              <button
                type="button"
                id="login-tab-email"
                onClick={() => {
                  setInputType('email');
                  setErrorMessage(null);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  inputType === 'email'
                    ? 'bg-white text-emerald-800 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email (ईमेल आईडी)</span>
              </button>
            </div>

            {/* Phone or Email Field */}
            {inputType === 'phone' ? (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                  {lang.phoneLabel}
                </label>
                <div className="flex rounded-xl border-2 border-stone-300 overflow-hidden text-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 bg-stone-50">
                  <span className="bg-stone-200 text-stone-800 px-3.5 py-3 text-sm font-bold border-r border-stone-300 flex items-center shrink-0">
                    +91
                  </span>
                  <input
                    id="login-phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={14}
                    required
                    className="w-full px-3.5 py-3 text-stone-900 bg-white focus:outline-none text-sm sm:text-base font-semibold tracking-wide"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                  {lang.emailLabel}
                </label>
                <div className="flex items-center rounded-xl border-2 border-stone-300 overflow-hidden text-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 bg-white px-3.5 py-1">
                  <Mail className="w-5 h-5 text-stone-400 shrink-0 mr-2" />
                  <input
                    id="login-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@krishidrishti.in"
                    required
                    className="w-full py-2.5 text-stone-900 bg-transparent focus:outline-none text-sm sm:text-base font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs sm:text-sm font-bold text-stone-800">
                  {lang.passLabel}
                </label>
                <button
                  type="button"
                  id="forgot-password-link-btn"
                  onClick={() => {
                    setAuthMode('forgot');
                    setForgotInput(inputType === 'phone' ? phone : email);
                    setErrorMessage(null);
                  }}
                  className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  {lang.forgotBtn}
                </button>
              </div>

              <div className="relative flex items-center rounded-xl border-2 border-stone-300 overflow-hidden text-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 bg-white px-3.5 py-1">
                <Lock className="w-5 h-5 text-stone-400 shrink-0 mr-2" />
                <input
                  id="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full py-2.5 text-stone-900 bg-transparent focus:outline-none text-sm sm:text-base font-semibold pr-8"
                />
                <button
                  type="button"
                  id="toggle-password-visibility-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 p-1 text-stone-500 hover:text-stone-800 focus:outline-none cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Security Badge */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="font-medium">Remember me (याद रखें)</span>
              </label>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>256-bit Secure</span>
              </div>
            </div>

            {/* Main Login Button */}
            <div className="pt-2">
              <Button
                id="login-submit-btn"
                type="submit"
                size="xl"
                variant="primary"
                fullWidth
                loading={loading}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="text-base font-bold shadow-md"
              >
                {lang.loginBtn}
              </Button>
            </div>

            {/* Demo Quick Login Assistant */}
            <div className="pt-2 border-t border-stone-200">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-3">
                <div className="text-xs text-stone-700">
                  <span className="font-bold text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    Demo Credentials Ready:
                  </span>
                  <span className="text-[11px] text-stone-600">
                    Phone: 9876543210 • Pass: kisan123
                  </span>
                </div>
                <button
                  type="button"
                  id="quick-demo-login-btn"
                  onClick={handleQuickDemoFill}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shrink-0 transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  Auto Fill
                </button>
              </div>
            </div>

            {/* Create Account Switcher */}
            <div className="pt-2 text-center">
              <button
                type="button"
                id="switch-to-register-btn"
                onClick={() => {
                  setAuthMode('register');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  setRegErrors({});
                }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 hover:underline cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>{lang.createBtn}</span>
              </button>
            </div>
          </form>
        )}

        {/* ============================================================ */}
        {/* 2. REGISTRATION / CREATE ACCOUNT MODE */}
        {/* Includes: Name, Phone/email, Password, Confirm password, Create account */}
        {/* ============================================================ */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="border-b border-stone-200 pb-2.5">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
                <UserPlus className="w-5 h-5 text-emerald-700" />
                <span>Create Account (नया खाता बनाएं)</span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Register with your contact details to start personalized farm onboarding.
              </p>
            </div>

            {/* 1. Name Field */}
            <div>
              <label
                htmlFor="register-name-input"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1"
              >
                Full Name (पूरा नाम) <span className="text-rose-600">*</span>
              </label>
              <div
                className={`relative flex items-center rounded-xl border-2 overflow-hidden text-sm bg-white px-3.5 py-1 ${
                  regErrors.name
                    ? 'border-rose-400 focus-within:border-rose-600 focus-within:ring-2 focus-within:ring-rose-200'
                    : 'border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20'
                }`}
              >
                <User className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                <input
                  id="register-name-input"
                  type="text"
                  value={regName}
                  onChange={(e) => {
                    setRegName(e.target.value);
                    if (regErrors.name) setRegErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full py-2.5 text-stone-900 bg-transparent focus:outline-none text-sm sm:text-base font-semibold"
                  autoFocus
                />
              </div>
              {regErrors.name && (
                <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {regErrors.name}
                </p>
              )}
            </div>

            {/* 2. Phone / Email Field */}
            <div>
              <label
                htmlFor="register-identifier-input"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1"
              >
                Phone or Email (मोबाइल नंबर या ईमेल आईडी) <span className="text-rose-600">*</span>
              </label>
              <div
                className={`relative flex items-center rounded-xl border-2 overflow-hidden text-sm bg-white px-3.5 py-1 ${
                  regErrors.identifier
                    ? 'border-rose-400 focus-within:border-rose-600 focus-within:ring-2 focus-within:ring-rose-200'
                    : 'border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20'
                }`}
              >
                {regIdentifier.includes('@') ? (
                  <Mail className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                ) : (
                  <Smartphone className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                )}
                <input
                  id="register-identifier-input"
                  type="text"
                  value={regIdentifier}
                  onChange={(e) => {
                    setRegIdentifier(e.target.value);
                    if (regErrors.identifier) setRegErrors((prev) => ({ ...prev, identifier: undefined }));
                  }}
                  placeholder="9876543210 or farmer@example.com"
                  className="w-full py-2.5 text-stone-900 bg-transparent focus:outline-none text-sm sm:text-base font-semibold"
                />
              </div>
              {regErrors.identifier ? (
                <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {regErrors.identifier}
                </p>
              ) : (
                <p className="text-[11px] text-stone-500 mt-1">
                  Enter 10-digit mobile number or standard email address
                </p>
              )}
            </div>

            {/* 3. Password Field */}
            <div>
              <label
                htmlFor="register-password-input"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1"
              >
                Password (पासवर्ड) <span className="text-rose-600">*</span>
              </label>
              <div
                className={`relative flex items-center rounded-xl border-2 overflow-hidden text-sm bg-white px-3.5 py-1 ${
                  regErrors.password
                    ? 'border-rose-400 focus-within:border-rose-600 focus-within:ring-2 focus-within:ring-rose-200'
                    : 'border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20'
                }`}
              >
                <Lock className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                <input
                  id="register-password-input"
                  type={showRegPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => {
                    setRegPassword(e.target.value);
                    if (regErrors.password) setRegErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Minimum 6 characters"
                  className="w-full py-2.5 text-stone-900 bg-transparent focus:outline-none text-sm sm:text-base font-semibold pr-8"
                />
                <button
                  type="button"
                  id="toggle-reg-password-btn"
                  onClick={() => setShowRegPassword((prev) => !prev)}
                  className="absolute right-3 p-1 text-stone-500 hover:text-stone-800 focus:outline-none cursor-pointer"
                  title={showRegPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle password visibility"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {regErrors.password && (
                <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {regErrors.password}
                </p>
              )}
            </div>

            {/* 4. Confirm Password Field */}
            <div>
              <label
                htmlFor="register-confirm-password-input"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1"
              >
                Confirm Password (पासवर्ड की पुष्टि करें) <span className="text-rose-600">*</span>
              </label>
              <div
                className={`relative flex items-center rounded-xl border-2 overflow-hidden text-sm bg-white px-3.5 py-1 ${
                  regErrors.confirmPassword
                    ? 'border-rose-400 focus-within:border-rose-600 focus-within:ring-2 focus-within:ring-rose-200'
                    : 'border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20'
                }`}
              >
                <Lock className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                <input
                  id="register-confirm-password-input"
                  type={showRegConfirmPassword ? 'text' : 'password'}
                  value={regConfirmPassword}
                  onChange={(e) => {
                    setRegConfirmPassword(e.target.value);
                    if (regErrors.confirmPassword) setRegErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  placeholder="Re-enter your password"
                  className="w-full py-2.5 text-stone-900 bg-transparent focus:outline-none text-sm sm:text-base font-semibold pr-8"
                />
                <button
                  type="button"
                  id="toggle-reg-confirm-password-btn"
                  onClick={() => setShowRegConfirmPassword((prev) => !prev)}
                  className="absolute right-3 p-1 text-stone-500 hover:text-stone-800 focus:outline-none cursor-pointer"
                  title={showRegConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle confirm password visibility"
                >
                  {showRegConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {regErrors.confirmPassword && (
                <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {regErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* 5. Create Account Button & Navigation Actions */}
            <div className="pt-2 space-y-2">
              <Button
                id="register-submit-btn"
                type="submit"
                size="xl"
                variant="primary"
                fullWidth
                loading={loading}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="text-base font-bold shadow-md"
              >
                Create Account (खाता बनाएं)
              </Button>

              <Button
                id="register-back-to-login-btn"
                type="button"
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  setRegErrors({});
                }}
              >
                {lang.haveAccountBtn}
              </Button>
            </div>
          </form>
        )}

        {/* ============================================================ */}
        {/* 3. FORGOT PASSWORD MODE */}
        {/* ============================================================ */}
        {authMode === 'forgot' && (
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-2">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-700" />
                Reset Farmer Password (पासवर्ड रीसेट करें)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Enter your registered mobile or email to receive a verification OTP code.
              </p>
            </div>

            {!resetOtpSent ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                    Registered Mobile / Email
                  </label>
                  <input
                    id="forgot-identifier-input"
                    type="text"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    placeholder="9876543210 or email"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:border-emerald-600 font-semibold"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
                  <Button
                    id="send-reset-otp-btn"
                    type="submit"
                    size="lg"
                    variant="primary"
                    fullWidth
                    loading={loading}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Send Reset OTP (ओटीपी भेजें)
                  </Button>

                  <Button
                    id="forgot-cancel-btn"
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSetNewPassword} className="space-y-3.5">
                <Alert
                  type="info"
                  title="OTP Dispatched"
                  hindiTitle="ओटीपी भेजा गया"
                  message={resetSuccessMsg || 'Demo OTP is 849201. Enter below to set new password.'}
                  icon={<CheckCircle2 className="w-5 h-5 text-emerald-700" />}
                />

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Enter 6-Digit OTP Code (ओटीपी दर्ज करें)
                  </label>
                  <input
                    id="reset-otp-input"
                    type="text"
                    value={resetOtpValue}
                    onChange={(e) => setResetOtpValue(e.target.value)}
                    placeholder="849201"
                    maxLength={6}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-emerald-500 bg-white text-stone-900 text-center tracking-widest font-mono text-lg font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    New Password (नया पासवर्ड)
                  </label>
                  <input
                    id="reset-new-password-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:border-emerald-600 font-semibold"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Button
                    id="save-new-password-btn"
                    type="submit"
                    size="lg"
                    variant="primary"
                    fullWidth
                    icon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Save & Back to Login
                  </Button>
                  <Button
                    id="reset-back-btn"
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => setResetOtpSent(false)}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </Card>

      {/* Footer Support Info */}
      <div className="mt-6 text-center text-xs text-stone-500 space-y-1">
        <p className="flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
          <span>Kisan Helpline Support: 1800-180-1551 (Toll Free)</span>
        </p>
        <p className="text-[11px] text-stone-400">
          KrishiDrishti Digital Agriculture Suite • Secure Farmer Access
        </p>
      </div>
    </div>
  );
};
