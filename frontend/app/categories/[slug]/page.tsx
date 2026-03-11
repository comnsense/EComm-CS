'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductsByCategory, fetchCategory } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function CategoryPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                console.log('🔄 Зареждане на категория:', slug);

                const [productsData, categoryData] = await Promise.all([
                    fetchProductsByCategory(slug as string),
                    fetchCategory(slug as string)
                ]);

                setProducts(productsData.data || []);

                if (categoryData.data && categoryData.data.length > 0) {
                    setCategory(categoryData.data[0]);
                }
            } catch (error) {
                console.error('❌ Грешка:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [slug]);

    const getDescription = () => {
        try {
            if (!category?.description) return null;
            if (typeof category.description === 'string') return category.description;
            if (Array.isArray(category.description)) {
                return category.description[0]?.children?.[0]?.text || null;
            }
            return null;
        } catch (e) {
            return null;
        }
    };

    // Икона според името на категорията
    const getCategoryIcon = () => {
        const icons: { [key: string]: string } = {
            'Смартфони': 'fa-mobile-alt',
            'Лаптопи': 'fa-laptop',
            'Таблети': 'fa-tablet-alt',
            'Слушалки': 'fa-headphones',
            'Аксесоари': 'fa-microchip',
        };
        return icons[category?.name] || 'fa-folder';
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="inline-block p-4 rounded-full bg-[#8bc34a]/20 animate-pulse">
                    <i className="fas fa-spinner fa-spin text-4xl text-[#8bc34a]"></i>
                </div>
                <p className="mt-4 text-gray-400">Зареждане...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Навигация */}
            <div className="mb-8">
                <Link
                    href="/categories"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8bc34a]/10 text-[#8bc34a] hover:bg-[#8bc34a] hover:text-white transition-all duration-300 group"
                >
                    <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                    <span>Всички категории</span>
                </Link>
            </div>

            {/* Заглавие на категорията */}
            {category && (
                <div className="relative mb-12 p-8 bg-gradient-to-r from-[#8bc34a]/20 to-transparent rounded-2xl border border-[#8bc34a]/30 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#8bc34a]/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-[#8bc34a] flex items-center justify-center shadow-xl">
                            <i className={`fas ${getCategoryIcon()} text-4xl text-white`}></i>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-[#8bc34a] mb-2">
                                {category.name}
                            </h1>
                            {getDescription() && (
                                <p className="text-gray-400 text-lg">
                                    {getDescription()}
                                </p>
                            )}
                            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8bc34a]/20 text-[#8bc34a] text-sm">
                                <i className="fas fa-box"></i>
                                <span>{products.length} продукта</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Продукти */}
            {products.length === 0 ? (
                <div className="text-center py-16 bg-[var(--card-bg)] rounded-2xl border-2 border-[#8bc34a]/30">
                    <div className="w-24 h-24 mx-auto rounded-full bg-[#8bc34a]/20 flex items-center justify-center mb-4">
                        <i className="fas fa-box-open text-4xl text-[#8bc34a] opacity-50"></i>
                    </div>
                    <p className="text-xl">Няма продукти в тази категория</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Продуктите ще се покажат тук, когато бъдат добавени
                    </p>
                    <Link
                        href="/products"
                        className="inline-block mt-6 px-6 py-3 bg-[#8bc34a] text-white rounded-lg font-semibold hover:bg-[#9ccc65] transition-all hover:scale-105 hover:shadow-lg"
                    >
                        <i className="fas fa-arrow-right mr-2"></i>
                        Виж всички продукти
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}