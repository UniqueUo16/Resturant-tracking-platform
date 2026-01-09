"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import useCartStore from "@/app/store/useCartStore";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function Checkoutpage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const items = Object.values(cart).map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price) || 0,
    qty: Number(item.qty) || 0,
  }));

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = () => {
    router.push("/Payment-portal");
  };

  return (
    <div
      className={`${montserrat.className} mt-16 min-h-screen bg-gray-200 text-gray-100 flex justify-center px-4`}
    >
      {/* RECEIPT CARD */}
      <div className="w-full max-w-sm bg-[#0c0c0c] rounded-2xl shadow-2xl p-6 border border-gray-800">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-serif text-amber-400">
            L’Uo Dine
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Order Summary
          </p>
          <div className="mt-4 border-t border-dashed border-gray-700" />
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">
            Your order is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    × {item.qty}
                  </p>
                </div>
                <span className="text-amber-400">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}

            {/* Divider */}
            <div className="border-t border-dashed border-gray-700 my-4" />

            {/* Total */}
            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-300">
                Estimated Total
              </span>
              <span className="text-amber-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        {items.length > 0 && (
          <>
            <div className="border-t border-dashed border-gray-700 my-6" />

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-3 rounded-full text-sm font-semibold transition ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-amber-500 text-black hover:bg-amber-400"
              }`}
            >
              {loading ? "Preparing next step…" : "Proceed to Payment"}
            </button>

            <p className="text-[11px] text-gray-500 text-center mt-3">
              Payment details will be reviewed on the next screen.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
