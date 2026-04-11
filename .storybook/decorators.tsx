import type { Decorator } from '@storybook/react-vite';
import { StorybookProviders } from '../src/storybook/StorybookProviders';

export const withAppProviders: Decorator = (Story) => (
  <StorybookProviders>
    <Story />
  </StorybookProviders>
);
