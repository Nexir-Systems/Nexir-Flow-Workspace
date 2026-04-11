import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, Typography } from '@mui/material';
import { MOCK_ENTITIES_SEED } from '../../../api/mock/seedEntities';
import { ResetCatalogStore } from '../../../storybook/ResetCatalogStore';
import { EntityCatalogTable } from './EntityCatalogTable';

const meta = {
  title: 'Entities/EntityCatalogTable',
  component: EntityCatalogTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Paginated catalog table with favorites column. Row click navigates to edit (MemoryRouter in Storybook).',
      },
    },
  },
  decorators: [
    (Story) => (
      <ResetCatalogStore>
        <Box sx={{ maxWidth: 1100 }}>
          <Story />
        </Box>
      </ResetCatalogStore>
    ),
  ],
} satisfies Meta<typeof EntityCatalogTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalog: Story = {
  args: {
    rows: MOCK_ENTITIES_SEED,
  },
};

export const FavoritesFilled: Story = {
  args: {
    rows: MOCK_ENTITIES_SEED,
    favoriteStarFilled: true,
  },
};

export const FewRows: Story = {
  args: {
    rows: MOCK_ENTITIES_SEED.slice(0, 3),
  },
};

export const WithIntro: Story = {
  args: { rows: MOCK_ENTITIES_SEED },
  render: () => (
    <ResetCatalogStore>
      <Stack spacing={2.5} sx={{ maxWidth: 1100 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Entity catalog
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Table + pagination; filters live in the toolbar story.
          </Typography>
        </Box>
        <EntityCatalogTable rows={MOCK_ENTITIES_SEED} />
      </Stack>
    </ResetCatalogStore>
  ),
};
