import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { AppProviders } from './app/providers';
import { AppRouter } from './app/router';

/** Entry: providers wrap router so layout + features see Query, theme, and notify context. */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
);
