'use client';

import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Количката е празна</h2>
                <Link href="/products">Към продуктите</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Количка</h1>

            {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                    <div>{item.name}</div>
                    <div>{item.price} лв.</div>
                    <div>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        {item.quantity}
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)}>Премахни</button>
                </div>
            ))}

            <div>Общо: {getTotal()} лв.</div>
            <Link href="/checkout">Продължи към плащане</Link>
        </div>
    );
}