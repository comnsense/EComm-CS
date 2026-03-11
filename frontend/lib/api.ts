const API_URL = 'http://localhost:1337/api';

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

// 👇 ТАЗИ ФУНКЦИЯ ТРЯБВА ДА Я ИМА - ВЗИМАНЕ НА ВСИЧКИ КАТЕГОРИИ
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
    
    // Първо намираме категорията по slug
    const catRes = await fetch(`${API_URL}/categories?filters[slug][$eq]=${categorySlug}`);
    const catData = await catRes.json();
    
    if (!catData.data || catData.data.length === 0) {
      console.log('❌ Няма категория със slug:', categorySlug);
      return { data: [] };
    }
    
    const categoryId = catData.data[0].id;
    console.log('🆔 ID на категория:', categoryId);
    
    // Търсим продукти с тази категория
    // ВАЖНО: Името на полето може да е различно - проверете в Strapi!
    const res = await fetch(
      `${API_URL}/products?filters[category][id][$eq]=${categoryId}&populate=*`
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