import Link from 'next/link';

export default function OrdersPage() {
    // Примерни данни
    const orders = [
        { id: 'ORD001', date: '2024-01-01', total: 1299.99, status: 'доставена' },
        { id: 'ORD002', date: '2024-02-15', total: 249.99, status: 'обработва се' },
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: '#8bc34a' }}>Моите поръчки</h1>

            <table style={{ width: '100%', marginTop: '2rem' }}>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Дата</th>
                        <th>Сума</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.total} лв.</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}