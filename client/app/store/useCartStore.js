import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: {},

      addToCart: (item) =>
        set((state) => {
          const newCart = { ...state.cart };
          if (newCart[item.id]) {
            newCart[item.id].qty += 1;
          } else {
            newCart[item.id] = { ...item, qty: 1 };
          }
          return { cart: newCart };
        }),

      removeFromCart: (item) =>
        set((state) => {
          const newCart = { ...state.cart };
          if (!newCart[item.id]) return { cart: newCart };
          if (newCart[item.id].qty > 1) newCart[item.id].qty -= 1;
          else delete newCart[item.id];
          return { cart: newCart };
        }),

      clearCart: () => set({ cart: {} }),
    }),
    {
      name: "cart-storage", // key in localStorage
      getStorage: () => localStorage, // optional, defaults to localStorage
    }
  )
);

export default useCartStore;
