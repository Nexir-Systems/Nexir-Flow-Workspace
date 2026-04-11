import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { CatalogFilterState, CatalogSortField } from '../core/entity-catalog-filter';
import type { EntityCategory, EntityStatus } from '../api/types/entities';

const initial: CatalogFilterState = {
  searchQuery: '',
  status: 'all',
  category: 'all',
  sortBy: 'updatedAt',
  sortDirection: 'desc',
};

type CatalogUiStore = CatalogFilterState & {
  setSearchQuery: (v: string) => void;
  setStatus: (v: 'all' | EntityStatus) => void;
  setCategory: (v: 'all' | EntityCategory) => void;
  setSortBy: (v: CatalogSortField) => void;
  setSortDirection: (v: 'asc' | 'desc') => void;
  resetPageSignal: number;
  bumpResetPage: () => void;
  resetFilters: () => void;
};

/** Shared catalog toolbar state for Entities + Favorites (search, filters, sort). `resetPageSignal` bumps when filters change so tables can snap back to page 0. */
export const useEntityCatalogUiStore = create<CatalogUiStore>((set) => ({
  ...initial,
  resetPageSignal: 0,
  setSearchQuery: (searchQuery) =>
    set((s) => ({ searchQuery, resetPageSignal: s.resetPageSignal + 1 })),
  setStatus: (status) => set((s) => ({ status, resetPageSignal: s.resetPageSignal + 1 })),
  setCategory: (category) => set((s) => ({ category, resetPageSignal: s.resetPageSignal + 1 })),
  setSortBy: (sortBy) => set((s) => ({ sortBy, resetPageSignal: s.resetPageSignal + 1 })),
  setSortDirection: (sortDirection) =>
    set((s) => ({ sortDirection, resetPageSignal: s.resetPageSignal + 1 })),
  bumpResetPage: () => set((s) => ({ resetPageSignal: s.resetPageSignal + 1 })),
  resetFilters: () =>
    set((s) => ({
      ...initial,
      resetPageSignal: s.resetPageSignal + 1,
    })),
}));

export function selectCatalogFilterState(state: CatalogUiStore): CatalogFilterState {
  return {
    searchQuery: state.searchQuery,
    status: state.status,
    category: state.category,
    sortBy: state.sortBy,
    sortDirection: state.sortDirection,
  };
}

/** Shallow compare on the filter object — plain selectors return a new object each time and force unnecessary renders. */
export function useCatalogFilterState(): CatalogFilterState {
  return useEntityCatalogUiStore(
    useShallow((s) => ({
      searchQuery: s.searchQuery,
      status: s.status,
      category: s.category,
      sortBy: s.sortBy,
      sortDirection: s.sortDirection,
    })),
  );
}
