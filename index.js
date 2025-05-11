export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">RSX Card Dashboard</h1>
        <p className="text-gray-600 mb-8">Swap crypto for cash, P2P-style. Zero custodians, total control.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">🧍 Become an Agent</h2>
            <p className="text-sm text-gray-500">Earn fees for helping others deposit or withdraw crypto as cash.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">💸 Find a Cash Partner</h2>
            <p className="text-sm text-gray-500">Find verified agents near you for instant crypto-cash swaps.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">📱 Telegram Bot</h2>
            <p className="text-sm text-gray-500">No app required — use the Telegram bot to trade instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
