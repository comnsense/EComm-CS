'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, fetchProductCountByCategory } from '@/lib/api';
import Link from 'next/link';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [productCounts, setProductCounts] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategoriesWithCounts = async () => {
            try {
                // Вземаме всички категории
                const data = await fetchCategories();
                console.log('Categories data:', data);
                const cats = data.data || [];
                setCategories(cats);

                // За всяка категория вземаме броя на продуктите
                const counts: { [key: string]: number } = {};

                // Правим заявки за всички категории паралелно
                await Promise.all(
                    cats.map(async (category: any) => {
                        try {
                            const count = await fetchProductCountByCategory(category.slug);
                            counts[category.id] = count;
                            console.log(`Категория ${category.name}: ${count} продукта`);
                        } catch (error) {
                            console.error(`Error fetching count for ${category.name}:`, error);
                            counts[category.id] = 0;
                        }
                    })
                );

                setProductCounts(counts);
            } catch (error) {
                console.error('Error loading categories:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCategoriesWithCounts();
    }, []);

    const getDescription = (category: any) => {
        try {
            if (!category.description) return null;
            if (typeof category.description === 'string') return category.description;
            if (Array.isArray(category.description)) {
                return category.description[0]?.children?.[0]?.text || null;
            }
            return null;
        } catch (e) {
            return null;
        }
    };

    // Цветове за иконите на категориите
    const categoryIcons: { [key: string]: string } = {
        'Смартфони': 'fa-mobile-alt',
        'Лаптопи': 'fa-laptop',
        'Таблети': 'fa-tablet-alt',
        'Слушалки': 'fa-headphones',
        'Аксесоари': 'fa-microchip',
        'Умни часовници': 'fa-clock',
        'Компютърни периферии': 'fa-keyboard',
        'ТВ и Аудио': 'fa-tv',
        'Игри и конзоли': 'fa-gamepad',
        'Офис техника': 'fa-print',
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="inline-block p-4 rounded-full bg-[#8bc34a]/20 animate-pulse">
                    <i className="fas fa-spinner fa-spin text-4xl text-[#8bc34a]"></i>
                </div>
                <p className="mt-4 text-gray-400">Зареждане на категории...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Заглавие */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#8bc34a] mb-4">
                    <i className="fas fa-folder-open mr-3"></i>
                    Категории
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Разгледайте нашите продукти по категории
                </p>
            </div>

            {categories.length === 0 ? (
                <div className="text-center py-16 bg-[var(--card-bg)] rounded-2xl border-2 border-[#8bc34a]/30">
                    <i className="fas fa-folder-open text-6xl text-[#8bc34a] mb-4 opacity-50"></i>
                    <p className="text-xl">Все още няма категории</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Добавете категории в Strapi admin панела
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category: any, index: number) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="group block animate-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8bc34a] to-[#9ccc65] flex items-center justify-center">
                                    <i className={`fas ${categoryIcons[category.name] || 'fa-folder'} text-3xl text-white`}></i>
                                </div>
                                <h3 className="text-2xl font-bold text-[#8bc34a] mb-2">{category.name}</h3>
                                {getDescription(category) && (
                                    <p className="text-gray-400 text-sm mb-3">{getDescription(category)}</p>
                                )}
                                <div className="inline-block px-4 py-2 rounded-full bg-[#8bc34a]/20 text-[#8bc34a] text-sm">
                                    {productCounts[category.id] || 0} продукта
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}