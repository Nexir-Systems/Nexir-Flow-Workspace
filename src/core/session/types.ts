export type Session = {
  userId: string;
  email: string;
  issuedAt: number;
};

export type RegisteredUser = {
  id: string;
  email: string;
  passwordHash: string;
};
