import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;        // ТРЯБВА ДА Е САМО STRING!
  price: number;
  slug: string;
  image?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

// Функция за безопасно вземане на име - ВРЪЩА САМО STRING
const getProductName = (product: any): string => {
  try {
    if (!product) return 'Продукт';

    // Ако има Name (с главна буква) и е стринг
    if (product.Name && typeof product.Name === 'string') {
      return product.Name;
    }

    // Ако има name (с малка буква) и е стринг
    if (product.name && typeof product.name === 'string') {
      return product.name;
    }

    // Ако name е обект (от Rich text) - връщаме 'Продукт'
    if (product.name && typeof product.name === 'object') {
      console.warn('Product name is an object:', product.name);
      return 'Продукт';
    }

    return 'Продукт';
  } catch (e) {
    console.error('Error getting product name:', e);
    return 'Продукт';
  }
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        console.log('Adding to cart - raw product:', product);

        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
          // Ако продуктът вече съществува, увеличаваме количеството
          set({
            items: currentItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // ВАЖНО: ВЗИМАМЕ САМО СТРИНГ ЗА ИМЕТО!
          const productName = getProductName(product);

          // Вземаме URL на изображението
          let imageUrl = '';
          try {
            if (product.images?.data && product.images.data.length > 0) {
              const image = product.images.data[0];
              if (image.url) {
                imageUrl = `http://localhost:1337${image.url}`;
              }
            }
          } catch (e) {
            console.error('Image error:', e);
          }

          // СЪЗДАВАМЕ НОВ ОБЕКТ САМО С НЕОБХОДИМИТЕ ПОЛЕТА
          const newItem: CartItem = {
            id: product.id,
            name: productName,           // 👈 ТОВА Е STRING, НИКОГА ОБЕКТ!
            price: product.price || 0,
            slug: product.slug || '',
            image: imageUrl,
            quantity: 1
          };

          console.log('Adding new item to cart:', newItem);

          set({
            items: [...currentItems, newItem]
          });
        }

        console.log('Cart updated:', get().items);
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);