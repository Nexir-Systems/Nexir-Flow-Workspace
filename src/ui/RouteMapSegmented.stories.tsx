import type { Meta, StoryObj } from '@storybook/react-vite';
import { RouteMapSegmented } from './RouteMapSegmented';
import { WORKSPACE_MAP_ROUTES } from '../features/workspace-map/workspaceMapRoutes';

const meta = {
  title: 'UI/RouteMapSegmented',
  component: RouteMapSegmented,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Application map grouped routes — one surface, color segments (public / app shell / entity).',
      },
    },
  },
} satisfies Meta<typeof RouteMapSegmented>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WorkspaceRoutes: Story = {
  args: {
    routes: WORKSPACE_MAP_ROUTES,
  },
};
