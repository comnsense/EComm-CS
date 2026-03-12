'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';

interface ProductCardProps {
    product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!product) return null;

    let imageUrl = null;
    try {
        if (product.images && product.images.length > 0) {
            const image = product.images[0];
            // Опитваме различни формати за най-добро качество
            if (image.formats?.large?.url) {
                imageUrl = `http://localhost:1337${image.formats.large.url}`;
            } else if (image.formats?.medium?.url) {
                imageUrl = `http://localhost:1337${image.formats.medium.url}`;
            } else if (image.formats?.small?.url) {
                imageUrl = `http://localhost:1337${image.formats.small.url}`;
            } else if (image.url) {
                imageUrl = `http://localhost:1337${image.url}`;
            }
        }
    } catch (e) {
        console.error('Image error:', e);
    }

    const getDescription = () => {
        try {
            if (!product.description) return 'Няма описание';
            if (typeof product.description === 'string') return product.description;
            if (Array.isArray(product.description)) {
                return product.description[0]?.children?.[0]?.text || 'Няма описание';
            }
            return 'Няма описание';
        } catch (e) {
            return 'Няма описание';
        }
    };

    return (
        <div className="product-card-modern animate-card">
            <Link href={`/products/${product.slug}`} className="block">
                <div className="relative h-56 bg-gradient-to-br from-[#1a1f2e] to-[#2a2f3a] overflow-hidden">
                    {imageUrl && !imageError ? (
                        <>
                            {/* Показваме скелетон докато се зареди */}
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-[#8bc34a] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                src={imageUrl}
                                alt={product.name || 'Продукт'}
                                className={`
                  w-full h-full transition-all duration-700
                  ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  object-cover hover:scale-110
                `}
                                style={{
                                    objectPosition: 'center',
                                }}
                                onLoad={() => setImageLoaded(true)}
                                onError={() => {
                                    console.error('Image failed to load:', imageUrl);
                                    setImageError(true);
                                }}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <i className="fas fa-image text-5xl text-[#8bc34a] opacity-30 mb-2"></i>
                            <span className="text-xs text-gray-500">
                                {imageError ? 'Грешка в изображението' : 'Няма снимка'}
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-6">
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-xl font-bold text-[#8bc34a] mb-2 hover:underline line-clamp-1">
                        {product.name || 'Без име'}
                    </h3>
                </Link>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {getDescription()}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#8bc34a]">
                        {product.price || 0} лв.
                    </span>

                    <button
                        onClick={() => {
                            addItem(product);
                            toast.success(`${product.name || 'Продукт'} добавен!`);
                        }}
                        className="modern-button"
                    >
                        <i className="fas fa-cart-plus mr-2"></i>
                        Добави
                    </button>
                </div>
            </div>
        </div>
    );
}