"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Montserrat } from "next/font/google";
import useCartStore from "@/app/store/useCartStore";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkoutpage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);

  // 🧾 Convert cart object into an array of valid items
  const items = Object.values(cart).map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price) || 0,
    qty: Number(item.qty) || 0,
  }));

  // 🧮 Calculate total safely
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 💳 Handle Stripe Checkout
  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe failed to load");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${montserrat.className} mt-14 min-h-screen bg-black text-gray-100 p-10 font-sans`}
    >
      <h1 className="text-3xl font-serif font-bold mb-6 text-amber-500">
        Checkout
      </h1>
      <h2 className="font-mono font-bold mb-6 text-green-500">
        Secure Checkout Page
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          {/* 🧺 Cart Items */}
          <div className="space-y-4 border-b border-gray-700 pb-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#111] p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-300">Quantity: {item.qty}</p>
                </div>
                <span className="text-amber-500 font-bold">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* 💰 Total + Pay Button */}
          <div className="mt-6">
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="text-amber-500">${total.toFixed(2)}</span>
            </p>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`mt-6 w-full py-3 rounded-full font-semibold transition ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-400 text-black"
              }`}
            >
              {loading ? "🧩 Processing..." : "Pay Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
