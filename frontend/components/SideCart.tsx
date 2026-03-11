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
    const borderColor = 'border-[#8bc34a]';

    const safeString = (value: any): string => {
        if (typeof value === 'string') return value;
        if (typeof value === 'number') return value.toString();
        return 'Продукт';
    };

    const renderCart = () => (
        <>
            <div className={`flex items-center justify-between p-4 border-b-2 ${borderColor}`}>
                <h2 className={`text-xl font-bold ${textColor}`}>
                    <i className="fas fa-bag-shopping mr-2 text-[#8bc34a]"></i>
                    Количка ({items.length})
                </h2>
                <button
                    onClick={onClose}
                    className="neobutton-xs"
                    aria-label="Затвори количката"
                    title="Затвори"
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="flex-1 scroll-container p-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <i className="fas fa-bag-shopping text-5xl text-[#8bc34a] mb-4 opacity-50"></i>
                        <p className={`${textColor} mb-2`}>Количката е празна</p>
                        <button
                            onClick={onClose}
                            className="neobutton-sm text-[#8bc34a] hover:text-[#9ccc65]"
                            aria-label="Продължи с пазаруването"
                            title="Продължи"
                        >
                            Продължи с пазаруването
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`flex gap-3 p-3 rounded-lg border ${borderColor} ${bgColor}`}
                            >
                                <div className="w-16 h-16 bg-[#1a1f2e] rounded-lg overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={safeString(item.name)}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <i className="fas fa-image text-[#8bc34a] opacity-50"></i>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-semibold ${textColor} line-clamp-1`}>
                                        {safeString(item.name)}
                                    </h3>
                                    <p className="text-[#8bc34a] font-bold mt-1">
                                        {item.price} лв.
                                    </p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="neobutton-xs"
                                                aria-label="Намали количеството"
                                                title="Намали"
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className={`${textColor} w-8 text-center font-semibold`}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="neobutton-xs"
                                                aria-label="Увеличи количеството"
                                                title="Увеличи"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                removeItem(item.id);
                                                toast.success('Премахнато от количката');
                                            }}
                                            className="neobutton-xs text-red-500 hover:text-red-600"
                                            aria-label="Премахни продукта"
                                            title="Премахни"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {items.length > 0 && (
                <div className={`absolute bottom-0 left-0 right-0 p-4 border-t-2 ${borderColor} ${bgColor}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className={`font-semibold ${textColor}`}>Общо:</span>
                        <span className="text-xl font-bold text-[#8bc34a]">
                            {getTotal().toFixed(2)} лв.
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                clearCart();
                                toast.success('Количката е изчистена');
                            }}
                            className="neobutton-sm flex-1 text-red-500 hover:text-red-600"
                            aria-label="Изчисти количката"
                            title="Изчисти"
                        >
                            <i className="fas fa-trash-alt mr-2"></i>
                            Изчисти
                        </button>
                        <button
                            onClick={() => setStep('checkout')}
                            className="neobutton-sm flex-1 text-[#8bc34a] hover:text-[#9ccc65]"
                            aria-label="Продължи към плащане"
                            title="Плащане"
                        >
                            <i className="fas fa-credit-card mr-2"></i>
                            Плащане
                        </button>
                    </div>
                </div>
            )}
        </>
    );

    const renderCheckout = () => (
        <>
            <div className={`flex items-center justify-between p-4 border-b-2 ${borderColor}`}>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setStep('cart')}
                        className="neobutton-xs"
                        aria-label="Върни се към количката"
                        title="Назад"
                    >
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h2 className={`text-xl font-bold ${textColor}`}>
                        <i className="fas fa-credit-card mr-2 text-[#8bc34a]"></i>
                        Плащане
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="neobutton-xs"
                    aria-label="Затвори"
                    title="Затвори"
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="flex-1 scroll-container p-4">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    toast.success('Поръчката е успешна!');
                    clearCart();
                    setStep('cart');
                    onClose();
                }} className="space-y-4">
                    <div className={`p-4 rounded-lg border ${borderColor}`}>
                        <h3 className={`font-semibold ${textColor} mb-3`}>
                            <i className="fas fa-truck mr-2 text-[#8bc34a]"></i>
                            Информация за доставка
                        </h3>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Име и фамилия"
                                className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-[#0a0c14] border ${borderColor} ${textColor} focus:outline-none focus:border-[#8bc34a]`}
                                required
                                aria-label="Име и фамилия"
                                title="Име и фамилия"
                            />
                            <input
                                type="email"
                                placeholder="Имейл"
                                className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-[#0a0c14] border ${borderColor} ${textColor} focus:outline-none focus:border-[#8bc34a]`}
                                required
                                aria-label="Имейл"
                                title="Имейл"
                            />
                            <input
                                type="tel"
                                placeholder="Телефон"
                                className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-[#0a0c14] border ${borderColor} ${textColor} focus:outline-none focus:border-[#8bc34a]`}
                                required
                                aria-label="Телефон"
                                title="Телефон"
                            />
                            <textarea
                                placeholder="Адрес за доставка"
                                rows={3}
                                className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-[#0a0c14] border ${borderColor} ${textColor} focus:outline-none focus:border-[#8bc34a]`}
                                required
                                aria-label="Адрес за доставка"
                                title="Адрес за доставка"
                            />
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${borderColor}`}>
                        <h3 className={`font-semibold ${textColor} mb-3`}>
                            <i className="fas fa-credit-card mr-2 text-[#8bc34a]"></i>
                            Данни за плащане
                        </h3>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Номер на карта"
                                maxLength={16}
                                className={`w-full p-3 rounded-lg bg-gray-100 dark:bg-[#0a0c14] border ${borderColor} ${textColor} focus:outline-none focus:border-[#8bc34a]`}
                                required
                                aria-label="Номер на карта"
                                title="Номер на карта"
                            />
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className={`w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-[#0a0c14] border ${borderColor} ${textColor} focus:outline-none focus:border-[#8bc34a]`}
                                    required
                                    aria-label="Месец/Година"
                                    title="Месец/Година"
                                />
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    maxLength={3}
                                    className={`w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-[#0a0c14] border ${borderColor} ${textColor} focus:outline-none focus:border-[#8bc34a]`}
                                    required
                                    aria-label="CVV код"
                                    title="CVV код"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${borderColor} bg-[#8bc34a]/10`}>
                        <div className="flex justify-between items-center">
                            <span className={`font-semibold ${textColor}`}>Обща сума:</span>
                            <span className="text-2xl font-bold text-[#8bc34a]">
                                {getTotal().toFixed(2)} лв.
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="neobutton w-full text-[#8bc34a] hover:text-[#9ccc65]"
                        aria-label="Потвърди поръчката"
                        title="Потвърди"
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
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
                    onClick={onClose}
                    aria-label="Затвори"
                    title="Затвори"
                />
            )}

            <div
                className={`
          fixed top-0 left-0 h-full w-full sm:w-[450px] z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${bgColor} shadow-2xl flex flex-col
        `}
                role="dialog"
                aria-label="Количка"
            >
                {step === 'cart' ? renderCart() : renderCheckout()}
            </div>
        </>
    );
}