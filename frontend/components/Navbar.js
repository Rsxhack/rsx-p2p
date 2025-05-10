import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="RSX Logo" width={32} height={32} />
        <h1 className="text-xl font-bold text-blue-700">RSX Card</h1>
      </div>
      <div className="space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link href="/request-trade" className="text-gray-700 hover:text-blue-600">New Trade</Link>
        <Link href="/agents" className="text-gray-700 hover:text-blue-600">Agents</Link>
        <Link href="/auth" className="text-gray-700 hover:text-blue-600">Login</Link>
      </div>
    </nav>
  );
}
