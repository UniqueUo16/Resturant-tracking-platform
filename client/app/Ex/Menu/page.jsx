"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import useCartStore from "@/app/store/useCartStore";
import Link from "next/link";

export default function ShopPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🛒 Zustand cart store
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // ✅ Fetch menu items from backend
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
        if (!res.ok) throw new Error("Failed to load menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // ✅ Filtered menu by category
  const filteredItems =
    filter === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  // ✅ Calculate total price correctly (since cart stores objects)
  const total = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks"];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading menu...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f3eded] text-gray-900 font-sans relative flex flex-col lg:flex-row">
      {/* 🛒 Desktop Cart Sidebar */}
      <motion.aside
        className="hidden lg:flex lg:w-[25%] bg-[#111] border-l border-gray-800 p-8 sticky top-0 h-screen flex-col justify-between"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <CartContent
          cart={cart}
          total={total}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </motion.aside>

      {/* 🍔 Mobile Cart Toggle Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-amber-500 text-black p-4 rounded-full shadow-lg hover:bg-amber-400 transition"
      >
        <ShoppingCart size={22} />
      </button>

      {/* 🛍️ Product Grid */}
      <div className="flex-1 p-6 sm:p-8 lg:p-12 mt-20 lg:mt-0">
        {/* Header + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-serif text-amber-500">Order Online</h1>

          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  filter === cat
                    ? "bg-amber-500 text-black"
                    : "border border-gray-600 hover:border-amber-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🧁 Product Cards */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-[#111] rounded-lg p-4 flex flex-col justify-between shadow-md hover:shadow-[0_0_15px_rgba(255,191,0,0.1)] transition"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={item.img || "/imgs/default.png"}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-lg object-cover mb-4"
              />
              <div className="flex flex-col justify-between flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">{item.category}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-amber-500 font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-2 text-xs bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 📱 Mobile Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 text-gray-200 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#111] w-full max-h-[80vh] p-6 rounded-t-3xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-serif text-amber-500 flex items-center gap-2">
                  <ShoppingCart size={18} /> Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-amber-400"
                >
                  <X size={20} />
                </button>
              </div>

              <CartContent
                cart={cart}
                total={total}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* 🧩 Cart Content Reusable Component */
function CartContent({ cart, total, addToCart, removeFromCart }) {
  return (
    <>
      <div className="space-y-4">
        {Object.keys(cart).length === 0 ? (
          <p className="text-gray-500 text-sm italic">Your cart is empty.</p>
        ) : (
          Object.values(cart).map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-sm">{item.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item)}
                  className="p-1 border border-gray-600 rounded-full hover:border-amber-500"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm">{item.qty}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="p-1 border border-gray-600 rounded-full hover:border-amber-500"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4">
        <p className="text-gray-400 text-sm mb-2">Subtotal:</p>
        <p className="text-lg font-semibold text-amber-500">
          ${total.toFixed(2)}
        </p>

        <Link href="/Ex/Checkpage">
          <button className="mt-4 w-full py-2 bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition">
            🧩 Proceed to Checkout
          </button>
        </Link>
      </div>
    </>
  );
}
