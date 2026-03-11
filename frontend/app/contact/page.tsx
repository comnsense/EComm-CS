'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Съобщението е изпратено!');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Контакти</h1>

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

                <textarea
                    placeholder="Съобщение"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
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
                    Изпрати
                </button>
            </form>
        </div>
    );
}