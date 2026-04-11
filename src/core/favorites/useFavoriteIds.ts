import { useSyncExternalStore } from 'react';
import { getFavoriteIdsSnapshot, subscribeFavoriteIds } from './favoriteIdsSubscribe';

export function useFavoriteIds(): string[] {
  return useSyncExternalStore(
    subscribeFavoriteIds,
    getFavoriteIdsSnapshot,
    () => [],
  );
}
