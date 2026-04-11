export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DELAYS = {
  auth: 280,
  entities: 180,
  settings: 200,
} as const;
