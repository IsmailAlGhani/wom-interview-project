import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../context/ThemeContext';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

import ThemeToggle from '../components/ThemeToggle';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Detail: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const { isAuthenticated } = useAuthStore();
    const { colors, isDark } = useTheme();

    // Extend React Navigation's built-in dark/light theme with our custom colors
    const navTheme = isDark
        ? {
            ...DarkTheme,
            colors: { ...DarkTheme.colors, background: colors.background, card: colors.headerBackground, text: colors.headerText, border: colors.border },
        }
        : {
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: colors.background, card: colors.headerBackground, text: colors.headerText, border: colors.border },
        };

    return (
        <NavigationContainer theme={navTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: colors.headerBackground },
                    headerTintColor: colors.headerText,
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerRight: () => <ThemeToggle />,
                    contentStyle: { backgroundColor: colors.background },
                }}
            >
                {!isAuthenticated ? (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false,
                            title: 'Login',
                        }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ title: 'Product Market' }}
                        />
                        <Stack.Screen
                            name="Detail"
                            component={DetailScreen}
                            options={{ title: 'Product Detail' }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
