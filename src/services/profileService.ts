import { UserProfile } from '../types';

export const profileService = {
  async getProfile(): Promise<UserProfile | null> {
    console.info('[ProfileService] Loading user profile');
    return null;
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    console.info('[ProfileService] Updating profile:', profile);
    return {
      id: 'usr_default',
      name: 'Ramesh Patel',
      phone: '+91 98765 43210',
      email: 'ramesh.patel@example.com',
      state: 'Madhya Pradesh',
      district: 'Indore',
      village: 'Sanwer',
      landSizeAcres: 4.5,
      primaryCrops: ['Soybean', 'Wheat', 'Gram'],
      soilType: 'Black Clay Loam',
      irrigationSource: 'Tube Well & Canal',
      preferredLanguage: 'Hindi (हिंदी)',
      ...profile
    };
  }
};
