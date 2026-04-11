import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { createAppQueryClient } from '../core/query/createAppQueryClient';
import { NotifyProvider } from '../core/notify/NotifyProvider';
import { AppThemeProvider } from '../core/theme/AppThemeProvider';

/**
 * Provider order: Query → theme (MUI + prefs) → toasts.
 * Theme must wrap components that call `useTheme` / `useMediaQuery`.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(() => createAppQueryClient());

  return (
    <QueryClientProvider client={client}>
      <AppThemeProvider>
        <NotifyProvider>{children}</NotifyProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}
