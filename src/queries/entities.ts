import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEntity,
  getEntityById,
  listEntities,
  updateEntity,
} from '../api/mock/entities';
import type { EntityRecord } from '../api/types/entities';
import { queryKeys } from './keys';

export function useEntitiesQuery() {
  return useQuery({
    queryKey: queryKeys.entities.list(),
    queryFn: listEntities,
  });
}

export function useEntityDetailQuery(id: string | undefined) {
  return useQuery({
    queryKey: id ? queryKeys.entities.detail(id) : ['entities', 'detail', 'none'],
    queryFn: () => getEntityById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateEntityMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createEntity,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.entities.all });
    },
  });
}

export function useUpdateEntityMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateEntity>[1] }) =>
      updateEntity(id, patch),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: queryKeys.entities.all });
      void qc.invalidateQueries({ queryKey: queryKeys.entities.detail(vars.id) });
    },
  });
}

export type { EntityRecord };
