/** Repository entry points — labels map to this React tree (parity with the Angular reference layout in the migration spec). */
export const EXAMPLE_SENSITIVE_PATHS: Array<{ label: string; path: string; hint: string }> = [
  {
    label: 'Core storage',
    path: 'src/core/storage/',
    hint: 'SSR-safe localStorage helpers and fixed key strings.',
  },
  {
    label: 'Mock API',
    path: 'src/api/mock/',
    hint: 'Async mock services (auth, entities, settings) — no React imports.',
  },
  {
    label: 'Queries',
    path: 'src/queries/',
    hint: 'TanStack Query keys and hooks wrapping the mock API.',
  },
  {
    label: 'Catalog UI state',
    path: 'src/stores/entityCatalogUiStore.ts',
    hint: 'Shared search/filters/sort for Entities + Favorites.',
  },
  {
    label: 'Features',
    path: 'src/features/',
    hint: 'Vertical slices: auth, dashboard, entities, favorites, account, settings.',
  },
  {
    label: 'Shared UI',
    path: 'src/ui/',
    hint: 'Thin building blocks (SectionCard, EmptyState, catalog table, …).',
  },
];
