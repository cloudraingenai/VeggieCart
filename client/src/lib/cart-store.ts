import { CartItem } from "@shared/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  toggleCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      
      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === newItem.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                : item
            )
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: newItem.quantity || 1 }]
          });
        }
      },
      
      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      toggleCart: () => {
        set({ isCartOpen: !get().isCartOpen });
      },
      
      openCheckout: () => {
        set({ isCheckoutOpen: true, isCartOpen: false });
      },
      
      closeCheckout: () => {
        set({ isCheckoutOpen: false });
      },
      
      closeCart: () => {
        set({ isCartOpen: false });
      }
    }),
    {
      name: 'xyz-organics-cart',
      partialize: (state) => ({ items: state.items })
    }
  )
);
