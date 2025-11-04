export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-900">
      <h1 className="text-3xl font-bold mb-4">❌ Payment Canceled</h1>
      <p className="text-lg mb-6">
        Your payment was not completed. You can try again anytime.
      </p>
      <a
        href="/checkout"
        className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
      >
        Return to Checkout
      </a>
    </div>
  );
}
