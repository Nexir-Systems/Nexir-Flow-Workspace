# Architecture — Nexir Flow Workspace

Short map for **onboarding** and **refactors**. Detailed UI copy lives in **[APP_UI_SPEC.md](./APP_UI_SPEC.md)**; parity with the Angular reference in **[REACT_MIGRATION_SPEC.md](./REACT_MIGRATION_SPEC.md)**.

## Layers (dependency direction)

| Layer | Path | Role |
| ----- | ---- | ---- |
| **App shell** | `src/app/` | Router, route loaders, `AppProviders`, `AppShellLayout` (desktop: permanent sidenav **260px** / icon rail; collapse **IconButton** outside drawer, title-aligned; `useSidebarCollapsed`; `STORAGE_KEYS.sidebarCollapsed`) |
| **Core** | `src/core/` | Session, storage keys, theme, notify, validation helpers, entity filter pure functions, favorites/recent |
| **API** | `src/api/mock/` | Async mock services — **no React** |
| **Queries** | `src/queries/` | TanStack Query hooks + stable query keys |
| **Stores** | `src/stores/` | Cross-feature UI state (e.g. entity catalog filters) |
| **Features** | `src/features/<area>/` | Vertical slices: pages + local `components/` |
| **UI** | `src/ui/` | Shared layout, cards, catalog table, tokens (`productCardPaddingSx`) |

**Rule of thumb:** `features/*` imports `queries`, `core`, `ui`; **`api/mock` does not import** from `features` or `ui`.

## Conventions

- **New screen:** `src/features/<name>/` — `*Page.tsx` at root of the feature folder or under `pages/` if you split many routes.
- **Shared form patterns:** e.g. `features/auth/loginFormFieldProps.ts` keeps login fields in sync; `ui/AuthFormCard` for auth card chrome.
- **Notifications:** `useNotify()` from `NotifyProvider` — single primary-styled snackbar (`src/core/notify/`).
- **Persistence keys:** `src/core/storage/keys.ts` (and migration spec) — do not rename storage keys casually.

## Scalability

- **Routes:** Lazy-loaded chunks in `src/app/router.tsx`; loader order documented in-file.
- **Catalog:** One Zustand store + one filter pipeline (`core/entity-catalog-filter.ts`) shared by Entities and Favorites.
- **Theming:** `AppThemeProvider` reads preferences; `createAppTheme` in `core/theme/appTheme.ts`.

## Folder hygiene

- Prefer **feature-local** components until a second feature needs them — then move to `src/ui/`.
- **`meta/`** — static data for marketing/landing only.
- **`styles/`** — global CSS utilities; prefer MUI `sx` / theme for new UI.
