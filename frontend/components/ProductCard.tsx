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
        if (product.images?.data && product.images.data.length > 0) {
            const image = product.images.data[0];
            imageUrl = `http://localhost:1337${image.url}`;
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

    const handleAddToCart = () => {
        addItem(product);
        toast.success(`${product.Name || 'Продукт'} добавен!`);
    };

    return (
        <div className="group bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[#8bc34a]/30 hover:border-[#8bc34a] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/products/${product.slug}`} className="block relative">
                <div className="relative h-48 bg-[#1a1f2e] overflow-hidden">
                    {imageUrl && !imageError ? (
                        <Image
                            src={imageUrl}
                            alt={product.Name || 'Продукт'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <i className="fas fa-image text-4xl text-[#8bc34a] opacity-30 mb-2"></i>
                            <span className="text-xs text-gray-500">Няма снимка</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-lg font-bold text-[#8bc34a] mb-2 hover:underline line-clamp-1">
                        {product.Name || 'Без име'}
                    </h3>
                </Link>

                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {getDescription()}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#8bc34a]">
                        {product.price || 0} лв.
                    </span>

                    {/* НЕОКЛАСИЧЕСКИ БУТОН - само клас */}
                    <button
                        onClick={handleAddToCart}
                        className="neobutton text-[#7e97b8] hover:text-[#516d91]"
                    >
                        <i className="fas fa-cart-plus"></i>
                        <span>Добави</span>
                    </button>
                </div>
            </div>
        </div>
    );
}