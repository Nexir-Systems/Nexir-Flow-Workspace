import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../../core/storage/keys';

function readInitial(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEYS.sidebarCollapsed) === '1';
  } catch {
    return false;
  }
}

/** Desktop sidenav collapsed state; persisted under `STORAGE_KEYS.sidebarCollapsed`. */
export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, collapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  const toggle = () => setCollapsed((c) => !c);

  return { collapsed, toggle };
}
