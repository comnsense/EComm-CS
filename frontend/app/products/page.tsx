'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(data => {
            setProducts(data.data);
            setLoading(false);
        });
    }, []);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Всички продукти</h1>
            {loading ? (
                <div>Зареждане...</div>
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