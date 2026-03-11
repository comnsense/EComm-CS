'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const [user] = useState({ name: 'Гост', email: 'guest@example.com' });

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Моят профил</h1>

            <div style={{ marginTop: '2rem' }}>
                <p>Име: {user.name}</p>
                <p>Имейл: {user.email}</p>
            </div>

            <Link href="/orders" style={{ display: 'block', marginTop: '2rem', color: '#8bc34a' }}>
                История на поръчките
            </Link>
        </div>
    );
}