"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Plus, Minus } from "lucide-react";

export default function ShopPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch menu from backend
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("http://localhost:5000/menu");
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

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[item.id] > 1) newCart[item.id]--;
      else delete newCart[item.id];
      return newCart;
    });
  };

  const filteredItems =
    filter === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  const total = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = menuItems.find((i) => i.id === Number(id));
    return acc + (item?.price || 0) * qty;
  }, 0);

  const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks"];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading menu...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#000000] text-gray-200 font-sans relative flex flex-col lg:flex-row">
      {/* Sidebar Cart */}
      <motion.aside
        className="lg:w-[25%] bg-[#111] border-l border-gray-800 p-8 sticky top-0 h-screen flex flex-col justify-between"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-xl font-serif text-amber-500 mb-6 flex items-center gap-2">
            <ShoppingCart size={18} /> Your Cart
          </h2>
          <div className="space-y-4">
            {Object.keys(cart).length === 0 ? (
              <p className="text-gray-500 text-sm italic">Your cart is empty.</p>
            ) : (
              Object.entries(cart).map(([id, qty]) => {
                const item = menuItems.find((i) => i.id === Number(id));
                return (
                  <div key={id} className="flex justify-between items-center">
                    <span className="text-sm">{item?.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="p-1 border border-gray-600 rounded-full hover:border-amber-500"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm">{qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 border border-gray-600 rounded-full hover:border-amber-500"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-gray-400 text-sm mb-2">Subtotal:</p>
          <p className="text-lg font-semibold text-amber-500">
            ${total.toFixed(2)}
          </p>
          <button className="mt-4 w-full py-2 bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition">
            Proceed to Checkout
          </button>
        </div>
      </motion.aside>

      {/* Main Shop Area */}
      <div className="flex-1 p-8 lg:p-12 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-serif text-amber-500">Order Online</h1>
          <div className="flex gap-3 mt-4 sm:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
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

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-[#111] rounded-sm p-4 flex flex-col justify-between shadow-md hover:shadow-[0_0_15px_rgba(255,191,0,0.1)] transition"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={item.img || "/imgs/default.png"}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-2xl object-cover mb-4"
              />
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-amber-500 font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 text-sm bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
