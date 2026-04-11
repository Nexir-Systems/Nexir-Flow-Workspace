import type { EntityCategory, EntityPriority, EntityRecord, EntityStatus } from '../api/types/entities';

export type CatalogSortField = 'updatedAt' | 'priority' | 'status' | 'name';

export type CatalogFilterState = {
  searchQuery: string;
  status: 'all' | EntityStatus;
  category: 'all' | EntityCategory;
  sortBy: CatalogSortField;
  sortDirection: 'asc' | 'desc';
};

const PRIORITY_RANK: Record<EntityPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
};

const STATUS_RANK: Record<EntityStatus, number> = {
  draft: 0,
  active: 1,
  archived: 2,
};

function matchesSearch(row: EntityRecord, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return (
    row.name.toLowerCase().includes(s) ||
    row.description.toLowerCase().includes(s) ||
    row.owner.toLowerCase().includes(s) ||
    row.id.toLowerCase().includes(s)
  );
}

function compare(
  a: EntityRecord,
  b: EntityRecord,
  sortBy: CatalogSortField,
  dir: 1 | -1,
): number {
  if (sortBy === 'name') {
    return a.name.localeCompare(b.name) * dir;
  }
  if (sortBy === 'updatedAt') {
    return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * dir;
  }
  if (sortBy === 'priority') {
    return (PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]) * dir;
  }
  if (sortBy === 'status') {
    return (STATUS_RANK[a.status] - STATUS_RANK[b.status]) * dir;
  }
  return 0;
}

export function filterAndSortEntityRecords(
  rows: EntityRecord[],
  state: CatalogFilterState,
): EntityRecord[] {
  let out = rows.filter((r) => matchesSearch(r, state.searchQuery));
  if (state.status !== 'all') {
    out = out.filter((r) => r.status === state.status);
  }
  if (state.category !== 'all') {
    out = out.filter((r) => r.category === state.category);
  }
  const dir = state.sortDirection === 'asc' ? 1 : -1;
  out = [...out].sort((a, b) => compare(a, b, state.sortBy, dir));
  return out;
}
