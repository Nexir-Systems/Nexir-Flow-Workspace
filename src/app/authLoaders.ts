import { redirect } from 'react-router';
import { readSession } from '../core/session/sessionStorage';

/** Landing: signed-in users go straight to the app shell. */
export function loaderLanding() {
  if (readSession()) throw redirect('/app/dashboard');
  return null;
}

/** Login/register: hide when a session already exists. */
export function loaderGuestOnly() {
  if (readSession()) throw redirect('/app/dashboard');
  return null;
}

/** All `/app/*` routes: require mock session or redirect to login. */
export function loaderRequireAuth() {
  if (!readSession()) throw redirect('/login');
  return null;
}
