import { STORAGE_KEYS } from '../storage/keys';
import { storageGetJson, storageSetJson } from '../storage/localStorage';
import { notifyFavoriteIdsChanged } from './favoriteIdsSubscribe';

export function readFavoriteIds(): string[] {
  return storageGetJson<string[]>(STORAGE_KEYS.favoriteEntityIds) ?? [];
}

export function writeFavoriteIds(ids: string[]): void {
  const unique = [...new Set(ids)];
  storageSetJson(STORAGE_KEYS.favoriteEntityIds, unique);
  notifyFavoriteIdsChanged();
}

export function toggleFavoriteId(entityId: string, starred: boolean): void {
  const ids = readFavoriteIds();
  if (starred) {
    if (!ids.includes(entityId)) writeFavoriteIds([entityId, ...ids]);
  } else {
    writeFavoriteIds(ids.filter((id) => id !== entityId));
  }
}
