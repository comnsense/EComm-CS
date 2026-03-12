'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderPage() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/orders" className="text-[#8bc34a] hover:underline mb-6 inline-block">
        ← Назад към поръчките
      </Link>
      
      <h1 className="text-3xl font-bold text-[#8bc34a] mb-8">
        Поръчка #{id}
      </h1>
      
      <p className="text-gray-400">Детайли за поръчката ще се показват тук...</p>
    </div>
  );
}