function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function storageGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore quota */
  }
}

export function storageRemove(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function storageGetJson<T>(key: string): T | null {
  const raw = storageGet(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function storageSetJson(key: string, value: unknown): void {
  storageSet(key, JSON.stringify(value));
}
