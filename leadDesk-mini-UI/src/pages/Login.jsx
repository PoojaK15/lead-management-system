import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      if (mode === 'register') {
        const res = await api.post('/auth/create-admin', {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setSuccess(res.data.message || 'Admin registered successfully. You can now log in.');
        setForm({ name: '', email: '', password: '' });
        setMode('login');
      } else {
        const res = await api.post('/auth/login', { email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
          <button type="button" onClick={() => setMode('login')} className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${mode === 'login' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
            Login
          </button>
          <button type="button" onClick={() => setMode('register')} className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${mode === 'register' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
            Register Admin
          </button>
        </div>

        <h2 className="mb-2 text-2xl font-semibold">{mode === 'register' ? 'Register Admin' : 'Admin Login'}</h2>
        <p className="mb-6 text-sm text-slate-600">{mode === 'register' ? 'Create a new admin account.' : 'Use your admin credentials to access the dashboard.'}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' ? (
            <input className="w-full rounded border border-slate-300 px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" />
          ) : null}
          <input className="w-full rounded border border-slate-300 px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Admin Email" />
          <input className="w-full rounded border border-slate-300 px-3 py-2" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {success ? <p className="text-sm text-green-600">{success}</p> : null}
          <button disabled={loading} className="w-full rounded bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-60">
            {loading ? (mode === 'register' ? 'Creating admin...' : 'Signing in...') : mode === 'register' ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
