'use client';

import { useCartStore } from '@/store/cart';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface SideCartProps {
    isOpen: boolean;
    onClose: () => void;
}

type CartStep = 'cart' | 'checkout';

export default function SideCart({ isOpen, onClose }: SideCartProps) {
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<CartStep>('cart');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setStep('cart');
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    const textColor = theme === 'dark' ? 'text-white' : 'text-[#1a1a2e]';
    const bgColor = theme === 'dark' ? 'bg-[#1a1f2e]' : 'bg-white';

    const safeString = (value: any): string => {
        if (typeof value === 'string') return value;
        if (typeof value === 'number') return value.toString();
        return 'Продукт';
    };

    const renderCart = () => (
        <>
            {/* МОДЕРЕН HEADER */}
            <div className="cart-header">
                <h2 className="text-xl font-bold text-[#1a1a2e] flex items-center justify-between">
                    <span>
                        <i className="fas fa-shopping-bag mr-2"></i>
                        Количка ({items.length})
                    </span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
                        aria-label="Затвори"
                    >
                        <i className="fas fa-times text-[#1a1a2e]"></i>
                    </button>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center animate-card">
                        <div className="w-24 h-24 rounded-full bg-[#8bc34a]/20 flex items-center justify-center mb-4">
                            <i className="fas fa-shopping-bag text-4xl text-[#8bc34a]"></i>
                        </div>
                        <p className={`${textColor} mb-2`}>Количката е празна</p>
                        <button
                            onClick={onClose}
                            className="modern-button text-sm"
                        >
                            Продължи с пазаруването
                        </button>
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={item.id}
                            className="cart-item animate-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex gap-4 p-4">
                                <div className="w-20 h-20 bg-[#1a1f2e] rounded-xl overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={safeString(item.name)}
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <i className="fas fa-image text-2xl text-[#8bc34a] opacity-50"></i>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-semibold ${textColor} line-clamp-1`}>
                                        {safeString(item.name)}
                                    </h3>
                                    <p className="text-[#8bc34a] font-bold mt-1 text-lg">
                                        {item.price} лв.
                                    </p>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="quantity-button"
                                                aria-label="Намали"
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className={`${textColor} w-8 text-center font-semibold`}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="quantity-button"
                                                aria-label="Увеличи"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                removeItem(item.id);
                                                toast.success('Премахнато от количката');
                                            }}
                                            className="remove-button"
                                        >
                                            <i className="fas fa-trash-alt mr-1"></i>
                                            Премахни
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {items.length > 0 && (
                <div className={`p-4 border-t-2 border-[#8bc34a] ${bgColor}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className={`font-semibold ${textColor}`}>Общо:</span>
                        <span className="text-2xl font-bold text-[#8bc34a]">
                            {getTotal().toFixed(2)} лв.
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                clearCart();
                                toast.success('Количката е изчистена');
                            }}
                            className="flex-1 px-4 py-3 rounded-full border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all"
                        >
                            Изчисти
                        </button>
                        <button
                            onClick={() => setStep('checkout')}
                            className="flex-1 modern-button"
                        >
                            Плащане
                        </button>
                    </div>
                </div>
            )}
        </>
    );

    const renderCheckout = () => (
        <>
            <div className="cart-header">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setStep('cart')}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
                            aria-label="Назад"
                        >
                            <i className="fas fa-arrow-left text-[#1a1a2e]"></i>
                        </button>
                        <h2 className="text-xl font-bold text-[#1a1a2e]">
                            <i className="fas fa-credit-card mr-2"></i>
                            Плащане
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
                    >
                        <i className="fas fa-times text-[#1a1a2e]"></i>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    toast.success('Поръчката е успешна!');
                    clearCart();
                    setStep('cart');
                    onClose();
                }} className="space-y-4">
                    <div className="glass-card p-6">
                        <h3 className={`font-semibold ${textColor} mb-4 flex items-center gap-2`}>
                            <i className="fas fa-truck text-[#8bc34a]"></i>
                            Информация за доставка
                        </h3>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Име и фамилия"
                                className="modern-input"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Имейл"
                                className="modern-input"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Телефон"
                                className="modern-input"
                                required
                            />
                            <textarea
                                placeholder="Адрес за доставка"
                                rows={3}
                                className="modern-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className={`font-semibold ${textColor} mb-4 flex items-center gap-2`}>
                            <i className="fas fa-credit-card text-[#8bc34a]"></i>
                            Данни за плащане
                        </h3>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Номер на карта"
                                className="modern-input"
                                required
                            />
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="modern-input"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    className="modern-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="checkout-summary">
                        <div className="flex justify-between items-center relative z-10">
                            <span className="font-semibold">Обща сума:</span>
                            <span className="text-2xl font-bold">
                                {getTotal().toFixed(2)} лв.
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="modern-button w-full"
                    >
                        <i className="fas fa-check mr-2"></i>
                        Потвърди поръчката
                    </button>
                </form>
            </div>
        </>
    );

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <div
                className={`
          fixed top-0 right-0 h-full w-full sm:w-[480px] z-50
          transform transition-transform duration-500 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          cart-sidebar flex flex-col
        `}
            >
                {step === 'cart' ? renderCart() : renderCheckout()}
            </div>
        </>
    );
}