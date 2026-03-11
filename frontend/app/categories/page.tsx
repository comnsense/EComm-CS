'use client';

import { useEffect, useState } from 'react';
import { fetchCategories } from '@/lib/api';
import Link from 'next/link';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                console.log('Categories data:', data);
                setCategories(data.data || []);
            } catch (error) {
                console.error('Error loading categories:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category: any, index: number) => {
                        const icon = categoryIcons[category.name] || 'fa-folder';
                        const colors = [
                            'from-[#8bc34a] to-[#4caf50]',
                            'from-[#42a5f5] to-[#1976d2]',
                            'from-[#ff9800] to-[#f57c00]',
                            'from-[#e91e63] to-[#c2185b]',
                            'from-[#9c27b0] to-[#7b1fa2]',
                            'from-[#00bcd4] to-[#0097a7]',
                            'from-[#ff5722] to-[#e64a19]',
                            'from-[#607d8b] to-[#455a64]',
                        ];
                        const gradient = colors[index % colors.length];

                        return (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group relative block"
                            >
                                <div className={`
                  relative p-8 bg-[var(--card-bg)] rounded-2xl 
                  border-2 border-[#8bc34a] overflow-hidden
                  transition-all duration-500 group-hover:scale-105 
                  group-hover:shadow-2xl group-hover:shadow-[#8bc34a]/30
                  hover:border-transparent
                `}>
                                    {/* Градиентен фон при hover */}
                                    <div className={`
                    absolute inset-0 bg-gradient-to-br ${gradient} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  `}></div>

                                    {/* Икона */}
                                    <div className="relative z-10 mb-4">
                                        <div className={`
                      w-20 h-20 mx-auto rounded-full 
                      bg-[#8bc34a]/20 group-hover:bg-white/20
                      flex items-center justify-center
                      transition-all duration-500 group-hover:scale-110
                    `}>
                                            <i className={`fas ${icon} text-4xl text-[#8bc34a] group-hover:text-white transition-colors duration-500`}></i>
                                        </div>
                                    </div>

                                    {/* Име на категория */}
                                    <h2 className="relative z-10 text-2xl font-bold text-[#8bc34a] group-hover:text-white transition-colors duration-500 mb-2">
                                        {category.name}
                                    </h2>

                                    {/* Описание */}
                                    {getDescription(category) && (
                                        <p className="relative z-10 text-sm text-gray-400 group-hover:text-white/90 transition-colors duration-500 line-clamp-2">
                                            {getDescription(category)}
                                        </p>
                                    )}

                                    {/* Брой продукти (ако има) */}
                                    <div className="relative z-10 mt-4 inline-block px-3 py-1 rounded-full bg-[#8bc34a]/20 text-[#8bc34a] text-xs font-semibold group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
                                        <i className="fas fa-box mr-1"></i>
                                        0 продукта
                                    </div>

                                    {/* Стрелка за навигация */}
                                    <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <i className="fas fa-arrow-right text-white"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}