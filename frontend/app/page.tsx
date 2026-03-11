'use client';

import { useEffect, useState } from 'react';
import { fetchFeaturedProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts().then(data => {
      setProducts(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero секция */}
      <section className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-[#8bc34a] mb-4">
          EComm-CS
        </h1>
        <p className="text-xl text-[var(--text-light)] max-w-2xl mx-auto">
          Вашият онлайн магазин
        </p>
      </section>

      {/* Препоръчани продукти */}
      <section>
        <h2 className="text-3xl font-bold text-[#8bc34a] mb-8 border-b-2 border-[#8bc34a] pb-4">
          Препоръчани продукти
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-4xl text-[#8bc34a]"></i>
          </div>
        ) : (
          <div className="projects-grid">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}