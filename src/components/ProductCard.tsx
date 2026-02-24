import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types/product';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
    product: Product;
    onPress?: () => void;
    isDetail?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, isDetail = false }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            disabled={!onPress}
            style={[
                styles.container,
                { backgroundColor: colors.surface, shadowColor: colors.cardShadow },
                isDetail && [styles.detailContainer, { backgroundColor: colors.surfaceVariant, borderBottomColor: colors.border }]
            ]}
        >
            <Image
                source={{ uri: product.thumbnail }}
                style={[styles.image, { backgroundColor: colors.surfaceVariant }, isDetail && styles.detailImage]}
            />
            <View style={styles.info}>
                <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>{product.title}</Text>
                <Text style={[styles.brand, { color: colors.textMuted }]}>{product.brand}</Text>
                <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: colors.success }]}>${product.price}</Text>
                    {product.discountPercentage > 0 && (
                        <Text style={[styles.discount, { color: colors.error, backgroundColor: colors.errorBackground }]}>
                            -{product.discountPercentage}%
                        </Text>
                    )}
                </View>
                {!isDetail && (
                    <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>{product.description}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        padding: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailContainer: {
        marginHorizontal: 0,
        marginVertical: 0,
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    detailImage: {
        width: 120,
        height: 120,
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    brand: {
        fontSize: 12,
        marginTop: 2,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    discount: {
        marginLeft: 8,
        fontSize: 12,
        fontWeight: '600',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    description: {
        fontSize: 13,
        marginTop: 4,
    },
});

export default ProductCard;
