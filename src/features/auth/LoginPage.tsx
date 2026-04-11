import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useLoginMutation } from '../../queries/auth';
import { useNotify } from '../../core/notify/useNotify';
import { AuthFormCard, AuthPage } from '../../ui/layout';
import { authAccountSwitchLinkSx } from '../../ui/authFormStyles';
import { loginSchema, type LoginFormValues } from './loginSchema';
import { loginTextFieldShared } from './loginFormFieldProps';

export function LoginPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const login = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } });

  const emailReg = register('email');
  const passwordReg = register('password');

  return (
    <AuthPage>
      <AuthFormCard>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: '1.5rem', sm: '1.625rem' } }}>
          Sign in
        </Typography>
        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
            No account?{' '}
            <MuiLink component={Link} to="/register" sx={authAccountSwitchLinkSx}>
              Create account
            </MuiLink>
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ position: 'relative' }}
          onSubmit={handleSubmit(async (values) => {
            try {
              await login.mutateAsync(values);
              notify({ severity: 'success', message: 'Signed in.' });
              navigate('/app/dashboard');
            } catch {
              /* surfaced below */
            }
          })}
        >
          {login.isError ? (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {(login.error as Error).message}
            </Alert>
          ) : null}
          <Box
            component="span"
            sx={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              whiteSpace: 'nowrap',
            }}
            aria-hidden
          >
            <input type="text" name="nx_fake_user" tabIndex={-1} autoComplete="off" defaultValue="" />
            <input type="password" name="nx_fake_pass" tabIndex={-1} autoComplete="off" defaultValue="" />
          </Box>
          <Stack spacing={3}>
            <TextField
              label="Email"
              type="text"
              inputMode="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              inputRef={emailReg.ref}
              name={emailReg.name}
              onBlur={emailReg.onBlur}
              onChange={emailReg.onChange}
              {...loginTextFieldShared}
            />
            <TextField
              label="Password"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              inputRef={passwordReg.ref}
              name={passwordReg.name}
              onBlur={passwordReg.onBlur}
              onChange={passwordReg.onChange}
              {...loginTextFieldShared}
            />
            <Button type="submit" variant="contained" size="large" disabled={login.isPending}>
              {login.isPending ? 'Signing in…' : 'Sign in'}
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
