'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProduct } from '@/lib/api';
import { useCartStore } from '@/store/cart';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProductPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const addToCart = useCartStore((state) => state.addItem);

    useEffect(() => {
        fetchProduct(slug as string).then(data => {
            setProduct(data.data[0]);
            setLoading(false);
        });
    }, [slug]);

    // 👇 ОПРОСТЕНА ФУНКЦИЯ ЗА ОПИСАНИЕ
    const getDescription = () => {
        try {
            if (!product?.description) return 'Няма описание';
            if (typeof product.description === 'string') return product.description;
            if (Array.isArray(product.description)) {
                return product.description[0]?.children?.[0]?.text || 'Няма описание';
            }
            return 'Няма описание';
        } catch (e) {
            return 'Няма описание';
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-[#8bc34a]"></i>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl">Продуктът не е намерен</h2>
                <Link href="/" className="text-[#8bc34a] mt-4 inline-block">
                    ← Към начало
                </Link>
            </div>
        );
    }

    const imageUrl = product.images?.data[0]?.url
        ? `http://localhost:1337${product.images.data[0].url}`
        : null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/products" className="text-[#8bc34a] mb-6 inline-block hover:underline">
                ← Назад
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--card-bg)] p-6 rounded-xl border border-[#8bc34a]">
                <div className="relative h-96 bg-[#1a1f2e] rounded-lg">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.Name}
                            fill
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-image text-6xl text-[#8bc34a] opacity-30"></i>
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-[#8bc34a] mb-4">
                        {product.Name}
                    </h1>

                    {/* 👇 ТУК ИЗПОЛЗВАМЕ getDescription() */}
                    <p className="text-gray-400 mb-6">
                        {getDescription()}
                    </p>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-[#8bc34a]">
                            {product.price} лв.
                        </span>
                        <span className={`ml-4 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {product.stock > 0 ? `В наличност: ${product.stock}` : 'Няма наличност'}
                        </span>
                    </div>

                    <button
                        onClick={() => {
                            addToCart(product);
                            toast.success('Добавено в количката!');
                        }}
                        disabled={product.stock <= 0}
                        className={`px-8 py-3 bg-[#8bc34a] text-[#1a1a2e] rounded-lg font-bold text-lg hover:bg-[#9ccc65] ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        Добави в количката
                    </button>
                </div>
            </div>
        </div>
    );
}