'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

// Дефинирайте тип за продукта
interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    description?: any;
    images?: any[];
    category?: any[];
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]); // 👈 Ясен тип
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                console.log('Products data:', data);
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Всички продукти</h1>
            {products.length === 0 ? (
                <div>Няма продукти</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
}