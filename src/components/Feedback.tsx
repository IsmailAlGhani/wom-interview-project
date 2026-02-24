import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const LoadingIndicator = () => {
    const { colors } = useTheme();
    return (
        <View style={[styles.center, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.text, { color: colors.textSecondary }]}>Loading data...</Text>
        </View>
    );
};

export const ErrorIndicator = ({ error, onRetry }: { error: string, onRetry?: () => void }) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.center, { backgroundColor: colors.background }]}>
            <Text style={[styles.text, styles.error, { color: colors.error }]}>Error: {error}</Text>
            {onRetry && (
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onRetry}>
                    <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>Retry</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 12,
        fontSize: 14,
    },
    error: {
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        fontWeight: 'bold',
    },
});
