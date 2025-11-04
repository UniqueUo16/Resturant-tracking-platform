import { create } from "zustand";

const useCartStore = create((set) => ({
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
}));

export default useCartStore;
