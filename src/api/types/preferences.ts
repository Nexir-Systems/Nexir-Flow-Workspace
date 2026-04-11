export type ThemePreference = 'system' | 'light' | 'dark';

export type DensityPreference = 'comfortable' | 'compact';

export type UserPreferences = {
  theme: ThemePreference;
  density: DensityPreference;
};
