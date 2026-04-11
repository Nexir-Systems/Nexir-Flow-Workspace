import type { RouteMapRow } from '../../ui/RouteMapSegmented';

/** Order matches map segments: public → app shell (dashboard · account · settings) → entity flows. */
export const WORKSPACE_MAP_ROUTES: RouteMapRow[] = [
  { path: '/', note: 'Landing; redirects to /app/dashboard when a session exists.', kind: 'public' },
  { path: '/workspace-map', note: 'This screen — routes, layers, and data boundaries.', kind: 'public' },
  { path: '/login', note: 'Guest-only sign-in.', kind: 'public' },
  { path: '/register', note: 'Guest-only registration.', kind: 'public' },
  { path: '/app/dashboard', note: 'Authenticated home — session summary and quick actions.', kind: 'auth' },
  { path: '/app/account', note: 'Account — change password (mock registry).', kind: 'auth' },
  { path: '/app/settings', note: 'Appearance — theme and density (local preferences).', kind: 'auth' },
  { path: '/app/entities', note: 'Entity catalog — shared filters with Favorites.', kind: 'entity' },
  { path: '/app/favorites', note: 'Starred rows — same filters as Entities.', kind: 'entity' },
  { path: '/app/entities/new', note: 'Create entity.', kind: 'entity' },
  { path: '/app/entities/:id', note: 'Entity detail.', kind: 'entity' },
  { path: '/app/entities/:id/edit', note: 'Edit entity.', kind: 'entity' },
];
