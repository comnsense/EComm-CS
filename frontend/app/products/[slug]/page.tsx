'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProduct } from '@/lib/api';
import { useCartStore } from '@/store/cart';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(slug as string);
        console.log('Product data:', data); // За дебъг
        setProduct(data.data[0]);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  const getDescription = () => {
    try {
      if (!product?.description) return 'Няма описание';
      if (typeof product.description === 'string') return product.description;
      if (Array.isArray(product.description)) {
        return product.description[0]?.children?.[0]?.text || 'Няма описание';
      }
      return 'Няма описание';
    } catch (e) {
      return 'Няма описание';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block p-4 rounded-full bg-[#8bc34a]/20 animate-pulse">
          <i className="fas fa-spinner fa-spin text-4xl text-[#8bc34a]"></i>
        </div>
        <p className="mt-4 text-gray-400">Зареждане...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <i className="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
        <h2 className="text-2xl">Продуктът не е намерен</h2>
        <Link href="/" className="text-[#8bc34a] mt-4 inline-block hover:underline">
          ← Към начало
        </Link>
      </div>
    );
  }

  // ВАЖНО: В Strapi 5, images е директен масив, без 'data'
  const imageUrl = product.images && product.images.length > 0
    ? `http://localhost:1337${product.images[0].url}`
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/products" 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8bc34a]/10 text-[#8bc34a] hover:bg-[#8bc34a] hover:text-white transition-all duration-300 group mb-8"
      >
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        <span>Назад към продуктите</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--card-bg)] p-6 rounded-2xl border border-[#8bc34a]/30">
        {/* Снимка */}
        <div className="relative h-96 bg-[#1a1f2e] rounded-xl overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name || 'Продукт'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="fas fa-image text-6xl text-[#8bc34a] opacity-30"></i>
            </div>
          )}
        </div>

        {/* Детайли */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#8bc34a] mb-4">
            {product.name}
          </h1>
          
          <div className="text-gray-400 mb-6">
            {getDescription()}
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-[#8bc34a]">
              {product.price} лв.
            </span>
            <span className={`ml-4 px-3 py-1 rounded-full text-sm ${
              product.stock > 0 
                ? 'bg-green-500/20 text-green-500' 
                : 'bg-red-500/20 text-red-500'
            }`}>
              {product.stock > 0 ? `В наличност: ${product.stock}` : 'Няма наличност'}
            </span>
          </div>

          {/* Категория */}
          {product.category && product.category.length > 0 && (
            <div className="mb-6">
              <span className="text-gray-400">Категория: </span>
              <Link 
                href={`/categories/${product.category[0].slug}`}
                className="text-[#8bc34a] hover:underline"
              >
                {product.category[0].name}
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.name} добавен в количката!`);
            }}
            disabled={product.stock <= 0}
            className={`
              neobutton-pay w-full md:w-auto px-8 py-4
              ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <i className="fas fa-cart-plus mr-2"></i>
            Добави в количката
          </button>
        </div>
      </div>
    </div>
  );
}