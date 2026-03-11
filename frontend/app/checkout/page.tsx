'use client';

import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [form, setForm] = useState({ name: '', address: '', card: '' });

    if (items.length === 0) {
        router.push('/cart');
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Поръчката е успешна!');
        clearCart();
        router.push('/checkout/success');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Плащане</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Име:</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Адрес:</label>
                    <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label>Номер на карта:</label>
                    <input
                        type="text"
                        value={form.card}
                        onChange={(e) => setForm({ ...form, card: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Обща сума: {getTotal()} лв.
                </div>

                <button type="submit" style={{
                    background: '#8bc34a',
                    color: 'white',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                }}>
                    Потвърди поръчка
                </button>
            </form>
        </div>
    );
}