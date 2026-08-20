import { UserProfile } from '../types';

const STORAGE_KEY_USER = 'krishidrishti_user';
const STORAGE_KEY_TOKEN = 'krishidrishti_token';

export const DEMO_USER: UserProfile = {
  id: 'usr_ramesh_patel',
  name: 'Ramesh Patel',
  phone: '9876543210',
  email: 'ramesh.patel@krishidrishti.in',
  state: 'Madhya Pradesh',
  district: 'Indore',
  village: 'Sanwer',
  landSizeAcres: 4.5,
  primaryCrops: ['Soybean', 'Wheat', 'Gram'],
  soilType: 'Black Clay Loam',
  irrigationSource: 'Tube Well & Canal',
  preferredLanguage: 'hi',
};

export const authService = {
  loginWithPassword: async (
    identifier: string,
    password: string
  ): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      return { success: false, message: 'Please enter your phone number or email address.' };
    }

    if (!password || password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }

    // Check if there is an existing registered user in localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProfile;
        if (
          parsed.phone === trimmedIdentifier ||
          parsed.email?.toLowerCase() === trimmedIdentifier.toLowerCase()
        ) {
          localStorage.setItem(STORAGE_KEY_TOKEN, 'session_token_' + Date.now());
          return { success: true, user: parsed };
        }
      }
    } catch {
      // Ignore JSON parse errors
    }

    // Default demo login check or accept standard demo credentials
    const isPhoneMatch = trimmedIdentifier === '9876543210' || trimmedIdentifier.replace(/\D/g, '').endsWith('9876543210');
    const isEmailMatch = trimmedIdentifier.toLowerCase() === 'ramesh.patel@krishidrishti.in' || trimmedIdentifier.toLowerCase() === 'farmer@krishidrishti.in';

    const user: UserProfile = isPhoneMatch || isEmailMatch
      ? DEMO_USER
      : {
          ...DEMO_USER,
          id: 'usr_' + Date.now(),
          name: trimmedIdentifier.includes('@') ? trimmedIdentifier.split('@')[0] : 'Kisan ' + trimmedIdentifier.slice(-4),
          phone: trimmedIdentifier.includes('@') ? '9876543210' : trimmedIdentifier,
          email: trimmedIdentifier.includes('@') ? trimmedIdentifier : undefined,
        };

    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, 'session_token_' + Date.now());
    } catch {
      // Fallback in case localStorage is blocked in sandbox iframe
    }

    return { success: true, user };
  },

  register: async (params: {
    name: string;
    phone?: string;
    email?: string;
    identifier?: string;
    state?: string;
    district?: string;
    primaryCrop?: string;
    password?: string;
  }): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const trimmedName = params.name?.trim() || '';
    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, message: 'Please enter your full name (at least 2 characters).' };
    }

    const rawId = (params.identifier || params.phone || params.email || '').trim();
    if (!rawId) {
      return { success: false, message: 'Please enter your mobile number or email address.' };
    }

    const isEmail = rawId.includes('@');
    const digitsOnly = rawId.replace(/\D/g, '');

    if (!isEmail && digitsOnly.length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }

    if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawId)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: trimmedName,
      phone: isEmail ? (params.phone || '9876543210') : rawId,
      email: isEmail ? rawId : params.email,
      state: params.state || 'Madhya Pradesh',
      district: params.district || 'Indore',
      village: 'Gram Panchayat',
      landSizeAcres: 3.5,
      primaryCrops: [params.primaryCrop || 'Soybean'],
      soilType: 'Black Cotton Soil',
      irrigationSource: 'Tube Well',
      preferredLanguage: 'hi',
    };

    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEY_TOKEN, 'session_token_' + Date.now());
    } catch {
      // Ignore storage errors in sandbox
    }

    return { success: true, user: newUser };
  },

  resetPassword: async (
    identifier: string
  ): Promise<{ success: boolean; message: string; tempOtp?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!identifier.trim()) {
      return { success: false, message: 'Please enter your registered phone or email.' };
    }
    return {
      success: true,
      message: `Password reset OTP has been dispatched to ${identifier}.`,
      tempOtp: '849201',
    };
  },

  saveOnboardingProfile: (profile: Partial<UserProfile>): UserProfile => {
    const existing = authService.getCurrentUser() || DEMO_USER;
    const updatedUser: UserProfile = {
      ...existing,
      ...profile,
      id: existing.id || 'usr_' + Date.now(),
      name: profile.name?.trim() || existing.name || 'Ramesh Patel',
      state: profile.state || existing.state || 'Madhya Pradesh',
      district: profile.district || existing.district || 'Indore',
      village: profile.village || existing.village || 'Sanwer',
      primaryCrops: profile.primaryCrops && profile.primaryCrops.length > 0 ? profile.primaryCrops : existing.primaryCrops,
      landSizeAcres: typeof profile.landSizeAcres === 'number' ? profile.landSizeAcres : existing.landSizeAcres,
      preferredLanguage: profile.preferredLanguage || existing.preferredLanguage || 'hi',
    };

    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
      localStorage.setItem(STORAGE_KEY_TOKEN, 'session_token_' + Date.now());
    } catch {
      // Ignore local storage error
    }

    return updatedUser;
  },

  updateUserProfile: (profile: Partial<UserProfile>): UserProfile => {
    return authService.saveOnboardingProfile(profile);
  },

  getCurrentUser: (): UserProfile | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY_TOKEN));
    } catch {
      return false;
    }
  },

  logout: async (): Promise<void> => {
    try {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    } catch {
      // Ignore
    }
  },
};
