import { STORAGE_KEYS } from '../storage/keys';
import { storageGetJson, storageSetJson } from '../storage/localStorage';
import type { Session } from './types';

export function readSession(): Session | null {
  return storageGetJson<Session>(STORAGE_KEYS.session);
}

export function writeSession(session: Session | null): void {
  if (session === null) {
    storageSetJson(STORAGE_KEYS.session, null);
    return;
  }
  storageSetJson(STORAGE_KEYS.session, session);
}

export function clearSession(): void {
  storageSetJson(STORAGE_KEYS.session, null);
}
