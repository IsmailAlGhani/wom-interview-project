import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCF9IXVWSqcURSNQmG1p3pGOm88xIoeP58",
  authDomain: "wom-project-interview.firebaseapp.com",
  projectId: "wom-project-interview",
  storageBucket: "wom-project-interview.firebasestorage.app",
  messagingSenderId: "978187899353",
  appId: "1:978187899353:web:644c2d058d170630a809c8"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let _auth: ReturnType<typeof getAuth>;
try {
  _auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  _auth = getAuth(app);
}

export const auth = _auth;
export default app;
