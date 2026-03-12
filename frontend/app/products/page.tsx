'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, StrapiProduct } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function ProductsPage() {
    const [products, setProducts] = useState<StrapiProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data.data || []);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-[#8bc34a]"></i>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-[#8bc34a] mb-8">Всички продукти</h1>

            {products.length === 0 ? (
                <div className="text-center py-12">Няма продукти</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
}