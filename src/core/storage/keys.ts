/** localStorage keys — 1:1 with migration spec; do not rename. UI-only keys are noted inline. */
export const STORAGE_KEYS = {
  session: 'nexir.session.v1',
  users: 'nexir.users.v1',
  preferences: 'nexir.preferences.v1',
  entities: 'nexir.entities.v2',
  recentEntities: 'nexir.recent-entities.v1',
  favoriteEntityIds: 'nexir.favorite-entity-ids.v1',
  /** App shell sidenav collapsed (desktop); not in migration spec JSON shapes. */
  sidebarCollapsed: 'nexir.sidebar-collapsed.v1',
} as const;
