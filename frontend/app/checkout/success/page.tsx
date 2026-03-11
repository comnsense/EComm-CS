import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Благодарим за поръчката!</h1>
            <p>Номер на поръчка: {Math.random().toString(36).substring(7)}</p>
            <Link href="/">Към началната страница</Link>
        </div>
    );
}