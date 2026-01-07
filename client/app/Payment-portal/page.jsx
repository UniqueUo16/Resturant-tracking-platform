"use client";

import Image from "next/image";
import { KeySquareIcon, ShieldCheck } from "lucide-react";
import useCartStore from "@/app/store/useCartStore";
import { Montserrat } from "next/font/google";

  const mon = Montserrat({
    subsets:["latin"], weight:["400", "500", "700"]
  })

export default function Payment_page() {
  const cart = useCartStore((state) => state.cart);

  const items = Object.values(cart).map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price) || 0,
    qty: Number(item.qty) || 0,
  }));

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className={`${mon.className} min-h-screen bg-gray-100 mt-16 px-6 py-10 text-black tracking-widest`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ================= LEFT — BUYER DETAILS + RECEIPT ================= */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Order Confirmation
            </p>

            <div className="flex justify-center my-3">
              <Image src="/imgs/badge-1.png" alt="logo" height={54} width={54} />
            </div>

            <p className="text-sm text-gray-600">
              Mythic Restaurant
            </p>
          </div>

          {/* ================= Buyer Details ================= */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+234..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 my-4" />

          {/* Items */}
          {items.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">
              Your order is empty.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty × {item.qty}
                    </p>
                  </div>
                  <span className="font-mono text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t border-dashed border-gray-300 my-4" />

              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-700">Total</span>
                <span className="text-green-700 font-mono text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Security */}
          <div className="flex items-center gap-2 mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
            <KeySquareIcon size={16} className="text-green-600" />
            <p className="text-xs text-gray-600">
              This is a secure Payment page
            </p>
          </div>
        </section>

        {/* ================= RIGHT — CARD PAYMENT ================= */}
        <section className="bg-white rounded-2xl border border-gray-300 shadow-lg p-8">

  {/* Header */}
  <div className="mb-6">
    <p className="text-xs text-gray-500 uppercase tracking-widest">
      Payment Method
    </p>
    <h3 className="text-lg font-semibold text-gray-800">
      Credit / Debit Card
    </h3>
  </div>

  {/* Card Logos */}
  <div className="flex gap-3 mb-4 justify-end">
    <img src="/imgs/svg.png" alt="Visa" className="h-10" />
    <img src="/imgs/mastercard.png" alt="Mastercard" className="h-10" />
    <img src="/imgs/mastercard1.png" alt="American Express" className="h-10" />
    
  </div>

  {/* Card Number */}
  <div className="mb-4">
    <label className="block text-xs text-gray-600 mb-1">
      Card Number
    </label>
    <input
      type="text"
      placeholder="1234 5678 9012 3456"
      className="w-full p-3 rounded-lg border border-gray-300 tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>

  {/* Expiry + CVV */}
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-xs text-gray-600 mb-1">
        Expiry Date
      </label>
      <input
        type="text"
        placeholder="MM / YY"
        className="w-full p-3 rounded-lg border border-gray-300 tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div>
      <label className="block text-xs text-gray-600 mb-1">
        CVV
      </label>
      <input
        type="password"
        placeholder="•••"
        maxLength={4}
        className="w-full p-3 rounded-lg border border-gray-300 tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  </div>

  {/* Cardholder */}
  <div className="mb-6">
    <label className="block text-xs text-gray-600 mb-1">
      Cardholder Name
    </label>
    <input
      type="text"
      placeholder="Name on card"
      className="w-full p-3 rounded-lg border border-gray-300 uppercase focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>

  {/* Security */}
  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
    <ShieldCheck size={16} className="text-green-600" />
    <p className="text-xs text-gray-600">
      Secured with bank-grade encryption
    </p>
  </div>

  {/* Pay Button */}
  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition">
    Pay ${total.toFixed(2)}
  </button>

  <p className="text-center text-xs text-gray-500 mt-3">
    You may be redirected to your bank to complete this payment
  </p>
</section>


      </div>
    </div>
  );
}
