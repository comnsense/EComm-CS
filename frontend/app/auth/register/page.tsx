'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Успешна регистрация!');
        router.push('/profile');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Регистрация</h1>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <input
                    type="text"
                    placeholder="Име"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />

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
                    Регистрация
                </button>
            </form>

            <p style={{ marginTop: '1rem' }}>
                Имате профил? <Link href="/auth/login">Вход</Link>
            </p>
        </div>
    );
}