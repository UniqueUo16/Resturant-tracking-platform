export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-green-900">
      <h1 className="text-3xl font-bold mb-4">✅ Payment Successful!</h1>
      <p className="text-lg mb-6">
        Thank you for your purchase. Your order is being processed.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
