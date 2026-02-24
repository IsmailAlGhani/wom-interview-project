import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme, colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.icon, { color: colors.headerText }]}>
                {isDark ? '🌙' : '☀️'}
            </Text>
            <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#e2e8f0', true: colors.primary }}
                thumbColor={isDark ? '#93c5fd' : '#ffffff'}
                ios_backgroundColor="#e2e8f0"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
    },
    icon: {
        fontSize: 16,
        marginRight: 6,
    },
});

export default ThemeToggle;
