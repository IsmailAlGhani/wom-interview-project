// src/constants/theme.ts

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
    // Backgrounds
    background: string;
    surface: string;
    surfaceVariant: string;

    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textOnPrimary: string;

    // Brand / Accent
    primary: string;
    primaryVariant: string;

    // UI elements
    border: string;
    divider: string;
    inputBackground: string;
    inputBorder: string;

    // Status colors
    success: string;
    error: string;
    errorBackground: string;

    // Misc
    cardShadow: string;
    headerBackground: string;
    headerText: string;
    toggleBackground: string;
}

const lightColors: ThemeColors = {
    background: '#f8f9fa',
    surface: '#ffffff',
    surfaceVariant: '#f9f9f9',

    textPrimary: '#1e293b',
    textSecondary: '#555555',
    textMuted: '#888888',
    textOnPrimary: '#ffffff',

    primary: '#2563eb',
    primaryVariant: '#1d4ed8',

    border: '#eee',
    divider: '#f0f0f0',
    inputBackground: '#f1f5f9',
    inputBorder: '#e2e8f0',

    success: '#2e7d32',
    error: '#d32f2f',
    errorBackground: '#ffebee',

    cardShadow: '#000000',
    headerBackground: '#2196F3',
    headerText: '#ffffff',
    toggleBackground: '#e2e8f0',
};

const darkColors: ThemeColors = {
    background: '#0f172a',
    surface: '#1e293b',
    surfaceVariant: '#263344',

    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    textOnPrimary: '#ffffff',

    primary: '#3b82f6',
    primaryVariant: '#2563eb',

    border: '#334155',
    divider: '#334155',
    inputBackground: '#0f172a',
    inputBorder: '#334155',

    success: '#4ade80',
    error: '#f87171',
    errorBackground: '#3b1919',

    cardShadow: '#000000',
    headerBackground: '#1e3a5f',
    headerText: '#ffffff',
    toggleBackground: '#334155',
};

export const themes: Record<ThemeMode, ThemeColors> = {
    light: lightColors,
    dark: darkColors,
};
