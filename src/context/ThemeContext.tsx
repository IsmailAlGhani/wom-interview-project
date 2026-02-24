// src/context/ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { useThemeStore } from '../store/themeStore';
import { ThemeColors, ThemeMode } from '../constants/theme';

interface ThemeContextValue {
    colors: ThemeColors;
    mode: ThemeMode;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { colors, mode, toggleTheme } = useThemeStore();

    return (
        <ThemeContext.Provider value={{ colors, mode, toggleTheme, isDark: mode === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextValue => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};
