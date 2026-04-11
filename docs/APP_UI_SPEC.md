# Nexir Flow Workspace — UI specification

Verbatim **English** copy and **screen structure** as implemented. Use this when changing flows or strings. **Source of truth for routes:** [README.md](../README.md). **Layering and conventions:** [ARCHITECTURE.md](./ARCHITECTURE.md). Behavior matches **[REACT_MIGRATION_SPEC.md](./REACT_MIGRATION_SPEC.md)** (Angular reference described there; this repo is the React implementation).

---

## Architecture (developer map)

- **`src/app/router.tsx`** — Route tree and lazy-loaded feature chunks; static route order matters where paths overlap (e.g. `entities/new` before `entities/:id`).
- **`src/app/layout/AppShellLayout.tsx`** + **`useSidebarCollapsed.ts`** — Authenticated shell: left drawer, fixed **Sign out**, `Outlet`; desktop **260px** expanded / **72px** icon rail; one **IconButton** absolutely placed just outside the drawer, aligned with the brand title row (**double-arrow** icons), persistence **`STORAGE_KEYS.sidebarCollapsed`**.
- **`src/app/authLoaders.ts`** — Session checks: landing redirect, guest-only auth pages, `/app/*` guard.
- **`src/app/providers.tsx`** — Wrapper order: **TanStack Query** → **MUI theme** (`AppThemeProvider`) → **`NotifyProvider`** (toasts). Theme must wrap anything using `useTheme` / `useMediaQuery`.
- **`src/core/query/createAppQueryClient.ts`** — Shared default query options for the app shell (stale time, retries).
- **`src/stores/entityCatalogUiStore.ts`** — Shared search/filter/sort for **Entities** and **Favorites**; `resetPageSignal` coordinates table pagination resets.
- **`src/ui/AuthFormCard.tsx`** + **`src/ui/productCardPadding.ts`** — Login/register use `AuthFormCard` with **`authFormCardPaddingSx`** (roomier than other cards). Account, settings, and entity form/action cards use **`productCardPaddingSx`**.
- **`src/features/auth/loginFormFieldProps.ts`** — Shared props for both sign-in text fields (autocomplete hints + autofill `sx`).
- **`src/ui/RouteMapSegmented.tsx`** + **`src/features/workspace-map/workspaceMapRoutes.ts`** — Application map lists routes in one segmented surface (public / app shell / entity), with app-shell paths ordered dashboard → account → settings.

---

## Global

- **Document title:** `Nexir Flow Workspace`
- **HTML `lang`:** `en`
- **Typography:** Roboto (Google Fonts); **icons:** `@mui/icons-material` (Outlined).
- **Theming:** Theme (system / light / dark) and density (comfortable / compact) from **Settings**; applied via MUI `ThemeProvider` + preferences in `localStorage` (`nexir.preferences.v1`).
- **Brand name (full string):** Only **two** UI surfaces show **“Nexir Flow Workspace”** as visible primary text: the **landing hero H1** (`/`) and the **expanded app shell sidebar** brand row. When the sidebar is **collapsed** (desktop), the visible mark is **“N”** with the full name in a **tooltip** only — not a third full-text surface. No separate eyebrow/overline above the hero title.
- **Typography floor:** Theme avoids the smallest default sizes: `caption`, `overline`, `subtitle2`, and table headers are one step larger than the previous minimums for readability.

---

## Route: `/` — Landing

**Layout:** `Page` / `nx-product-page` — vertical stack.

### Hero (`nx-product-surface`)

- **Title (H1):** `Nexir Flow Workspace` (brand gradient / emphasis) — sole brand line in this block.
- **Lead:** `A neutral product shell for authentication, routing, entities, and local preferences—ready for focused engineering tasks.`
- **Actions:** `Sign in` → `/login` · `Create account` → `/register`

### Section — “Explore the app”

- **Subtitle:** `Structure and routes`
- **Lead:** `Open the application map for a concise overview of routes, layers, and where mock data lives in this repository.`
- **Button:** `View application map` → `/workspace-map`

### Section — “Where to start in the repo”

- **Subtitle:** `Repository entry points`
- **Supporting line:** Notes parity with the Angular reference tree.
- **List:** Label, path (`code` chip), hint — from `EXAMPLE_SENSITIVE_PATHS` (`src/meta/examplePaths.ts`).

### Info panel — “Access”

- **Title:** `Access`
- **Body:** Routes under `/app` require a session; use inline links **Sign in** → `/login` and **Create account** → `/register` to continue.

---

## Route: `/workspace-map` — Application map

- **Title:** `Application map`
- **PageHeader description:** `How routes, layout, and mock data fit together. Parity with the migration spec and the Angular reference app; this repo is the React implementation.`
- **Primary action:** `Back to home` → `/`
- **Routes card — caption:** `Grouped by surface: public (green) · app shell (primary) · entity flows (amber). One card, segmented sections.`
- **Routes section:** **`RouteMapSegmented`** — one outlined card, three stacked segments (dividers between): **Public** (green accent), **App shell** (primary — rows from `WORKSPACE_MAP_ROUTES` with `kind: 'auth'`: dashboard, account, settings), **Entity flows** (amber). Each row: monospace path + note.
- **Card — “Inside /app” — body (verbatim):** `Authenticated pages render inside AppShellLayout: fixed sign-out (top-right), a left navigation drawer, and Account in the drawer footer. On desktop the drawer is permanent: 260px wide when expanded, or a narrow icon rail when collapsed. A single icon button sits just outside the drawer edge, aligned with the brand title row (no separate chrome strip). Preference is stored in localStorage under nexir.sidebar-collapsed.v1. On small viewports the drawer is temporary (full labels, overlay). Primary nav: Dashboard, Entities, Favorites, Settings. The main region is a React Router Outlet — same role as the Angular shell outlet.` (Width and key are rendered from `SIDEBAR_WIDTH_EXPANDED_PX` and `STORAGE_KEYS.sidebarCollapsed` in `WorkspaceMapPage.tsx`.)
- **Card — “Code layout”:** Bullet list of `src/` areas as on screen (`src/app/` … `src/ui/`).
- **Card — “Data & mocks”:** Body on `localStorage`, keys, mock delays — as on screen.

