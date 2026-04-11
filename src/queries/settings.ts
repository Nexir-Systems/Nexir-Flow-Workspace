import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPreferences, updatePreferences } from '../api/mock/settings';
import type { UserPreferences } from '../api/types/preferences';
import { queryKeys } from './keys';

export function usePreferencesQuery() {
  return useQuery({
    queryKey: queryKeys.preferences.all,
    queryFn: getPreferences,
  });
}

export function useUpdatePreferencesMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<UserPreferences>) => updatePreferences(patch),
    onSuccess: (data) => {
      qc.setQueryData(queryKeys.preferences.all, data);
    },
  });
}
