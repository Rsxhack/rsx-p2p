import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('login');

  const handleAuth = async () => {
    const fn = authType === 'login' ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    if (error) alert(error.message);
    else alert('Check your inbox (if signup) or welcome back!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">{authType === 'login' ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        className="mt-4 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        {authType === 'login' ? 'Login' : 'Register'}
      </button>
      <p
        className="mt-4 text-sm text-blue-600 cursor-pointer"
        onClick={() => setAuthType(authType === 'login' ? 'register' : 'login')}
      >
        {authType === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
      </p>
    </div>
  );
}
