import { create } from 'zustand';
import { signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../api/firebaseConfig';
import { AuthState, User } from '../types/auth';

function mapFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    email: firebaseUser.email,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    avatar: firebaseUser.photoURL,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },
}));

export const initAuthStore = (): Promise<() => void> => {
  return new Promise<() => void>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const user = mapFirebaseUser(firebaseUser);
        useAuthStore.setState({ token, user, isAuthenticated: true });
      } else {
        useAuthStore.setState({ token: null, user: null, isAuthenticated: false });
      }
      resolve(unsubscribe);
    });
  });
};
