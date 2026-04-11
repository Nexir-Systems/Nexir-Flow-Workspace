import { alpha, createTheme } from '@mui/material/styles';
import type { DensityPreference, ThemePreference } from '../../api/types/preferences';

function resolveMode(
  pref: ThemePreference,
  systemPrefersDark: boolean,
): 'light' | 'dark' {
  if (pref === 'system') return systemPrefersDark ? 'dark' : 'light';
  return pref;
}

/** MUI theme: mode from prefs + `system`; spacing scales down when density is `compact`. */
export function createAppTheme(
  pref: ThemePreference,
  density: DensityPreference,
  systemPrefersDark: boolean,
) {
  const mode = resolveMode(pref, systemPrefersDark);
  /** Stronger contrast: compact is noticeably tighter than comfortable. */
  const spacingUnit = density === 'compact' ? 6 : 9;

  const surface =
    mode === 'dark'
      ? {
          subtle: 'rgba(255,255,255,0.035)',
          hover: 'rgba(255,255,255,0.065)',
          focus: 'rgba(255,255,255,0.07)',
        }
      : {
          subtle: 'rgba(15,23,42,0.02)',
          hover: 'rgba(15,23,42,0.035)',
          focus: 'rgba(15,23,42,0.04)',
        };

  const primaryMain = mode === 'dark' ? '#8fa8ff' : '#303f9f';

  const textSecondary = mode === 'dark' ? '#9ca3b8' : '#5c6473';

  const bgDefault = mode === 'dark' ? '#0c0e12' : '#eef0f4';
  const bgPaper = mode === 'dark' ? '#14171f' : '#ffffff';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryMain,
        dark: mode === 'dark' ? '#b4c4ff' : '#1a237e',
        light: mode === 'dark' ? '#c5d3ff' : '#5c6bc0',
      },
      text: {
        primary: mode === 'dark' ? '#e8eaf0' : '#141824',
        secondary: textSecondary,
      },
      background: {
        default: bgDefault,
        paper: bgPaper,
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(15,23,42,0.09)',
      action: {
        hover: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.05)',
        selected: mode === 'dark' ? 'rgba(143,168,255,0.14)' : 'rgba(48,63,159,0.10)',
      },
    },
    shape: { borderRadius: 12 },
    spacing: spacingUnit,
    typography: {
      fontFamily: '"Roboto", "Helvetica Neue", "Arial", sans-serif',
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
      },
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.2,
        fontSize: '1.625rem',
      },
      h5: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25 },
      h6: { fontWeight: 700, letterSpacing: '-0.01em' },
      subtitle1: { fontWeight: 600, letterSpacing: '0.01em' },
      subtitle2: { fontWeight: 600, letterSpacing: '0.02em', fontSize: '0.875rem' },
      body1: { lineHeight: 1.65 },
      body2: { lineHeight: 1.6 },
      caption: { letterSpacing: '0.02em', fontSize: '0.8125rem' },
      overline: { letterSpacing: '0.12em', fontWeight: 600, fontSize: '0.75rem' },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: bgDefault,
            backgroundImage:
              mode === 'dark'
                ? 'radial-gradient(ellipse 900px 520px at 12% -8%, rgba(143,168,255,0.09), transparent 55%), linear-gradient(180deg, #0c0e12 0%, #0e1016 100%)'
                : 'radial-gradient(ellipse 900px 520px at 12% -8%, rgba(48,63,159,0.06), transparent 55%), linear-gradient(180deg, #eef0f4 0%, #e8eaef 100%)',
            minHeight: '100vh',
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 10,
            paddingInline: 20,
            transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
          },
          sizeLarge: { paddingInline: 24, paddingBlock: 11, borderRadius: 11 },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 10,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 11,
            backgroundColor: surface.subtle,
            transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
            '&:hover': {
              backgroundColor: surface.hover,
            },
            '&.Mui-focused': {
              backgroundColor: surface.focus,
              boxShadow: `0 0 0 1px ${alpha(primaryMain, mode === 'dark' ? 0.5 : 0.4)}`,
            },
            '& fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)',
            },
            '&.Mui-focused fieldset': {
              borderWidth: 1,
              borderColor: alpha(primaryMain, 0.85),
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)',
            boxShadow:
              mode === 'dark'
                ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 48px rgba(0,0,0,0.28)'
                : '0 1px 0 rgba(255,255,255,0.75) inset, 0 10px 36px rgba(15,23,42,0.05)',
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: { padding: '22px 28px 14px' },
          title: { fontSize: '1.0625rem', fontWeight: 700, letterSpacing: '-0.01em' },
          subheader: { marginTop: 6, lineHeight: 1.5 },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '18px 28px 28px',
            '&:last-child': { paddingBottom: 28 },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.02em',
            color: textSecondary,
            borderBottom: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.09)',
          },
          body: { paddingTop: 16, paddingBottom: 16, fontSize: '0.875rem' },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:last-child td': { borderBottom: 0 },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          toolbar: { paddingLeft: 20, paddingRight: 12, minHeight: 56 },
          selectLabel: { textTransform: 'none', fontWeight: 500 },
          displayedRows: { textTransform: 'none', fontWeight: 500 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 11 },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)',
          },
        },
      },
    },
  });
}
