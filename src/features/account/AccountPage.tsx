import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { readSession } from '../../core/session/sessionStorage';
import { useNotify } from '../../core/notify/useNotify';
import { useChangePasswordMutation } from '../../queries/auth';
import { accountPasswordSchema, type AccountPasswordValues } from './accountPasswordSchema';
import { Page, PageHeader } from '../../ui/layout';
import { productCardPaddingSx } from '../../ui/productCardPadding';

export function AccountPage() {
  const session = readSession();
  const notify = useNotify();
  const change = useChangePasswordMutation();

  const form = useForm<AccountPasswordValues>({
    resolver: zodResolver(accountPasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  if (!session) {
    return null;
  }

  return (
    <Page>
      <PageHeader title="Account" description="Manage password for this mock session." />

      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, mb: 0.75 }}>
          Email
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {session.email}
        </Typography>
      </Box>

      <Card
        className="nx-product-surface"
        variant="outlined"
        sx={{ width: '100%', minWidth: { xs: 'min(100%, 300px)', sm: 360 }, maxWidth: 640, alignSelf: 'stretch' }}
      >
        <CardContent sx={productCardPaddingSx}>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            Password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.65 }}>
            At least 8 characters, one uppercase letter, and one digit.
          </Typography>

          {change.isError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {(change.error as Error).message}
            </Alert>
          ) : null}

          <Stack spacing={2.5} component="form" onSubmit={form.handleSubmit(async (values) => {
            try {
              await change.mutateAsync({
                email: session.email,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
              });
              notify({ severity: 'success', message: 'Password updated.' });
              form.reset({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } catch {
              /* surfaced */
            }
          })}>
            <TextField
              type="password"
              label="Current password"
              fullWidth
              autoComplete="current-password"
              error={Boolean(form.formState.errors.currentPassword)}
              helperText={form.formState.errors.currentPassword?.message}
              {...form.register('currentPassword')}
            />
            <TextField
              type="password"
              label="New password"
              fullWidth
              autoComplete="new-password"
              error={Boolean(form.formState.errors.newPassword)}
              helperText={form.formState.errors.newPassword?.message}
              {...form.register('newPassword')}
            />
            <TextField
              type="password"
              label="Confirm new password"
              fullWidth
              autoComplete="new-password"
              error={Boolean(form.formState.errors.confirmPassword)}
              helperText={form.formState.errors.confirmPassword?.message}
              {...form.register('confirmPassword')}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
              <Button type="submit" variant="contained" size="large" disabled={change.isPending}>
                {change.isPending ? 'Updating…' : 'Update password'}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Page>
  );
}