---

## Route: `/login` — Sign in (guest guard)

**Layout:** `AuthPage` + **`AuthFormCard`** (`nx-product-surface`), generous padding, no tabs.

- **Title:** `Sign in`
- **Subtitle:** `No account?` + link **`Create account`** → `/register` (body scale link, not a second headline; spacing below before the form)
- **Fields:** Email + Password share **`loginTextFieldShared`** (`src/features/auth/loginFormFieldProps.ts`): same `size`, `fullWidth`, `slotProps.htmlInput`, and **`loginFieldAutofillSx`**. Form `autoComplete="off"` + decoy inputs; email uses **`type="text"`** + **`inputMode="email"`**; password **`type="password"`** — only where the platform requires it.
- **Submit:** `Sign in` / `Signing in…`
- **Footer:** `Back to home` → `/`

---

## Route: `/register` — Create account (guest guard)

**Layout:** Same as login — **`AuthFormCard`**, shared padding.

- **Title:** `Create account`
- **Subtitle:** `Already have an account?` + link **`Sign in`** → `/login`
- **Rules line:** Password rules hint (`PASSWORD_RULES_HINT`) — body2, clear separation before fields
- **Submit:** `Create account` / `Creating…`
- **Footer:** `Back to home` → `/`

---

## Route: `/app/*` — Shell (auth)

### Sidenav

- **Width (desktop):** **260px** expanded (`SIDEBAR_WIDTH_EXPANDED_PX`); **~72px** collapsed icon rail. **Mobile:** temporary drawer, always full labels (260px paper), hamburger opens it.
- **Collapse:** On desktop, one **IconButton** sits just outside the drawer’s right edge, vertically aligned with the brand title row (**double-arrow** icons). No extra strip or bar—only the control. Preference in **`localStorage`** (`STORAGE_KEYS.sidebarCollapsed` / `nexir.sidebar-collapsed.v1`). Not shown on mobile (drawer is overlay-only).
- **Brand:** Expanded — one-line `Nexir Flow Workspace` (subtitle-scale, ellipsis if needed). Collapsed — **“N”** + tooltip with the full product name.
- **Nav:** Dashboard, Entities, Favorites, Settings; **Divider** (generous vertical margin) then footer **Account**. Nav labels use **`ShellNavItem`**; when collapsed, icons only + **Tooltip** (right).
- **Dividers:** Extra vertical spacing between brand block, scrollable nav, and Account block.

### Chrome

- **Sign out:** fixed top-right (not an app bar title strip)

---

## Route: `/app/dashboard`

- **Title:** `Dashboard`
- **Description:** Entry point to catalog data and preferences.
- **Overview card:** Signed-in email, entity count.
- **Quick actions:** Grid of buttons — Create entity, Browse entities, Favorites, Account, Settings.
- **Recent records:** `RecentEntitiesSection` — up to six, newest first.

---

## Route: `/app/entities`

- **Title / description** as on screen; **New entity** primary action.
- **Catalog:** `EntityCatalogToolbar` + `EntityCatalogTable`; star toggles favorites; row opens edit.
- **Toolbar:** Full-width row: **Search** on the **left** (flexes up to ~480px); **Status, Category, Sort, Asc/Desc** grouped on the **right** (`justifyContent: flex-end` on `md+`). `size="small"` throughout.

---

## Route: `/app/favorites`

- Same **`EntityCatalogToolbar`** / table as Entities; rows restricted to favorited ids; **All entities** link.

---

## Route: `/app/entities/new`

- **New entity** header; form sections in `EntityFormFields`; card padding uses **`productCardPaddingSx`**; **Recent records** block; footer: **Cancel** (left), **Generate sample data** + **Create entity** (right).

---

## Route: `/app/entities/:id`

- Back link **Entities**; title + status badge + id; sections Overview, Metadata, Activity.

---

## Route: `/app/entities/:id/edit`

- **Edit entity**; same card padding as create; same footer pattern (**Cancel** / **Generate** / **Save changes**).

---

## Route: `/app/account`

- **Account** header; **Email** label + address; password card uses **`productCardPaddingSx`** (`CardContent`); form fields use theme defaults.

---

## Route: `/app/settings`

- **Settings**; Appearance card uses **`productCardPaddingSx`**; Theme, Density; **Save preferences**.

---

## Notifications

- **`useNotify` / `NotifyProvider`** — Snackbar bottom-right; **single visual treatment**: `Paper` (primary fill) + one line of `Typography` + dismiss `IconButton` — horizontally centered, no `Alert` layout (avoids misaligned message vs. close control). Call sites may still pass `severity` for code clarity; the UI does not switch palette per severity.

---

*For field-level validation, storage keys, and mock API delays, see **[REACT_MIGRATION_SPEC.md](./REACT_MIGRATION_SPEC.md)**.*
