import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        loadTrades(user.id);
      }
    });
  }, []);

  const loadTrades = async (uid) => {
    const { data } = await supabase
      .from('trades')
      .select('id, seller_id, buyer_id, status, created_at')
      .or(`buyer_id.eq.${uid},seller_id.eq.${uid}`)
      .order('created_at', { ascending: false });

    setTrades(data);
  };

  if (!user) return <p className="p-6">Please login to view dashboard.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Active Trades</h2>
      {trades.length === 0 ? (
        <p>No trades found.</p>
      ) : (
        <div className="space-y-4">
          {trades.map((t) => (
            <div key={t.id} className="p-4 bg-white shadow rounded-xl flex justify-between items-center">
              <div>
                <p><strong>Status:</strong> {t.status}</p>
                <p><strong>You are:</strong> {t.buyer_id === user.id ? 'Buyer' : 'Agent'}</p>
              </div>
              <Link
                href={`/chat/${t.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Open Chat
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
