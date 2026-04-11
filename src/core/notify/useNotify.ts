import { useContext } from 'react';
import { NotifyContext, type NotifyContextValue } from './notifyContext';

export function useNotify(): NotifyContextValue {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error('useNotify must be used within NotifyProvider');
  return ctx;
}
