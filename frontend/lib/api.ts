const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sacred-moonlight-34cc5fdcc7.strapiapp.com/api';

// ============================================
// ПРОДУКТИ
// ============================================

// ВЗИМАНЕ НА ВСИЧКИ ПРОДУКТИ
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/products?populate=*`);
    if (!res.ok) return { data: [] };
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('Error fetching products:', error);
    return { data: [] };
  }
}
// Добавете този интерфейс най-отгоре във файла
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
  url: string;
}

// Актуализирайте типа за продукт
export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: any;
  price: number;
  stock: number;
  featured: boolean;
  images?: StrapiImage[];  // Променено - директен масив
  category?: any[];
}
// ВЗИМАНЕ НА ЕДИН ПРОДУКТ ПО SLUG
export async function fetchProduct(slug: string) {
  try {
    const res = await fetch(`${API_URL}/products?filters[slug][$eq]=${slug}&populate=*`);
    if (!res.ok) return { data: [] };
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('Error fetching product:', error);
    return { data: [] };
  }
}

// ВЗИМАНЕ НА ПРЕПОРЪЧАНИ ПРОДУКТИ
export async function fetchFeaturedProducts() {
  try {
    const res = await fetch(`${API_URL}/products?filters[featured][$eq]=true&populate=*`);
    if (!res.ok) return { data: [] };
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('Error fetching featured products:', error);
    return { data: [] };
  }
}

// ============================================
// КАТЕГОРИИ
// ============================================

// ВЗИМАНЕ НА ВСИЧКИ КАТЕГОРИИ
export async function fetchCategories() {
  try {
    console.log('🔍 Fetching all categories...');
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) {
      console.warn('Categories fetch error:', res.status);
      return { data: [] };
    }
    const data = await res.json();
    console.log('✅ Categories fetched:', data.data?.length || 0);
    return data;
  } catch (error) {
    console.warn('Error fetching categories:', error);
    return { data: [] };
  }
}

// ВЗИМАНЕ НА ЕДНА КАТЕГОРИЯ ПО SLUG
export async function fetchCategory(slug: string) {
  try {
    console.log('🔍 Fetching category with slug:', slug);
    const res = await fetch(`${API_URL}/categories?filters[slug][$eq]=${slug}`);
    if (!res.ok) return { data: [] };
    const data = await res.json();
    console.log('✅ Category fetched:', data);
    return data;
  } catch (error) {
    console.warn('Error fetching category:', error);
    return { data: [] };
  }
}

// ============================================
// ПРОДУКТИ ПО КАТЕГОРИЯ
// ============================================

// ВЗИМАНЕ НА ПРОДУКТИ ПО КАТЕГОРИЯ
export async function fetchProductsByCategory(categorySlug: string) {
  try {
    console.log('🔍 Търсене на продукти за категория:', categorySlug);
    
    // В Strapi 5, category е масив, затова търсим по category.slug
    const res = await fetch(
      `${API_URL}/products?filters[category][slug][$eq]=${categorySlug}&populate=*`
    );
    
    if (!res.ok) {
      console.log('❌ Грешка при заявка за продукти:', res.status);
      return { data: [] };
    }
    
    const data = await res.json();
    console.log('✅ Намерени продукти:', data.data?.length || 0);
    
    return data;
  } catch (error) {
    console.warn('❌ Грешка при fetchProductsByCategory:', error);
    return { data: [] };
  }
}

// ============================================
// БРОЙ ПРОДУКТИ В КАТЕГОРИЯ
// ============================================

// ВЗИМАНЕ НА БРОЙ ПРОДУКТИ В КАТЕГОРИЯ
export async function fetchProductCountByCategory(categorySlug: string) {
  try {
    console.log('🔍 Търсене на брой продукти за категория:', categorySlug);
    
    const res = await fetch(
      `${API_URL}/products?filters[category][slug][$eq]=${categorySlug}&pagination[pageSize]=1`
    );
    
    if (!res.ok) {
      console.log('❌ Грешка при заявка за брой:', res.status);
      return 0;
    }
    
    const data = await res.json();
    const count = data.meta?.pagination?.total || 0;
    console.log(`✅ Брой продукти в категория ${categorySlug}: ${count}`);
    
    return count;
  } catch (error) {
    console.warn('❌ Грешка при fetchProductCountByCategory:', error);
    return 0;
  }
}