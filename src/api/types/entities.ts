export type EntityStatus = 'draft' | 'active' | 'archived';

export type EntityCategory = 'general' | 'billing' | 'operations' | 'security';

export type EntityPriority = 'low' | 'medium' | 'high' | 'critical';

export type EntityActivity = {
  id: string;
  at: string;
  label: string;
};

export type EntityRecord = {
  id: string;
  name: string;
  description: string;
  status: EntityStatus;
  category: EntityCategory;
  priority: EntityPriority;
  owner: string;
  updatedAt: string;
  metadata: Record<string, string>;
  activity: EntityActivity[];
};
