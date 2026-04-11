import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo, type ReactNode } from 'react';
import { usePreferencesQuery } from '../../queries/settings';
import { createAppTheme } from './appTheme';

/** Subscribes to stored preferences and resolves `system` theme via `prefers-color-scheme`. */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { data: prefs } = usePreferencesQuery();
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => {
    const p = prefs ?? { theme: 'system' as const, density: 'comfortable' as const };
    return createAppTheme(p.theme, p.density, systemDark);
  }, [prefs, systemDark]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
