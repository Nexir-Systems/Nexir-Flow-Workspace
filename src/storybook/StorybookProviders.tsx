import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo, useState, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { NotifyProvider } from '../core/notify/NotifyProvider';
import { createAppTheme } from '../core/theme/appTheme';

/** Isolated client + relaxed retries so stories don’t flake; not the same defaults as the app shell. */
export function StorybookProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, staleTime: 60_000 },
        },
      }),
  );
  const theme = useMemo(() => createAppTheme('light', 'comfortable', false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotifyProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </NotifyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
