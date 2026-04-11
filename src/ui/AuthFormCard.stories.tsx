import { Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthFormCard } from './AuthFormCard';
import { StorybookProviders } from '../storybook/StorybookProviders';
import { authAccountSwitchLinkSx } from './authFormStyles';

const meta = {
  title: 'UI/AuthFormCard',
  component: AuthFormCard,
  decorators: [
    (Story) => (
      <StorybookProviders>
        <Story />
      </StorybookProviders>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AuthFormCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: (
      <>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          Sign in
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
          No account?{' '}
          <MuiLink component={Link} to="/register" sx={authAccountSwitchLinkSx}>
            Create account
          </MuiLink>
        </Typography>
        <Stack spacing={3} component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField label="Email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button type="submit" variant="contained" size="large">
            Sign in
          </Button>
        </Stack>
      </>
    ),
  },
};
