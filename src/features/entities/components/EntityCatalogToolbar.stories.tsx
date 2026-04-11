import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, Typography } from '@mui/material';
import { EntityCatalogToolbar } from './EntityCatalogToolbar';
import { ResetCatalogStore } from '../../../storybook/ResetCatalogStore';

const meta = {
  title: 'Entities/EntityCatalogToolbar',
  component: EntityCatalogToolbar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Catalog filters backed by `entityCatalogUiStore` — shared by Entities and Favorites. Spacing and inputs follow the global Nexir theme.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ResetCatalogStore>
        <Box sx={{ maxWidth: 960 }}>
          <Story />
        </Box>
      </ResetCatalogStore>
    ),
  ],
} satisfies Meta<typeof EntityCatalogToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  render: () => (
    <ResetCatalogStore>
      <Stack spacing={2} sx={{ maxWidth: 960 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Toolbar inside a typical catalog card header
        </Typography>
        <Box
          sx={{
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }}
        >
          <EntityCatalogToolbar />
        </Box>
      </Stack>
    </ResetCatalogStore>
  ),
};
