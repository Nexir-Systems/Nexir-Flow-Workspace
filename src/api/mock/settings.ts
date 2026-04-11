import { STORAGE_KEYS } from '../../core/storage/keys';
import { storageGetJson, storageSetJson } from '../../core/storage/localStorage';
import type { UserPreferences } from '../types/preferences';
import { DELAYS, delay } from './delay';

const DEFAULTS: UserPreferences = {
  theme: 'system',
  density: 'comfortable',
};

export function getPreferencesSnapshot(): UserPreferences {
  return storageGetJson<UserPreferences>(STORAGE_KEYS.preferences) ?? { ...DEFAULTS };
}

export async function getPreferences(): Promise<UserPreferences> {
  await delay(DELAYS.settings);
  return getPreferencesSnapshot();
}

export async function updatePreferences(patch: Partial<UserPreferences>): Promise<UserPreferences> {
  await delay(DELAYS.settings);
  const current = getPreferencesSnapshot();
  const next: UserPreferences = { ...current, ...patch };
  storageSetJson(STORAGE_KEYS.preferences, next);
  return next;
}
