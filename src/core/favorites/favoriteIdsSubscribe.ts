import { readFavoriteIds } from './favoriteIds';

const listeners = new Set<() => void>();

/**
 * Serialized key + stable array ref. Required because `JSON.parse` returns a new array each time;
 * without caching, `useSyncExternalStore` (useFavoriteIds) sees a new snapshot every render → update loops.
 */
let snapshotCache: string[] = [];
let snapshotKey = '';

export function subscribeFavoriteIds(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyFavoriteIdsChanged(): void {
  listeners.forEach((l) => l());
}

export function getFavoriteIdsSnapshot(): string[] {
  const ids = readFavoriteIds();
  const key = JSON.stringify(ids);
  if (key === snapshotKey) return snapshotCache;
  snapshotKey = key;
  snapshotCache = ids;
  return snapshotCache;
}
