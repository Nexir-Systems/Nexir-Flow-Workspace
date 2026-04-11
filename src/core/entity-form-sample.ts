import type { EntityRecord } from '../api/types/entities';

export function getSampleEntityPayload(): Pick<
  EntityRecord,
  'name' | 'description' | 'status' | 'category' | 'priority' | 'owner'
> {
  return {
    name: 'Sample entity',
    description: 'Generated sample values for quick iteration.',
    status: 'draft',
    category: 'general',
    priority: 'medium',
    owner: 'Sample Owner',
  };
}
