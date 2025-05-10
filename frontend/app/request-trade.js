import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function RequestTrade() {
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    supabase
      .from('users')
      .select('id, username')
      .eq('is_agent', true)
      .then(({ data }) => setAgents(data));
  }, []);

  const submitTrade = async () => {
    const { error } = await supabase.from('trades').insert([
      {
        buyer_id: user.id,
        seller_id: selectedAgent,
        amount,
        notes,
        status: 'pending',
      },
    ]);
    if (error) alert(error.message);
    else alert('Trade Requested!');
  };

  if (!user) return <p className="p-4">Login required</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Request Cash Trade</h2>

      <label>Pick Agent</label>
      <select
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setSelectedAgent(e.target.value)}
      >
        <option value="">-- Select --</option>
        {agents.map((a) => (
          <option key={a.id} value={a.id}>
            {a.username || a.id}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="w-full p-2 border rounded mb-3"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <textarea
        placeholder="Any notes or instructions"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={submitTrade}
      >
        Submit Request
      </button>
    </div>
  );
}
