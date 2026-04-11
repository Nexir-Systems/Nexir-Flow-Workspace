import { STORAGE_KEYS } from '../../core/storage/keys';
import { storageGetJson, storageSetJson } from '../../core/storage/localStorage';
import type { EntityRecord } from '../types/entities';
import { MOCK_ENTITIES_SEED } from './seedEntities';
import { DELAYS, delay } from './delay';

function readEntitiesFromStorage(): EntityRecord[] | null {
  return storageGetJson<EntityRecord[]>(STORAGE_KEYS.entities);
}

function writeEntitiesToStorage(rows: EntityRecord[]): void {
  storageSetJson(STORAGE_KEYS.entities, rows);
}

export function getEntitiesSnapshot(): EntityRecord[] {
  const stored = readEntitiesFromStorage();
  if (stored && stored.length > 0) return stored;
  return [...MOCK_ENTITIES_SEED];
}

function nextEntityId(existing: EntityRecord[]): string {
  let max = 0;
  for (const e of existing) {
    const m = /^ent-(\d+)$/.exec(e.id);
    if (m) max = Math.max(max, Number(m[1]));
  }
  const n = max + 1;
  return `ent-${String(n).padStart(3, '0')}`;
}

export async function listEntities(): Promise<EntityRecord[]> {
  await delay(DELAYS.entities);
  return getEntitiesSnapshot();
}

export async function getEntityById(id: string): Promise<EntityRecord> {
  await delay(DELAYS.entities);
  const rows = getEntitiesSnapshot();
  const row = rows.find((r) => r.id === id);
  if (!row) throw new Error('Record not found.');
  return row;
}

export async function createEntity(
  input: Omit<EntityRecord, 'id' | 'updatedAt' | 'metadata' | 'activity'> & {
    metadata?: Record<string, string>;
    activity?: EntityRecord['activity'];
  },
): Promise<EntityRecord> {
  await delay(DELAYS.entities);
  const rows = [...getEntitiesSnapshot()];
  const now = new Date().toISOString();
  const id = nextEntityId(rows);
  const row: EntityRecord = {
    id,
    name: input.name,
    description: input.description,
    status: input.status,
    category: input.category,
    priority: input.priority,
    owner: input.owner,
    updatedAt: now,
    metadata: input.metadata ?? {},
    activity:
      input.activity ??
      [
        {
          id: `act-${id}-1`,
          at: now,
          label: 'Record created',
        },
      ],
  };
  rows.push(row);
  writeEntitiesToStorage(rows);
  return row;
}

export async function updateEntity(
  id: string,
  patch: Partial<
    Pick<
      EntityRecord,
      'name' | 'description' | 'status' | 'category' | 'priority' | 'owner' | 'metadata' | 'activity'
    >
  >,
): Promise<EntityRecord> {
  await delay(DELAYS.entities);
  const rows = [...getEntitiesSnapshot()];
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error('Record not found.');
  const now = new Date().toISOString();
  const prev = rows[idx]!;
  const next: EntityRecord = {
    ...prev,
    ...patch,
    id: prev.id,
    updatedAt: now,
    metadata: patch.metadata ?? prev.metadata,
    activity: patch.activity ?? prev.activity,
  };
  rows[idx] = next;
  writeEntitiesToStorage(rows);
  return next;
}
