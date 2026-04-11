import { useLayoutEffect, type ReactNode } from 'react';
import { useEntityCatalogUiStore } from '../stores/entityCatalogUiStore';

/** Runs once on mount — avoids calling `resetFilters()` in render (Zustand update → re-render loop in Storybook). */
export function ResetCatalogStore({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    useEntityCatalogUiStore.getState().resetFilters();
  }, []);
  return <>{children}</>;
}
