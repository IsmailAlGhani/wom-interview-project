import React, { Suspense } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native';
import { useProductDetail } from '../hooks/useProductResource';
import ProductCard from '../components/ProductCard';
import { LoadingIndicator } from '../components/Feedback';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailContent = ({ route }: Props) => {
    const { productId } = route.params;
    const product = useProductDetail(productId);
    const { colors } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Reusable Component from Home */}
            <ProductCard product={product} isDetail />

            <View style={styles.detailsBody}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Product Description</Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>{product.description}</Text>

                <View style={[styles.infoRow, { borderBottomColor: colors.divider }]}>
                    <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Category</Text>
                    <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{product.category}</Text>
                </View>

                <View style={[styles.infoRow, { borderBottomColor: colors.divider }]}>
                    <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Stock</Text>
                    <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{product.stock} units</Text>
                </View>

                <View style={[styles.infoRow, { borderBottomColor: colors.divider }]}>
                    <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Rating</Text>
                    <Text style={[styles.infoValue, { color: colors.textPrimary }]}>⭐ {product.rating}</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Gallery</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
                    {product.images.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={[styles.galleryImage, { backgroundColor: colors.surfaceVariant }]} />
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const DetailScreen = (props: Props) => {
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <DetailContent {...props} />
        </Suspense>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    detailsBody: { padding: 16 },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
    },
    description: { fontSize: 15, lineHeight: 22 },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    infoLabel: { fontSize: 14, fontWeight: '500' },
    infoValue: { fontSize: 14, fontWeight: '600', textTransform: 'capitalize' },
    gallery: { marginTop: 12, marginBottom: 30 },
    galleryImage: {
        width: 200,
        height: 150,
        borderRadius: 12,
        marginRight: 12,
    },
});

export default DetailScreen;
