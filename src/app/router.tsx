import { Box, CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { loaderGuestOnly, loaderLanding, loaderRequireAuth } from './authLoaders';
import { AppShellLayout } from './layout/AppShellLayout';

const PageLoading = () => (
  <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
);

const LandingPage = lazy(async () => {
  const m = await import('../features/landing/LandingPage');
  return { default: m.LandingPage };
});
const WorkspaceMapPage = lazy(async () => {
  const m = await import('../features/workspace-map/WorkspaceMapPage');
  return { default: m.WorkspaceMapPage };
});
const LoginPage = lazy(async () => {
  const m = await import('../features/auth/LoginPage');
  return { default: m.LoginPage };
});
const RegisterPage = lazy(async () => {
  const m = await import('../features/auth/RegisterPage');
  return { default: m.RegisterPage };
});
const DashboardPage = lazy(async () => {
  const m = await import('../features/dashboard/DashboardPage');
  return { default: m.DashboardPage };
});
const EntitiesListPage = lazy(async () => {
  const m = await import('../features/entities/pages/EntitiesListPage');
  return { default: m.EntitiesListPage };
});
const EntityCreatePage = lazy(async () => {
  const m = await import('../features/entities/pages/EntityCreatePage');
  return { default: m.EntityCreatePage };
});
const EntityEditPage = lazy(async () => {
  const m = await import('../features/entities/pages/EntityEditPage');
  return { default: m.EntityEditPage };
});
const EntityDetailPage = lazy(async () => {
  const m = await import('../features/entities/pages/EntityDetailPage');
  return { default: m.EntityDetailPage };
});
const FavoritesPage = lazy(async () => {
  const m = await import('../features/favorites/FavoritesPage');
  return { default: m.FavoritesPage };
});
const AccountPage = lazy(async () => {
  const m = await import('../features/account/AccountPage');
  return { default: m.AccountPage };
});
const SettingsPage = lazy(async () => {
  const m = await import('../features/settings/SettingsPage');
  return { default: m.SettingsPage };
});

/** Public vs `/app/*` shell; lazy features; static route order matters when paths overlap (`entities/new` before `entities/:id`). */
const router = createBrowserRouter([
  {
    path: '/',
    loader: loaderLanding,
    element: (
      <Suspense fallback={<PageLoading />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: '/workspace-map',
    element: (
      <Suspense fallback={<PageLoading />}>
        <WorkspaceMapPage />
      </Suspense>
    ),
  },
  {
    path: '/login',
    loader: loaderGuestOnly,
    element: (
      <Suspense fallback={<PageLoading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    loader: loaderGuestOnly,
    element: (
      <Suspense fallback={<PageLoading />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: '/app',
    loader: loaderRequireAuth,
    element: <AppShellLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoading />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'entities/new',
        element: (
          <Suspense fallback={<PageLoading />}>
            <EntityCreatePage />
          </Suspense>
        ),
      },
      {
        path: 'entities/:id/edit',
        element: (
          <Suspense fallback={<PageLoading />}>
            <EntityEditPage />
          </Suspense>
        ),
      },
      {
        path: 'entities/:id',
        element: (
          <Suspense fallback={<PageLoading />}>
            <EntityDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'entities',
        element: (
          <Suspense fallback={<PageLoading />}>
            <EntitiesListPage />
          </Suspense>
        ),
      },
      {
        path: 'favorites',
        element: (
          <Suspense fallback={<PageLoading />}>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<PageLoading />}>
            <AccountPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoading />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
