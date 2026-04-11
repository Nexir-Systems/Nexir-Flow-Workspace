import { STORAGE_KEYS } from '../storage/keys';
import { storageGetJson, storageSetJson } from '../storage/localStorage';

const MAX = 6;

export function readRecentEntityIds(): string[] {
  return storageGetJson<string[]>(STORAGE_KEYS.recentEntities) ?? [];
}

export function pushRecentEntityId(id: string): void {
  const prev = readRecentEntityIds().filter((x) => x !== id);
  const next = [id, ...prev].slice(0, MAX);
  storageSetJson(STORAGE_KEYS.recentEntities, next);
}
