import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Paper, Snackbar, Typography } from '@mui/material';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { NotifyContext, type NotifyOptions } from './notifyContext';

/**
 * Global snackbar: primary-filled surface; message + dismiss share one horizontal flex row (no Alert icon slot quirks).
 */
export function NotifyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const notify = useCallback((opts: NotifyOptions) => {
    setMessage(opts.message);
    setOpen(true);
  }, []);

  const value = useMemo(() => notify, [notify]);

  return (
    <NotifyContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          setOpen(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Paper
          elevation={6}
          role="status"
          aria-live="polite"
          sx={(t) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1.25,
            pl: 2,
            pr: 0.5,
            minHeight: 48,
            maxWidth: 'min(calc(100vw - 32px), 420px)',
            bgcolor: t.palette.primary.main,
            color: t.palette.primary.contrastText,
            borderRadius: 1.5,
          })}
        >
          <Typography variant="body2" component="div" sx={{ flex: '1 1 auto', py: 0.25, lineHeight: 1.5 }}>
            {message}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setOpen(false)}
            aria-label="Dismiss notification"
            sx={{ color: 'inherit', flexShrink: 0 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      </Snackbar>
    </NotifyContext.Provider>
  );
}
