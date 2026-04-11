import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNotify } from '../../core/notify/useNotify';
import { usePreferencesQuery, useUpdatePreferencesMutation } from '../../queries/settings';
import type { DensityPreference, ThemePreference, UserPreferences } from '../../api/types/preferences';
import { Page, PageHeader } from '../../ui/layout';
import { productCardPaddingSx } from '../../ui/productCardPadding';

export function SettingsPage() {
  const notify = useNotify();
  const pq = usePreferencesQuery();
  const update = useUpdatePreferencesMutation();

  const form = useForm<UserPreferences>({
    defaultValues: { theme: 'system', density: 'comfortable' },
  });

  useEffect(() => {
    if (pq.data) {
      form.reset(pq.data);
    }
  }, [pq.data, form]);

  if (pq.isLoading && !pq.data) {
    return (
      <Page sx={{ minHeight: '40vh', justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <CircularProgress size={32} />
          <Typography variant="body2" color="text.secondary">
            Loading preferences…
          </Typography>
        </Stack>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title="Settings"
        description="Local mock preferences for appearance. Changes apply after save."
      />

      <Card
        className="nx-product-surface"
        variant="outlined"
        sx={{
          width: '100%',
          minWidth: { xs: 'min(100%, 300px)', sm: 360 },
          maxWidth: 640,
          alignSelf: 'stretch',
        }}
      >
        <CardContent sx={productCardPaddingSx}>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Appearance
          </Typography>

          <Stack spacing={3} component="form" onSubmit={form.handleSubmit(async (values) => {
            try {
              await update.mutateAsync(values);
              notify({ severity: 'success', message: 'Preferences saved.' });
            } catch (e) {
              notify({ severity: 'error', message: (e as Error).message });
            }
          })}>
            <FormControl fullWidth>
              <InputLabel id="theme-label">Theme</InputLabel>
              <Controller
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <Select labelId="theme-label" label="Theme" {...field}>
                    <MenuItem value={'system' satisfies ThemePreference}>System</MenuItem>
                    <MenuItem value={'light' satisfies ThemePreference}>Light</MenuItem>
                    <MenuItem value={'dark' satisfies ThemePreference}>Dark</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="density-label">Density</InputLabel>
              <Controller
                control={form.control}
                name="density"
                render={({ field }) => (
                  <Select labelId="density-label" label="Density" {...field}>
                    <MenuItem value={'comfortable' satisfies DensityPreference}>Comfortable</MenuItem>
                    <MenuItem value={'compact' satisfies DensityPreference}>Compact</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
              <Button type="submit" variant="contained" size="large" disabled={update.isPending}>
                {update.isPending ? 'Saving…' : 'Save preferences'}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Page>
  );
}
