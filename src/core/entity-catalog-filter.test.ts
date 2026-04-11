import { describe, expect, it } from 'vitest';
import { filterAndSortEntityRecords, type CatalogFilterState } from './entity-catalog-filter';
import type { EntityRecord } from '../api/types/entities';

const base = (overrides: Partial<EntityRecord>): EntityRecord => ({
  id: 'ent-001',
  name: 'Alpha',
  description: 'd',
  status: 'draft',
  category: 'general',
  priority: 'medium',
  owner: 'owner',
  updatedAt: '2026-01-02T00:00:00.000Z',
  metadata: {},
  activity: [],
  ...overrides,
});

const state = (overrides: Partial<CatalogFilterState> = {}): CatalogFilterState => ({
  searchQuery: '',
  status: 'all',
  category: 'all',
  sortBy: 'name',
  sortDirection: 'asc',
  ...overrides,
});

describe('filterAndSortEntityRecords', () => {
  it('filters by search across name/description/owner/id', () => {
    const rows = [
      base({ id: 'ent-010', name: 'Zeta', description: 'x', owner: 'Sam' }),
      base({ id: 'ent-011', name: 'Other', description: 'findme', owner: 'x' }),
    ];
    const out = filterAndSortEntityRecords(rows, state({ searchQuery: 'find' }));
    expect(out.map((r) => r.id)).toEqual(['ent-011']);
  });

  it('filters by status and category', () => {
    const rows = [
      base({ id: 'a', status: 'active', category: 'billing' }),
      base({ id: 'b', status: 'draft', category: 'billing' }),
    ];
    const out = filterAndSortEntityRecords(
      rows,
      state({ status: 'draft', category: 'billing' }),
    );
    expect(out.map((r) => r.id)).toEqual(['b']);
  });

  it('sorts by updatedAt desc', () => {
    const rows = [
      base({ id: 'a', updatedAt: '2026-01-01T00:00:00.000Z' }),
      base({ id: 'b', updatedAt: '2026-01-03T00:00:00.000Z' }),
    ];
    const out = filterAndSortEntityRecords(
      rows,
      state({ sortBy: 'updatedAt', sortDirection: 'desc' }),
    );
    expect(out.map((r) => r.id)).toEqual(['b', 'a']);
  });
});
