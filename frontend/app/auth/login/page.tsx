'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Тук ще е реалният вход
        toast.success('Успешен вход!');
        router.push('/profile');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Вход</h1>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <input
                    type="email"
                    placeholder="Имейл"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />

                <input
                    type="password"
                    placeholder="Парола"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />

                <button type="submit" style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#8bc34a',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                }}>
                    Вход
                </button>
            </form>

            <p style={{ marginTop: '1rem' }}>
                Нямате профил? <Link href="/auth/register">Регистрация</Link>
            </p>
        </div>
    );
}