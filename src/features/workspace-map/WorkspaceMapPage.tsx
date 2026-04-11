import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import { Link } from 'react-router';
import { SIDEBAR_WIDTH_EXPANDED_PX } from '../../app/layout/AppShellLayout';
import { STORAGE_KEYS } from '../../core/storage/keys';
import { Page, PageHeader } from '../../ui/layout';
import { RouteMapSegmented } from '../../ui/RouteMapSegmented';
import { WORKSPACE_MAP_ROUTES } from './workspaceMapRoutes';

export function WorkspaceMapPage() {
  return (
    <Page>
      <PageHeader
        title="Application map"
        description="How routes, layout, and mock data fit together. Parity with the migration spec and the Angular reference app; this repo is the React implementation."
        actions={
          <Button component={Link} to="/" variant="outlined" size="large">
            Back to home
          </Button>
        }
      />

      <Card className="nx-product-surface" variant="outlined">
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography variant="subtitle1" sx={{ mb: 0.75, fontWeight: 700 }}>
            Routes
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, letterSpacing: '0.04em', lineHeight: 1.5 }}>
            Grouped by surface: public (green) · app shell (primary) · entity flows (amber). One card, segmented sections.
          </Typography>
          <RouteMapSegmented routes={WORKSPACE_MAP_ROUTES} />
        </CardContent>
      </Card>

      <Card className="nx-product-surface" variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 3.5 } }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
            Inside /app
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            Authenticated pages render inside <code>AppShellLayout</code>: fixed sign-out (top-right), a left navigation
            drawer, and Account in the drawer footer. On desktop the drawer is permanent:{' '}
            <code>{SIDEBAR_WIDTH_EXPANDED_PX}px</code> wide when expanded, or a narrow icon rail when collapsed. A single
            icon button sits just outside the drawer edge, aligned with the brand title row (no separate chrome strip).
            Preference is stored in <code>localStorage</code> under <code>{STORAGE_KEYS.sidebarCollapsed}</code>. On small
            viewports the drawer is temporary (full labels, overlay). Primary nav: Dashboard, Entities, Favorites,
            Settings. The main region is a React Router <code>Outlet</code> — same role as the Angular shell outlet.
          </Typography>
        </CardContent>
      </Card>

      <Card className="nx-product-surface" variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 3.5 } }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
            Code layout
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" component="div" sx={{ lineHeight: 1.75 }}>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <li>
                <code>src/app/</code> — router, providers, layouts (public + shell).
              </li>
              <li>
                <code>src/core/</code> — storage keys/helpers, session helpers, theme, notifications, shared validation,
                favorites/recent helpers.
              </li>
              <li>
                <code>src/api/mock/</code> — async mock services (no React).
              </li>
              <li>
                <code>src/queries/</code> — TanStack Query hooks + keys.
              </li>
              <li>
                <code>src/stores/</code> — shared UI state for the entity catalog (filters/sort).
              </li>
              <li>
                <code>src/features/</code> — product screens (vertical slices).
              </li>
              <li>
                <code>src/ui/</code> — shared building blocks (layout, cards, empty states, catalog).
              </li>
            </Box>
          </Typography>
        </CardContent>
      </Card>

      <Card className="nx-product-surface" variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 3.5 } }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
            Data & mocks
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            There is no backend. Authentication, entities, and preferences are persisted in <code>localStorage</code>{' '}
            using fixed keys (session, users registry, entities, favorites, recent ids, preferences). The mock layer
            applies small delays to resemble network calls — as specified for parity with the reference app.
          </Typography>
        </CardContent>
      </Card>
    </Page>
  );
}
