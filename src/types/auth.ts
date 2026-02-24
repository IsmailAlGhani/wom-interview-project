export interface User {
  email: string | null;
  name?: string | null;
  avatar?: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}
