import { QueryClient } from '@tanstack/react-query';

/** Shared TanStack Query defaults for mock API + localStorage-backed data. */
export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
      },
    },
  });
}
