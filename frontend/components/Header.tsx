'use client';

import { useTheme } from './ThemeProvider';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';
import SideCart from './SideCart';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const items = useCartStore((state) => state.items);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const menuItems = [
        { href: '/', label: 'Начало' },
        { href: '/products', label: 'Продукти' },
        { href: '/categories', label: 'Категории' },
        { href: '/about', label: 'За нас' },
    ];

    const textColor = theme === 'dark' ? 'text-white' : 'text-[#1a1a2e]';
    const hoverColor = 'hover:text-[#8bc34a]';

    return (
        <>
            <header className="sticky top-0 z-40 bg-[var(--header-bg)] backdrop-blur-md border-b-2 border-[#8bc34a] px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-[#8bc34a] hover:scale-105 transition-transform">
                        @EComm-CS
                    </Link>

                    {!isMobile ? (
                        <nav className="flex items-center gap-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${textColor} ${hoverColor} transition-colors no-underline relative group`}
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8bc34a] transition-all group-hover:w-full"></span>
                                </Link>
                            ))}

                            {/* Бутон за количка */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative neobutton-xs"
                                aria-label="Количка"
                                title="Количка"
                            >
                                <i className="fas fa-bag-shopping text-lg"></i>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-lg">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`w-8 h-8 rounded-full bg-[#0a0c14] border-2 transition-all hover:scale-110 ${theme === 'dark' ? 'border-[#8bc34a] scale-110' : 'border-transparent'
                                        }`}
                                    title="Dark Theme"
                                />
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`w-8 h-8 rounded-full bg-[#f8f9fa] border-2 transition-all hover:scale-110 ${theme === 'light' ? 'border-[#2e7d32] scale-110' : 'border-transparent'
                                        }`}
                                    title="Light Theme"
                                />
                            </div>
                        </nav>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative neobutton-xs"
                                aria-label="Количка"
                                title="Количка"
                            >
                                <i className="fas fa-bag-shopping text-lg"></i>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`neobutton-xs ${textColor}`}
                                aria-label="Меню"
                                title="Меню"
                            >
                                <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
                            </button>
                        </div>
                    )}
                </div>

                {isMobile && isMenuOpen && (
                    <nav className="absolute top-full left-0 right-0 bg-[var(--header-bg)] backdrop-blur-md border-b-2 border-[#8bc34a] p-4 flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`py-3 px-4 rounded-lg transition-all duration-300 no-underline transform hover:translate-x-2 ${theme === 'dark'
                                        ? 'text-white hover:bg-[#8bc34a] hover:text-[#1a1a2e]'
                                        : 'text-[#1a1a2e] hover:bg-[#8bc34a] hover:text-white'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="flex justify-center gap-4 py-2">
                            <button
                                onClick={() => { setTheme('dark'); setIsMenuOpen(false); }}
                                className="w-10 h-10 rounded-full bg-[#0a0c14] border-2 border-[#8bc34a] hover:scale-110 transition-transform"
                                title="Dark Theme"
                            />
                            <button
                                onClick={() => { setTheme('light'); setIsMenuOpen(false); }}
                                className="w-10 h-10 rounded-full bg-[#f8f9fa] border-2 border-[#2e7d32] hover:scale-110 transition-transform"
                                title="Light Theme"
                            />
                        </div>
                    </nav>
                )}
            </header>

            <SideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}