import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, Stack, Typography } from '@mui/material';
import { SectionCard } from './SectionCard';

const meta = {
  title: 'UI/SectionCard',
  component: SectionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Outlined section surface used across dashboard and settings — matches Nexir card radius and header rhythm.',
      },
    },
  },
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    title: 'Section title',
    subheader: 'Optional subtitle for context',
    children: (
      <Typography variant="body2" color="text.secondary">
        Body copy uses theme typography and spacing from CardContent overrides.
      </Typography>
    ),
  },
};

export const DenseActions: Story = {
  args: {
    title: 'Quick actions',
    children: (
      <Stack spacing={1.5} sx={{ maxWidth: 360 }}>
        <Button variant="contained" fullWidth>
          Primary action
        </Button>
        <Button variant="outlined" fullWidth>
          Secondary
        </Button>
      </Stack>
    ),
  },
};

export const NoTitle: Story = {
  args: {
    children: (
      <Typography variant="body2">
        Content-only card — header slot omitted; padding adjusts automatically.
      </Typography>
    ),
  },
};

export const GridOfCards: Story = {
  args: {
    children: ' ',
  },
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        maxWidth: 900,
      }}
    >
      <SectionCard title="Alpha" subheader="First column">
        <Typography variant="body2" color="text.secondary">
          Use grids for dashboard tiles.
        </Typography>
      </SectionCard>
      <SectionCard title="Beta" subheader="Second column">
        <Typography variant="body2" color="text.secondary">
          Consistent radius and shadows from theme.
        </Typography>
      </SectionCard>
    </Box>
  ),
};
