import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-blue-700">RSX Card</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link href="/request-trade" className="text-gray-700 hover:text-blue-600">New Trade</Link>
        <Link href="/agents" className="text-gray-700 hover:text-blue-600">Agents</Link>
        <Link href="/auth" className="text-gray-700 hover:text-blue-600">Login</Link>
      </div>
    </nav>
  );
}
