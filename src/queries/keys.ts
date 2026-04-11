export const queryKeys = {
  entities: {
    all: ['entities'] as const,
    list: () => [...queryKeys.entities.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.entities.all, 'detail', id] as const,
  },
  preferences: {
    all: ['preferences'] as const,
  },
} as const;
