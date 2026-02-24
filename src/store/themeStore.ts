// src/store/themeStore.ts
import { create } from 'zustand';
import { ThemeMode, ThemeColors, themes } from '../constants/theme';

interface ThemeState {
    mode: ThemeMode;
    colors: ThemeColors;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    mode: 'light',
    colors: themes.light,

    toggleTheme: () =>
        set((state) => {
            const newMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
            return { mode: newMode, colors: themes[newMode] };
        }),

    setTheme: (mode: ThemeMode) =>
        set({ mode, colors: themes[mode] }),
}));
