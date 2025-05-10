import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AgentsList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const loadAgents = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('username, wallet_address, rating')
        .eq('is_agent', true);
      if (error) console.error(error);
      else setAgents(data);
    };
    loadAgents();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Verified Cash Agents</h2>
      {agents.map((agent, idx) => (
        <div key={idx} className="mb-4 p-4 bg-white rounded-xl shadow">
          <p><strong>User:</strong> {agent.username || 'Anonymous'}</p>
          <p><strong>Wallet:</strong> {agent.wallet_address}</p>
          <p><strong>Rating:</strong> ⭐ {agent.rating}</p>
        </div>
      ))}
    </div>
  );
}
