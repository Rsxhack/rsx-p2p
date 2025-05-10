import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ChatPage() {
  const { tradeId } = useRouter().query;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!tradeId) return;
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select()
        .eq('trade_id', tradeId)
        .order('created_at', { ascending: true });
      setMessages(data);
    };
    fetchMessages();

    // Realtime
    const channel = supabase
      .channel('chat-' + tradeId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => fetchMessages()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [tradeId]);

  const sendMsg = async () => {
    if (!input || !user) return;
    await supabase.from('messages').insert([
      { trade_id: tradeId, sender_id: user.id, content: input },
    ]);
    setInput('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat with Agent</h2>
      <div className="bg-white p-4 rounded-xl shadow mb-4 h-64 overflow-y-scroll">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <strong>{m.sender_id === user?.id ? 'You' : 'Them'}:</strong> {m.content}
          </div>
        ))}
      </div>
      <input
        className="w-full p-2 border rounded mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message..."
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendMsg}>
        Send
      </button>
    </div>
  );
}
