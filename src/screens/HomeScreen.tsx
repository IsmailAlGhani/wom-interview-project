import React, { Suspense, useState, useCallback } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { useProducts, refreshProducts } from '../hooks/useProductResource';
import ProductCard from '../components/ProductCard';
import { LoadingIndicator, ErrorIndicator } from '../components/Feedback';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../context/ThemeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const ProductList = ({ navigation }: Props) => {
    const data = useProducts();
    const [refreshing, setRefreshing] = useState(false);
    const { logout, user } = useAuthStore();
    const { colors, isDark, toggleTheme } = useTheme();

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        refreshProducts();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                <Text style={[styles.welcome, { color: colors.textPrimary }]}>
                    Hi, {user?.name || 'User'} {isDark ? '🌙' : '☀️'}
                </Text>

                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Text style={[styles.logout, { color: colors.error }]}>Logout</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data.products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('Detail', { productId: item.id })}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.primary}
                    />
                }
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const HomeScreen = ({ navigation }: Props) => {
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <ProductList navigation={navigation} />
        </Suspense>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    welcome: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoutBtn: {
        paddingHorizontal: 4,
    },
    logout: {
        fontWeight: '600',
        fontSize: 14,
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default HomeScreen;
