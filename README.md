# Nexir Flow Workspace

React **19** + Vite **8** SPA: a **product-style shell** with mock auth, entities, favorites, settings, and local persistence—useful as a reference workspace or onboarding playground. **UI copy is English-only.** This is the React sibling of the Angular “Core Workspace” reference; behavior is intended to match **[docs/REACT_MIGRATION_SPEC.md](docs/REACT_MIGRATION_SPEC.md)**.

## Quick start

| Step | Command / action |
| ---- | ---------------- |
| 1 | `npm install` |
| 2 | `npm run dev` → open `http://localhost:5173` |
| 3 | Register a test account at `/register` or use **Application map** (`/workspace-map`) for a route overview |
| 4 | After sign-in, the app lives under **`/app/*`** (app shell: sidebar + main content) |

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` / `npm start` | Vite dev server (aliases) |
| `npm run build` | Production build (`tsc` + `vite build`) |
| `npm test` | Unit tests (Vitest, `unit` project) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm run storybook` | Storybook dev server |
| `npm run build-storybook` | Static Storybook output (`storybook-static/`) |

For **layer boundaries and where to add code**, see **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

## Mental model: where things live

```
src/
├── app/              # Router, providers, layouts (AppShellLayout)
├── core/             # Storage keys/helpers, session, theme shell, notify, validation, favorites/recent helpers
├── api/mock/         # Async mock services (auth, entities, settings) — no React
├── queries/          # TanStack Query keys + hooks
├── stores/           # Shared UI state for entity catalog (search/filters/sort) — Entities + Favorites
├── features/       # Vertical slices: auth, dashboard, entities, favorites, account, settings, landing, workspace-map
├── ui/               # Shared layout, AuthFormCard, form footers, catalog table, padding tokens (`productCardPaddingSx`), …
├── meta/             # Repo touchpoints for landing (`EXAMPLE_SENSITIVE_PATHS`)
└── styles/           # Global CSS (product page layout, muted text)
```

- **Async data:** TanStack Query wraps `api/mock` (simulated delays, localStorage persistence).
- **Catalog UI state:** Zustand `entityCatalogUiStore` holds **only** search/filters/sort shared by **Entities** and **Favorites**.
- **Favorites ids:** `core/favorites` + `nexir.favorite-entity-ids.v1` (not a second filter store).

### Entity catalog (Entities + Favorites)

- **Single filter pipeline:** `filterAndSortEntityRecords()` in `src/core/entity-catalog-filter.ts` (pure, unit-tested).
- **Shared UI:** `EntityCatalogToolbar` + `EntityCatalogTable` under `src/features/entities/components/`.
- **Favorites:** `filterAndSortEntityRecords(rows) ∩ favoriteIds` — same toolbar state as Entities.

## Main routes

| Path | Guard | What it is |
| ---- | ----- | ---------- |
| `/` | — | Landing (redirects to `/app/dashboard` if already signed in) |
| `/workspace-map` | — | Application map |
| `/login`, `/register` | guest | Sign-in / sign-up |
| `/app/dashboard` | auth | Session summary, quick actions, recent entities |
| `/app/entities` | auth | Entity catalog |
| `/app/favorites` | auth | Starred rows, same filters as Entities |
| `/app/account` | auth | Change password (mock user registry) |
| `/app/settings` | auth | Theme + UI density (local preferences) |
| `/app/entities/:id` | auth | Detail |
| `/app/entities/:id/edit` | auth | Edit form |
| `/app/entities/new` | auth | Create |

Default authenticated entry: **`/app/dashboard`**.

## Persistence (mock)

Everything is **`localStorage`** in this browser profile: session, users/passwords (mock), preferences, entity rows, recent entity ids, **favorite entity ids**, plus **UI-only** keys such as **`nexir.sidebar-collapsed.v1`** (desktop sidenav collapsed). Keys and JSON shapes for mock data follow **[docs/REACT_MIGRATION_SPEC.md](docs/REACT_MIGRATION_SPEC.md)** §8 — do not rename those.

## UI notes

- **MUI** theming via `ThemeProvider` + `AppThemeProvider` (preferences from storage; “system” follows `prefers-color-scheme`).
- **Storybook:** `npm run storybook` — stories under `src/ui/**/*.stories.tsx` (e.g. `AuthFormCard`, `RouteMapSegmented`, `SectionCard`) and `src/features/entities/components/**/*.stories.tsx`.

## Screen copy & layout (detailed)

- **[docs/APP_UI_SPEC.md](docs/APP_UI_SPEC.md)** — verbatim copy, structure, and a short **architecture** map (router, providers, catalog store, notifications).
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — layers, conventions, and how to extend the repo without breaking boundaries.
- **[docs/REACT_MIGRATION_SPEC.md](docs/REACT_MIGRATION_SPEC.md)** — full migration / parity checklist.

## When you add a feature

1. Add a folder under `src/features/<name>/` (pages + optional `components/`).
2. Register routes in `src/app/router.tsx` under `/app` (or public routes at the top level).
3. Reuse `src/core/storage/keys.ts` for persistence keys; add mock methods in `src/api/mock/` and thin hooks in `src/queries/`.
