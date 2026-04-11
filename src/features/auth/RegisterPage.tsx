import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { PASSWORD_RULES_HINT } from '../../core/validation/password';
import { useNotify } from '../../core/notify/useNotify';
import { useRegisterMutation } from '../../queries/auth';
import { AuthFormCard, AuthPage } from '../../ui/layout';
import { authAccountSwitchLinkSx } from '../../ui/authFormStyles';
import { registerSchema, type RegisterFormValues } from './registerSchema';

export function RegisterPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const reg = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <AuthPage>
      <AuthFormCard>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: '1.5rem', sm: '1.625rem' } }}>
          Create account
        </Typography>
        <Box sx={{ mt: 2, mb: 2.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" sx={authAccountSwitchLinkSx}>
              Sign in
            </MuiLink>
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.65 }}>
          {PASSWORD_RULES_HINT}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(async (values) => {
            try {
              await reg.mutateAsync(values);
              notify({ severity: 'success', message: 'Account created. You are signed in.' });
              navigate('/app/dashboard');
            } catch {
              /* surfaced */
            }
          })}
        >
          {reg.isError ? (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {(reg.error as Error).message}
            </Alert>
          ) : null}
          <Stack spacing={3}>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="new-password"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" variant="contained" size="large" disabled={reg.isPending}>
              {reg.isPending ? 'Creating…' : 'Create account'}
            </Button>
          </Stack>
        </Box>

        <Button component={Link} to="/" variant="text" color="inherit" fullWidth sx={{ mt: 4, pt: 0.5, color: 'text.secondary', fontSize: '1rem' }}>
          Back to home
        </Button>
      </AuthFormCard>
    </AuthPage>
  );
}
