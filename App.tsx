import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { initAuthStore } from './src/store/authStore';
import { LoadingIndicator } from './src/components/Feedback';
import { ThemeProvider } from './src/context/ThemeContext';
import { useThemeStore } from './src/store/themeStore';

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const { mode } = useThemeStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const prepare = async () => {
      try {
        unsubscribe = await initAuthStore();
      } catch (e) {
        console.warn('Auth initialization error:', e);
      } finally {
        setIsReady(true);
      }
    };

    prepare();

    return () => {
      unsubscribe?.();
    };
  }, []);

  if (!isReady) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
