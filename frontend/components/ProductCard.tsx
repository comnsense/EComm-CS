'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

interface ProductCardProps {
    product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [imageError, setImageError] = useState(false);

    if (!product) return null;

    let imageUrl = null;
    try {
        if (product.images && product.images.length > 0) {
            const image = product.images[0];
            if (image.url) {
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
                        <Image
                            src={imageUrl}
                            alt={product.name || 'Продукт'}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-700"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <i className="fas fa-image text-5xl text-[#8bc34a] opacity-30 mb-2"></i>
                            <span className="text-xs text-gray-500">Няма снимка</span>
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