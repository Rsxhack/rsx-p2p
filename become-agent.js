import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BecomeAgent() {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const registerAgent = async () => {
    const { error } = await supabase
      .from('users')
      .update({ wallet_address: wallet, is_agent: true })
      .eq('id', user.id);
    if (error) alert(error.message);
    else alert('Registered as Agent!');
  };

  if (!user) return <p className="p-4">Please log in first.</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Become a Cash Agent</h2>
      <input
        type="text"
        placeholder="Your Crypto Wallet Address"
        className="w-full p-2 border rounded mb-4"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <button onClick={registerAgent} className="bg-green-600 text-white px-4 py-2 rounded">
        Register as Agent
      </button>
    </div>
  );
}
