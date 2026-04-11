import { createContext } from 'react';

export type NotifySeverity = 'success' | 'info' | 'error';

/** `severity` is accepted for call-site clarity; the snackbar UI uses one primary treatment. */
export type NotifyOptions = {
  message: string;
  severity?: NotifySeverity;
};

export type NotifyContextValue = (opts: NotifyOptions) => void;

export const NotifyContext = createContext<NotifyContextValue | null>(null);
