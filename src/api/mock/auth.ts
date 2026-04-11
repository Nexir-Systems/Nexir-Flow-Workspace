import { STORAGE_KEYS } from '../../core/storage/keys';
import { storageGetJson, storageSetJson } from '../../core/storage/localStorage';
import { validatePasswordStrengthOrThrow } from '../../core/validation/password';
import type { RegisteredUser } from '../../core/session/types';
import type { Session } from '../../core/session/types';
import { writeSession } from '../../core/session/sessionStorage';
import { DELAYS, delay } from './delay';

function readUsers(): RegisteredUser[] {
  return storageGetJson<RegisteredUser[]>(STORAGE_KEYS.users) ?? [];
}

function writeUsers(users: RegisteredUser[]): void {
  storageSetJson(STORAGE_KEYS.users, users);
}

function hashPassword(password: string): string {
  return `mock:${password}`;
}

function verifyPassword(user: RegisteredUser, password: string): boolean {
  return user.passwordHash === hashPassword(password);
}

export async function registerMock(emailRaw: string, password: string): Promise<Session> {
  await delay(DELAYS.auth);
  validatePasswordStrengthOrThrow(password);
  const email = emailRaw.trim().toLowerCase();
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    throw new Error('An account with this email already exists.');
  }
  const id = `usr-${String(users.length + 1).padStart(3, '0')}`;
  const user: RegisteredUser = { id, email, passwordHash: hashPassword(password) };
  writeUsers([...users, user]);
  const session: Session = { userId: id, email, issuedAt: Date.now() };
  writeSession(session);
  return session;
}

export async function loginMock(emailRaw: string, password: string): Promise<Session> {
  await delay(DELAYS.auth);
  const email = emailRaw.trim().toLowerCase();
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user || !verifyPassword(user, password)) {
    throw new Error('Invalid email or password.');
  }
  const session: Session = { userId: user.id, email: user.email, issuedAt: Date.now() };
  writeSession(session);
  return session;
}

export async function logoutMock(): Promise<void> {
  await delay(DELAYS.auth);
  writeSession(null);
}

export async function changePasswordMock(
  email: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  await delay(DELAYS.auth);
  validatePasswordStrengthOrThrow(newPassword);
  const users = readUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) throw new Error('User not found.');
  const user = users[idx]!;
  if (!verifyPassword(user, currentPassword)) {
    throw new Error('Current password is incorrect.');
  }
  const next = [...users];
  next[idx] = { ...user, passwordHash: hashPassword(newPassword) };
  writeUsers(next);
}
