import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView,
    Alert,
    Switch,
} from 'react-native';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../api/firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '../context/ThemeContext';

WebBrowser.maybeCompleteAuthSession();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { colors, isDark, toggleTheme } = useTheme();

    const handleEmailLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Harap isi semua field');
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            Alert.alert('Error', 'Format email tidak valid');
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login berhasil');
        } catch (error: any) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    Alert.alert('Sukses', 'Akun baru berhasil dibuat dan Anda telah masuk.');
                    return;
                } catch (regError: any) {
                    handleAuthError(regError);
                    return;
                }
            }
            handleAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthError = (error: any) => {
        console.error('[AuthError]:', error.code, error.message);
        let message = 'Terjadi kesalahan.';
        switch (error.code) {
            case 'auth/wrong-password':
                message = 'Password yang Anda masukkan salah.';
                break;
            case 'auth/email-already-in-use':
                message = 'Email ini sudah terdaftar.';
                break;
            case 'auth/weak-password':
                message = 'Password terlalu lemah (minimal 6 karakter).';
                break;
            case 'auth/too-many-requests':
                message = 'Terlalu banyak percobaan. Coba lagi nanti.';
                break;
            default:
                message = `Error: ${error.code}`;
        }
        Alert.alert('Auth Gagal', message);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Theme Toggle at top-right */}
                <View style={[styles.themeToggleWrapper, { borderColor: colors.border }]}>
                    <Text style={[styles.themeToggleLabel, { color: colors.textMuted }]}>
                        {isDark ? '🌙 Dark' : '☀️ Light'}
                    </Text>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                        thumbColor={isDark ? '#93c5fd' : '#ffffff'}
                    />
                </View>

                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.primary }]}>WOM</Text>
                    <Text style={[styles.subtitle, { color: colors.textMuted }]}>Firebase Auth</Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.cardShadow }]}>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>Email</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.textPrimary }]}
                            placeholder="contoh@email.com"
                            placeholderTextColor={colors.textMuted}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!isLoading}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>Password</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={[styles.input, styles.passwordInput, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.textPrimary }]}
                                placeholder="Minimal 6 karakter"
                                placeholderTextColor={colors.textMuted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!isPasswordVisible}
                                editable={!isLoading}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <Text>{isPasswordVisible ? '🙈' : '👁️'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.loginButton, { backgroundColor: colors.primary }, isLoading && styles.disabled]}
                        onPress={handleEmailLogin}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? <ActivityIndicator color={colors.textOnPrimary} />
                            : <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>Masuk</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    themeToggleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 8,
        marginBottom: 16,
        borderWidth: 1,
        width: "35%",
        marginLeft: "65%"
    },
    themeToggleLabel: {
        fontSize: 13,
        fontWeight: '500',
    },
    header: { alignItems: 'center', marginBottom: 40 },
    title: { fontSize: 36, fontWeight: 'bold' },
    subtitle: { fontSize: 16, marginTop: 8 },
    card: { borderRadius: 16, padding: 24, elevation: 4, shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
    inputContainer: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
    passwordWrapper: { position: 'relative' },
    passwordInput: { paddingRight: 48 },
    eyeButton: { position: 'absolute', right: 12, top: 12 },
    loginButton: { borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
    buttonText: { fontSize: 16, fontWeight: 'bold' },
    disabled: { opacity: 0.6 },
});

export default LoginScreen;
