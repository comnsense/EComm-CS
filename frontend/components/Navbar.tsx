'use client';

import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Зареждане от localStorage при монтиране
        const savedCart = localStorage.getItem('cart-storage');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                const items = parsed.state?.items || [];
                const count = items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
                setItemCount(count);
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }

        // Слушане за промени в localStorage
        const handleStorageChange = () => {
            const updated = localStorage.getItem('cart-storage');
            if (updated) {
                try {
                    const parsed = JSON.parse(updated);
                    const items = parsed.state?.items || [];
                    const count = items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
                    setItemCount(count);
                } catch (e) {
                    console.error('Error loading cart:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-indigo-600">
                            EComm-CS
                        </Link>
                        <div className="hidden md:flex ml-10 space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                                Начало
                            </Link>
                            <Link href="/products" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                                Продукти
                            </Link>
                            <Link href="/categories" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                                Категории
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link href="/cart" className="relative p-2">
                            <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}